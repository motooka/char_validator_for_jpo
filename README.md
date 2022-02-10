# char_validator_for_jpo
与えられた文章に、特許庁に電子出願する文書で使用できない文字が含まれていないか判定するツールです。
Webブラウザで [https://motooka.github.io/char_validator_for_jpo/](https://motooka.github.io/char_validator_for_jpo/) にアクセスすることで利用可能です。

## サポートするブラウザ
- Internet Explorer 等の古いブラウザでは動作しません。
- 動作確認は、ビルド時点でのFirefoxおよびChromeで実施しています。
- ツールの性質から考えて、スマートフォン等のブラウザをサポートする意義は一切無いと思われるので、バグ報告があっても対応することはありません。

## 「特許庁に電子出願する文書で使用できない文字」とは？
詳細は、[特許庁のページ](https://www.jpo.go.jp/system/process/shutugan/pcinfo/make/doc_rules.html) をご覧下さい。

## 動作の原理
ビルド時に、いわゆる全角文字のうち、利用可能なもののリストを生成しています。実行時には、入力された文字列がこのリストに含まれるかASCII文字であることを確認しています。
実行時には外部ライブラリを読み込まない設計になっているのは、重要な機密情報であるところの貼り付けられた文字列が外部に流出する可能性を極力低減するため（言い換えれば、外部ライブラリの管理者アカウントが乗っ取られることに起因するマルウェア混入の影響を極力低減するため）です。

## お世話になっているツールやライブラリ等（主なもの）
- [TypeScript](https://www.typescriptlang.org/)
- [encoding.js](https://github.com/polygonplanet/encoding.js)
- [webpack](https://webpack.js.org/)
- [http-server](https://github.com/http-party/http-server)

## 開発環境と、その構築
- [.node-version](./.node-version) で指定されているバージョンの[Node.js](https://nodejs.org/)が必要です。
- Macで開発しています。各種Linuxでも開発できることでしょう。Windowsでは[package.json](./package.json)の `scripts` に書かれたOSコマンドが動作しませんが、WSL2等の環境のお世話になったり、scriptを書き換えることで開発可能です。
- `npm install` で必要なものをインストールして下さい。

## 開発
- `npm run build` で、ビルドしたファイルたちが `dist` ディレクトリに置かれます（正常に動けば）
- `npx http-server ./dist` で、 `dist` ディレクトリの中身をHTTPサーバから配信できます。
  - http://127.0.0.1:8080/ でアクセス可能です。
  - ポート番号等の設定を変えたい場合は [http-server](https://github.com/http-party/http-server) のヘルプをご参照下さい。
  - Ctrl-C で終了できます。

### 開発時の注意点
- `dist` ディレクトリの中身はgit管理下です。これは [GitHub Pages](https://pages.github.com/) で手軽に公開するための、怠け者の判断によるものです。
- `src/zenkaku.ts` は、git管理下 **ではありません** 。このファイルは `src/char_list_builder.ts` の実行結果として生成されたファイルです。

## ライセンス
MITライセンスで公開しています。
詳細は [./LICENSE](./LICENSE) ファイルをご覧下さい。
