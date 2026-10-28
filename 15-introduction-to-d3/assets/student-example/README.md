# Lecture 15 · Citi Bike 条形图示例

两个完整示例使用相同数据和布局，分别对应课件中的 forEach 绘图与 D3 数据绑定。两者均包含日期标签和骑行次数标签。

## 用 VS Code 打开

1. 解压 ZIP，保留整个 `example` 文件夹。
2. 在 VS Code 中选择 **File → Open Folder…**，打开 `example`。
3. 用浏览器打开根目录的 `index.html`，点击链接查看两个示例。也可直接打开任一示例目录下的 `index.html`。
4. 在 VS Code 中编辑对应目录的 `chart.js`，保存后刷新浏览器。
5. 如果已经安装 Live Server 扩展，可右键 HTML → **Open with Live Server**；它不是必需的。

无需 npm、Node.js、Python、构建或下载依赖；本地 D3 库随包提供，离线即可运行。参考文档链接需要联网。

## 目录

```text
example/
  index.html                 两个示例的入口
  README.md                  本说明
  lib/
    d3.v7.9.0.min.js          本地 D3 库
    LICENSE-D3               官方许可证
  01-forEach/
    index.html               HTML 与 SVG 容器
    chart.js                 循环逐条创建矩形和文字
    style.css                页面样式
  02-data-binding/
    index.html               HTML 与 SVG 容器
    chart.js                 数据绑定创建矩形和文字
    style.css                与第一个示例相同的样式
```

分享时复制整个 example，而不是只复制某一个 HTML；两个示例通过 `../lib/` 使用同一个本地 D3 库。

## 阅读代码

- `daily`：三个日期的真实骑行数，299、219、149。
- `x`：线性比例尺，将0–400次骑行映射到0–320 pixels（像素）。
- `01-forEach`：用 JavaScript 的 forEach 逐条调用 D3 的 append、attr、text。
- `02-data-binding`：selectAll选择元素，data匹配数据，enter访问未匹配记录的占位，append创建元素，attr将数据变成位置与宽度。
- 属性回调中的 `d` 是当前矩形绑定的记录；`i` 是本例选择中的索引0、1、2。
- 日期和计数标签分别用 `.date-label` 与 `.count-label` 选择，避免两组text互相匹配。
- 两种版本都使用 D3；差别在于显式循环或数据绑定。

程序从空SVG开始，每次页面加载运行一次。修改后刷新浏览器；不要反复向同一SVG粘贴执行追加代码。这里仅演示首次绘图，enter链本身不负责更新已有矩形或移除多余元素。

## 检查结果

两个版本都应有3根蓝色条形和6个文字标签：

| 日期 | 次数 | i | y | 宽度 |
|---|---:|---:|---:|---:|
| Apr 1 | 299 | 0 | 40 | 239.2 |
| Apr 2 | 219 | 1 | 100 | 175.2 |
| Apr 3 | 149 | 2 | 160 | 119.2 |

所有矩形x=100、高度=30。SVG设置width="520"、height="240"，画布大小为520×240 CSS像素。左右各留100 pixels（像素）给日期与计数，条形可用宽度为520−100−100=320，因此scale的range为[0,320]。改变显示尺寸不自动改变range；若调整内部绘图区，应相应调整range。JavaScript浮点数可能显示很小的尾数差异。

可以把两份代码中的 steelblue 改成其他颜色，再刷新比较；也可把行距60改成65，观察位置变化。

## 数据与许可

数据为Citi Bike Jersey City 2020年4月1–3日教学子集，总667次；原始整月数据为9268次。已按课程CSV的starttime日期统计核对。仅使用三个汇总记录，无需额外CSV或网络请求。这些记录描述该时段骑行模式，不能单独证明lockdown前后变化或因果关系。

- 数据：https://citibikenyc.com/system-data
- D3：https://d3js.org/
- 数据绑定：https://d3js.org/d3-selection/joining

本包使用现有D3 7.9.0本地文件并保留文件头，官方ISC许可证附于 `lib/LICENSE-D3`，来源：https://github.com/d3/d3/blob/v7.9.0/LICENSE 。
