# Lecture 20 assets

原始课件保持只读。以下文件从用户指定课件提取；页面保留可识别的原始作者/项目署名。无明确外部署名的课堂示意图不新增未经证实的作者。

- `file-system-tree.png` ← `network-26` (network-26-image41.png)
- `sentence-parse-tree.png` ← `network-27` (network-27-image20.png)
- `fictional-dragon-phylogeny.png` ← `network-28` (network-28-image14.png)
- `radial-tree.png` ← `network-29` (network-29-image32.png)
- `berkshire-portfolio.png` ← `treemap-3` (treemap-3-image32.png)
- `containment.png` ← `treemap-5` (treemap-5-image8.png)
- `partition.png` ← `treemap-5` (treemap-5-image18.png)
- `historical-disk-treemap.png` ← `treemap-8` (treemap-8-image5.png)
- `sales-profit-treemap.png` ← `treemap-10` (treemap-10-image4.png)
- `titanic-table.png` ← `treemap-17` (treemap-17-image2.png)
- `hive-flat-housing.png` ← `treemap-19` (treemap-19-image24.png)
- `hive-terraced-housing.png` ← `treemap-19` (treemap-19-image3.png)
- `hive-semi-detached-housing.png` ← `treemap-19` (treemap-19-image22.png)
- `hive-detached-housing.png` ← `treemap-19` (treemap-19-image15.png)
- `hive-neighborhood-first.png` ← `treemap-20` (treemap-20-image14.png)
- `hive-type-first.png` ← `treemap-21` (treemap-21-image6.png)
- `hive-geography.png` ← `treemap-23` (treemap-23-image29.png)
- `hive-sales-area.png` ← `treemap-24` (treemap-24-image25.png)
- `shanghai-cases.png` ← `treemap-25` (treemap-25-image9.png)
- `slice-dice-example.png` ← `treemap-27` (treemap-27-image20.png)
- `squarified-example.png` ← `treemap-27` (treemap-27-image19.png)
- `newsmap.png` ← `treemap-29` (treemap-29-image26.png)
- `stock-market-map.png` ← `treemap-30` (treemap-30-image16.png)
- `voronoi-treemap.png` ← `treemap-31` (treemap-31-image28.png)
- `circle-packing.png` ← `treemap-32` (treemap-32-image21.png)
- `sunburst.png` ← `treemap-35` (treemap-35-image23.png)
- `icicle.png` ← `treemap-36` (treemap-36-image35.png)
- `hierarchy-methods-summary.png` ← `treemap-37` (treemap-37-image31.png)

HiVE: Slingsby, Dykes & Wood (2009), https://www.gicentre.net/hive
Treemap: Ben Shneiderman / HCIL, https://www.cs.umd.edu/projects/hcil/treemap/
D3 hierarchy: https://d3js.org/d3-hierarchy

`fictional-dragon-phylogeny.png` retains the original image credit “by Tech”; taxa are fictional.

2026-11-12 原样迁移修订：`original-tree-structure.svg` 按旧24页原始形状坐标转换，保持15节点/14边/四个标签；`radial-tree-of-life.png` 为旧29页第二张原图，二进制原样提取。

`treemap-slice-dice-original.png`：旧版 `12_Treemaps.pptx` 第6页完整示意图截图（Keynote临时副本导出PDF、1920×1080渲染后裁切313,224–1607,721），保留PPTX原生叠加数字。原课件未修改。

`slice-dice-step-1.svg` 至 `slice-dice-step-4.svg`：参考旧版 Treemaps 第7页手绘图重绘的可编辑过程图，保留15→9/6→右1/2/3→左3/3/3的顺序，几何按值精确分配。`slice-dice-demo.js` 提供完全本地的逐步切换。

`slice-dice-sequence-column.svg`：用于“Making a treemap”页PDF左栏的纵向四步图，图形比例及步骤顺序与原四步图一致。

运行依赖：Markdown直接引用`slice-dice-demo.js`；脚本动态加载`slice-dice-step-1.svg`至`slice-dice-step-4.svg`。这些步骤图与PDF静态fallback都属于当前课件必需素材。
