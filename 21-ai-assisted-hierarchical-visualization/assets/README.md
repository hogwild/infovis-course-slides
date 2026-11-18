# Lecture 21 · Assets and student example

This folder contains the visuals used by the current 45-slide lecture and the self-contained student project. The lecture starts with a static Treemap, adds tooltips, suggests a grouping-controls exercise, and finishes with a Tree appendix.

## Student project

Start with [student-example/README.md](student-example/README.md). [SLIDE-MAP.md](student-example/SLIDE-MAP.md) connects the lecture pages to the project files.

From the repository root:

```sh
cd slides/21-ai-assisted-hierarchical-visualization/assets/student-example
python3 -m http.server 8000
```

Open these pages through the local server:

- http://localhost:8000/index.html: static Treemap.
- http://localhost:8000/tooltip.html: the same Treemap with tooltips and persistent details.
- http://localhost:8000/tree.html: a node-link tree using the same data preparation.

The five core Treemap modules are `data.js`, `buildTree.js`, `treemap.js`, `interaction.js`, and `main.js`. The appendix entry `tree.js` imports the existing data and grouping modules. Grouping controls remain a student exercise; the starter does not implement them.

The project includes its own CSV, local D3 7.9.0 library and license. No React, npm or bundler is required. The `preview/` folder contains standalone PNG and SVG previews of the static Treemap.

## Lecture visuals

| Files | Purpose |
| --- | --- |
| `treemap-principles.png` | Introductory Treemap illustration |
| `titanic-dataset-table.png` | Titanic dataset preview |
| `region-country-hierarchy.svg` | Illustrative Region/Country hierarchy: China 100, Japan 80, France 70 |
| `l21-treemap-pipeline.svg` | Data preparation, hierarchy, layout and SVG drawing |
| `l21-groups-sex.svg` | The first grouping of all 891 passenger records |
| `l21-recursion-calls.svg`, `l21-recursive-return.svg` | Recursive calls and returned child objects |
| `l21-complete-tree.svg` | The completed Sex/Pclass hierarchy |
| `rectangle-coordinates.svg` | Rectangle bounds and dimensions |
| `l21-tooltip-containers.svg` | Annotated screenshot identifying `#tooltip` and `#detail` |
| `l21-tree-layout.svg` | The Tree appendix's 9 nodes and 8 parent–child links |

`l21-student-tooltip.png` is the original screenshot embedded in `l21-tooltip-containers.svg`. Keep it as the source image for editing the annotations, even though the slides load only the self-contained SVG.

`l21-tree-layout.svg` uses actual D3 7.9.0 coordinates from `tree().size([1100, 260])` and paths from `linkVertical()`. It uses the student project's Sex/Pclass hierarchy. All circles have the same size. The lecture SVGs work in both HTML and PDF.

## Data and attribution

The original CSV is stored once in [student-example/data/titanic.csv](student-example/data/titanic.csv). See [data/README.md](student-example/data/README.md) for the pinned URL, fields and missing-value policy.

Source: [hogwild / titanic.csv](https://gist.github.com/hogwild/2ac0f0b665b4295e0574c85c12bec092), retrieved 2026-11-16 (Asia/Shanghai). The supplied sample has 891 records, 342 survivors and 177 missing ages. It is not the entire ship population. No additional dataset license is asserted.

Treemap area represents group passenger count; color represents survival rate. Missing ages remain `Unknown`, and the existing AgeGroup uses lower-inclusive, upper-exclusive ten-year intervals. The Region/Country diagram uses illustrative values rather than measured data.

The vendored D3 library and its license are in [student-example/lib/](student-example/lib/). Original references appear on the relevant slides and in the student README.
