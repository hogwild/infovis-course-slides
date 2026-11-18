# Lecture 21：课件与五模块示例对照

当前课件共 45 页。第 1–14 页介绍概念、数据与文件结构；第 15 页开始按数据流讲解模块，先完成静态 Treemap，再添加 Tooltip；第 39 页是使用 AI 的课后练习，第 40–42 页提供实现提示，第 43–45 页是可运行的 Tree appendix。表中为 PDF 物理页码。代码摘录标明文件与行号；grouping controls 仍留给学生练习，Tree 已提供 tree.html 和 js/tree.js。

| 页码 | 主题 | 对应文件与行号 |
|---|---|---|
| 1 | Building Treemaps with D3 | 概念、图示或总结 |
| 2 | Today’s agenda | 基础讲解与独立教学例子 |
| 3 | Visualizing hierarchical data with treemaps | 基础讲解与独立教学例子 |
| 4 | Treemaps use a hierarchy of nodes | 基础讲解与独立教学例子 |
| 5 | The treemap pipeline in D3 | 基础讲解与独立教学例子 |
| 6 | d3.groups() organizes a flat table | 基础讲解与独立教学例子 |
| 7 | Example: region and country form two levels | 基础讲解与独立教学例子 |
| 8 | Convert grouped pairs into a tree object | 基础讲解与独立教学例子 |
| 9 | d3.hierarchy() creates nodes for layout | 基础讲解与独立教学例子 |
| 10 | Calculate rectangle bounds, then draw SVG | 基础讲解与独立教学例子 |
| 11 | Treemap configuration and tiling methods | 基础讲解与独立教学例子 |
| 12 | Three D3 operations have distinct roles | 基础讲解与独立教学例子 |
| 13 | The Titanic passenger dataset | 基础讲解与独立教学例子 |
| 14 | Project structure: five JavaScript modules | [项目说明](README.md)、[main.js](js/main.js) 及其导入的四个模块 |
| 15 | main.js connects the static pipeline | [main.js](js/main.js) |
| 16 | data.js loads and prepares passenger records | [data.js](js/data.js) |
| 17 | A raw CSV record becomes a typed object | [data.js](js/data.js)、[titanic.csv](data/titanic.csv) |
| 18 | buildTree() returns one summary node per call | [buildTree.js](js/buildTree.js) |
| 19 | d3.groups() returns keys paired with record arrays | [buildTree.js](js/buildTree.js)、[titanic.csv](data/titanic.csv) |
| 20 | One field partitions all 891 passenger records | [buildTree.js](js/buildTree.js) |
| 21 | The recursive step consumes one grouping field | [buildTree.js](js/buildTree.js) |
| 22 | An empty attributes array ends the recursion | [buildTree.js](js/buildTree.js) |
| 23 | Tracing calls: root, male, then Class 3 | [buildTree.js](js/buildTree.js) |
| 24 | Returned objects become the parent’s children | [buildTree.js](js/buildTree.js) |
| 25 | The completed tree has nine nodes and six leaves | [buildTree.js](js/buildTree.js) |
| 26 | treemap.js aggregates leaf counts for layout | [treemap.js](js/treemap.js) |
| 27 | The layout assigns four bounds to every node | [treemap.js](js/treemap.js) |
| 28 | drawTreemap() binds six nodes to six SVG groups | [treemap.js](js/treemap.js) |
| 29 | Rectangle size and color encode different values | [treemap.js](js/treemap.js) |
| 30 | Labels use the data bound to each SVG group | [treemap.js](js/treemap.js) |
| 31 | Parent outlines and the legend complete the chart | [treemap.js](js/treemap.js)、[styles.css](styles.css) |
| 32 | Back in main.js: configure and run the static chart | [main.js](js/main.js)、[index.html](index.html) |
| 33 | Two HTML containers display group details | [tooltip.html](tooltip.html)、[styles.css](styles.css) |
| 34 | addTooltips() connects cells to the containers | [main.js](js/main.js)、[interaction.js](js/interaction.js) |
| 35 | description(d) reads the group path and statistics | [interaction.js](js/interaction.js) |
| 36 | Event listeners connect the cells to show and hide | [interaction.js](js/interaction.js) |
| 37 | show() updates text, and hide() closes the tooltip | [interaction.js](js/interaction.js) |
| 38 | Tooltip position uses viewport coordinates | [interaction.js](js/interaction.js)、[styles.css](styles.css) |
| 39 | Practice: grouping controls | 课后练习：[tooltip.html](tooltip.html)、[main.js](js/main.js) 与既有五模块，无需提交 |
| 40 | HTML controls define the grouping order | 建议在 [tooltip.html](tooltip.html) 新增 select、button 和预览文本 |
| 41 | Events connect the controls to the chart | 建议在 [main.js](js/main.js) 新增 readAttributes、handleGroupingChange 并绑定 change/click |
| 42 | updateTreemap() runs the existing pipeline | 建议在 [main.js](js/main.js) 新增 updateTreemap，复用既有四个模块 |
| 43 | Appendix: trees reuse the same hierarchy | [tree.js](js/tree.js) 第 7–9 行，复用 data.js 和 buildTree.js |
| 44 | d3.tree() computes node positions | [tree.js](js/tree.js) 第 12–13 行；[tree.html](tree.html) 为运行入口 |
| 45 | SVG paths and circles draw the tree | [tree.js](js/tree.js) 第 20–28 行；第 16–17 行设置 SVG 绘图区 |

阅读顺序：main.js 概览 → data.js → buildTree.js → treemap.js → 回到 main.js 运行静态图 → interaction.js。
