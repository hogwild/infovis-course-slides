# 1_dataPrep.R

library(dplyr)
library(readr)
library(lubridate)
library(jsonlite)
library(psych)
library(stringr)

# -------------------------
# Configurable demographic filters
# Set any of these to NULL to disable that filter.
FILTER_GENDER <- c("Male", "Female")                 # options: "Male", "Female", "Diverse"
AGE_RANGE <- c(0, 33)                                # inclusive range (min_age, max_age)
FILTER_EXPERIENCE <- c("None", "Beginner", "Intermediate", "Expert")
# -------------------------

# Track exclusions/dropouts
exclusions <- list()
filter_order_counter <- 0

apply_filter <- function(df, mask, reason, login_col = "pseudonym") {
  # Apply row filter and record exclusion counts. mask=TRUE marks rows to DROP.
  to_drop <- df[mask & !is.na(mask), ]
  if (login_col %in% names(df) && nrow(to_drop) > 0) {
    for (pid in to_drop[[login_col]]) {
      cat(paste0("Filtered out at ", reason, ": ", pid, "\n"))
    }
  }
  filter_order_counter <<- filter_order_counter + 1
  exclusions <<- append(exclusions, list(list(reason = reason, n = nrow(to_drop), order_id = filter_order_counter)))
  return(df[!mask | is.na(mask), ])
}

calculate_cronbach_alpha <- function(data, items) {
  # Cronbach's alpha for provided item columns; returns rounded or NULL.
  tryCatch({
    alpha_result <- alpha(data[, items, drop = FALSE])
    return(round(alpha_result$total$raw_alpha, 3))
  }, error = function(e) {
    return(NA)
  })
}

get_first_submission_plus1h <- function(submission_history) {
  tryCatch({
    if (is.na(submission_history) || submission_history == "" || submission_history == "null") {
      return(as.POSIXct(NA))
    }
    subs <- fromJSON(submission_history)
    if (length(subs) > 0 && !is.null(subs$timestamp)) {
      return(ymd_hms(subs$timestamp[1]) + hours(1))
    }
    return(as.POSIXct(NA))
  }, error = function(e) {
    return(as.POSIXct(NA))
  })
}

get_last_valid_submission_plus1h <- function(submission_history, posttest_startdate) {
  tryCatch({
    if (is.na(submission_history) || submission_history == "" || submission_history == "null") {
      return(as.POSIXct(NA))
    }
    subs <- fromJSON(submission_history)
    if (length(subs) > 0 && !is.null(subs$timestamp)) {
      timestamps <- ymd_hms(subs$timestamp) + hours(1)
      valid_indices <- which(timestamps <= posttest_startdate)
      if (length(valid_indices) > 0) {
        return(timestamps[max(valid_indices)])
      }
    }
    return(as.POSIXct(NA))
  }, error = function(e) {
    return(as.POSIXct(NA))
  })
}

run_filtering <- function(df) {
  # Replicates and consolidates all filtering rules + demographic filters.
  current_size <- nrow(df)
  cat("Entry count before filtering:", current_size, "\n")
  
  # Track group counts before filtering
  if ("experiment_group" %in% names(df)) {
    initial_group_counts <- table(df$experiment_group)
    cat("\nInitial group counts:\n")
    print(initial_group_counts)
    cat("\n")
  }
  
  # Ensure datetimes
  date_cols <- c(
    "pretest_startdate",
    "posttest_startdate", 
    "pretest_datestamp",
    "posttest_datestamp",
    "start_date_artemis",
    "end_date_artemis"
  )
  for (col in date_cols) {
    if (col %in% names(df)) {
      df[[col]] <- ymd_hms(df[[col]])
    }
  }
  
  # 1) Posttest must not start before pretest
  df <- apply_filter(df, df$posttest_startdate < df$pretest_startdate, "Posttest before pretest")
  
  # 2) At least 10 minutes gap between pre and post
  gap <- as.numeric(difftime(df$posttest_startdate, df$pretest_startdate, units = "mins"))
  df <- apply_filter(df, gap < 10, "<10 min pre-post gap")
  
  # 3) No more than 2 hours gap between pre and post  
  gap <- as.numeric(difftime(df$posttest_startdate, df$pretest_startdate, units = "hours"))
  df <- apply_filter(df, gap > 2, ">2 h pre-post gap")
  
  # 4) First Artemis submission (+1h) must not be before pretest
  df$first_submission_timestamp <- sapply(df$submission_history_artemis, get_first_submission_plus1h)
  df$first_submission_timestamp <- as.POSIXct(df$first_submission_timestamp, origin = "1970-01-01")
  df <- apply_filter(df, df$first_submission_timestamp < df$pretest_startdate, "First submission before pretest")
  df$first_submission_timestamp <- NULL
  
  # 5) Attention checks
  attention_questions <- list(
    c("POSKQAC01", "AO02"),
    c("PREKQAC01", "AO02"),
    c("POSIG04[SQ007]", "AO04"),
    c("POSPM02[SQ007]", "AO04")
  )
  for (check in attention_questions) {
    question <- check[1]
    answer <- check[2]
    if (question %in% names(df)) {
      df <- apply_filter(df, (df[[question]] != answer) & (!is.na(df[[question]])), 
                        paste0("Failed attention check: ", question))
    }
  }
  
  # 6) Use last valid submission (+1h) before posttest; drop if it violates constraint
  df$last_valid_submission_timestamp <- mapply(
    get_last_valid_submission_plus1h,
    df$submission_history_artemis,
    df$posttest_startdate
  )
  df$last_valid_submission_timestamp <- as.POSIXct(df$last_valid_submission_timestamp, origin = "1970-01-01")
  df <- apply_filter(
    df,
    df$last_valid_submission_timestamp > df$posttest_startdate,
    "No valid submission before posttest"
  )
  # Overwrite artemis end date with the last valid submission timestamp (may be NA)
  df$end_date_artemis <- df$last_valid_submission_timestamp
  df$last_valid_submission_timestamp <- NULL
  
  # 7) Pretest must be within study window
  study_window_start <- ymd_hms("2025-01-23 12:00:00")
  df <- apply_filter(df, df$pretest_startdate < study_window_start, "Survey opened before start of study window")
  
  # 8) Must have submissions (non-empty history)
  sub_hist <- ifelse(is.na(df$submission_history_artemis), "", as.character(df$submission_history_artemis))
  sub_hist <- str_trim(sub_hist)
  df <- apply_filter(df, sub_hist %in% c("", "[]", "null"), "No submissions")
  
  # 9) Consent (POSOQ01 == AO01)
  if ("POSOQ01" %in% names(df)) {
    df <- apply_filter(df, df$POSOQ01 != "AO01", "Opt-out detected")
  }
  
  # 10) Keep NOAI always; for AI groups require message history (privacy-preserving boolean)
  has_msgs_col <- if ("has_iris_messages" %in% names(df)) "has_iris_messages" else NULL
  if (!is.null(has_msgs_col)) {
    df <- apply_filter(
      df,
      (df$experiment_group != "NOAI") & (!as.logical(df[[has_msgs_col]])),
      "AI group without message history"
    )
  }
  
  # 11) Demographic filters (moved from R)
  #    a) Gender
  if (!is.null(FILTER_GENDER)) {
    gender_mapping <- c("AO01" = "Male", "AO02" = "Female", "AO03" = "Diverse")
    gender_label <- gender_mapping[df$PREGQ04]
    df <- apply_filter(df, !(gender_label %in% FILTER_GENDER), 
                      paste0("Demographic filter: gender not in ['", paste(FILTER_GENDER, collapse = "', '"), "']"))
  }
  #    b) Age range
  if (!is.null(AGE_RANGE) && length(AGE_RANGE) == 2) {
    age_num <- as.numeric(str_extract(df$PREGQ05, "\\d+"))
    min_age <- AGE_RANGE[1]
    max_age <- AGE_RANGE[2]
    df <- apply_filter(
      df,
      (age_num < min_age) | (age_num > max_age) | is.na(age_num),
      paste0("Demographic filter: age outside ", min_age, "-", max_age)
    )
  }
  #    c) Programming experience
  if (!is.null(FILTER_EXPERIENCE)) {
    prog_exp_mapping <- c("AO01" = "None", "AO02" = "Beginner", "AO03" = "Intermediate", "AO04" = "Advanced", "AO05" = "Expert")
    exp_label <- prog_exp_mapping[df$PREGQ03]
    df <- apply_filter(
      df,
      !(exp_label %in% FILTER_EXPERIENCE),
      paste0("Demographic filter: experience not in ['", paste(FILTER_EXPERIENCE, collapse = "', '"), "']")
    )
  }
  
  # 12) Exercise duration filter (moved here so it's counted in exclusions)
  duration_secs <- as.numeric(difftime(df$end_date_artemis, df$start_date_artemis, units = "secs"))
  df <- apply_filter(
    df,
    (duration_secs > 7600) | is.na(duration_secs),
    "Exercise duration > 7600s or missing"
  )
  
  reduction <- 100 - (nrow(df) / current_size * 100)
  cat("Entry count after filtering:", nrow(df), "; reduction of", round(reduction, 2), 
      "% (", current_size - nrow(df), "entries)\n")
  
  # Show final group counts after filtering
  if ("experiment_group" %in% names(df)) {
    final_group_counts <- table(df$experiment_group)
    cat("\nFinal group counts after filtering:\n")
    print(final_group_counts)
    
    # Calculate group-wise reduction
    if (exists("initial_group_counts")) {
      cat("\nGroup-wise filtering summary:\n")
      for (group in names(initial_group_counts)) {
        initial_count <- initial_group_counts[group]
        final_count <- ifelse(group %in% names(final_group_counts), final_group_counts[group], 0)
        group_reduction <- initial_count - final_count
        group_reduction_pct <- round((group_reduction / initial_count) * 100, 1)
        group_retention_pct <- round((final_count / initial_count) * 100, 1)
        cat(sprintf("  %s: %d -> %d (removed %d, %.1f%%; retained %.1f%%)\n", 
                    group, initial_count, final_count, group_reduction, group_reduction_pct, group_retention_pct))
      }
    }
    cat("\n")
  }
  
  # Exclusions summary
  excl_df <- do.call(rbind, lapply(exclusions, data.frame))
  if (nrow(excl_df) > 0) {
    excl_df <- excl_df %>%
      group_by(reason) %>%
      summarise(n = sum(n), min_order_id = min(order_id), .groups = 'drop') %>%
      mutate(percent_of_initial = round(n / current_size * 100, 1)) %>%
      arrange(desc(n), min_order_id)
    
    # Format percentages to always show one decimal place like Python pandas
    excl_df_formatted <- excl_df %>% select(reason, n, percent_of_initial)
    excl_df_formatted$percent_of_initial <- sprintf("%.1f", excl_df_formatted$percent_of_initial)
    cat("\nExclusions Summary:\n")
    print(excl_df, row.names = FALSE)
  }
  
  return(df)
}

build_clean_dataset <- function(df) {
  # Feature engineering for analysis output (no further row filtering here).
  clean_df <- data.frame(pseudonym = df$pseudonym, stringsAsFactors = FALSE)
  
  if ("tutor_group" %in% names(df)) {
    clean_df$tutor_group <- df$tutor_group
  }
  if ("experiment_group" %in% names(df)) {
    clean_df$experiment_group <- df$experiment_group
  }
  
  # Knowledge items
  correct_answers <- list(
    c("KQ01", "AO01"),
    c("KQ02", "AO02"),
    c("KQ03", "AO02"),
    c("KQ04", "AO04"),
    c("KQ05", "AO01"),
    c("KQ06", "AO01")
  )
  
  pre_scores <- c()
  post_scores <- c()
  for (i in 1:length(correct_answers)) {
    kq <- correct_answers[[i]][1]
    corr <- correct_answers[[i]][2]
    pre_col <- paste0("PRE", kq)
    post_col <- paste0("POS", kq)
    pre_score_col <- sprintf("pre-know-%02d", i)
    post_score_col <- sprintf("post-know-%02d", i)
    clean_df[[pre_score_col]] <- as.integer(df[[pre_col]] == corr)
    clean_df[[post_score_col]] <- as.integer(df[[post_col]] == corr)
    pre_scores <- c(pre_scores, pre_score_col)
    post_scores <- c(post_scores, post_score_col)
  }
  
  clean_df$`pre-know-total` <- rowSums(clean_df[, pre_scores, drop = FALSE])
  clean_df$`post-know-total` <- rowSums(clean_df[, post_scores, drop = FALSE])
  clean_df$`know-diff` <- clean_df$`post-know-total` - clean_df$`pre-know-total`
  clean_df <- clean_df[, !names(clean_df) %in% c(pre_scores, post_scores)]
  
  # Code comprehension (post)
  correct_answer_for_all_coding_gap <- "AO01"
  gap_cols <- c()
  for (q in c("POSCQ01", "POSCQ02", "POSCQ03")) {
    col <- paste0("post-coding-gap-", substr(q, nchar(q)-1, nchar(q)))
    clean_df[[col]] <- as.integer(df[[q]] == correct_answer_for_all_coding_gap)
    gap_cols <- c(gap_cols, col)
  }
  clean_df$`post-coding-gap-total` <- rowSums(clean_df[, gap_cols, drop = FALSE])
  
  # IMI
  answer_mapping <- setNames(1:6, paste0("AO0", 1:6))
  regular_items <- c("POSMI01[SQ001]", "POSMI01[SQ002]", "POSMI01[SQ005]", "POSMI01[SQ006]", "POSMI01[SQ007]")
  reverse_items <- c("POSMI01[SQ003]", "POSMI01[SQ004]")
  
  temp_cols <- c()
  for (item in regular_items) {
    temp_col <- paste0("temp_", item)
    clean_df[[temp_col]] <- answer_mapping[df[[item]]]
    temp_cols <- c(temp_cols, temp_col)
  }
  for (item in reverse_items) {
    temp_col <- paste0("temp_", item)
    clean_df[[temp_col]] <- 6 - answer_mapping[df[[item]]]
    temp_cols <- c(temp_cols, temp_col)
  }
  
  clean_df$IMI_average <- rowMeans(clean_df[, temp_cols, drop = FALSE], na.rm = TRUE)
  imi_alpha <- calculate_cronbach_alpha(clean_df, temp_cols)
  cat("IMI Cronbach's alpha:", imi_alpha, "\n")
  clean_df <- clean_df[, !names(clean_df) %in% temp_cols]
  
  # Artemis performance & duration (no filtering here; for reporting only)
  clean_df$exercise_score_artemis <- df$exercise_score_artemis
  clean_df$exercise_duration_seconds <- as.numeric(difftime(df$end_date_artemis, df$start_date_artemis, units = "secs"))
  
  # Exam 2
  if ("exam_2_score" %in% names(df)) {
    clean_df$exam_2_score <- df$exam_2_score
  }
  
  # Cognitive load
  icl_items <- c("POSCL01[SQ001]", "POSCL01[SQ002]")
  gcl_items <- c("POSCL01[SQ003]", "POSCL01[SQ004]")
  ecl_items <- c("POSCL01[SQ005]", "POSCL01[SQ006]", "POSCL01[SQ007]")
  all_cl_items <- c(icl_items, gcl_items, ecl_items)
  
  # Create temporary columns for cognitive load calculations
  temp_cl_df <- data.frame(row.names = rownames(df))
  for (item in all_cl_items) {
    temp_cl_df[[paste0("temp_", item)]] <- answer_mapping[df[[item]]]
  }
  
  clean_df$ICL_average <- rowMeans(temp_cl_df[, paste0("temp_", icl_items), drop = FALSE], na.rm = TRUE)
  clean_df$GCL_average <- rowMeans(temp_cl_df[, paste0("temp_", gcl_items), drop = FALSE], na.rm = TRUE)
  clean_df$ECL_average <- rowMeans(temp_cl_df[, paste0("temp_", ecl_items), drop = FALSE], na.rm = TRUE)
  clean_df$CL_average <- rowMeans(temp_cl_df[, paste0("temp_", all_cl_items), drop = FALSE], na.rm = TRUE)
  
  icl_cron <- calculate_cronbach_alpha(temp_cl_df, paste0("temp_", icl_items))
  gcl_cron <- calculate_cronbach_alpha(temp_cl_df, paste0("temp_", gcl_items))
  ecl_cron <- calculate_cronbach_alpha(temp_cl_df, paste0("temp_", ecl_items))
  cl_cron <- calculate_cronbach_alpha(temp_cl_df, paste0("temp_", all_cl_items))
  cat("ICL Cronbach's alpha:", icl_cron, "\n")
  cat("GCL Cronbach's alpha:", gcl_cron, "\n")
  cat("ECL Cronbach's alpha:", ecl_cron, "\n")
  cat("Overall CL Cronbach's alpha:", cl_cron, "\n")
  
  # POSPM02
  pm_mapping <- list(
    "reflection" = c("POSPM02[SQ004]"),
    "frustration" = c("POSPM02[SQ005]"),
    "involvement" = c("POSPM02[SQ006]")
  )
  for (category in names(pm_mapping)) {
    for (item in pm_mapping[[category]]) {
      clean_df[[category]] <- answer_mapping[df[[item]]]
    }
  }
  
  # POSPM01 (feedback)
  feedback_mapping <- list(
    "feedback_quality" = c("POSPM01[SQ001]"),
    "feedback_personal" = c("POSPM01[SQ002]"),
    "feedback_help" = c("POSPM01[SQ003]")
  )
  for (category in names(feedback_mapping)) {
    for (item in feedback_mapping[[category]]) {
      clean_df[[category]] <- answer_mapping[df[[item]]]
    }
  }
  
  # AI experience & perceptions (combined from IG/CG)
  iris_exp_value <- (answer_mapping[df$POSIG01] - 1)
  chat_exp_value <- (answer_mapping[df$POSCG01] - 1)
  clean_df$ai_experience <- pmax(iris_exp_value, chat_exp_value, na.rm = TRUE)
  
  iris_cmp_to_trad <- 6 - (answer_mapping[df$POSIG02] - 1)
  chat_cmp_to_trad <- 6 - (answer_mapping[df$POSCG02] - 1)
  clean_df$ai_cmp_to_traditional <- pmax(iris_cmp_to_trad, chat_cmp_to_trad, na.rm = TRUE)
  
  iris_easy <- answer_mapping[df$`POSIG03[SQ002]`]
  chat_easy <- (answer_mapping[df$`POSCG03[SQ002]`] - 1)
  clean_df$ai_easy_to_use <- pmax(iris_easy, chat_easy, na.rm = TRUE)
  
  iris_help_under <- answer_mapping[df$`POSIG03[SQ003]`]
  chat_help_under <- (answer_mapping[df$`POSCG03[SQ003]`] - 1)
  clean_df$ai_helped_understanding <- pmax(iris_help_under, chat_help_under, na.rm = TRUE)
  
  iris_fb_help <- answer_mapping[df$`POSIG03[SQ004]`]
  chat_fb_help <- (answer_mapping[df$`POSCG03[SQ004]`] - 1)
  clean_df$ai_feedback_helpful <- pmax(iris_fb_help, chat_fb_help, na.rm = TRUE)
  
  iris_understands <- answer_mapping[df$`POSIG04[SQ001]`]
  chat_understands <- answer_mapping[df$`POSCG04[SQ001]`]
  clean_df$ai_understands_user_queries <- pmax(iris_understands, chat_understands, na.rm = TRUE)
  
  iris_helps_ex <- answer_mapping[df$`POSIG04[SQ002]`]
  chat_helps_ex <- answer_mapping[df$`POSCG04[SQ002]`]
  clean_df$ai_helps_with_exercise_issues <- pmax(iris_helps_ex, chat_helps_ex, na.rm = TRUE)
  
  iris_improves <- answer_mapping[df$`POSIG04[SQ003]`]
  chat_improves <- answer_mapping[df$`POSCG04[SQ003]`]
  clean_df$ai_improved_my_concept_understanding <- pmax(iris_improves, chat_improves, na.rm = TRUE)
  
  iris_engaging <- answer_mapping[df$`POSIG04[SQ004]`]
  chat_engaging <- answer_mapping[df$`POSCG04[SQ004]`]
  clean_df$ai_makes_interaction_more_engaging <- pmax(iris_engaging, chat_engaging, na.rm = TRUE)
  
  iris_motivated <- answer_mapping[df$`POSIG04[SQ005]`]
  chat_motivated <- answer_mapping[df$`POSCG04[SQ005]`]
  clean_df$ai_feel_more_motivated <- pmax(iris_motivated, chat_motivated, na.rm = TRUE)
  
  # Demographics (for analysis/reporting)
  gender_mapping <- c("AO01" = "Male", "AO02" = "Female", "AO03" = "Diverse")
  prog_exp_mapping <- c("AO01" = "None", "AO02" = "Beginner", "AO03" = "Intermediate", "AO04" = "Advanced", "AO05" = "Expert")
  clean_df$gender <- gender_mapping[df$PREGQ04]
  clean_df$age <- as.numeric(str_extract(df$PREGQ05, "\\d+"))
  clean_df$programming_experience <- prog_exp_mapping[df$PREGQ03]
  
  return(clean_df)
}

main <- function() {
  input_path <- "./merged_data_pseudonymized.csv"
  df <- read_csv(input_path, show_col_types = FALSE)
  cat("Loaded sanitized dataset:", input_path, "with shape", nrow(df), "x", ncol(df), "\n")
  
  # Filtering (now includes demographic + duration filters)
  df_filtered <- run_filtering(df)
  
  # Build clean analytical dataset and persist (used by Rmd)
  clean_df <- build_clean_dataset(df_filtered)
  clean_out <- "cleaned_data.csv"
  write_csv(clean_df, clean_out)
  cat("Saved analysis dataset:", clean_out, "with shape", nrow(clean_df), "x", ncol(clean_df), "\n")
}

# Run the main function if script is executed directly
if (sys.nframe() == 0) {
  main()
}
