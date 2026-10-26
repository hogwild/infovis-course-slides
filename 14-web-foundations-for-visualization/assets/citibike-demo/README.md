# Citi Bike teaching-data provenance

This directory now retains only data, audit records, and `prepare.py` needed to reproduce the verified teaching figures. The superseded interactive demo and its runtime files were removed on 2026-10-26 because the final Lecture 14 deck does not use them.

Primary input: `reference/citibike_storytelling_example/citibike_april.csv` (9,268 Jersey City trips, April 2020). Official publisher: https://citibikenyc.com/system-data . Exact hashes and cross-checks are in `data/audit.json`; daily counts are in `data/daily.json` and aggregate statistics in `data/summary.json`. Dates preserve the original civil-date prefixes; counts describe trips, not unique people or causal lockdown effects.

Run `python3 slides/14-web-foundations-for-visualization/assets/citibike-demo/prepare.py` from the repository root to reproduce the data and figures. The script also regenerates legacy demo outputs; these outputs are not required by the final deck and should not be included in its assets unless used again.
