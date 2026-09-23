# Reproducibility Package — Bassner et al. (2025)

Reproducibility package accompanying:

> Bassner, P., Lenk-Ostendorf, B., Beinstingel, R., Wasner, T., & Krusche, S. (2025). *Less stress, better scores, same learning: The dissociation of performance and learning in AI-supported programming education.*

This package contains the pseudonymized study data, the data-preparation pipeline, and the analysis report needed to reproduce the published descriptive statistics, group comparisons, and figures.

## Contents

| File | Purpose |
|---|---|
| `1_dataPrep.R` | Data-preparation pipeline. Reads `merged_data_pseudonymized.csv`, applies all exclusion criteria, builds the analytical dataset, and writes `cleaned_data.csv`. |
| `2_mainAnalysis.Rmd` | R Markdown report. Consumes `cleaned_data.csv`, produces tables, figures, and inferential statistics as an HTML document. |
| `3_wrappers.R` | Plotting and statistical wrapper functions sourced by the Rmd. |
| `merged_data_pseudonymized.csv` | Pseudonymized raw dataset (one row per participant; pretest, exercise, posttest, demographics). |
| `cleaned_data.csv` | Analytical dataset produced by `1_dataPrep.R` (already shipped; regenerated when the script is rerun). |
| `survey_questions.json` | Full pretest/posttest item wordings and response options. |
| `POSCQ*.png`, `POSCQ-Code_with_Gaps.png` | Screenshots of the posttest code-comprehension items. |
| `Divide_And_Conquer_Exercise.zip` | The programming exercise materials used during the intervention. |

---

## Step-by-step: Reproduce the analysis from a clean machine

Follow these steps **exactly in order**. Each step lists what to do, what command to type, and what you should see if it worked. If anything looks different from what is described, see the **Troubleshooting** section at the bottom of this document.

### Step 1 — Install R

R is the language the analysis is written in. You need R version 4.2 or newer.

1. Go to **<https://cloud.r-project.org/>**.
2. Download the installer for your operating system:
   - **macOS:** click *"Download R for macOS"*, then download the `.pkg` file for your chip (Apple Silicon = `arm64`, Intel = `x86_64`). Open the `.pkg` and click through the installer with all defaults.
   - **Windows:** click *"Download R for Windows"* → *"base"* → *"Download R-x.y.z for Windows"*. Run the `.exe` and accept all defaults.
   - **Linux (Ubuntu/Debian):** run `sudo apt update && sudo apt install -y r-base`. On older Ubuntu/Debian releases this can install an R version < 4.2; if so, follow the official CRAN instructions at <https://cran.r-project.org/bin/linux/ubuntu/> (or `.../debian/`) to add the CRAN repository and install a current release.
3. Verify the install. Open a **new** terminal window (macOS Terminal / Windows PowerShell / Linux shell) and type:
   ```bash
   R --version
   ```
   Expected output (first line): `R version 4.x.x ...` — any version ≥ 4.2 is fine.

### Step 2 — Install Pandoc (and optionally RStudio)

To render the analysis report to HTML you need a tool called **Pandoc**. The Pandoc copy bundled with RStudio is visible to RStudio itself but **not** to `Rscript` running from a normal terminal — so for the terminal workflow (Steps 6–8 below) you must install Pandoc as a system tool. If you plan to use RStudio's GUI instead (see "Alternative: doing it all in RStudio" further down), you can skip this and use RStudio's *Knit* button.

Install Pandoc:

- **macOS:** `brew install pandoc` (requires Homebrew: <https://brew.sh>).
- **Windows:** download the installer from <https://pandoc.org/installing.html> and run it with defaults.
- **Linux (Ubuntu/Debian):** `sudo apt install -y pandoc`.

Verify (open a **new** terminal so PATH updates take effect):
```bash
pandoc --version
```
You should see `pandoc x.y.z` printed.

Optional — also install **RStudio** if you want a friendly GUI: <https://posit.co/download/rstudio-desktop/>. RStudio is only required for the alternative GUI workflow.

### Step 3 — Get this package onto your machine

If you received this folder as a ZIP, unzip it to a location you can find easily, e.g. `~/Downloads/pack/` on macOS/Linux or `C:\Users\<you>\Downloads\pack\` on Windows.

### Step 4 — Open a terminal **inside** this folder

All subsequent commands must run from inside this `pack/` folder.

- **macOS:** open **Terminal** (Cmd+Space → type "Terminal" → Enter), then type `cd ` (with a trailing space), drag the `pack/` folder from Finder onto the Terminal window, and press Enter.
- **Windows:** open **File Explorer**, navigate to the `pack/` folder, click the address bar, type `powershell` and press Enter.
- **Linux:** right-click the folder in your file manager and choose *"Open in Terminal"*, or `cd /path/to/pack`.

Verify you are in the right place:
```bash
ls
```
You should see `1_dataPrep.R`, `2_mainAnalysis.Rmd`, `3_wrappers.R`, `merged_data_pseudonymized.csv`, and several `POSCQ*.png` files. **If you don't see these, you are in the wrong folder — `cd` to the right one before continuing.**

### Step 5 — Install the required R packages (one-time, ~5–10 min)

R packages are libraries the analysis depends on. Install them all in one command. Type:

```bash
Rscript -e 'install.packages(c("car","dplyr","ggplot2","ggpubr","jsonlite","lubridate","psych","readr","rmarkdown","rstatix","stringr","tidyverse"), repos="https://cloud.r-project.org")'
```

On the very first install you may be asked to choose a CRAN mirror — `cloud.r-project.org` (passed via `repos=`) avoids that. Compilation may take a few minutes; many "downloaded ... bytes" lines is normal.

Verify the install succeeded:
```bash
Rscript -e 'sapply(c("car","dplyr","ggplot2","ggpubr","jsonlite","lubridate","psych","readr","rmarkdown","rstatix","stringr","tidyverse"), requireNamespace, quietly=TRUE)'
```
Every package should print `TRUE`. If any prints `FALSE`, re-run the install command above.

### Step 6 — Regenerate the analytical dataset

Still inside the `pack/` folder, type:

```bash
Rscript 1_dataPrep.R
```

This reads `merged_data_pseudonymized.csv`, applies the exclusion pipeline, and writes `cleaned_data.csv`. It takes about 10–20 seconds. The console will print many lines — package-loading messages from R first, then progress from the script. That is normal.

The first data-prep progress line and the final line you should see are:

```
Loaded sanitized dataset: ./merged_data_pseudonymized.csv with shape 452 x 76
...
Saved analysis dataset: cleaned_data.csv with shape 275 x 37
```

The shipped `cleaned_data.csv` is overwritten by a freshly generated equivalent. **If the final shape is not `275 x 37`, something is wrong** — check the Troubleshooting section.

### Step 7 — Render the main analysis report

Type:

```bash
Rscript -e 'rmarkdown::render("2_mainAnalysis.Rmd")'
```

This takes about 30–60 seconds. The console will print a lot of pandoc/knitr messages; warnings about ties, ggplot stat methods, etc. are expected and can be ignored.

When it finishes you will have a new file in this folder: **`2_mainAnalysis.html`**.

### Step 8 — View the report

Open `2_mainAnalysis.html` by double-clicking it in your file manager — it opens in your default web browser. This is the full analysis report with all tables, figures, and statistical tests from the paper.

You are done.

---

## Alternative: doing it all in RStudio (GUI workflow)

If you prefer not to use a terminal, RStudio's bundled Pandoc is sufficient (you do **not** need to install Pandoc separately for this path):

1. Launch **RStudio**.
2. *File → Open File…* on `1_dataPrep.R`, then *Session → Set Working Directory → To Source File Location* so RStudio runs from inside the `pack/` folder.
3. In the **Console** pane (not your system terminal), paste and run:
   ```r
   install.packages(c(
     "car","dplyr","ggplot2","ggpubr","jsonlite","lubridate",
     "psych","readr","rmarkdown","rstatix","stringr","tidyverse"
   ), repos = "https://cloud.r-project.org")
   ```
4. In the same Console, run:
   ```r
   source("1_dataPrep.R"); main()
   ```
   `1_dataPrep.R` only auto-runs its `main()` when launched non-interactively via `Rscript`, so inside RStudio you must call `main()` yourself. This writes `cleaned_data.csv`.
5. Open `2_mainAnalysis.Rmd`, click **Knit** (top of the editor). RStudio uses its bundled Pandoc automatically. The HTML report opens when knitting finishes.

---

## Exclusion defaults

`1_dataPrep.R` applies several non-obvious defaults beyond the standard response-validity filters (set them to `NULL` at the top of the script to disable):

- `FILTER_GENDER` — keeps only `Male` and `Female` (drops `Diverse`).
- `AGE_RANGE` — keeps participants with age in `[0, 33]`.
- `FILTER_EXPERIENCE` — keeps `None`, `Beginner`, `Intermediate`, `Expert` (drops `Advanced`).

These were the defaults used for the published analysis.

---

## Troubleshooting

**`Rscript: command not found`** — R is not installed or not on your `PATH`. Redo Step 1. On macOS, restart your terminal after installing R. On Windows, the CRAN installer often does **not** add R to PATH automatically: open *System Properties → Environment Variables → Path → Edit → New* and add `C:\Program Files\R\R-x.y.z\bin\` (substitute your installed version), then restart PowerShell. Alternatively, use the full path: `& "C:\Program Files\R\R-x.y.z\bin\Rscript.exe" 1_dataPrep.R`.

**`Error in library(...): there is no package called 'xxx'`** — a required R package was not installed. Re-run Step 5. If only one package failed, you can install it alone: `Rscript -e 'install.packages("xxx", repos="https://cloud.r-project.org")'`.

**`pandoc version X.X.X or higher is required and was not found` (during Step 7)** — Pandoc is not on your shell `PATH`. RStudio's bundled Pandoc does not count for terminal `Rscript`; install Pandoc as a system tool (Step 2) and reopen your terminal. Alternatively, switch to the RStudio GUI workflow further down, which can use the bundled Pandoc.

**`Error: cannot open file 'merged_data_pseudonymized.csv'`** — you are not inside the `pack/` folder. Run `pwd` (macOS/Linux) or `cd` alone (Windows) to see your current directory, then `cd` into `pack/`.

**Final shape is not `275 x 37`** — you likely modified `1_dataPrep.R` or are running it on a different input file. Re-extract the package and try again.

**Compilation errors when installing packages on macOS / Linux** — install Xcode Command Line Tools (`xcode-select --install` on macOS) or build tools (`sudo apt install -y build-essential gfortran` on Debian/Ubuntu), then re-run Step 5.

**Compilation errors on Windows** — install **Rtools** (matching your R version) from <https://cran.r-project.org/bin/windows/Rtools/>, then re-run Step 5.

---

## Notes

- All paths in the scripts are relative — run them from inside `pack/` so the relative `./merged_data_pseudonymized.csv` and `cleaned_data.csv` references resolve.
- The pseudonymized dataset has all directly identifying information replaced with stable hashes; IRIS message contents have been removed and replaced by a `has_iris_messages` flag.
- Filter ordering is fixed in `1_dataPrep.R::run_filtering()`; do not reorder unless you intend to deviate from the published pipeline.
- Running on the same R/package versions reproduces the same analytical dataset (452 raw rows → 275 retained). Minor numerical differences in downstream report figures are possible across major R versions or substantially newer package releases.
