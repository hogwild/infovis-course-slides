library(ggplot2)
library(rstatix)
library(ggpubr)
library(tidyverse)
library(car)

## ---- variable_label_mapping --------------------------------------------
get_pretty_labels <- function(variable, group = NULL, time_variable = NULL, fill_variable = NULL) {
  # Define mapping for variable names to human-readable labels
  variable_labels <- list(
    "age" = "Age (years)",
    "frustration" = "Frustration Level",
    "IMI_average" = "Intrinsic Motivation",
    "exercise_score_artemis" = "Exercise Score (%)",
    "exercise_duration_minutes" = "Exercise Duration (minutes)",
    "post-coding-gap-total" = "Code Comprehension Score",
    "pre-know-total" = "Pre-Test Knowledge Score",
    "post-know-total" = "Post-Test Knowledge Score",
    "knowledge" = "Knowledge Score",
    "ICL_average" = "Intrinsic Cognitive Load",
    "GCL_average" = "Germane Cognitive Load", 
    "ECL_average" = "Extraneous Cognitive Load",
    "ai_experience" = "AI Experience Rating",
    "ai_easy_to_use" = "AI Ease of Use",
    "ai_cmp_to_traditional" = "AI vs Traditional Methods",
    "ai_feedback_helpful" = "AI Feedback Helpfulness",
    "ai_understands_user_queries" = "AI Understanding of User Queries",
    "ai_helps_with_exercise_issues" = "AI Help with Exercise Issues",
    "ai_improved_my_concept_understanding" = "AI Improved Concept Understanding",
    "ai_helped_understanding" = "AI Helped General Understanding"
  )
  
  # Define mapping for group names
  group_labels <- list(
    "experiment_group" = "Experimental Group",
    "programming_experience" = "Programming Experience",
    "gender" = "Gender",
    "time" = "Assessment Time"
  )
  
  # Get pretty labels
  y_label <- if(variable %in% names(variable_labels)) {
    variable_labels[[variable]]
  } else {
    variable
  }
  
  x_label <- if(!is.null(group) && group %in% names(group_labels)) {
    group_labels[[group]]
  } else if(!is.null(time_variable) && time_variable %in% names(group_labels)) {
    group_labels[[time_variable]]
  } else {
    if(!is.null(group)) group else time_variable
  }
  
  fill_label <- if(!is.null(fill_variable) && fill_variable %in% names(group_labels)) {
    group_labels[[fill_variable]]
  } else {
    fill_variable
  }
  
  # Generate context-aware titles
  if (!is.null(time_variable)) {
    # Repeated measures case
    if (variable == "knowledge") {
      title <- "Knowledge Scores Over Time"
    } else {
      title <- paste(y_label, "Over Time")
    }
  } else {
    # Standard case - create more specific titles based on variable
    title <- switch(variable,
      "age" = "Age Distribution",
      "frustration" = "Frustration Levels",
      "IMI_average" = "Intrinsic Motivation",
      "exercise_score_artemis" = "Exercise Performance",
      "exercise_duration_minutes" = "Time Spent on Exercises",
      "post-coding-gap-total" = "Code Comprehension Performance",
      "ICL_average" = "Intrinsic Cognitive Load",
      "GCL_average" = "Germane Cognitive Load",
      "ECL_average" = "Extraneous Cognitive Load",
      "ai_experience" = "AI Experience Rating",
      "ai_easy_to_use" = "AI Ease of Use",
      "ai_cmp_to_traditional" = "AI vs Traditional Methods",
      "ai_feedback_helpful" = "AI Feedback Helpfulness",
      "ai_understands_user_queries" = "AI Understanding of User Queries",
      "ai_helps_with_exercise_issues" = "AI Help with Exercise Issues",
      "ai_improved_my_concept_understanding" = "AI Improved Concept Understanding",
      "ai_helped_understanding" = "AI Helped General Understanding",
      paste(y_label, "by", x_label)  # fallback
    )
  }
  
  return(list(
    y_label = y_label,
    x_label = x_label,
    fill_label = fill_label,
    title = title
  ))
}

## ---- hyp1_short_term_learning_wrapper --------------------------------------------
perform_short_term_learning_analysis <- function(data) {
  # Define column names to avoid NSE issues
  pre_know_col <- "pre-know-total"
  post_know_col <- "post-know-total"
  pseudonym_col <- "pseudonym"
  experiment_group_col <- "experiment_group"
  
  # Reshape data to long format for repeated measures ANOVA
  data_long <- tidyr::gather(
    data = data,
    key = "time", 
    value = "knowledge", 
    !!pre_know_col, !!post_know_col
  )
  
  # Fix the order of time levels (pre-test should come before post-test)
  data_long$time <- factor(data_long$time, levels = c("pre-know-total", "post-know-total"))
  
  # Calculate sample size for ANOVA
  # Note: This counts subjects with complete data for both time points.
  knowledge_col <- "knowledge"  # Define knowledge column name
  n_obs_anova <- data_long %>% 
    dplyr::filter(!is.na(!!rlang::sym(knowledge_col))) %>% 
    dplyr::group_by(!!rlang::sym(pseudonym_col)) %>% 
    dplyr::filter(dplyr::n() == 2) %>% 
    dplyr::ungroup() %>% 
    dplyr::distinct(!!rlang::sym(pseudonym_col)) %>% 
    nrow()
  
  # Perform repeated measures ANOVA
  anova_test <- rstatix::anova_test(
    data = data_long, 
    dv = knowledge_col, 
    wid = pseudonym_col, 
    within = "time", 
    between = experiment_group_col
  )
  
  # Get ANOVA table
  anova_table <- rstatix::get_anova_table(anova_test)
  
  # Calculate sample size for pairwise t-test
  # Note: This counts subjects with complete data for the post-test.
  n_obs_pwc <- data %>% 
    dplyr::filter(!is.na(!!rlang::sym(post_know_col))) %>% 
    nrow()
  
  # Post-hoc tests
  pwc <- rstatix::pairwise_t_test(
    data = data,
    formula = as.formula(paste0("`", post_know_col, "` ~ `", experiment_group_col, "`")),
    p.adjust.method = "bonferroni"
  )
  
  # Calculate descriptive statistics by group and time
  descriptive_stats <- data_long %>%
    dplyr::group_by(!!rlang::sym(experiment_group_col), time) %>%
    dplyr::summarise(
      n = sum(!is.na(!!rlang::sym(knowledge_col))),
      mean = mean(!!rlang::sym(knowledge_col), na.rm = TRUE),
      sd = sd(!!rlang::sym(knowledge_col), na.rm = TRUE),
      .groups = "drop"
    )
  
  # Create visualization using the shared plot function
  bxp <- create_plot(
    data = data_long,
    variable = knowledge_col,
    group = NULL,  # Not used in repeated measures case
    time_variable = "time",
    fill_variable = experiment_group_col
  )
  
  # Return a list with all results
  return(list(
    anova_table = anova_table,
    n_obs_anova = n_obs_anova,
    pwc = pwc,
    n_obs_pwc = n_obs_pwc,
    descriptive_stats = descriptive_stats,
    plot = bxp
  ))
}

## ---- shared_plot_function --------------------------------------------
create_plot <- function(data, variable, group, test_type = "t.test", pvalue_data = NULL, 
                       time_variable = NULL, fill_variable = NULL, plot_type = "box") {
  
  # Get pretty labels for this plot
  labels <- get_pretty_labels(variable, group, time_variable, fill_variable)
  
  # Create custom x-axis labels for experimental groups
  create_x_labels <- function(data, group_var) {
    if (group_var == "experiment_group") {
      return(scale_x_discrete(labels = c("CHATGPT" = "ChatGPT", "IRIS" = "IRIS", "NOAI" = "No AI")))
    } else if (group_var == "time") {
      return(scale_x_discrete(labels = c("pre-know-total" = "T1", "post-know-total" = "T2")))
    } else {
      return(NULL)
    }
  }
  
  # Create custom fill labels for experimental groups
  create_fill_labels <- function(data, fill_var) {
    if (fill_var == "experiment_group") {
      return(scale_fill_brewer(name = "Experimental Group", 
                              palette = "Set2",
                              labels = c("CHATGPT" = "ChatGPT", "IRIS" = "IRIS", "NOAI" = "No AI")))
    } else {
      return(scale_fill_brewer(palette = "Set2"))
    }
  }
  
  # Handle repeated measures ANOVA case (with time variable)
  if (!is.null(time_variable)) {
    # For repeated measures, we use the time as x and fill by group
    if (plot_type == "violin") {
      # Calculate data range to constrain violin plot
      data_min <- min(data[[variable]], na.rm = TRUE)
      data_max <- max(data[[variable]], na.rm = TRUE)
      
      p <- ggplot(data, aes(x = .data[[time_variable]], y = .data[[variable]], fill = .data[[fill_variable]])) +
        geom_violin(trim = TRUE, alpha = 0.7, scale = "width") +
        geom_boxplot(width = 0.1, alpha = 0.8, outlier.shape = NA) +
        stat_summary(fun = mean, geom = "point", shape = 23, size = 3, fill = "white") + # Add mean as a diamond
        create_fill_labels(data, fill_variable) +
        coord_cartesian(ylim = c(max(0, data_min - 5), data_max + (data_max * 0.3))) + # Allow more space for significance brackets
        labs(
          title = labels$title,
          y = labels$y_label,
          x = labels$x_label,
          fill = labels$fill_label
        ) +
        theme_minimal() +
        theme(
          plot.title = element_text(size = 16, face = "bold", hjust = 0.5),
          axis.title = element_text(size = 14),
          axis.text = element_text(size = 12),
          legend.title = element_text(size = 13),
          legend.text = element_text(size = 12)
        )
      
      # Add custom x-axis labels if applicable
      x_scale <- create_x_labels(data, time_variable)
      if (!is.null(x_scale)) {
        p <- p + x_scale
      }
      
    } else {
      p <- ggplot(data, aes(x = .data[[time_variable]], y = .data[[variable]], fill = .data[[fill_variable]])) +
        geom_boxplot() +
        stat_summary(fun = mean, geom = "point", shape = 23, size = 3, fill = "white") + # Add mean as a diamond
        create_fill_labels(data, fill_variable) +
        labs(
          title = labels$title,
          y = labels$y_label,
          x = labels$x_label,
          fill = labels$fill_label
        ) +
        theme_minimal() +
        theme(
          plot.title = element_text(size = 16, face = "bold", hjust = 0.5),
          axis.title = element_text(size = 14),
          axis.text = element_text(size = 12),
          legend.title = element_text(size = 13),
          legend.text = element_text(size = 12),
          legend.position = "bottom",
          legend.direction = "horizontal"
        )
      
      # Add custom x-axis labels if applicable
      x_scale <- create_x_labels(data, time_variable)
      if (!is.null(x_scale)) {
        p <- p + x_scale
      }
    }
    
    return(p)
  }
  
  # Standard case (t-test or one-way ANOVA)
  # Calculate y-position for p-value labels, handling potential NA issues
  y_pos <- if(all(is.na(data[[variable]]))) 0 else max(data[[variable]], na.rm = TRUE)
  
  # Build the base plot with consistent styling
  if (plot_type == "violin") {
    # Calculate data range to constrain violin plot
    data_min <- min(data[[variable]], na.rm = TRUE)
    data_max <- max(data[[variable]], na.rm = TRUE)
    
    p <- ggplot(data, aes(x = .data[[group]], y = .data[[variable]], fill = .data[[group]])) +
      geom_violin(trim = TRUE, alpha = 0.7, scale = "width") +
      geom_boxplot(width = 0.1, alpha = 0.8, outlier.shape = NA) +
      stat_summary(fun = mean, geom = "point", shape = 23, size = 3, fill = "white") + # Add mean as a diamond
      scale_fill_brewer(palette = "Set2") +
      coord_cartesian(ylim = c(max(0, data_min - 5), data_max + (data_max * 0.3))) + # Allow more space for significance brackets
      labs(
        title = labels$title,
        y = labels$y_label,
        x = labels$x_label
      ) +
      theme_minimal() +
      theme(
        plot.title = element_text(size = 16, face = "bold", hjust = 0.5),
        axis.title = element_text(size = 14),
        axis.text = element_text(size = 12),
        legend.position = "none"  # Remove legend for single group violin plots
      )
  } else {
    p <- ggplot(data, aes(x = .data[[group]], y = .data[[variable]], fill = .data[[group]])) +
      geom_boxplot() +
      stat_boxplot(geom = "errorbar", width = 0.25) + # Add whiskers with caps
      stat_summary(fun = mean, geom = "point", shape = 23, size = 3, fill = "white") + # Add mean as a diamond
      scale_fill_brewer(palette = "Set2") +
      labs(
        title = labels$title,
        y = labels$y_label,
        x = labels$x_label
      ) +
      theme_minimal() +
      theme(
        plot.title = element_text(size = 16, face = "bold", hjust = 0.5),
        axis.title = element_text(size = 14),
        axis.text = element_text(size = 12),
        legend.position = "none"  # Remove legend for single group box plots
      )
  }
  
  # Add custom x-axis labels if applicable
  x_scale <- create_x_labels(data, group)
  if (!is.null(x_scale)) {
    p <- p + x_scale
  }
  
  # Add appropriate p-value annotations based on test type
  if (test_type == "t.test") {
    # For t-tests, create a manual p-value annotation with brackets and stars
    # First, get the p-value from a t-test
    t_test_result <- rstatix::t_test(data, as.formula(paste0("`", variable, "` ~ `", group, "`")))
    
    # Create a data frame for stat_pvalue_manual in the same format as Tukey results
    group_levels <- unique(data[[group]])
    if (length(group_levels) == 2) {
      # Get the p-value
      p_value <- t_test_result$p[1]
      
      # Create custom significance notation (ns, *, **, ***) without showing p-value
      signif_notation <- if(p_value > 0.05) {
        "ns"
      } else if(p_value <= 0.05 && p_value > 0.01) {
        "*"
      } else if(p_value <= 0.01 && p_value > 0.001) {
        "**"
      } else {
        "***"
      }
      
      pvalue_df <- data.frame(
        group1 = group_levels[1],
        group2 = group_levels[2],
        p.adj = p_value,
        p.adj.signif = signif_notation
      )
      
      # Add the bracket with significance stars
      p <- p + stat_pvalue_manual(
        pvalue_df, label = "p.adj.signif", y.position = y_pos * 1.05,
        step.increase = 0.1, tip.length = 0.01, hide.ns = FALSE
      )
    } else {
      # Fallback to simple p-value display if not exactly 2 groups
      p <- p + stat_compare_means(method = "t.test", label.y = y_pos * 1.1)
    }
  } else if (test_type == "anova" && !is.null(pvalue_data)) {
    # For ANOVA, use the provided pvalue_data (Tukey results)
    p <- p + stat_pvalue_manual(
      pvalue_data, label = "p.adj.signif", y.position = y_pos * 1.05,
      step.increase = 0.1, tip.length = 0.01, hide.ns = FALSE
    )
  }
  
  return(p)
}

## ---- t_test_wrapper_function --------------------------------------------
perform_t_test_analysis <- function(data, variable, group) {
  # Construct the formula safely to handle special characters
  formula <- as.formula(paste0("`", variable, "` ~ `", group, "`"))
  
  # Calculate sample size for t-test
  # Note: This counts subjects with non-NA values for the variable of interest
  n_obs_ttest <- data %>% 
    dplyr::filter(!is.na(!!rlang::sym(variable))) %>% 
    nrow()
  
  # Perform T-test
  ttest_result <- t_test(data, formula)
  
  # Calculate Cohen's d for effect size
  cohens_d_result <- cohens_d(data, formula)
  
  # Calculate descriptive statistics by group
  descriptive_stats <- data %>%
    dplyr::group_by(!!rlang::sym(group)) %>%
    dplyr::summarise(
      n = sum(!is.na(!!rlang::sym(variable))),
      mean = mean(!!rlang::sym(variable), na.rm = TRUE),
      sd = sd(!!rlang::sym(variable), na.rm = TRUE),
      .groups = "drop"
    )
  
  # Create the plot using the shared function
  p_boxplot <- create_plot(data, variable, group, test_type = "t.test")
  
  # Return a list with all results
  return(list(
    ttest_result = ttest_result,
    cohens_d = cohens_d_result,
    n_obs_ttest = n_obs_ttest,
    descriptive_stats = descriptive_stats,
    plot = p_boxplot
  ))
}

## ---- posthoc_test_selection_function --------------------------------------------
select_posthoc_test <- function(data, variable, group, formula, alpha = 0.05) {
  # Check sample sizes by group
  group_sizes <- data %>%
    dplyr::group_by(!!rlang::sym(group)) %>%
    dplyr::summarise(n = dplyr::n(), .groups = 'drop')
  
  min_n <- min(group_sizes$n)
  max_n <- max(group_sizes$n)
  n_groups <- nrow(group_sizes)
  
  # Check for balanced design (ratio <= 1.5 is considered reasonably balanced)
  balance_ratio <- max_n / min_n
  is_balanced <- balance_ratio <= 1.5
  
  # Test homogeneity of variance using Levene's test
  levene_test <- car::leveneTest(data[[variable]], data[[group]])
  homogeneous_variance <- levene_test$`Pr(>F)`[1] > alpha
  
  # Decision logic for post-hoc test selection
  reasoning <- ""
  test_type <- ""
  
  if (!homogeneous_variance) {
    # Unequal variances - use Games-Howell
    test_type <- "games_howell"
    reasoning <- paste0(
      "Games-Howell test selected due to violation of homogeneity of variance assumption ",
      "(Levene's test: p = ", round(levene_test$`Pr(>F)`[1], 4), " < ", alpha, "). ",
      "Games-Howell does not assume equal variances and uses Welch's t-test for pairwise comparisons."
    )
  } else if (!is_balanced && min_n < 10) {
    # Unbalanced design with small samples - use Bonferroni
    test_type <- "bonferroni"
    reasoning <- paste0(
      "Bonferroni correction selected due to unbalanced design with small sample sizes ",
      "(balance ratio = ", round(balance_ratio, 2), ", min n = ", min_n, "). ",
      "Bonferroni provides conservative control of Type I error in unbalanced designs."
    )
  } else {
    # Balanced design with equal variances - use Tukey HSD
    test_type <- "tukey"
    reasoning <- paste0(
      "Tukey HSD selected as assumptions are met: homogeneous variances ",
      "(Levene's test: p = ", round(levene_test$`Pr(>F)`[1], 4), " > ", alpha, ") ",
      "and reasonably balanced design (ratio = ", round(balance_ratio, 2), "). ",
      "Tukey HSD provides optimal power while controlling familywise error rate."
    )
  }
  
  return(list(
    test_type = test_type,
    reasoning = reasoning,
    homogeneous_variance = homogeneous_variance,
    balance_ratio = balance_ratio,
    min_n = min_n,
    n_groups = n_groups
  ))
}

## ---- anova_wrapper_function --------------------------------------------
perform_ANOVA_analysis <- function(data, variable, group, use_welch = "auto", plot_type = "box") {
  # Construct the formula safely to handle special characters
  formula <- as.formula(paste0("`", variable, "` ~ `", group, "`"))
  
  # Calculate sample size for ANOVA
  # Note: This counts subjects with non-NA values for the variable of interest
  n_obs_anova <- data %>% 
    dplyr::filter(!is.na(!!rlang::sym(variable))) %>% 
    nrow()
  
  # Clean data for analysis
  clean_data <- data %>% 
    dplyr::filter(!is.na(!!rlang::sym(variable)) & !is.na(!!rlang::sym(group)))
  
  # Calculate descriptive statistics (mean and SD) by group
  descriptive_stats <- clean_data %>%
    dplyr::group_by(!!rlang::sym(group)) %>%
    dplyr::summarise(
      n = dplyr::n(),
      mean = round(mean(!!rlang::sym(variable), na.rm = TRUE), 3),
      sd = round(sd(!!rlang::sym(variable), na.rm = TRUE), 3),
      .groups = 'drop'
    )
  
  # Determine whether to use Welch's ANOVA based on variance homogeneity
  if (use_welch == "auto") {
    # Test homogeneity of variance using Levene's test
    levene_test <- car::leveneTest(clean_data[[variable]], clean_data[[group]])
    homogeneous_variance <- levene_test$`Pr(>F)`[1] > 0.05
    use_welch_final <- !homogeneous_variance
    
    welch_reasoning <- if (use_welch_final) {
      paste0("Welch's ANOVA selected automatically due to violation of homogeneity of variance ",
             "(Levene's test: p = ", round(levene_test$`Pr(>F)`[1], 4), " < 0.05). ",
             "Welch's ANOVA does not assume equal variances.")
    } else {
      paste0("Regular ANOVA selected automatically as homogeneity of variance assumption is met ",
             "(Levene's test: p = ", round(levene_test$`Pr(>F)`[1], 4), " > 0.05).")
    }
  } else {
    use_welch_final <- as.logical(use_welch)
    welch_reasoning <- if (use_welch_final) {
      "Welch's ANOVA selected manually by user."
    } else {
      "Regular ANOVA selected manually by user."
    }
  }
  
  # Perform ANOVA (regular or Welch's)
  if (use_welch_final) {
    anova_result <- welch_anova_test(clean_data, formula)
    anova_type <- "Welch's ANOVA"
    
    # Calculate effect size for Welch's ANOVA manually
    # Use eta-squared calculation based on F-statistic and degrees of freedom
    f_stat <- anova_result$statistic
    df_num <- anova_result$DFn
    df_den <- anova_result$DFd
    
    # Calculate generalized eta-squared (ges) for Welch's ANOVA
    # ges = (df_num * f_stat) / (df_num * f_stat + df_den)
    ges <- (df_num * f_stat) / (df_num * f_stat + df_den)
    
    # Add effect size to the ANOVA table
    anova_table <- as.data.frame(anova_result)
    anova_table$ges <- round(ges, 3)
    
  } else {
    anova_result <- anova_test(clean_data, formula)
    anova_type <- "One-Way ANOVA"
    anova_table <- as.data.frame(anova_result)
    # Regular ANOVA already includes ges in rstatix output
  }
  
  # Determine appropriate post-hoc test based on data characteristics
  # Note: Post-hoc test selection is independent of ANOVA type (regular vs Welch's)
  posthoc_info <- select_posthoc_test(clean_data, variable, group, formula)
  
  # Perform the selected post-hoc test
  if (posthoc_info$test_type == "tukey") {
    posthoc_result <- tukey_hsd(clean_data, formula)
  } else if (posthoc_info$test_type == "games_howell") {
    posthoc_result <- games_howell_test(clean_data, formula)
  } else if (posthoc_info$test_type == "bonferroni") {
    posthoc_result <- pairwise_t_test(
      clean_data, 
      formula, 
      p.adjust.method = "bonferroni",
      pool.sd = FALSE
    )
  } else {
    # Default fallback
    posthoc_result <- tukey_hsd(clean_data, formula)
  }
  
  # Calculate Cohen's d for pairwise comparisons
  cohens_d_results <- rstatix::cohens_d(clean_data, formula)
  
  # Invert the signs of Cohen's d to match the direction of estimates
  cohens_d_results$effsize <- -cohens_d_results$effsize
  
  # Create the plot using the shared function
  p_boxplot <- create_plot(clean_data, variable, group, test_type = "anova", pvalue_data = posthoc_result, plot_type = plot_type)
  
  # Return a list with all results
  return(list(
    anova_table = anova_table,
    anova_type = anova_type,
    welch_reasoning = welch_reasoning,
    n_obs_anova = n_obs_anova,
    descriptive_stats = descriptive_stats,
    posthoc_result = posthoc_result,
    posthoc_test_used = posthoc_info$test_type,
    posthoc_reasoning = posthoc_info$reasoning,
    cohens_d = cohens_d_results,
    plot = p_boxplot
  ))
}

