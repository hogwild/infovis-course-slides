# AI-supported programming education · Course data record

## Source and version

- Paper: Bassner, Lenk-Ostendorf, Beinstingel, Wasner & Krusche (2026), *Less stress, better scores, same learning: The dissociation of performance and learning in AI-supported programming education*. Computers and Education: Artificial Intelligence 10, 100537. https://doi.org/10.1016/j.caeai.2025.100537
- User-supplied PDF and original CSV: repository `reference/lecture8/` (read-only inputs).
- Fixed data record: https://doi.org/10.5281/zenodo.20285307 (Zenodo v3 record page). Paper and this dataset record each declare CC BY 4.0. Retained source metadata: `ai-programming-source/zenodo-record.json`.
- The original CSV is copied byte-for-byte. MD5: `5e77465a489bd77ab9e24a295a37144e`.
- Author scripts and questionnaire were copied from the locally available reproduction package. MD5 values match this Zenodo record. Full hashes are in `ai-programming-audit.json`.
- Original figures: extracted from PDF pp. 13–14 at 240 dpi. Complete Figure 3 and 4 include original captions. Crops retain the original axes, marks and significance annotations. Coordinates and source page numbers: `ai-programming-figure-sources.json`. Original figures are distinct from course redraws.

## Processing and actual validation scope

`prepare-ai-programming.py` is a Python standard-library translation of the author's core row filters and scoring. Run it from the lecture directory or use the copy in assets. It writes a separate analysis CSV, field dictionary, complete ordered exclusion log and audit. The author inputs remain unchanged.

It preserves the original filtering order, the explicit +1 hour submission timestamp adjustment, the author's last-valid-submission selection and missing-value behavior. In particular, a missing last-valid timestamp is not excluded by the earlier `last_valid > posttest_start` check; a missing final exercise duration is excluded at the end. Knowledge-item missingness propagates to totals, consistent with R rowSums without na.rm. No blanket complete-case filter is applied to all 76 columns. The actual retained core fields contain no missing values.

Raw: 452 rows × 76 columns; 452 unique pseudonyms. Raw group counts: No AI 148, Iris 150, ChatGPT 154. Retained: 275 (No AI 96, Iris 91, ChatGPT 88), after excluding 177 (39.2%). All visualizations use this same retained sample. Steps 14–16 are the authors' demographic choices, including excluding the Advanced experience code AO04 while retaining Expert AO05. They are not presented as universal cleaning rules.

Validated: core n, group n, exercise-score means, pre/post and gain means, frustration means, and code-comprehension means agree with the paper and source analysis report at their reported precision. This is not a rerun of the original R inferential environment, every psychometric scale, or every model. Significance statements refer to the original paper Tables 4–8, pp. 12–13. The knowledge time × group interaction is p = .773, not an equivalence test or each individual pairwise test.

## Figure encodings and added intervals

`observable-cells.json` is the single source of all 38 Observable cells. `render-ai-programming.mjs` exports the exact cells, specifications, eight SVG charts, copy guide, reading page and bootstrap output. The same cells supply the slide code blocks and HTML chart specifications. The final figure has two aligned rows without letter prefixes: exercise performance and reported frustration above knowledge gains and its pretest/posttest supplement. This follows the claim while keeping starting and ending scores next to the gain distributions. The compact figure reports group sizes in the slide footer and full caption; the standalone charts retain them in group headings.

- Exercise performance: three side-by-side horizontal bar charts for No AI, Iris and ChatGPT. The shared y-axis labels the nine observed exercise percentages at their numeric positions from 0 to 100; the missing 33.3% score leaves a gap. Small axis margins keep endpoint bars fully visible. Horizontal bar length encodes student counts on a shared 0–60 x-axis, and labeled dashed horizontal lines show group means. Group colors match the main knowledge-gain panel. Counts, not proportions, are shown; group sizes are labeled.
- Reported frustration: within-group proportions for each ordered response level, 1 (strongly disagree) to 5 (strongly agree). Item: “I was frustrated during the exercise.” Color encodes response level rather than condition; higher means more frustration. Labels are rounded proportions. Means, when reported, use the author's 1–5 numerical convention for an ordinal response.
- Knowledge gains: three side-by-side horizontal bar charts compare knowledge gains. Shared y positions cover every integer from −6 to +6; the observed gains span −3 to +6. Horizontal bar lengths show student counts on a shared 0–40 x-axis. Group colors match exercise performance. Dashed horizontal lines mark group means; numerical labels sit just above their right ends. Sample sizes appear below the group names in the standalone chart and in the caption for the composed figure. Small endpoint margins keep bars visible. These are counts, not proportions. This is the main learning panel; it does not retain starting scores. Mean confidence intervals remain in the notebook calculations and the reference table.
- The supplementary paired-score view keeps pretest and posttest scores on shared 0–6 axes, faceted by group. Aggregating group, pretest and posttest gives 92 paths: 33 paths / 96 students in No AI, 28 / 91 in Iris, and 31 / 88 in ChatGPT. All 275 students remain represented. A shared linear light-to-dark scale represents 1–16 students per path. Paths have constant width and full opacity; crossings do not blend into a darker count. Tooltips report both scores and the exact count. Counts are not normalized by group size.
- Standardized overview: (condition mean minus No AI mean) divided by the No AI sample SD for that outcome. Frustration direction is not reversed. This is not pooled Cohen's d.

Bootstrap: 10,000 resamples within each condition, fixed LCG seed 20260922. Sampling unit is the participant; pre/post pairing is preserved. Percentiles use linear interpolation at ranks (B−1)p. Supplemental contrasts subtract the No AI mean from the AI mean on each replicate. The No AI draws are shared across contrasts. Resulting 95% intervals are unadjusted classroom estimates, not the paper's original ANOVA or multiplicity-adjusted tests. They do not address selection bias or justify equivalence. Actual bounds are in `ai-programming-bootstrap.json`.

## Classroom use

- `ai-programming-data-preview.html`: literal CSV text plus a selected-field view of actual retained records and the full separate analysis table. PNG previews are browser screenshots of this page, not simulated data or a fabricated spreadsheet interface.
- `ai-programming-case.html`: research context, qualified claim, live chart with static fallback, interpretation, full caption, original figures and sources.
- `observable-notebook.html` / `.md`: complete copy guide. Add `ai-programming-analysis.csv` as a same-named Observable attachment. No online notebook was created or published.
- Essential material is local. Initial dependency loading in a new online Observable Notebook needs internet. The course HTML uses bundled local Vega, Vega-Lite and Vega-Embed (BSD-3-Clause).

The inference is limited to this short exercise, selected analysis sample and immediate measures. Neither non-significance nor overlapping intervals establish equal learning or any long-term effect.
