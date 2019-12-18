---
title: Github Actions あれこれ
---

# Github Actions あれこれ

## 全般

### 環境変数 `GITHUB_TOKEN` が使えない

`secrets.GITHUB_TOKEN` はデフォルトで設定されているが、 環境変数として `GITHUB_TOKEN` は存在していない。

使いたい場合は以下を参考に自分で環境変数に設定する必要がある。

```
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### secrets で改行を使いたい。もしくは、改行が使えない

使える

原因は環境変数からファイルに書き出したりする部分にあり、

```
# 以下を
echo "$DEPLOY_KEY"
# に変更する
echo -e "DEPLOY_KEY"
```

でできるようになる。

## AWS

### S3 にアップロードしたい

2019-12-18 現在、 Github Actions 公式の [actions/aws](https://github.com/actions/aws) は Deprecated になってしまっている。

AWS 公式の [aws-actions](https://github.com/aws-actions) には S3 へのアップロードアクションが存在せず、残念ながら公式のサポートがなくなってしまっている。

なので非公式の [jakejarvis/s3-sync-action](https://github.com/jakejarvis/s3-sync-action) を使用する。

以下に node のプロジェクトをビルド後 S3 にデプロイする方法を示す。

```yaml
name: Deploy S3
on: [ push ]
jobs:
  deploy:
    name: Deploy S3
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: '12.x'
      - run: |
          yarn
          yarn build
      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.BUCKET_NAME }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: 'us-west-1'
          SOURCE_DIR: 'dist'
```

公式のものが正式にリリースされたらそちらに乗り換えたいところ。
