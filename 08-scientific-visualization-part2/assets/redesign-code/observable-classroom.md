# Observable Notebook: classroom demo and sharing guide

This introductory notebook uses **Observable Notebooks 2.0** and draws the four redesigned charts in 9 **JavaScript** cells: one library import, four editable Vega-Lite specifications, and four chart outputs. Real summary data is embedded, so no CSV upload is needed. The separate 38-cell analysis guide still uses the legacy **Observable JavaScript (ojs)** cell mode.

## Create the notebook and draw the charts

1. Create a blank notebook in Observable Notebooks 2.0. Set each code cell to **JavaScript (js)**.
2. Paste each code block into a separate JavaScript cell. Start with the import of embed, then add the specification and chart output for each chart. Keep the variable names as provided. Replace the earlier classroom cells instead of keeping both versions.
3. Each specification is a complete JavaScript object declared with const. Edit properties such as mark, encoding, axis or title directly in the specification cell. Each output cell creates a chart container, renders into it, and calls display to show it. The invalidation callback releases the previous view when the cell reruns.
4. Start with the knowledge gains chart: in gainSpec, change the height of all three panels from 140 to 220. Run the cell and watch gainChart update automatically. Restore the height to 140, then try a different color or annotation and compare the result with the original design.
5. Add Markdown cells between the charts to explain the comparison tasks, visual encodings and data sources. Keep the chart outputs visible and show the specification code when discussing a design change.

## If you see “Assignment to external variable”

The earlier classroom code used legacy Observable JavaScript syntax. In a Notebooks 2.0 JavaScript cell, a bare assignment such as embed = require(...) does not declare a variable. Use the import cell below, and use const for each specification and chart container. Paste @ literally in the package name, without a preceding backslash.

Vega-Embed's ES module import also has a different calling convention from its old browser wrapper: embed takes a DOM element, then the specification and options. Use the complete output cells below so the chart is rendered and displayed correctly.

## Add context and sources

Paste the following text into a Markdown cell, without the surrounding code fences:

```markdown
# Redesigning figures with Vega-Lite

Four views of exercise performance, reported frustration and knowledge gains.
No AI: n = 96; Iris: n = 91; ChatGPT: n = 88.

Classroom redesign based on [Bassner et al. (2026)](https://doi.org/10.1016/j.caeai.2025.100537).
Data: [Zenodo 20285307](https://doi.org/10.5281/zenodo.20285307), CC BY 4.0.
```

## Share with students

1. When the notebook is ready, open Settings and choose its access level: Unlisted allows anyone with the URL to view it; Public also lists it on your profile and in public notebook listings. Copy the notebook URL after publishing or changing access.
2. Open the link in a browser window where you are signed out. Check that all four charts and their code are visible, then add the link to the course materials.
3. Students can sign in and use Fork to save their own copy, then change colors, axes or annotations. Check the shared link and the student workflow before the classroom exercise.

Use this local guide to create and share the online notebook from your own Observable account. Add the resulting notebook URL to the course materials once it is ready.

Official documentation: [Notebooks 2.0 system guide](https://observablehq.github.io/notebook-kit/system-guide), [Notebooks user guide, including sharing and publishing](https://observablehq.com/@observablehq/notebooks-user-guide), [Vega-Embed API](https://vega.github.io/vega-embed/).

## Complete notebook cells

### 1. Load Vega-Lite through Vega-Embed

```javascript
import embed from "npm:vega-embed@7.1.0";
```

### 2. Exercise performance · editable specification

```javascript
const exerciseSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "hconcat": [
    {
      "title": {
        "frame": "group",
        "text": "No AI",
        "color": "#667085",
        "fontSize": 17,
        "offset": 8
      },
      "width": 140,
      "height": 140,
      "data": {
        "values": [
          {
            "group": "No AI",
            "value": 0,
            "count": 40
          },
          {
            "group": "No AI",
            "value": 11.1,
            "count": 9
          },
          {
            "group": "No AI",
            "value": 22.2,
            "count": 13
          },
          {
            "group": "No AI",
            "value": 44.4,
            "count": 13
          },
          {
            "group": "No AI",
            "value": 55.6,
            "count": 0
          },
          {
            "group": "No AI",
            "value": 66.7,
            "count": 6
          },
          {
            "group": "No AI",
            "value": 77.8,
            "count": 0
          },
          {
            "group": "No AI",
            "value": 88.9,
            "count": 0
          },
          {
            "group": "No AI",
            "value": 100,
            "count": 15
          }
        ]
      },
      "encoding": {
        "y": {
          "field": "value",
          "type": "quantitative",
          "scale": {
            "domain": [
              -5,
              105
            ],
            "nice": false
          },
          "axis": {
            "title": "Score (%)",
            "values": [
              0,
              11.1,
              22.2,
              44.4,
              55.6,
              66.7,
              77.8,
              88.9,
              100
            ],
            "labels": true,
            "ticks": true,
            "domain": true,
            "grid": false,
            "format": ".1~f",
            "labelFontSize": 13,
            "labelOverlap": false,
            "labelPadding": 3,
            "titlePadding": 6,
            "titleFontSize": 13
          }
        }
      },
      "layer": [
        {
          "mark": {
            "type": "bar",
            "orient": "horizontal",
            "color": "#667085",
            "size": 7
          },
          "encoding": {
            "x": {
              "field": "count",
              "type": "quantitative",
              "scale": {
                "domain": [
                  0,
                  60
                ],
                "nice": false
              },
              "axis": {
                "title": "Students",
                "values": [
                  0,
                  30,
                  60
                ],
                "labelFontSize": 13,
                "labelOverlap": false,
                "titleFontSize": 14,
                "titlePadding": 4,
                "labelPadding": 3
              }
            },
            "tooltip": [
              {
                "field": "group"
              },
              {
                "field": "value",
                "title": "Exercise score (%)"
              },
              {
                "field": "count",
                "title": "Students"
              }
            ]
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 29.853125000000002,
                "label": "Mean 29.85"
              }
            ]
          },
          "mark": {
            "type": "rule",
            "color": "#17233c",
            "strokeDash": [
              5,
              4
            ],
            "strokeWidth": 2
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 29.853125000000002,
                "label": "Mean 29.85"
              }
            ]
          },
          "mark": {
            "type": "text",
            "align": "right",
            "baseline": "bottom",
            "dx": -3,
            "dy": -4,
            "fontSize": 13,
            "fontWeight": "bold",
            "color": "#17233c"
          },
          "encoding": {
            "x": {
              "datum": 60,
              "type": "quantitative"
            },
            "text": {
              "field": "label"
            }
          }
        }
      ]
    },
    {
      "title": {
        "frame": "group",
        "text": "Iris",
        "color": "#3157a4",
        "fontSize": 17,
        "offset": 8
      },
      "width": 140,
      "height": 140,
      "data": {
        "values": [
          {
            "group": "Iris",
            "value": 0,
            "count": 14
          },
          {
            "group": "Iris",
            "value": 11.1,
            "count": 6
          },
          {
            "group": "Iris",
            "value": 22.2,
            "count": 4
          },
          {
            "group": "Iris",
            "value": 44.4,
            "count": 21
          },
          {
            "group": "Iris",
            "value": 55.6,
            "count": 0
          },
          {
            "group": "Iris",
            "value": 66.7,
            "count": 11
          },
          {
            "group": "Iris",
            "value": 77.8,
            "count": 1
          },
          {
            "group": "Iris",
            "value": 88.9,
            "count": 6
          },
          {
            "group": "Iris",
            "value": 100,
            "count": 28
          }
        ]
      },
      "encoding": {
        "y": {
          "field": "value",
          "type": "quantitative",
          "scale": {
            "domain": [
              -5,
              105
            ],
            "nice": false
          },
          "axis": {
            "title": null,
            "values": [
              0,
              11.1,
              22.2,
              44.4,
              55.6,
              66.7,
              77.8,
              88.9,
              100
            ],
            "labels": false,
            "ticks": false,
            "domain": false,
            "grid": false,
            "format": ".1~f",
            "labelFontSize": 13,
            "labelOverlap": false,
            "labelPadding": 3,
            "titlePadding": 6,
            "titleFontSize": 13
          }
        }
      },
      "layer": [
        {
          "mark": {
            "type": "bar",
            "orient": "horizontal",
            "color": "#3157a4",
            "size": 7
          },
          "encoding": {
            "x": {
              "field": "count",
              "type": "quantitative",
              "scale": {
                "domain": [
                  0,
                  60
                ],
                "nice": false
              },
              "axis": {
                "title": "Students",
                "values": [
                  0,
                  30,
                  60
                ],
                "labelFontSize": 13,
                "labelOverlap": false,
                "titleFontSize": 14,
                "titlePadding": 4,
                "labelPadding": 3
              }
            },
            "tooltip": [
              {
                "field": "group"
              },
              {
                "field": "value",
                "title": "Exercise score (%)"
              },
              {
                "field": "count",
                "title": "Students"
              }
            ]
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 57.50219780219778,
                "label": "Mean 57.50"
              }
            ]
          },
          "mark": {
            "type": "rule",
            "color": "#17233c",
            "strokeDash": [
              5,
              4
            ],
            "strokeWidth": 2
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 57.50219780219778,
                "label": "Mean 57.50"
              }
            ]
          },
          "mark": {
            "type": "text",
            "align": "right",
            "baseline": "bottom",
            "dx": -3,
            "dy": -4,
            "fontSize": 13,
            "fontWeight": "bold",
            "color": "#17233c"
          },
          "encoding": {
            "x": {
              "datum": 60,
              "type": "quantitative"
            },
            "text": {
              "field": "label"
            }
          }
        }
      ]
    },
    {
      "title": {
        "frame": "group",
        "text": "ChatGPT",
        "color": "#7656a6",
        "fontSize": 17,
        "offset": 8
      },
      "width": 140,
      "height": 140,
      "data": {
        "values": [
          {
            "group": "ChatGPT",
            "value": 0,
            "count": 15
          },
          {
            "group": "ChatGPT",
            "value": 11.1,
            "count": 2
          },
          {
            "group": "ChatGPT",
            "value": 22.2,
            "count": 1
          },
          {
            "group": "ChatGPT",
            "value": 44.4,
            "count": 9
          },
          {
            "group": "ChatGPT",
            "value": 55.6,
            "count": 1
          },
          {
            "group": "ChatGPT",
            "value": 66.7,
            "count": 4
          },
          {
            "group": "ChatGPT",
            "value": 77.8,
            "count": 0
          },
          {
            "group": "ChatGPT",
            "value": 88.9,
            "count": 4
          },
          {
            "group": "ChatGPT",
            "value": 100,
            "count": 52
          }
        ]
      },
      "encoding": {
        "y": {
          "field": "value",
          "type": "quantitative",
          "scale": {
            "domain": [
              -5,
              105
            ],
            "nice": false
          },
          "axis": {
            "title": null,
            "values": [
              0,
              11.1,
              22.2,
              44.4,
              55.6,
              66.7,
              77.8,
              88.9,
              100
            ],
            "labels": false,
            "ticks": false,
            "domain": false,
            "grid": false,
            "format": ".1~f",
            "labelFontSize": 13,
            "labelOverlap": false,
            "labelPadding": 3,
            "titlePadding": 6,
            "titleFontSize": 13
          }
        }
      },
      "layer": [
        {
          "mark": {
            "type": "bar",
            "orient": "horizontal",
            "color": "#7656a6",
            "size": 7
          },
          "encoding": {
            "x": {
              "field": "count",
              "type": "quantitative",
              "scale": {
                "domain": [
                  0,
                  60
                ],
                "nice": false
              },
              "axis": {
                "title": "Students",
                "values": [
                  0,
                  30,
                  60
                ],
                "labelFontSize": 13,
                "labelOverlap": false,
                "titleFontSize": 14,
                "titlePadding": 4,
                "labelPadding": 3
              }
            },
            "tooltip": [
              {
                "field": "group"
              },
              {
                "field": "value",
                "title": "Exercise score (%)"
              },
              {
                "field": "count",
                "title": "Students"
              }
            ]
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 71.84090909090908,
                "label": "Mean 71.84"
              }
            ]
          },
          "mark": {
            "type": "rule",
            "color": "#17233c",
            "strokeDash": [
              5,
              4
            ],
            "strokeWidth": 2
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 71.84090909090908,
                "label": "Mean 71.84"
              }
            ]
          },
          "mark": {
            "type": "text",
            "align": "right",
            "baseline": "bottom",
            "dx": -3,
            "dy": -4,
            "fontSize": 13,
            "fontWeight": "bold",
            "color": "#17233c"
          },
          "encoding": {
            "x": {
              "datum": 60,
              "type": "quantitative"
            },
            "text": {
              "field": "label"
            }
          }
        }
      ]
    }
  ],
  "spacing": 18,
  "resolve": {
    "scale": {
      "x": "shared",
      "y": "shared"
    }
  },
  "title": {
    "frame": "group",
    "text": "Exercise performance",
    "fontSize": 22,
    "offset": 16
  },
  "config": {
    "font": "Arial",
    "background": "white",
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFontSize": 17,
      "titleFontSize": 18,
      "titlePadding": 12,
      "labelColor": "#263248",
      "titleColor": "#17233c",
      "gridColor": "#e6e8ed",
      "domainColor": "#a1a7b3",
      "labelPadding": 8,
      "labelAngle": 0
    },
    "title": {
      "fontSize": 22,
      "anchor": "start",
      "color": "#17233c",
      "offset": 18,
      "subtitleFontSize": 16,
      "subtitleColor": "#667085",
      "subtitlePadding": 8
    },
    "legend": {
      "labelFontSize": 15,
      "titleFontSize": 16,
      "orient": "bottom"
    }
  }
};
```

### 3. Exercise performance · chart output

```javascript
const exerciseChart = document.createElement("div");
const exerciseResult = await embed(exerciseChart, exerciseSpec,
  {actions: false, renderer: "svg"});
display(exerciseChart);
invalidation.then(() => exerciseResult.finalize());
```

### 4. Reported frustration · editable specification

```javascript
const frustrationSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "width": 440,
  "height": 140,
  "data": {
    "values": [
      {
        "group": "No AI",
        "level": 1,
        "count": 2,
        "proportion": 0.020833333333333332,
        "start": 0,
        "end": 0.020833333333333332,
        "middle": 0.010416666666666666
      },
      {
        "group": "No AI",
        "level": 2,
        "count": 7,
        "proportion": 0.07291666666666667,
        "start": 0.020833333333333332,
        "end": 0.09375,
        "middle": 0.057291666666666664
      },
      {
        "group": "No AI",
        "level": 3,
        "count": 10,
        "proportion": 0.10416666666666667,
        "start": 0.09375,
        "end": 0.19791666666666669,
        "middle": 0.14583333333333334
      },
      {
        "group": "No AI",
        "level": 4,
        "count": 38,
        "proportion": 0.3958333333333333,
        "start": 0.19791666666666669,
        "end": 0.59375,
        "middle": 0.39583333333333337
      },
      {
        "group": "No AI",
        "level": 5,
        "count": 39,
        "proportion": 0.40625,
        "start": 0.59375,
        "end": 1,
        "middle": 0.796875
      },
      {
        "group": "Iris",
        "level": 1,
        "count": 5,
        "proportion": 0.054945054945054944,
        "start": 0,
        "end": 0.054945054945054944,
        "middle": 0.027472527472527472
      },
      {
        "group": "Iris",
        "level": 2,
        "count": 26,
        "proportion": 0.2857142857142857,
        "start": 0.054945054945054944,
        "end": 0.34065934065934067,
        "middle": 0.19780219780219782
      },
      {
        "group": "Iris",
        "level": 3,
        "count": 19,
        "proportion": 0.2087912087912088,
        "start": 0.34065934065934067,
        "end": 0.5494505494505495,
        "middle": 0.4450549450549451
      },
      {
        "group": "Iris",
        "level": 4,
        "count": 27,
        "proportion": 0.2967032967032967,
        "start": 0.5494505494505495,
        "end": 0.8461538461538463,
        "middle": 0.6978021978021979
      },
      {
        "group": "Iris",
        "level": 5,
        "count": 14,
        "proportion": 0.15384615384615385,
        "start": 0.8461538461538463,
        "end": 1,
        "middle": 0.9230769230769231
      },
      {
        "group": "ChatGPT",
        "level": 1,
        "count": 8,
        "proportion": 0.09090909090909091,
        "start": 0,
        "end": 0.09090909090909091,
        "middle": 0.045454545454545456
      },
      {
        "group": "ChatGPT",
        "level": 2,
        "count": 23,
        "proportion": 0.26136363636363635,
        "start": 0.09090909090909091,
        "end": 0.3522727272727273,
        "middle": 0.22159090909090912
      },
      {
        "group": "ChatGPT",
        "level": 3,
        "count": 19,
        "proportion": 0.2159090909090909,
        "start": 0.3522727272727273,
        "end": 0.5681818181818182,
        "middle": 0.46022727272727276
      },
      {
        "group": "ChatGPT",
        "level": 4,
        "count": 26,
        "proportion": 0.29545454545454547,
        "start": 0.5681818181818182,
        "end": 0.8636363636363638,
        "middle": 0.715909090909091
      },
      {
        "group": "ChatGPT",
        "level": 5,
        "count": 12,
        "proportion": 0.13636363636363635,
        "start": 0.8636363636363638,
        "end": 1,
        "middle": 0.9318181818181819
      }
    ]
  },
  "title": {
    "frame": "group",
    "text": "Reported frustration",
    "subtitle": "Five response levels; lower = less",
    "fontSize": 22,
    "subtitleFontSize": 13,
    "offset": 13,
    "subtitlePadding": 9
  },
  "encoding": {
    "x": {
      "field": "group",
      "type": "nominal",
      "sort": [
        "No AI",
        "Iris",
        "ChatGPT"
      ],
      "title": null,
      "axis": {
        "labelFontSize": 14,
        "labelPadding": 4
      }
    },
    "y": {
      "field": "start",
      "type": "quantitative",
      "title": "Responses (%)",
      "scale": {
        "domain": [
          0,
          1
        ]
      },
      "axis": {
        "format": ".0%",
        "values": [
          0,
          0.5,
          1
        ],
        "labelFontSize": 13,
        "titleFontSize": 13,
        "labelPadding": 3,
        "titlePadding": 6
      }
    },
    "color": {
      "field": "level",
      "type": "ordinal",
      "sort": [
        1,
        2,
        3,
        4,
        5
      ],
      "scale": {
        "domain": [
          1,
          2,
          3,
          4,
          5
        ],
        "range": [
          "#fff3df",
          "#fedbb2",
          "#f3b981",
          "#d58c50",
          "#9a502c"
        ]
      },
      "legend": {
        "title": null,
        "direction": "horizontal",
        "offset": 6,
        "labelFontSize": 13
      }
    },
    "tooltip": [
      {
        "field": "group"
      },
      {
        "field": "level"
      },
      {
        "field": "count"
      },
      {
        "field": "proportion",
        "format": ".1%"
      }
    ]
  },
  "layer": [
    {
      "mark": {
        "type": "bar",
        "width": 64,
        "stroke": "white",
        "strokeWidth": 1
      },
      "encoding": {
        "y2": {
          "field": "end"
        }
      }
    },
    {
      "mark": {
        "type": "text",
        "fontSize": 13
      },
      "encoding": {
        "y": {
          "field": "middle",
          "type": "quantitative"
        },
        "text": {
          "field": "proportion",
          "format": ".0%"
        },
        "color": {
          "condition": {
            "test": "datum.level >= 4",
            "value": "white"
          },
          "value": "#17233c"
        },
        "opacity": {
          "condition": {
            "test": "datum.proportion >= 0.06",
            "value": 1
          },
          "value": 0
        }
      }
    }
  ],
  "config": {
    "font": "Arial",
    "background": "white",
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFontSize": 17,
      "titleFontSize": 18,
      "titlePadding": 12,
      "labelColor": "#263248",
      "titleColor": "#17233c",
      "gridColor": "#e6e8ed",
      "domainColor": "#a1a7b3",
      "labelPadding": 8,
      "labelAngle": 0
    },
    "title": {
      "fontSize": 22,
      "anchor": "start",
      "color": "#17233c",
      "offset": 18,
      "subtitleFontSize": 16,
      "subtitleColor": "#667085",
      "subtitlePadding": 8
    },
    "legend": {
      "labelFontSize": 15,
      "titleFontSize": 16,
      "orient": "bottom"
    }
  }
};
```

### 5. Reported frustration · chart output

```javascript
const frustrationChart = document.createElement("div");
const frustrationResult = await embed(frustrationChart, frustrationSpec,
  {actions: false, renderer: "svg"});
display(frustrationChart);
invalidation.then(() => frustrationResult.finalize());
```

### 6. Knowledge gains · editable specification

```javascript
const gainSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "hconcat": [
    {
      "title": {
        "frame": "group",
        "text": "No AI",
        "color": "#667085",
        "fontSize": 17,
        "offset": 8
      },
      "width": 140,
      "height": 140,
      "data": {
        "values": [
          {
            "group": "No AI",
            "value": -6,
            "count": 0
          },
          {
            "group": "No AI",
            "value": -5,
            "count": 0
          },
          {
            "group": "No AI",
            "value": -4,
            "count": 0
          },
          {
            "group": "No AI",
            "value": -3,
            "count": 0
          },
          {
            "group": "No AI",
            "value": -2,
            "count": 5
          },
          {
            "group": "No AI",
            "value": -1,
            "count": 8
          },
          {
            "group": "No AI",
            "value": 0,
            "count": 35
          },
          {
            "group": "No AI",
            "value": 1,
            "count": 17
          },
          {
            "group": "No AI",
            "value": 2,
            "count": 19
          },
          {
            "group": "No AI",
            "value": 3,
            "count": 7
          },
          {
            "group": "No AI",
            "value": 4,
            "count": 2
          },
          {
            "group": "No AI",
            "value": 5,
            "count": 2
          },
          {
            "group": "No AI",
            "value": 6,
            "count": 1
          }
        ]
      },
      "encoding": {
        "y": {
          "field": "value",
          "type": "quantitative",
          "scale": {
            "domain": [
              -6.5,
              6.5
            ],
            "nice": false
          },
          "axis": {
            "title": "Gain (points)",
            "values": [
              -6,
              -4,
              -2,
              0,
              2,
              4,
              6
            ],
            "labels": true,
            "ticks": true,
            "domain": true,
            "grid": false,
            "format": ".1~f",
            "labelFontSize": 13,
            "labelOverlap": false,
            "labelPadding": 3,
            "titlePadding": 6,
            "titleFontSize": 13
          }
        }
      },
      "layer": [
        {
          "mark": {
            "type": "bar",
            "orient": "horizontal",
            "color": "#667085",
            "size": 7
          },
          "encoding": {
            "x": {
              "field": "count",
              "type": "quantitative",
              "scale": {
                "domain": [
                  0,
                  40
                ],
                "nice": false
              },
              "axis": {
                "title": "Students",
                "values": [
                  0,
                  20,
                  40
                ],
                "labelFontSize": 13,
                "labelOverlap": false,
                "titleFontSize": 14,
                "titlePadding": 4,
                "labelPadding": 3
              }
            },
            "tooltip": [
              {
                "field": "group"
              },
              {
                "field": "value",
                "title": "Knowledge gain (points)"
              },
              {
                "field": "count",
                "title": "Students"
              }
            ]
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 0.8541666666666666,
                "label": "Mean 0.85"
              }
            ]
          },
          "mark": {
            "type": "rule",
            "color": "#17233c",
            "strokeDash": [
              5,
              4
            ],
            "strokeWidth": 2
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 0.8541666666666666,
                "label": "Mean 0.85"
              }
            ]
          },
          "mark": {
            "type": "text",
            "align": "right",
            "baseline": "bottom",
            "dx": -3,
            "dy": -9,
            "fontSize": 13,
            "fontWeight": "bold",
            "color": "#17233c"
          },
          "encoding": {
            "x": {
              "datum": 40,
              "type": "quantitative"
            },
            "text": {
              "field": "label"
            }
          }
        }
      ]
    },
    {
      "title": {
        "frame": "group",
        "text": "Iris",
        "color": "#3157a4",
        "fontSize": 17,
        "offset": 8
      },
      "width": 140,
      "height": 140,
      "data": {
        "values": [
          {
            "group": "Iris",
            "value": -6,
            "count": 0
          },
          {
            "group": "Iris",
            "value": -5,
            "count": 0
          },
          {
            "group": "Iris",
            "value": -4,
            "count": 0
          },
          {
            "group": "Iris",
            "value": -3,
            "count": 1
          },
          {
            "group": "Iris",
            "value": -2,
            "count": 1
          },
          {
            "group": "Iris",
            "value": -1,
            "count": 8
          },
          {
            "group": "Iris",
            "value": 0,
            "count": 36
          },
          {
            "group": "Iris",
            "value": 1,
            "count": 22
          },
          {
            "group": "Iris",
            "value": 2,
            "count": 14
          },
          {
            "group": "Iris",
            "value": 3,
            "count": 8
          },
          {
            "group": "Iris",
            "value": 4,
            "count": 1
          },
          {
            "group": "Iris",
            "value": 5,
            "count": 0
          },
          {
            "group": "Iris",
            "value": 6,
            "count": 0
          }
        ]
      },
      "encoding": {
        "y": {
          "field": "value",
          "type": "quantitative",
          "scale": {
            "domain": [
              -6.5,
              6.5
            ],
            "nice": false
          },
          "axis": {
            "title": null,
            "values": [
              -6,
              -4,
              -2,
              0,
              2,
              4,
              6
            ],
            "labels": false,
            "ticks": false,
            "domain": false,
            "grid": false,
            "format": ".1~f",
            "labelFontSize": 13,
            "labelOverlap": false,
            "labelPadding": 3,
            "titlePadding": 6,
            "titleFontSize": 13
          }
        }
      },
      "layer": [
        {
          "mark": {
            "type": "bar",
            "orient": "horizontal",
            "color": "#3157a4",
            "size": 7
          },
          "encoding": {
            "x": {
              "field": "count",
              "type": "quantitative",
              "scale": {
                "domain": [
                  0,
                  40
                ],
                "nice": false
              },
              "axis": {
                "title": "Students",
                "values": [
                  0,
                  20,
                  40
                ],
                "labelFontSize": 13,
                "labelOverlap": false,
                "titleFontSize": 14,
                "titlePadding": 4,
                "labelPadding": 3
              }
            },
            "tooltip": [
              {
                "field": "group"
              },
              {
                "field": "value",
                "title": "Knowledge gain (points)"
              },
              {
                "field": "count",
                "title": "Students"
              }
            ]
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 0.7142857142857143,
                "label": "Mean 0.71"
              }
            ]
          },
          "mark": {
            "type": "rule",
            "color": "#17233c",
            "strokeDash": [
              5,
              4
            ],
            "strokeWidth": 2
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 0.7142857142857143,
                "label": "Mean 0.71"
              }
            ]
          },
          "mark": {
            "type": "text",
            "align": "right",
            "baseline": "bottom",
            "dx": -3,
            "dy": -9,
            "fontSize": 13,
            "fontWeight": "bold",
            "color": "#17233c"
          },
          "encoding": {
            "x": {
              "datum": 40,
              "type": "quantitative"
            },
            "text": {
              "field": "label"
            }
          }
        }
      ]
    },
    {
      "title": {
        "frame": "group",
        "text": "ChatGPT",
        "color": "#7656a6",
        "fontSize": 17,
        "offset": 8
      },
      "width": 140,
      "height": 140,
      "data": {
        "values": [
          {
            "group": "ChatGPT",
            "value": -6,
            "count": 0
          },
          {
            "group": "ChatGPT",
            "value": -5,
            "count": 0
          },
          {
            "group": "ChatGPT",
            "value": -4,
            "count": 0
          },
          {
            "group": "ChatGPT",
            "value": -3,
            "count": 0
          },
          {
            "group": "ChatGPT",
            "value": -2,
            "count": 4
          },
          {
            "group": "ChatGPT",
            "value": -1,
            "count": 8
          },
          {
            "group": "ChatGPT",
            "value": 0,
            "count": 24
          },
          {
            "group": "ChatGPT",
            "value": 1,
            "count": 30
          },
          {
            "group": "ChatGPT",
            "value": 2,
            "count": 12
          },
          {
            "group": "ChatGPT",
            "value": 3,
            "count": 6
          },
          {
            "group": "ChatGPT",
            "value": 4,
            "count": 3
          },
          {
            "group": "ChatGPT",
            "value": 5,
            "count": 1
          },
          {
            "group": "ChatGPT",
            "value": 6,
            "count": 0
          }
        ]
      },
      "encoding": {
        "y": {
          "field": "value",
          "type": "quantitative",
          "scale": {
            "domain": [
              -6.5,
              6.5
            ],
            "nice": false
          },
          "axis": {
            "title": null,
            "values": [
              -6,
              -4,
              -2,
              0,
              2,
              4,
              6
            ],
            "labels": false,
            "ticks": false,
            "domain": false,
            "grid": false,
            "format": ".1~f",
            "labelFontSize": 13,
            "labelOverlap": false,
            "labelPadding": 3,
            "titlePadding": 6,
            "titleFontSize": 13
          }
        }
      },
      "layer": [
        {
          "mark": {
            "type": "bar",
            "orient": "horizontal",
            "color": "#7656a6",
            "size": 7
          },
          "encoding": {
            "x": {
              "field": "count",
              "type": "quantitative",
              "scale": {
                "domain": [
                  0,
                  40
                ],
                "nice": false
              },
              "axis": {
                "title": "Students",
                "values": [
                  0,
                  20,
                  40
                ],
                "labelFontSize": 13,
                "labelOverlap": false,
                "titleFontSize": 14,
                "titlePadding": 4,
                "labelPadding": 3
              }
            },
            "tooltip": [
              {
                "field": "group"
              },
              {
                "field": "value",
                "title": "Knowledge gain (points)"
              },
              {
                "field": "count",
                "title": "Students"
              }
            ]
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 0.8295454545454546,
                "label": "Mean 0.83"
              }
            ]
          },
          "mark": {
            "type": "rule",
            "color": "#17233c",
            "strokeDash": [
              5,
              4
            ],
            "strokeWidth": 2
          }
        },
        {
          "data": {
            "values": [
              {
                "value": 0.8295454545454546,
                "label": "Mean 0.83"
              }
            ]
          },
          "mark": {
            "type": "text",
            "align": "right",
            "baseline": "bottom",
            "dx": -3,
            "dy": -9,
            "fontSize": 13,
            "fontWeight": "bold",
            "color": "#17233c"
          },
          "encoding": {
            "x": {
              "datum": 40,
              "type": "quantitative"
            },
            "text": {
              "field": "label"
            }
          }
        }
      ]
    }
  ],
  "spacing": 18,
  "resolve": {
    "scale": {
      "x": "shared",
      "y": "shared"
    }
  },
  "title": {
    "frame": "group",
    "text": "Knowledge gains",
    "fontSize": 22,
    "offset": 16
  },
  "config": {
    "font": "Arial",
    "background": "white",
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFontSize": 17,
      "titleFontSize": 18,
      "titlePadding": 12,
      "labelColor": "#263248",
      "titleColor": "#17233c",
      "gridColor": "#e6e8ed",
      "domainColor": "#a1a7b3",
      "labelPadding": 8,
      "labelAngle": 0
    },
    "title": {
      "fontSize": 22,
      "anchor": "start",
      "color": "#17233c",
      "offset": 18,
      "subtitleFontSize": 16,
      "subtitleColor": "#667085",
      "subtitlePadding": 8
    },
    "legend": {
      "labelFontSize": 15,
      "titleFontSize": 16,
      "orient": "bottom"
    }
  }
};
```

### 7. Knowledge gains · chart output

```javascript
const gainChart = document.createElement("div");
const gainResult = await embed(gainChart, gainSpec,
  {actions: false, renderer: "svg"});
display(gainChart);
invalidation.then(() => gainResult.finalize());
```

### 8. Supplement: pretest and posttest · editable specification

```javascript
const pairedSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "title": {
    "frame": "group",
    "text": "Supplement: pretest and posttest",
    "fontSize": 22,
    "offset": 16
  },
  "data": {
    "values": [
      {
        "group": "No AI",
        "pre": 1,
        "post": 5,
        "path": "1:5",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 0,
        "post": 6,
        "path": "0:6",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 5,
        "post": 3,
        "path": "5:3",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 4,
        "post": 3,
        "path": "4:3",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 5,
        "post": 6,
        "path": "5:6",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 1,
        "post": 0,
        "path": "1:0",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 0,
        "post": 4,
        "path": "0:4",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 2,
        "post": 5,
        "path": "2:5",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 4,
        "post": 2,
        "path": "4:2",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 1,
        "post": 4,
        "path": "1:4",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 1,
        "post": 1,
        "path": "1:1",
        "count": 1
      },
      {
        "group": "Iris",
        "pre": 4,
        "post": 5,
        "path": "4:5",
        "count": 1
      },
      {
        "group": "Iris",
        "pre": 2,
        "post": 0,
        "path": "2:0",
        "count": 1
      },
      {
        "group": "Iris",
        "pre": 0,
        "post": 4,
        "path": "0:4",
        "count": 1
      },
      {
        "group": "Iris",
        "pre": 3,
        "post": 5,
        "path": "3:5",
        "count": 1
      },
      {
        "group": "Iris",
        "pre": 2,
        "post": 5,
        "path": "2:5",
        "count": 1
      },
      {
        "group": "Iris",
        "pre": 4,
        "post": 1,
        "path": "4:1",
        "count": 1
      },
      {
        "group": "ChatGPT",
        "pre": 2,
        "post": 0,
        "path": "2:0",
        "count": 1
      },
      {
        "group": "ChatGPT",
        "pre": 1,
        "post": 6,
        "path": "1:6",
        "count": 1
      },
      {
        "group": "ChatGPT",
        "pre": 2,
        "post": 6,
        "path": "2:6",
        "count": 1
      },
      {
        "group": "ChatGPT",
        "pre": 5,
        "post": 5,
        "path": "5:5",
        "count": 1
      },
      {
        "group": "ChatGPT",
        "pre": 4,
        "post": 3,
        "path": "4:3",
        "count": 1
      },
      {
        "group": "ChatGPT",
        "pre": 1,
        "post": 4,
        "path": "1:4",
        "count": 1
      },
      {
        "group": "ChatGPT",
        "pre": 0,
        "post": 2,
        "path": "0:2",
        "count": 1
      },
      {
        "group": "ChatGPT",
        "pre": 5,
        "post": 3,
        "path": "5:3",
        "count": 1
      },
      {
        "group": "ChatGPT",
        "pre": 2,
        "post": 2,
        "path": "2:2",
        "count": 1
      },
      {
        "group": "No AI",
        "pre": 0,
        "post": 5,
        "path": "0:5",
        "count": 2
      },
      {
        "group": "No AI",
        "pre": 3,
        "post": 4,
        "path": "3:4",
        "count": 2
      },
      {
        "group": "No AI",
        "pre": 4,
        "post": 6,
        "path": "4:6",
        "count": 2
      },
      {
        "group": "No AI",
        "pre": 3,
        "post": 6,
        "path": "3:6",
        "count": 2
      },
      {
        "group": "No AI",
        "pre": 4,
        "post": 5,
        "path": "4:5",
        "count": 2
      },
      {
        "group": "No AI",
        "pre": 5,
        "post": 4,
        "path": "5:4",
        "count": 2
      },
      {
        "group": "No AI",
        "pre": 1,
        "post": 2,
        "path": "1:2",
        "count": 2
      },
      {
        "group": "Iris",
        "pre": 2,
        "post": 4,
        "path": "2:4",
        "count": 2
      },
      {
        "group": "Iris",
        "pre": 4,
        "post": 3,
        "path": "4:3",
        "count": 2
      },
      {
        "group": "Iris",
        "pre": 1,
        "post": 4,
        "path": "1:4",
        "count": 2
      },
      {
        "group": "Iris",
        "pre": 3,
        "post": 3,
        "path": "3:3",
        "count": 2
      },
      {
        "group": "Iris",
        "pre": 4,
        "post": 6,
        "path": "4:6",
        "count": 2
      },
      {
        "group": "Iris",
        "pre": 3,
        "post": 6,
        "path": "3:6",
        "count": 2
      },
      {
        "group": "Iris",
        "pre": 1,
        "post": 0,
        "path": "1:0",
        "count": 2
      },
      {
        "group": "ChatGPT",
        "pre": 4,
        "post": 6,
        "path": "4:6",
        "count": 2
      },
      {
        "group": "ChatGPT",
        "pre": 1,
        "post": 5,
        "path": "1:5",
        "count": 2
      },
      {
        "group": "ChatGPT",
        "pre": 2,
        "post": 1,
        "path": "2:1",
        "count": 2
      },
      {
        "group": "ChatGPT",
        "pre": 4,
        "post": 4,
        "path": "4:4",
        "count": 2
      },
      {
        "group": "ChatGPT",
        "pre": 6,
        "post": 4,
        "path": "6:4",
        "count": 2
      },
      {
        "group": "ChatGPT",
        "pre": 6,
        "post": 5,
        "path": "6:5",
        "count": 2
      },
      {
        "group": "ChatGPT",
        "pre": 1,
        "post": 3,
        "path": "1:3",
        "count": 2
      },
      {
        "group": "ChatGPT",
        "pre": 2,
        "post": 5,
        "path": "2:5",
        "count": 2
      },
      {
        "group": "No AI",
        "pre": 2,
        "post": 3,
        "path": "2:3",
        "count": 3
      },
      {
        "group": "No AI",
        "pre": 2,
        "post": 2,
        "path": "2:2",
        "count": 3
      },
      {
        "group": "No AI",
        "pre": 0,
        "post": 3,
        "path": "0:3",
        "count": 3
      },
      {
        "group": "No AI",
        "pre": 2,
        "post": 4,
        "path": "2:4",
        "count": 3
      },
      {
        "group": "No AI",
        "pre": 3,
        "post": 1,
        "path": "3:1",
        "count": 3
      },
      {
        "group": "No AI",
        "pre": 5,
        "post": 5,
        "path": "5:5",
        "count": 3
      },
      {
        "group": "Iris",
        "pre": 4,
        "post": 4,
        "path": "4:4",
        "count": 3
      },
      {
        "group": "Iris",
        "pre": 5,
        "post": 6,
        "path": "5:6",
        "count": 3
      },
      {
        "group": "Iris",
        "pre": 5,
        "post": 5,
        "path": "5:5",
        "count": 3
      },
      {
        "group": "Iris",
        "pre": 0,
        "post": 3,
        "path": "0:3",
        "count": 3
      },
      {
        "group": "Iris",
        "pre": 1,
        "post": 3,
        "path": "1:3",
        "count": 3
      },
      {
        "group": "ChatGPT",
        "pre": 6,
        "post": 6,
        "path": "6:6",
        "count": 3
      },
      {
        "group": "ChatGPT",
        "pre": 0,
        "post": 3,
        "path": "0:3",
        "count": 3
      },
      {
        "group": "ChatGPT",
        "pre": 3,
        "post": 5,
        "path": "3:5",
        "count": 3
      },
      {
        "group": "ChatGPT",
        "pre": 1,
        "post": 0,
        "path": "1:0",
        "count": 3
      },
      {
        "group": "No AI",
        "pre": 2,
        "post": 1,
        "path": "2:1",
        "count": 4
      },
      {
        "group": "No AI",
        "pre": 0,
        "post": 2,
        "path": "0:2",
        "count": 4
      },
      {
        "group": "No AI",
        "pre": 3,
        "post": 5,
        "path": "3:5",
        "count": 4
      },
      {
        "group": "No AI",
        "pre": 6,
        "post": 6,
        "path": "6:6",
        "count": 4
      },
      {
        "group": "No AI",
        "pre": 3,
        "post": 3,
        "path": "3:3",
        "count": 4
      },
      {
        "group": "No AI",
        "pre": 4,
        "post": 4,
        "path": "4:4",
        "count": 4
      },
      {
        "group": "Iris",
        "pre": 2,
        "post": 3,
        "path": "2:3",
        "count": 4
      },
      {
        "group": "Iris",
        "pre": 5,
        "post": 4,
        "path": "5:4",
        "count": 4
      },
      {
        "group": "Iris",
        "pre": 0,
        "post": 1,
        "path": "0:1",
        "count": 4
      },
      {
        "group": "ChatGPT",
        "pre": 2,
        "post": 4,
        "path": "2:4",
        "count": 4
      },
      {
        "group": "ChatGPT",
        "pre": 5,
        "post": 6,
        "path": "5:6",
        "count": 4
      },
      {
        "group": "ChatGPT",
        "pre": 0,
        "post": 1,
        "path": "0:1",
        "count": 4
      },
      {
        "group": "ChatGPT",
        "pre": 3,
        "post": 4,
        "path": "3:4",
        "count": 4
      },
      {
        "group": "Iris",
        "pre": 1,
        "post": 2,
        "path": "1:2",
        "count": 5
      },
      {
        "group": "Iris",
        "pre": 2,
        "post": 2,
        "path": "2:2",
        "count": 5
      },
      {
        "group": "Iris",
        "pre": 3,
        "post": 4,
        "path": "3:4",
        "count": 5
      },
      {
        "group": "ChatGPT",
        "pre": 4,
        "post": 5,
        "path": "4:5",
        "count": 5
      },
      {
        "group": "ChatGPT",
        "pre": 1,
        "post": 1,
        "path": "1:1",
        "count": 5
      },
      {
        "group": "ChatGPT",
        "pre": 2,
        "post": 3,
        "path": "2:3",
        "count": 5
      },
      {
        "group": "No AI",
        "pre": 1,
        "post": 3,
        "path": "1:3",
        "count": 6
      },
      {
        "group": "Iris",
        "pre": 6,
        "post": 6,
        "path": "6:6",
        "count": 6
      },
      {
        "group": "Iris",
        "pre": 0,
        "post": 2,
        "path": "0:2",
        "count": 6
      },
      {
        "group": "ChatGPT",
        "pre": 3,
        "post": 3,
        "path": "3:3",
        "count": 6
      },
      {
        "group": "ChatGPT",
        "pre": 0,
        "post": 0,
        "path": "0:0",
        "count": 6
      },
      {
        "group": "No AI",
        "pre": 0,
        "post": 1,
        "path": "0:1",
        "count": 7
      },
      {
        "group": "Iris",
        "pre": 1,
        "post": 1,
        "path": "1:1",
        "count": 8
      },
      {
        "group": "ChatGPT",
        "pre": 1,
        "post": 2,
        "path": "1:2",
        "count": 8
      },
      {
        "group": "Iris",
        "pre": 0,
        "post": 0,
        "path": "0:0",
        "count": 9
      },
      {
        "group": "No AI",
        "pre": 0,
        "post": 0,
        "path": "0:0",
        "count": 16
      }
    ]
  },
  "transform": [
    {
      "fold": [
        "pre",
        "post"
      ],
      "as": [
        "time",
        "score"
      ]
    }
  ],
  "facet": {
    "column": {
      "field": "group",
      "sort": [
        "No AI",
        "Iris",
        "ChatGPT"
      ],
      "title": null,
      "header": {
        "labelFontSize": 17,
        "labelColor": "#17233c",
        "labelFontWeight": "bold",
        "labelPadding": 3
      }
    }
  },
  "spacing": 24,
  "spec": {
    "width": 130,
    "height": 140,
    "mark": {
      "type": "line",
      "strokeWidth": 2.5,
      "opacity": 1
    },
    "encoding": {
      "x": {
        "field": "time",
        "type": "ordinal",
        "sort": [
          "pre",
          "post"
        ],
        "title": null,
        "scale": {
          "padding": 0.2
        },
        "axis": {
          "labelFontSize": 13,
          "labelPadding": 4
        }
      },
      "y": {
        "field": "score",
        "type": "quantitative",
        "scale": {
          "domain": [
            0,
            6
          ],
          "nice": false
        },
        "title": "Correct items",
        "axis": {
          "values": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "labelFontSize": 13,
          "titleFontSize": 13,
          "labelPadding": 3,
          "titlePadding": 6
        }
      },
      "detail": {
        "field": "path",
        "type": "nominal"
      },
      "color": {
        "field": "count",
        "type": "quantitative",
        "scale": {
          "domain": [
            1,
            16
          ],
          "nice": false,
          "range": [
            "#b0bfd7",
            "#17233c"
          ]
        },
        "legend": {
          "title": [
            "Students",
            "on path"
          ],
          "orient": "right",
          "direction": "vertical",
          "gradientLength": 95,
          "titleLimit": 100,
          "values": [
            1,
            4,
            8,
            12,
            16
          ],
          "format": "d",
          "titleFontSize": 13,
          "labelFontSize": 12,
          "gradientThickness": 10,
          "offset": 10
        }
      },
      "tooltip": [
        {
          "field": "group",
          "title": "Group"
        },
        {
          "field": "pre",
          "title": "Pretest"
        },
        {
          "field": "post",
          "title": "Posttest"
        },
        {
          "field": "count",
          "title": "Students"
        }
      ]
    }
  },
  "resolve": {
    "scale": {
      "y": "shared",
      "color": "shared"
    }
  },
  "config": {
    "font": "Arial",
    "background": "white",
    "view": {
      "stroke": null
    },
    "axis": {
      "labelFontSize": 17,
      "titleFontSize": 18,
      "titlePadding": 12,
      "labelColor": "#263248",
      "titleColor": "#17233c",
      "gridColor": "#e6e8ed",
      "domainColor": "#a1a7b3",
      "labelPadding": 8,
      "labelAngle": 0
    },
    "title": {
      "fontSize": 22,
      "anchor": "start",
      "color": "#17233c",
      "offset": 18,
      "subtitleFontSize": 16,
      "subtitleColor": "#667085",
      "subtitlePadding": 8
    },
    "legend": {
      "labelFontSize": 15,
      "titleFontSize": 16,
      "orient": "bottom"
    }
  }
};
```

### 9. Supplement: pretest and posttest · chart output

```javascript
const pairedChart = document.createElement("div");
const pairedResult = await embed(pairedChart, pairedSpec,
  {actions: false, renderer: "svg"});
display(pairedChart);
invalidation.then(() => pairedResult.finalize());
```
