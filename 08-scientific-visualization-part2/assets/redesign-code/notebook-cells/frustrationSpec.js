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
