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
