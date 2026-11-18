# Titanic 数据

使用教师提供的 [hogwild / titanic.csv](https://gist.github.com/hogwild/2ac0f0b665b4295e0574c85c12bec092)。

固定版本下载地址：
https://gist.githubusercontent.com/hogwild/2ac0f0b665b4295e0574c85c12bec092/raw/8cee439ac896703d2c95cb805f44bf07d74e933b/titanic.csv

2026-11-16 下载，CSV 保持原样；学生示例直接复用同一份文件。该文件有 891 条记录，342 人生还，177 条年龄缺失；不代表全船全部人员。本项目不额外声明数据许可证。

| 字段 | 本实验的使用方式 |
|---|---|
| PassengerId | 唯一记录 ID，转为整数 |
| Sex | 第一层分组：male / female |
| Pclass | 第二层分组：Class 1 / Class 2 / Class 3 |
| Age | 数值；空字符串保留为 null，不转换成零 |
| Survived | 0 或 1，可通过求和计算生还人数 |
| AgeGroup | 派生字段；十岁区间，左闭右开；缺失为 Unknown |

人数作为面积权重；生存率 = 当前组生还人数 / 当前组人数，用固定 [0,1] 的蓝色顺序色表示。所有 891 条记录均保留，默认两层图不依赖 Age。原始 CSV 中其他字段不参与绘图。
