# 研究者ホームページ — セットアップ手順

英語をメイン（`/`）、日本語をサブ（`/ja/`）とする研究者向けの個人ページです。
GitHub Pages にそのまま公開でき、SEO・構造化データ・LaTeX 数式表示に対応しています。

---

## 1. ファイル構成

```
homepage/
├── index.html            ← Home（基本情報・最新のお知らせ1件）
├── research.html         ← Research（研究関心・出版論文・WP・進行中の研究）
├── presentations.html    ← Presentations（発表）
├── teaching.html         ← Teaching（TA・RA）
├── education.html        ← Education（学歴）
├── news.html             ← News（お知らせ一覧）
├── ja/                   ← 上と同じ6ページの日本語版（ファイル名も同じ）
├── assets/
│   ├── css/style.css     ← デザイン（色・フォントはここで変更）
│   ├── js/main.js        ← 年表示・旧URL（/#publications など）の転送
│   ├── js/news-data.js   ← お知らせのデータ（ここだけ編集すればよい）
│   ├── js/news.js        ← お知らせの表示
│   ├── cv.pdf
│   └── img/
│       ├── favicon.svg   ← タブのアイコン
│       ├── profile.png   ← 顔写真の元ファイル（iPhone の HDR 写真、7MB）
│       ├── profile.jpg   ← サイトで表示する軽量版（sRGB、幅720px）
│       └── profile.svg   ← 写真が無いときのプレースホルダ（現在は未使用）
├── robots.txt            ← 検索エンジン向け
├── sitemap.xml           ← サイトマップ（ページを増やしたら追記）
├── site.webmanifest      ← PWA メタ情報
└── .nojekyll             ← GitHub の余計な処理を無効化
```

各ページの上部メニュー（`<nav class="site-nav">`）は全ページに同じものが書かれています。
タブを増やす・名前を変えるときは、英語6ページ・日本語6ページすべてのメニューを揃えて直してください。
いま開いているページのタブには `aria-current="page"` を付けます（下線が付きます）。

---

## 2. 公開前に書き換える箇所（重要）

エディタの「ファイル内検索・置換」で、以下をご自身の情報に一括置換してください。

| 置換前 | 置換後の例 |
| --- | --- |
| `leokurata.github.io` | 実際の公開 URL（例 `taro-yamada.github.io` または独自ドメイン） |
| `Your Name` / `あなたの名前` | ご自身の氏名（英・和） |
| `[field]` / `［専門分野］` | 専門分野（例 Econometrics / 計量経済学） |
| `[University]` / `［大学名］` | 所属大学・研究科 |
| `XXXXXXXX` | Google Scholar のユーザー ID |
| `0000-0000-0000-0000` | ORCID iD |
| `your-username` | GitHub アカウント名 |
| `your.name [at] university.edu` | 連絡先メール |

そのほか、本文中の `[ ... ]` / `［ ... ］` で囲まれた部分はすべて差し替え用のプレースホルダです。

**顔写真**: サイトが表示するのは `assets/img/profile.jpg`（英語版・日本語版のホーム共通）です。
写真を替えるときは、元画像を通常の画面向け（sRGB）の JPEG に変換して `profile.jpg` を置き換えてください。
iPhone の HDR 写真をそのまま使うと、ブラウザでは白っぽく眠い色になります。Mac なら次のコマンドで変換できます。

```bash
sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc" -s format jpeg -s formatOptions 78 -Z 840 assets/img/profile.png --out assets/img/profile.jpg
```

縦横比 6:7 の枠に表示されます（比率が違う写真は、やや上寄りを中心に切り抜かれます）。

**CV**: PDF を `assets/cv.pdf` として置くと、`CV (PDF)` リンクから開けます。

---

## 3. GitHub Pages で公開する

最も簡単なのは「ユーザーサイト」として公開する方法です（URL が
`https://ユーザー名.github.io/` となり、すべてのパスが素直に通ります）。

1. GitHub で **`ユーザー名.github.io`** という名前のリポジトリを新規作成（Public）。
2. この `homepage/` フォルダの**中身**（`index.html` などを含む全ファイル）を
   リポジトリ直下にアップロード（ドラッグ&ドロップ、または `git push`）。
3. リポジトリの **Settings → Pages** を開く。
4. **Source** を `Deploy from a branch`、Branch を `main` / フォルダ `/ (root)` に設定して保存。
5. 数分後、`https://ユーザー名.github.io/` で公開されます。

> 既存リポジトリ（プロジェクトサイト `…github.io/repo/`）でも、相対パスで作って
> あるため動作します。その場合 `sitemap.xml`・`robots.txt`・各 HTML の `canonical`／
> `og:url`／`hreflang` の URL を実際のパス（例 `…github.io/repo/`）に直してください。

### 独自ドメインを使う場合（任意）
リポジトリ直下に `CNAME` というファイルを作り、1 行だけドメイン名
（例 `taro-yamada.com`）を書いて push。DNS 側で GitHub Pages 向けの設定を行います。

---

## 4. SEO（検索で上位に出やすくする）

土台はファイルに組み込み済みです（メタ情報・OGP・`Person` 構造化データ・
`hreflang`・`sitemap.xml`）。公開後の仕上げとして:

1. **Google Search Console** にサイトを登録し、所有権を確認。
   `sitemap.xml` を送信するとインデックスが早まります。
2. 上記 2 の URL 置換を**漏れなく**行う（`canonical` と `hreflang` が正しいことが重要）。
3. `Person` の `sameAs`（Google Scholar・ORCID・GitHub・researchmap など）を
   実在のプロフィール URL で埋める。検索結果での同一人物認識に効きます。
4. **被リンクを増やす**: 所属研究室・指導教員・共著者・researchmap・学会発表ページ
   などから自分のサイトへリンクしてもらうと、氏名検索での順位が上がりやすくなります。
5. `title` と `meta description` に「氏名＋専門分野＋大学名」を自然に入れる（設定済み。
   置換時に維持してください）。

> なお、ありふれた氏名の場合は完全な上位表示まで時間がかかります。所属先ページや
> researchmap からの被リンクと、Scholar/ORCID の整備がもっとも効果的です。

---

## 5. 数式（LaTeX）の書き方

MathJax を組み込んであるので、HTML 本文にそのまま LaTeX を書けます。

- インライン: `\( ... \)` または `$ ... $`
- ディスプレイ（中央・別行）: `\[ ... \]` または `$$ ... $$`

例:
```
推定対象は \( \tau = \mathbb{E}[Y(1)-Y(0)] \) です。
\[ \hat{\beta} = (X^\top X)^{-1} X^\top y \]
```
数式を使わない分野であれば、サンプルの式は削除して構いません。

---

## 6. 言語の切り替え

各ページ右上の `EN / 日本語` で、同じ内容の別言語ページへ移動します。
英語版が「正本」、日本語版が訳という関係で `hreflang` を設定しているため、
検索エンジンは閲覧者の言語に応じて適切な版を表示します。

---

## 7. ローカルで確認する

フォントと数式は外部 CDN から読み込むため、ファイルを直接開くより
簡易サーバ経由のほうが正確に表示されます。

```bash
cd homepage
python3 -m http.server 8000
# ブラウザで http://localhost:8000/ を開く
```

---

## 8. 色やフォントを変える

`assets/css/style.css` 冒頭の `:root` にある変数を編集すると全体に反映されます。

- `--accent`：アクセント色（既定は深いティール `#1C5C53`）
- `--paper`：背景色　`--ink`：本文色
- `--serif`：氏名・見出し・論文タイトルの Garamond／明朝（EB Garamond / しっぽり明朝）
- `--sans`：本文・メニューのゴシック体（Source Sans 3 / Zen Kaku Gothic New）
- `--paper`：羊皮紙調の背景色（`#ECE5D6`）
- `--label`：左側の見出し列の幅（全ページ共通）

フォントを変更する場合は、各 HTML の `<head>` 内 Google Fonts の `<link>` も
合わせて差し替えてください。

---

困ったときは、変更前のファイルを残しておくと安全です。公開後の調整も気軽にどうぞ。
