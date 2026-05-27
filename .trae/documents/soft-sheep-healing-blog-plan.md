# 软萌懒羊羊治愈风个人博客实施计划

## Summary

本计划用于指导后续开发一个具有强烈个人风格的 Astro 个人博客网站。网站参考 Rhine's Blog 的优秀设计逻辑：强个人识别、沉浸式首屏、卡片化内容、丰富但不干扰的动效、响应式布局、个人兴趣模块与技术内容并存；但不复刻其二次元玻璃风，而是转化为用户指定的“软萌懒羊羊治愈风、奶黄治愈配色、卡通圆润质感”。

最终目标是构建一个兼具“温柔个人气质”和“长期内容维护能力”的博客系统，承载：

- 技术文章
- 生活记录
- 作品展示
- 兴趣收藏

技术路线采用 Astro，优先利用 Astro 的静态生成、内容集合、Markdown / MDX 内容管理和 View Transitions，减少不必要客户端 JavaScript，同时保留丰富但克制的动效体验。

本计划只定义后续实施方案，不在当前阶段执行开发。

---

## Current State Analysis

### 1. 用户目标

用户希望设计开发一个具有强烈个人风格的博客网站。目标不是完整复刻参考网站，而是吸收其个人风格设计逻辑，并结合已发现的优化点进行重新设计。

用户已确认关键方向：

- 视觉风格：软萌懒羊羊治愈风，奶黄治愈配色，卡通圆润质感
- 内容定位：技术文章、生活记录、作品展示、兴趣收藏
- 动效强度：丰富但克制
- 技术路线：Astro

### 2. Rhine's Blog 可借鉴逻辑

此前分析 Rhine's Blog 得到以下可借鉴点：

1. **强个人识别**
   - 不是普通模板博客，而是通过背景、头像、卡片、动效、Live2D、鼠标特效等建立个人气质。

2. **沉浸式首屏**
   - 大背景、居中标题、打字机副标题、滚动提示，形成进入个人空间的感觉。

3. **卡片化内容组织**
   - 文章、作者信息、分类、标签、公告等被组织为视觉统一的卡片。

4. **丰富交互动效**
   - 滚动渐入、卡片悬浮、图片放大、点击粒子、鼠标拖尾、主题切换、回到顶部等。

5. **个性模块增强人格表达**
   - 追番、友链、关于、标签等模块让网站更像“个人空间”。

6. **优化方向**
   - 避免资源过重。
   - 避免 CDN 不稳定。
   - 移动端应降低动画复杂度。
   - 动效需支持 `prefers-reduced-motion`。
   - 阅读页应比首页更克制。
   - 关键资源应本地化或按需加载。

### 3. 当前文件状态

当前用户选择的文件夹中已有若干 HTML 和文档文件，但没有发现完整 Astro 项目结构。后续开发应根据用户确认从零创建或在指定项目中实施。

可见文件包括：

- `index.html`
- `blog.html`
- `template.html`
- `blessing_preview.png`
- `mobile_preview.png`
- `国风2D搞笑动画PRD文档.docx`
- `.trae/documents/mothers-day-page-optimization-plan.md`

因此，本计划默认后续将新建一个 Astro 项目结构；若用户后续要求基于现有 HTML 改造，则应先重新读取现有文件后再局部调整计划。

### 4. Skill 工作流约束

用户指定使用 `brainstorming`。该 Skill 的关键要求是：

- 先理解用户意图和约束，再规划。
- 进行视觉方向和设计选择澄清。
- 提供 2-3 个方向或方案，并说明推荐理由。
- 在实施前形成设计与计划文档。
- 不直接进入实现。

本计划已遵循该思路：先确认风格、内容、动效、技术路线，再给出可执行实施方案。

---

## Proposed Changes

以下为后续实施时建议创建或修改的文件、目的与实现方式。

---

### 1. 项目基础结构

#### 文件 / 目录

```txt
astro.config.mjs
package.json
tsconfig.json
src/
  content.config.ts
  layouts/
  pages/
  components/
  styles/
  scripts/
public/
  images/
  icons/
  fonts/
```

#### What

创建一个 Astro 静态博客项目，使用内容集合管理博客、生活记录、作品、收藏等内容。

#### Why

Astro 适合内容型站点，支持 Markdown / MDX、静态生成、局部客户端交互和 View Transitions，能满足“个人博客 + 高性能 + 丰富但克制动效”的需求。

#### How

后续执行阶段使用 Astro 项目结构，并确保：

- 页面尽量静态生成。
- 交互脚本只在必要位置加载。
- 内容通过 `src/content.config.ts` 定义 schema。
- 全局视觉变量在 `src/styles/tokens.css` 中集中管理。

---

### 2. 内容集合配置

#### 文件

```txt
src/content.config.ts
src/content/blog/
src/content/life/
src/content/projects/
src/content/collections/
```

#### What

定义四类内容集合：

1. `blog`：技术文章
2. `life`：生活记录
3. `projects`：作品展示
4. `collections`：兴趣收藏

#### Why

用户希望博客承载多种内容，不应将所有内容混在同一个文章列表中。内容集合可以保证字段统一、类型安全、后续筛选和首页聚合更方便。

#### How

建议字段如下。

##### `blog`

```ts
{
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  category: string;
  draft: boolean;
  cover?: string;
  featured: boolean;
}
```

##### `life`

```ts
{
  title: string;
  description?: string;
  pubDate: Date;
  mood?: string;
  tags: string[];
  cover?: string;
  draft: boolean;
}
```

##### `projects`

```ts
{
  title: string;
  description: string;
  pubDate: Date;
  role?: string;
  techStack: string[];
  cover?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status: 'idea' | 'building' | 'done' | 'archived';
}
```

##### `collections`

```ts
{
  title: string;
  description?: string;
  type: 'book' | 'anime' | 'game' | 'tool' | 'website' | 'music' | 'other';
  rating?: number;
  tags: string[];
  link?: string;
  cover?: string;
  favorite: boolean;
}
```

---

### 3. 全局视觉系统

#### 文件

```txt
src/styles/tokens.css
src/styles/global.css
src/styles/animations.css
```

#### What

建立网站的设计 token、全局样式和动画规则。

#### Why

该网站的强个人风格应通过系统化视觉变量实现，而不是零散写死颜色和圆角。后续调整奶黄深浅、动效强度、暗色模式时会更方便。

#### How

##### 推荐色彩方向

```css
:root {
  --color-cream-bg: #fff8dc;
  --color-milk: #fffdf5;
  --color-butter: #ffe8a3;
  --color-honey: #f7c948;
  --color-sheep-wool: #fffaf0;
  --color-soft-brown: #8a6a3f;
  --color-caramel: #c98b3a;
  --color-grass-soft: #cfe8b8;
  --color-sky-soft: #cdefff;
  --color-pink-soft: #ffd6df;

  --text-main: #5f4b32;
  --text-muted: #9b805d;

  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 28px;
  --radius-pill: 999px;

  --shadow-soft: 0 12px 30px rgba(138, 106, 63, 0.12);
  --shadow-card: 0 8px 20px rgba(138, 106, 63, 0.1);
}
```

##### 视觉关键词

- 奶黄
- 奶白
- 焦糖棕
- 浅草绿
- 柔和天空蓝
- 圆润卡片
- 贴纸标签
- 小羊 / 云朵 / 草地 / 星星 / 奶油边框

##### 字体建议

```css
body {
  font-family:
    "LXGW WenKai Screen",
    "Noto Sans SC",
    "Microsoft YaHei",
    system-ui,
    sans-serif;
}
```

标题可使用更圆润的字体，但要避免正文可读性下降。

---

### 4. 资源与图片上传规划

#### 文件 / 目录

```txt
public/images/sheep/
public/images/covers/
public/images/decorations/
public/images/projects/
public/images/life/
public/icons/
public/favicon.svg
```

#### What

规划图片和装饰资源目录，用于后续上传头像、文章封面、生活记录图片、项目图、装饰图等。

#### Why

用户提到后续会涉及图片上传和界面设计。提前规划资源目录可以减少混乱，并支持不同内容类型使用不同默认封面。

#### How

建议创建以下资源类型：

```txt
sheep-avatar.svg              原创小羊头像
sheep-mascot-sleeping.svg     困困小羊吉祥物
cloud-soft.svg                云朵装饰
grass-patch.svg               草地装饰
star-sticker.svg              星星贴纸
default-post-cover.webp       技术文章默认封面
default-life-cover.webp       生活记录默认封面
default-project-cover.webp    项目默认封面
milk-yellow-pattern.svg       奶黄纹理背景
```

重要决策：不直接使用“懒羊羊”官方形象，避免版权风险。应设计原创小羊吉祥物，只借鉴“软萌、困困、治愈、圆润”的气质。

---

### 5. 基础布局

#### 文件

```txt
src/layouts/BaseLayout.astro
src/layouts/PostLayout.astro
```

#### What

创建全局布局和文章详情布局。

#### Why

不同页面需要统一的 Header、Footer、背景装饰、SEO、主题切换、页面转场；文章页需要单独优化阅读体验。

#### How

##### `BaseLayout.astro`

负责：

- HTML 结构
- SEO 基础 meta
- 引入全局 CSS
- Header / Footer
- 背景装饰层
- Astro View Transitions
- 动效偏好支持

##### `PostLayout.astro`

负责：

- 文章标题
- 发布日期 / 更新时间
- 标签
- 封面图
- 正文容器
- 目录
- 阅读进度
- 上一篇 / 下一篇

文章正文宽度建议控制在 `680px - 760px`，行高约 `1.8`，避免装饰元素干扰阅读。

---

### 6. 核心组件

#### 文件

```txt
src/components/site/Header.astro
src/components/site/Footer.astro
src/components/site/ThemeToggle.astro
src/components/site/MobileMenu.astro
src/components/site/BackToTop.astro

src/components/home/HeroSheep.astro
src/components/home/RecentPosts.astro
src/components/home/LifeMoments.astro
src/components/home/ProjectShelf.astro
src/components/home/CollectionBox.astro

src/components/cards/PostCard.astro
src/components/cards/LifeCard.astro
src/components/cards/ProjectCard.astro
src/components/cards/CollectionCard.astro

src/components/blog/PostToc.astro
src/components/blog/ReadingProgress.astro
src/components/ui/SoftCard.astro
src/components/ui/StickerTag.astro
src/components/ui/CuteButton.astro
```

#### What

将页面拆分为清晰、可复用的组件。

#### Why

网站既有多个内容类型，又有统一的视觉语言。组件化能避免重复样式，也方便后续维护。

#### How

##### `Header.astro`

- 桌面端显示完整导航。
- 移动端显示 Logo + 菜单按钮。
- 滚动后变成奶白半透明或轻柔阴影状态。
- 当前栏目使用奶黄胶囊高亮。

##### `HeroSheep.astro`

- 首页首屏核心记忆点。
- 包含原创小羊吉祥物、欢迎语、打字机短句或轮换文案、快速入口。
- 背景可使用云朵、草地、圆点纹理。

建议文案方向：

```txt
慢慢写代码，也慢慢记录生活。
这里是我的小羊草地，放着技术、日常和喜欢的东西。
```

##### `PostCard.astro`

- 用于技术文章列表和首页最近文章。
- 信息包括标题、摘要、标签、发布日期、分类、封面。
- Hover 轻微上浮，不做过强动画。

##### `CollectionCard.astro`

- 做成贴纸或收藏盒卡片。
- 支持类型、评分、标签、封面。

---

### 7. 页面设计

#### 文件

```txt
src/pages/index.astro
src/pages/blog/index.astro
src/pages/blog/[...slug].astro
src/pages/life/index.astro
src/pages/life/[...slug].astro
src/pages/projects/index.astro
src/pages/collections/index.astro
src/pages/about.astro
```

#### What

建立主要页面。

#### Why

用户内容定位较丰富，需要清晰入口，而不是把所有内容混成普通文章流。

#### How

##### 首页 `index.astro`

页面结构建议：

```txt
Hero：小羊欢迎区
最近在写：技术文章
最近在过：生活记录
最近在做：作品展示
最近喜欢：兴趣收藏
页脚：个人链接 / 版权 / 简短签名
```

首页模块命名应人格化，但导航仍保持清晰：

- 技术文章：慢慢写代码
- 生活记录：生活小草堆
- 作品展示：作品小橱窗
- 兴趣收藏：兴趣收藏盒

##### 技术文章页

- 列表页支持标签和分类展示。
- 详情页重点保证阅读体验。
- 代码块应有圆角、浅奶黄背景或柔和暗色模式。

##### 生活记录页

- 更像日记 / 相册。
- 支持心情标签 `mood`。
- 图片可采用更大圆角和相册式排版。

##### 作品展示页

- 项目状态使用更可爱的文案：

```txt
idea: 刚冒泡的小点子
building: 正在慢慢搭
 done: 已经完成啦
archived: 放进旧盒子里
```

##### 兴趣收藏页

- 分组展示：书、番剧、游戏、工具、网站、音乐、其他。
- 卡片样式可更像贴纸墙或收藏盒。

##### 关于页

- 用更个人化的语气介绍自己。
- 可包含：技能树、喜欢的东西、最近状态、联系方式。

---

### 8. 动效系统

#### 文件

```txt
src/styles/animations.css
src/scripts/scroll-reveal.ts
src/scripts/click-particles.ts
src/scripts/motion-preferences.ts
src/scripts/theme.ts
```

#### What

实现丰富但克制的动效：页面过渡、卡片悬浮、滚动渐入、点击反馈、背景装饰、主题切换。

#### Why

用户希望保留丰富动效，但此前参考站存在性能和干扰风险。因此动效应有明确边界，集中服务氛围和反馈。

#### How

##### 必做动效

1. 首页 Hero 小羊轻微浮动
2. 云朵或背景装饰慢速漂移
3. 卡片滚动渐入
4. 卡片 hover 上浮
5. 页面 View Transitions 淡入 / 轻微位移
6. 返回顶部平滑滚动
7. 主题切换过渡
8. 点击小星星 / 奶油粒子反馈

##### 可选动效

1. 鼠标轻量拖尾，仅桌面端开启
2. 打字机文案
3. 阅读进度条
4. 收藏卡片轻微弹性 hover

##### 禁止或谨慎动效

1. 不使用大范围强烈旋转。
2. 不在正文阅读区域持续播放复杂动画。
3. 不默认加载重型 Live2D。
4. 不在移动端启用鼠标拖尾或大量粒子。

##### 动效降级

必须支持：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

##### 动效分级决策

默认采用“丰富但克制”：

- 桌面端：完整标准动效。
- 移动端：保留卡片、页面过渡、返回顶部，关闭鼠标拖尾和重粒子。
- 用户系统减少动画：几乎关闭所有非必要动画。

---

### 9. 响应式布局

#### 文件

```txt
src/styles/layout.css
src/styles/global.css
```

#### What

实现移动端优先的响应式布局。

#### Why

参考站虽然有移动端适配，但部分装饰和动效对移动端压力较大。本项目应从一开始规划移动端体验。

#### How

##### 断点

```css
480px  小屏手机
768px  平板 / 大手机
1024px 桌面布局
1280px 宽屏布局
```

##### 移动端

- 首页 Hero 单列。
- 小羊图形缩小。
- 导航折叠。
- 卡片单列排列。
- 文章目录默认隐藏或折叠。
- 复杂装饰减少。
- 页面首屏不堆叠过多内容。

##### 桌面端

- 首页可使用两栏 / 网格布局。
- 文章页使用正文 + 目录侧栏。
- 作品页使用 2-3 列网格。
- 收藏页使用贴纸墙式网格。

---

### 10. 主题切换与暗色模式

#### 文件

```txt
src/components/site/ThemeToggle.astro
src/scripts/theme.ts
src/styles/tokens.css
```

#### What

实现浅色 / 深色模式。

#### Why

虽然主风格是奶黄治愈风，但技术文章阅读场景中暗色模式很有价值，也能增强个性体验。

#### How

默认浅色主题：奶黄、奶白、焦糖棕。

暗色主题建议不是纯黑，而是：

```txt
深可可色
暖棕黑
低饱和奶油黄点缀
柔和星星装饰
```

保存用户选择到 `localStorage`，并在页面加载早期应用，避免闪烁。

---

### 11. SEO 与可访问性

#### 文件

```txt
src/components/site/SEO.astro
src/layouts/BaseLayout.astro
```

#### What

实现基础 SEO、社交分享信息和可访问性规范。

#### Why

个人博客不仅要好看，还要可被搜索、分享和阅读。丰富动效不能牺牲可访问性。

#### How

每个页面提供：

- title
- description
- canonical
- og:title
- og:description
- og:image
- twitter card

可访问性要求：

- 图标按钮必须有 `aria-label`。
- 装饰图使用 `aria-hidden="true"`。
- 导航支持键盘访问。
- 移动端菜单可关闭。
- 卡片 hover 效果也应有 focus 效果。
- 正文对比度必须足够。

---

### 12. 性能优化

#### 涉及文件 / 策略

```txt
public/images/
src/scripts/
src/components/
astro.config.mjs
```

#### What

控制动画、图片和客户端脚本体积。

#### Why

参考站存在外部资源失败和动效较重的问题。本项目应保留丰富动效，但避免首屏负担过重。

#### How

1. 图片使用 WebP / AVIF。
2. 装饰图优先使用 SVG。
3. 非首屏图片懒加载。
4. 不使用不稳定 CDN，关键资源本地化或 npm 包管理。
5. 鼠标拖尾、点击粒子只在桌面端或用户允许时启用。
6. 不默认引入重型 Live2D；如果后续用户强烈需要，应作为可选增强。
7. Astro 页面默认静态生成。
8. 少用客户端框架组件，除非交互确实需要。

---

## Assumptions & Decisions

### 已确定决策

1. 技术路线采用 Astro。
2. 视觉风格采用软萌懒羊羊治愈风。
3. 主色采用奶黄、奶白、焦糖棕，并搭配浅草绿、柔和天空蓝和浅粉。
4. 内容包含技术文章、生活记录、作品展示、兴趣收藏。
5. 动效采用丰富但克制策略。
6. 必须响应式适配。
7. 不完全复刻 Rhine's Blog，只参考其个人风格设计逻辑。
8. 不直接使用官方“懒羊羊”素材，改为原创小羊吉祥物方向。

### 后续仍可让用户选择的设计项

在正式开发前，可继续询问用户以下问题，但执行者也可按本计划默认值推进：

1. 小羊吉祥物形象：
   - 困困小羊
   - 奶油小羊
   - 草地小羊
   - 云朵小羊

2. 首页首屏布局：
   - 左文案右小羊
   - 居中欢迎卡片
   - 小羊草地场景

3. 背景质感：
   - 纯奶黄渐变
   - 轻纸张纹理
   - 云朵草地插画

4. 点击特效：
   - 小星星粒子
   - 奶油泡泡
   - 小草叶飘散

5. 暗色模式：
   - 深可可模式
   - 夜晚草地模式
   - 暂不做暗色模式

### 默认选择

如果用户不再补充，默认采用：

- 原创困困小羊吉祥物
- 首页左文案右小羊，移动端上下排列
- 奶黄渐变 + 轻云朵装饰
- 点击小星星 / 奶油粒子
- 支持深可可暗色模式
- 技术文章使用 MDX
- 兴趣收藏支持评分
- 暂不内置评论系统，后续作为增强项
- 暂不做中英文双语

---

## Verification steps

后续实施完成后，应按以下步骤验证。

### 1. 功能验证

- 首页能展示 Hero、最近文章、生活记录、作品、兴趣收藏。
- 技术文章列表按时间倒序展示。
- 技术文章详情页可正常渲染 Markdown / MDX。
- 生活记录页可展示 mood、封面和标签。
- 作品页可展示项目状态、技术栈、Demo / Repo 链接。
- 收藏页可按类型展示内容。
- 草稿内容 `draft: true` 不出现在生产页面中。

### 2. 视觉验证

- 页面整体符合奶黄治愈、卡通圆润、小羊主题。
- 首页具有明确个人记忆点。
- 技术文章正文足够克制和易读。
- 卡片、按钮、标签、导航视觉统一。
- 暗色模式不破坏可读性。

### 3. 动效验证

- 首页小羊和装饰动效柔和。
- 卡片 hover 有反馈但不过度。
- 页面切换自然。
- 点击粒子不会阻挡交互。
- 移动端不启用重型鼠标动效。
- 系统开启减少动画后，非必要动画被关闭。

### 4. 响应式验证

至少检查：

- 375px 手机宽度
- 768px 平板宽度
- 1024px 桌面宽度
- 1280px 宽屏宽度

确认：

- 导航可用。
- 文章阅读不横向溢出。
- 卡片布局自然换行。
- 目录在小屏下隐藏或折叠。
- 图片不会撑破容器。

### 5. 性能验证

- 首页首屏不加载过多大图。
- 装饰图片体积可控。
- 客户端 JavaScript 不包含无必要重库。
- 图片使用懒加载。
- 无关键资源 CDN 加载失败。
- Lighthouse 性能、可访问性和 SEO 分数应保持在可接受范围。

### 6. 可访问性验证

- 所有图标按钮有 `aria-label`。
- 装饰元素不被屏幕阅读器误读。
- 键盘可以访问导航和主要按钮。
- 文字对比度足够。
- focus 状态清晰可见。

---

## Recommended implementation sequence

1. 创建 Astro 项目基础结构。
2. 配置内容集合和示例内容。
3. 建立视觉 token 和全局样式。
4. 创建 BaseLayout 与 PostLayout。
5. 创建 Header、Footer、ThemeToggle、BackToTop。
6. 创建首页 HeroSheep 与四个内容模块。
7. 创建 PostCard、LifeCard、ProjectCard、CollectionCard。
8. 实现首页。
9. 实现技术文章列表和详情页。
10. 实现生活记录页。
11. 实现作品展示页。
12. 实现兴趣收藏页。
13. 实现关于页。
14. 添加 View Transitions、滚动渐入、卡片 hover、点击粒子等动效。
15. 添加响应式细节和移动端降级。
16. 添加 SEO、可访问性和性能优化。
17. 运行构建、预览和检查。

---

## Final Notes

该博客的核心不是“换一套可爱皮肤”，而是建立一个稳定的个人表达系统：

- 首页表达性格。
- 技术文章表达能力。
- 生活记录表达温度。
- 作品展示表达成果。
- 兴趣收藏表达审美和人格。

因此后续实施时应优先保证内容结构、阅读体验和维护性，再逐步叠加软萌视觉和动效。这样既能保留强烈个人风格，也能避免网站变成难以维护的装饰型页面。
