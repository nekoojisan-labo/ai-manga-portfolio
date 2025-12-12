# 茶々丸。ポートフォリオサイト セットアップガイド

## 概要
デジタル漫画家「茶々丸。」のポートフォリオサイトです。
フレームワーク不使用のシンプルな構成（HTML/CSS/JavaScript）で作られています。

---

## 1. ファイル構成

```
portfolio/
├── index.html          # メインページ
├── style.css           # スタイルシート
├── script.js           # JavaScript（フォーム検証、アニメーション等）
└── images/             # 画像フォルダ
    ├── icon-chachamaru.png   # プロフィールアイコン
    ├── work-01.png           # WORKS作品画像（表）
    ├── work-02.png           # WORKS作品画像（裏）
    ├── writing-01.png        # 【要追加】自己紹介マンガ1ページ目
    ├── writing-02.png        # 【要追加】自己紹介マンガ2ページ目
    ├── writing-03.png        # 【要追加】育児4コマ漫画
    ├── writing-04.png        # 【要追加】広告マンガの力
    └── writing-05.png        # 【要追加】ちびっこ救急隊
```

---

## 2. セットアップ手順

### Step 1: ファイルを展開
```bash
unzip portfolio.zip -d portfolio
cd portfolio
```

### Step 2: 追加画像を配置
以下の5枚の画像を `images/` フォルダに追加してください：

| ファイル名 | 内容 | 推奨サイズ |
|-----------|------|-----------|
| writing-01.png | 自己紹介マンガ（1ページ目） | 幅800px以上 |
| writing-02.png | 自己紹介マンガ（2ページ目） | 幅800px以上 |
| writing-03.png | 育児4コマ漫画 | 幅600px以上 |
| writing-04.png | 広告マンガの力 | 幅800px以上 |
| writing-05.png | ちびっこ救急隊 | 幅600px以上 |

### Step 3: ローカルで動作確認
ブラウザで `index.html` を直接開くか、ローカルサーバーを起動：
```bash
# Python 3の場合
python -m http.server 8000

# Node.jsの場合
npx serve .
```
→ http://localhost:8000 でアクセス

### Step 4: サーバーにアップロード
すべてのファイルをWebサーバーのドキュメントルートにアップロード。
ディレクトリ構造を維持すること。

---

## 3. サイト構成（セクション）

| セクション | ID | 説明 |
|-----------|-----|------|
| Hero | - | トップのメインビジュアル |
| WORKS | #works | 作品一覧（フリップカード） |
| WRITING | #writing | マンガギャラリー（5作品） |
| ABOUT | #about | 自己紹介 |
| PROBLEM | - | お悩み訴求 |
| SERVICE | #service | サービスプラン |
| VOICE | - | お客様の声 |
| CONTACT | #contact | お問い合わせフォーム |

---

## 4. カスタマイズ方法

### 4.1 色・テーマの変更
`style.css` の先頭にあるCSS変数を編集：

```css
:root {
    --color-bg: #f8f5f0;           /* 背景色 */
    --color-primary: #b7282e;       /* メインカラー（赤） */
    --color-secondary: #c9a85c;     /* アクセントカラー（金） */
    --color-text: #2d2d2d;          /* テキスト色 */
    /* ... */
}
```

### 4.2 テキストの変更
`index.html` 内の該当箇所を直接編集。

主な編集箇所：
- **タイトル**: `<title>` タグ（7行目付近）
- **ヒーロー文言**: `.hero-manga__title` 内
- **自己紹介**: `#about` セクション内
- **サービス内容**: `.cyber-card` 内

### 4.3 SNSリンクの設定
`index.html` の `about-sns` クラス内のリンクを編集：
```html
<a href="https://line.me/xxxxx" class="sns-cyber">LINE</a>
<a href="https://instagram.com/xxxxx" class="sns-cyber">Instagram</a>
```

### 4.4 フォーム送信先の設定
現在はフロントエンド検証のみ。バックエンド連携が必要な場合：
```html
<form action="https://your-backend.com/contact" method="POST">
```
または、Formspree/Netlify Forms等のサービスを利用。

---

## 5. 技術仕様

| 項目 | 内容 |
|-----|------|
| フレームワーク | なし（Vanilla HTML/CSS/JS） |
| 対応ブラウザ | Chrome, Firefox, Safari, Edge（最新版） |
| レスポンシブ | 対応済み（ブレークポイント: 768px） |
| 外部依存 | Google Fonts (Noto Sans JP) |
| アクセシビリティ | ARIA対応、スキップリンク実装 |

---

## 6. 注意事項

1. **画像最適化**: 大きすぎる画像はページ読み込みを遅くします。
   - 推奨: WebP形式 or 圧縮済みPNG
   - ツール: TinyPNG, Squoosh等

2. **HTTPS**: 本番環境ではHTTPSを使用してください。

3. **お問い合わせフォーム**: 現状は送信機能なし。
   バックエンド実装 or 外部サービス連携が必要。

4. **Cookie同意バナー**: 表示されますが、実際のCookie処理は未実装。
   必要に応じて実装してください。

---

## 7. トラブルシューティング

### 画像が表示されない
- ファイル名が正確か確認（大文字小文字を区別）
- `images/` フォルダ内に配置されているか確認

### フォントが表示されない
- インターネット接続を確認
- Google Fontsへのアクセスがブロックされていないか確認

### レイアウトが崩れる
- CSSファイルが正しく読み込まれているか確認
- ブラウザのキャッシュをクリア

---

## 8. お問い合わせ
制作に関するご質問は、サイト所有者にお問い合わせください。
