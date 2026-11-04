# Blog 书架

主页 Blog 使用 Tech 技术和随笔 Essays 两本书。桌面悬停翻开，手机轻点打开；支持键盘和关闭按钮。没有文章时展示待续页，不发布示例文章。

组件来源：WD7ang/WD7ang.github.io，提交 `108606fd75adf80b856023c33dc6d2d8bbd77446`。
https://github.com/WD7ang/WD7ang.github.io/tree/108606fd75adf80b856023c33dc6d2d8bbd77446
原组件的 MIT 许可保存在 `docs/blog-component-LICENSE.txt`。
保留原书封、材质、动画、列表及阅读页面；替换书封署名，并增加随笔分类的空白页文案。

## 添加文章

在 `_posts/` 新建 `YYYY-MM-DD-your-title.md`。文章会按日期自动进入相应书册，封面和内页的篇数也会更新。日期不可晚于实际发布日期。

技术文章开头：

```yaml
---
title: 技术文章标题
title_en: Technical article title
date: 2026-11-05
categories: [tech]
layout: academic-post
lang: zh-CN
excerpt: 中文摘要
excerpt_en: English summary
---
```

随笔文章开头及正文结构：

```markdown
---
title: 随笔标题
title_en: Essay title
date: 2026-11-05
categories: [essays]
layout: essay
lang: zh-CN
excerpt: 中文摘要
excerpt_en: English summary
---

<section class="essay-language" id="essay-zh" lang="zh-CN" markdown="1">
## 中文

中文正文。
</section>

<section class="essay-language" id="essay-en" lang="en" markdown="1">
## English

English text.
</section>
```

可选 `cover: /images/your-cover.jpg`；未提供时会使用组件内置图形。
作者默认采用网站署名，也可以在文章头部显式填写 `author`。
Blog 书封与参考站一样同时展示中英文；主页的默认语言及手动切换保持不变。
