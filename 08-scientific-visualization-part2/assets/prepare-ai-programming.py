"""Reproduce the author's core sample and scores; Python 3, standard library only.

Run from any directory. Original inputs are read-only. This translates the row
filters in ai-programming-source/1_dataPrep.R, including its NA behavior and
one-hour submission timestamp adjustment. It does not rerun the R models.
"""
from pathlib import Path
import csv
import datetime as dt
import hashlib
import json
import re
import statistics as st

ROOT = Path(__file__).resolve().parent
A = ROOT if ROOT.name == "assets" else ROOT / "assets"
SOURCE = A / "ai-programming-source"
RAW = A / "merged_data_pseudonymized.csv"
GROUPS = {"NOAI": "No AI", "IRIS": "Iris", "CHATGPT": "ChatGPT"}
KEY = ["AO01", "AO02", "AO02", "AO04", "AO01", "AO01"]


def date(value):
    if not value or value in ("NA", "null"):
        return None
    return dt.datetime.fromisoformat(value.replace("Z", "+00:00")).replace(tzinfo=None)


def missing(value):
    return value is None or value in ("", "NA")


def run():
    assert hashlib.md5(RAW.read_bytes()).hexdigest() == "5e77465a489bd77ab9e24a295a37144e"
    with RAW.open(newline="") as f:
        raw = list(csv.DictReader(f))
    assert len(raw) == 452 and len(raw[0]) == 76
    assert len({r["pseudonym"] for r in raw}) == 452
    rows = [dict(r) for r in raw]
    for r in rows:
        r["_pre"] = date(r["pretest_startdate"])
        r["_post"] = date(r["posttest_startdate"])
        r["_start"] = date(r["start_date_artemis"])
        subs = json.loads(r["submission_history_artemis"] or "null") or []
        r["_subs"] = [date(s["timestamp"]) + dt.timedelta(hours=1) for s in subs]
        r["_first"] = r["_subs"][0] if r["_subs"] else None
        valid = [t for t in r["_subs"] if r["_post"] and t <= r["_post"]]
        r["_last"] = valid[-1] if valid else None
    exclusions = []

    def drop(reason, predicate):
        nonlocal rows
        removed = [r for r in rows if predicate(r)]
        ids = {r["pseudonym"] for r in removed}
        rows = [r for r in rows if r["pseudonym"] not in ids]
        exclusions.append(dict(step=len(exclusions)+1, reason=reason,
                               excluded=len(removed), remaining=len(rows),
                               ids=sorted(ids)))

    drop("Posttest before pretest", lambda r: r["_pre"] and r["_post"] and r["_post"] < r["_pre"])
    drop("Pre-post gap < 10 minutes", lambda r: r["_pre"] and r["_post"] and (r["_post"]-r["_pre"]).total_seconds() < 600)
    drop("Pre-post gap > 2 hours", lambda r: r["_pre"] and r["_post"] and (r["_post"]-r["_pre"]).total_seconds() > 7200)
    drop("First submission (+1h) before pretest", lambda r: r["_first"] and r["_pre"] and r["_first"] < r["_pre"])
    for field, answer in [("POSKQAC01", "AO02"), ("PREKQAC01", "AO02"),
                          ("POSIG04[SQ007]", "AO04"), ("POSPM02[SQ007]", "AO04")]:
        drop("Failed attention check: " + field,
             lambda r, f=field, a=answer: not missing(r[f]) and r[f] != a)
    # Mirrors the author's comparison: missing last-valid timestamps survive
    # this check. They can be excluded by the final missing-duration rule.
    drop("Last valid submission after posttest", lambda r: r["_last"] and r["_post"] and r["_last"] > r["_post"])
    drop("Pretest before study window", lambda r: r["_pre"] and r["_pre"] < dt.datetime(2025, 1, 23, 12))
    drop("No submissions", lambda r: r["submission_history_artemis"].strip() in ("", "[]", "null"))
    drop("Opt-out detected", lambda r: not missing(r["POSOQ01"]) and r["POSOQ01"] != "AO01")
    drop("AI group without message history", lambda r: r["experiment_group"] != "NOAI" and r["has_iris_messages"].lower() in ("false", "f", "0"))
    drop("Author choice: gender outside Male/Female", lambda r: r["PREGQ04"] not in ("AO01", "AO02"))
    def age(r):
        m = re.search(r"\d+", r["PREGQ05"])
        return int(m.group()) if m else None
    drop("Author choice: age outside 0-33 or missing", lambda r: age(r) is None or not 0 <= age(r) <= 33)
    drop("Author choice: experience outside selected levels", lambda r: r["PREGQ03"] not in ("AO01", "AO02", "AO03", "AO05"))
    drop("Exercise duration > 7600 seconds or missing", lambda r: not r["_last"] or not r["_start"] or (r["_last"]-r["_start"]).total_seconds() > 7600)

    def score(r, prefix, keys):
        answers = [r[f"{prefix}{i+1:02}"] for i in range(len(keys))]
        return None if any(missing(v) for v in answers) else sum(a == k for a, k in zip(answers, keys))

    analysis = []
    for r in rows:
        pre, post = score(r, "PREKQ", KEY), score(r, "POSKQ", KEY)
        analysis.append(dict(pseudonym=r["pseudonym"], group=GROUPS[r["experiment_group"]],
                             performance=float(r["exercise_score_artemis"]), pre=pre, post=post,
                             gain=None if pre is None or post is None else post-pre,
                             frustration=int(r["POSPM02[SQ005]"][-1]),
                             comprehension=score(r, "POSCQ", ["AO01"]*3)))
    assert len(analysis) == 275
    assert all(all(v is not None for v in r.values()) for r in analysis)
    expected = {"No AI": [96,29.85,1.92,2.77,0.85,4.09],
                "Iris": [91,57.50,2.18,2.89,0.71,3.21],
                "ChatGPT": [88,71.84,2.33,3.16,0.83,3.13]}
    summaries = []
    for g in GROUPS.values():
        rr = [r for r in analysis if r["group"] == g]
        s = dict(group=g, n=len(rr), raw_n=sum(GROUPS[r["experiment_group"]] == g for r in raw))
        for f in ("performance", "pre", "post", "gain", "frustration", "comprehension"):
            vv = [r[f] for r in rr]
            s[f] = dict(mean=st.mean(vv), sd=st.stdev(vv), min=min(vv), max=max(vv),
                        counts={str(v): vv.count(v) for v in sorted(set(vv))})
        check = [s["n"]] + [s[f]["mean"] for f in ("performance", "pre", "post", "gain", "frustration")]
        assert all(abs(a-b) <= 0.0051 for a,b in zip(check,expected[g])), (g,check)
        summaries.append(s)
    with (A / "ai-programming-analysis.csv").open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=analysis[0].keys()); w.writeheader(); w.writerows(analysis)
    (A / "ai-programming-analysis.json").write_text(json.dumps(analysis, indent=2)+"\n")
    with (A / "ai-programming-exclusions.csv").open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["step","reason","excluded","remaining"])
        w.writeheader(); w.writerows({k:r[k] for k in w.fieldnames} for r in exclusions)
    audit = dict(raw_rows=len(raw), raw_columns=len(raw[0]), unique_ids=452,
                 included=len(analysis), excluded=177, exclusions=exclusions, groups=summaries,
                 values={f:sorted({r[f] for r in analysis}) for f in ("performance","gain","frustration")},
                 validation="Python translation of author's core filters and scoring. Core n and means match published precision. R inferential models and other scales not rerun.",
                 source_hashes={p.name:dict(md5=hashlib.md5(p.read_bytes()).hexdigest(),sha256=hashlib.sha256(p.read_bytes()).hexdigest()) for p in [RAW,*sorted(SOURCE.glob('*'))] if p.is_file()})
    (A / "ai-programming-audit.json").write_text(json.dumps(audit,indent=2)+"\n")
    dictionary = dict(unit="One retained participant per row", group_order=list(GROUPS.values()),
        performance=dict(source="exercise_score_artemis", unit="Percent tests passed (0-100); already a percentage"),
        pre=dict(source="PREKQ01-PREKQ06", unit="Correct items, 0-6", correct_answers=KEY),
        post=dict(source="POSKQ01-POSKQ06", unit="Correct items, 0-6", correct_answers=KEY),
        gain=dict(formula="post - pre within pseudonym",unit="Points, theoretical -6 to +6"),
        frustration=dict(source="POSPM02[SQ005]",question="I was frustrated during the exercise.",
                         codes={f"AO0{i}":i for i in range(1,6)},
                         labels=["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"]),
        missing="Knowledge totals propagate missing items. Retained core fields have no missing values. No complete-case filter over all 76 columns.")
    (A / "ai-programming-data-dictionary.json").write_text(json.dumps(dictionary,indent=2)+"\n")
    # A literal first-lines view and a field subset are separate: neither is an analysis table.
    samples = analysis[:4]
    example = dict(records=samples, raw_records=[next(r for r in raw if r["pseudonym"]==a["pseudonym"]) for a in samples])
    (A / "ai-programming-examples.json").write_text(json.dumps(example,indent=2)+"\n")
    print(json.dumps(dict(n=len(analysis), groups=[{k:s[k] for k in ('group','n')} for s in summaries],
                         values=audit['values'],exclusions=[{k:r[k] for k in ('reason','excluded')} for r in exclusions]),indent=2))


if __name__ == "__main__":
    run()
