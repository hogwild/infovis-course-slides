# Titanic Treemap：五模块实验与 Tree 附录

这是 Lecture 21 的学生示例。五个核心模块先绘制静态 Treemap，再给相同矩形添加 Tooltip；附录用独立入口绘制 Tree，复用已有数据模块。只使用 HTML、CSS、JavaScript 和 D3；不需要 React、npm 或构建工具。

## 运行

解压并进入本项目文件夹（包含 `index.html` 的目录），运行：

```sh
python3 -m http.server 8000
```

- 阶段 1：打开 http://localhost:8000/ （`index.html`）。
- 阶段 2：打开 http://localhost:8000/tooltip.html 。
- Tree 附录：打开 http://localhost:8000/tree.html ，也可以点击页面导航中的 **Appendix: Tree**。
- 按 `Ctrl+C` 关闭服务器。

请通过 HTTP 打开，不要双击 HTML。浏览器的 ES modules 和 CSV 请求受本地文件访问限制。若 8000 端口已被占用，可将命令和 URL 的端口同时换成 8001。

数据与 D3 都已随项目提供，启动本地服务器后无需外网。`preview/static-treemap.png` 是阶段 1 的预览，可直接查看。

## 项目文件

```text
student-example/
├── index.html              # 阶段 1：静态图形
├── tooltip.html            # 阶段 2：同一图形 + Tooltip
├── tree.html               # 附录：节点与父子连线
├── styles.css              # 页面与图形样式
├── README.md
├── SLIDE-MAP.md            # 幻灯片与项目对照
├── js/
│   ├── main.js             # 入口：组织完整流程
│   ├── data.js             # 加载、检查、清洗数据
│   ├── buildTree.js        # 递归创建普通树对象
│   ├── treemap.js          # 计算坐标、绘制 SVG、颜色和图例
│   ├── interaction.js      # Tooltip、悬停高亮、持续详情
│   └── tree.js             # 附录入口：复用 data/buildTree，绘制 Tree
├── data/
│   ├── titanic.csv         # 原始 CSV
│   └── README.md           # 来源、字段及缺失值策略
├── lib/
│   ├── d3.v7.9.0.min.js    # 第三方 D3 库，不属于五个教学模块
│   └── LICENSE-D3
└── preview/
    ├── static-treemap.png  # 浏览器实际渲染的静态预览
    └── static-treemap.svg  # 自包含 SVG，可独立查看
```

## 阶段 1：从 CSV 到静态图形

先读 `main.js`，找到以下四步。暂时跳过 `addTooltips()` 的调用。

```js
const rows = await loadData("data/titanic.csv");
const treeData = buildTree(rows, ["Sex", "Pclass"]);
const root = computeLayout(treeData, width, height);
const cells = drawTreemap(svg, root);
```

随后依次阅读：

1. **`data.js`**：`d3.csv()` 读取字符串；将 `Survived` 和 `Age` 转成数字，缺失年龄保留为 `null`。派生 `AgeGroup`，但默认图形只按 Sex 和 Pclass 分组。输入异常会报错，不会静默丢弃记录。
2. **`buildTree.js`**：通过 `d3.groups()` 按第一个属性分组，对剩余属性递归；属性数组为空时返回叶节点。这里的叶节点是一组乘客，并非单个乘客。返回对象包含 `name/count/survived/rate/children`，尚无坐标。
3. **`treemap.js`**：先用 `d3.hierarchy()`、`.sum()`、`.sort()`、`d3.treemap()` 计算布局，再用 `.data().join()` 创建 SVG 元素。布局计算和 DOM 绘制分成两个函数。颜色和图例也由此模块负责。

面积编码人数；颜色编码生存率。内部节点虽然保存 count，但 `.sum(d => d.children ? 0 : d.count)` 只累加叶节点，避免重复计数。生存率用本组生还人数除以本组人数，不能通过相加子组生存率得到。

静态页不绑定指针事件。图形用 `aria-label` 提供名称、用 `desc` 提供详细说明，避免 SVG `<title>` 触发浏览器原生提示，与阶段 2 的自定义 Tooltip 重叠。先检查图形本身：2 个 Sex 分支，6 个 Sex–Pclass 叶节点。

打开浏览器 DevTools → Console，可以检查：

```js
lab.rows.length                 // 891
lab.treeData                    // 普通树对象
lab.root.value                  // 891
lab.root.data.survived          // 342
lab.root.leaves().length        // 6
lab.root.leaves()[0]            // parent、data、value、x0/y0/x1/y1
```

## 阶段 2：添加 Tooltip

`tooltip.html` 复用相同数据、建树、布局和绘制代码，只增加两个 HTML 元素，并将 body 的 `data-stage` 设为 `tooltip`：

```html
<p id="detail" aria-live="polite"></p>
<div id="tooltip" role="tooltip" hidden></div>
```

`main.js` 根据这个阶段标识调用：

```js
addTooltips(cells, "#tooltip", "#detail");
```

`main.js` 传入 CSS 选择器字符串，`interaction.js` 用 `d3.select()` 找到容器。参数名 `tooltipElement` 和 `detailElement` 沿用原实现，但这里接收的是字符串；测量提示框时用 `tooltip.node().getBoundingClientRect()` 取得实际 DOM 元素的尺寸。

阅读 `interaction.js` 时关注：

- `cells.on(...)` 给既有矩形组绑定事件，回调接收 `(event, d)`。
- `d.ancestors()` 获取完整分组路径；`d.data` 提供人数、生还人数和生存率。
- `pointerenter/pointermove` 显示并定位提示框，`pointerleave` 隐藏。
- Tooltip 使用 `position: fixed`，因此使用 `clientX/clientY`；边界处理防止提示框超出窗口。
- `text()` 将数据作为文本写入；`pointer-events: none` 防止 Tooltip 挡住图形。
- 指针离开矩形后隐藏浮动提示，图下方的 `#detail` 保留最近一次详情。

**两阶段的矩形位置、面积、颜色完全一致，差别仅在事件与详情显示。**

## 建议练习

1. 在 `main.js` 中把属性顺序改为 `["Pclass", "Sex"]`，刷新页面。说明嵌套关系如何变化，以及为什么仍然有 891 人、342 名生还者。
2. 在 `computeLayout()` 中改变 padding，观察矩形间距。注意面积比例会受到留白影响。
3. 找出“female → Class 1”：94 人，91 人生还，生存率 96.8%。
4. 在阶段 2 注释掉 `addTooltips()` 调用，验证静态图仍然正常显示。
5. 修改 `description()`，先显示人数，再显示完整路径。

此入门版固定为两层、Squarify 布局，不加入下拉菜单或动画，以便先理解静态绘图与事件绑定。扩展到三层年龄分组或其他布局时，需要相应调整小矩形标签和留白。

## AI 课后练习：选择分组字段与顺序

Lecture 21 第 39 页是课后练习，第 40–42 页提供实现提示，无需提交答案。可以使用 AI 工具扩展 `tooltip.html` 和现有五模块项目，尝试以下功能：

- 从 `Sex`、`Pclass`、`AgeGroup` 中选择 1–3 个字段，不允许重复或全部为空；用上移/下移按钮或有序选择框调整顺序。
- 在页面显示当前顺序，点击 **Update treemap** 后重新建树、计算布局并绘制；给新生成的 `cells` 重新绑定 Tooltip。面积继续表示人数，颜色继续表示生还率。
- 直接使用 `data.js` 已有的 `AgeGroup`，无需调整数据处理代码。现有分组是左闭右开的十岁区间，例如 `20–30` 表示 20≤Age<30；80 岁属于 `80–90`，缺失年龄属于 `Unknown`。
- 比较 `["Sex", "Pclass", "AgeGroup"]` 与 `["Pclass", "Sex", "AgeGroup"]`。两种顺序中的 female/Class 1/20–30 都是 16 人、15 人生还，但父子路径和布局不同。
- 自行检查单字段、重复/空选择与多次更新。总人数保持 891、生还者 342、缺失年龄 177；多次更新后仍只有一个图形和一个图例，Tooltip 正常。

练习时可以追踪控件如何形成并传递 `attributes`，观察分组顺序对层级的影响。无需提交项目、截图、文字答案或 AI 提示记录。

### Grouping controls 实现提示

- 在 `tooltip.html` 的图表前添加三个带 label 的 select，使用不同 id（`field-1`、`field-2`、`field-3`）和共同类 `group-field`。每个都提供 None、Sex、Pclass、AgeGroup；初值为 Sex、Pclass、None。再添加 `#update` 按钮和 `#grouping-preview` 文本。
- 建议新增 `readAttributes()`，按三个 select 的 DOM 顺序读取 value 并排除空值，返回分组字段数组。
- select 的 `change` 事件调用建议新增的 `handleGroupingChange()`，检查至少一个字段且没有重复，更新待应用顺序或错误提示，并设置 Update 按钮的 disabled 状态。
- 点击 Update 时调用建议新增的 `updateTreemap(rows, readAttributes())`，依次使用 `buildTree()`、`computeLayout()`、`drawTreemap()` 和 `addTooltips()`，并更新已应用顺序 `#hierarchy`。选择字段先更新预览，点击按钮才更新图形。
- 在 `main()` 加载 rows 后绑定事件，并调用更新函数完成首次绘制。CSV 与图例只初始化一次；更新时同步 summary 和 SVG 名称，隐藏旧 Tooltip、重置 detail，并给新 cells 绑定交互。把控件分支限定在 `tooltip.html`，保留静态入口原有流程。

这些是建议新增的控件和函数；当前 starter 代码仍保持原样，便于自行完成练习。

## Appendix：用相同层级绘制 Tree

Lecture 21 第 43–45 页介绍一个简短的 node-link tree 示例：先复用 `loadData()`、`buildTree(rows, ["Sex", "Pclass"])`，再调用 `d3.hierarchy(treeData)`。这些步骤与 treemap 共用；tree 布局本身不要求调用 `.sum()`。

`d3.tree().size([width, height])(root)` 为节点添加 `x` 和 `y`。使用 `root.links()` 和 `d3.linkVertical()` 绘制父子连线，再用 `root.descendants()` 绘制全部节点及标签。该 Titanic 两层分组有 9 个节点、8 条连线。Appendix 已提供可运行代码，原有五个 Treemap 核心模块保持不变。

运行 [tree.html](tree.html)，阅读 [js/tree.js](js/tree.js)：

- 第 7–9 行：加载、分组、创建 D3 层级节点，与第 43 页对应。
- 第 12–13 行：用 `d3.tree()` 计算坐标，与第 44 页对应。
- 第 16–17 行：创建有边距的 SVG 绘图区。
- 第 20–28 行：先画 8 条连线，再画 9 个圆形和标签，与第 45 页对应。

`tree.js` 是五个 Treemap 核心模块之外的附录脚本，直接导入现有 `data.js` 和 `buildTree.js`。圆形大小相同，不编码人数或生还率；Tree 页不添加 Tooltip。小屏幕可以在图框内横向滚动。

浏览器 Console 中可以查看 `lab.treeData`、`lab.root.descendants()` 和 `lab.root.links()`。Tree 的 `lab.root.value` 为 `undefined`，因为没有调用 `.sum()`；人数仍在 `lab.root.data.count` 中。

## 参考

- [D3 grouping](https://d3js.org/d3-array/group)
- [D3 hierarchy](https://d3js.org/d3-hierarchy/hierarchy)
- [D3 treemap](https://d3js.org/d3-hierarchy/treemap)
- [D3 tree](https://d3js.org/d3-hierarchy/tree)
- [D3 link generators](https://d3js.org/d3-shape/link)
- [D3 data join](https://d3js.org/d3-selection/joining)
- [D3 events](https://d3js.org/d3-selection/events)

## 对照 Lecture 21

当前课件共 45 页。第 1–14 页介绍基础概念、Titanic 数据集和项目结构。后续讲解按以下顺序展开，详见 [SLIDE-MAP.md](SLIDE-MAP.md)：

- 第 15 页：`main.js` 概览完整静态流程。
- 第 16–17 页：`data.js` 加载、清洗和实际记录的前后对照。
- 第 18–25 页：`buildTree.js`，重点讲 `d3.groups()`、解构、递归调用、终止与返回过程。
- 第 26–31 页：`treemap.js`，从 D3 节点到布局坐标、SVG、标签与图例。
- 第 32 页：回到 `main.js`，运行静态图。
- 第 33 页：用实际示例截图标出 `#tooltip` 浮动提示与 `#detail` 持续详情的位置，说明两个容器的作用。
- 第 34 页：`main.js` 把已有矩形组和两个选择器字符串传给 `addTooltips()`，再由 `d3.select()` 找到容器。
- 第 35–38 页：`interaction.js` 的提示内容、指针事件、定位和持续详情。
- 第 39 页：AI 课后练习，扩展字段选择与顺序，复用已有 AgeGroup，无需提交。
- 第 40–42 页：HTML 控件、change/click 事件和 updateTreemap 更新流程的实现提示。
- 第 43–45 页：Tree appendix，共用层级处理、计算节点坐标、绘制连线和节点。

第 19 页的小样本取数据集的前四条记录。`r1`、`maleRows`、`class3Rows` 等仅为讲解时给数组或对象起的别名；实际递归函数使用 `group` 参数。Treemap 以五个核心模块为准，Tree 附录以 `js/tree.js` 为准。
