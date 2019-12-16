---
title: Github Actions あれこれ
---

# Github Actions あれこれ

## secrets で改行を使いたい。もしくは、改行が使えない

使える

原因は環境変数からファイルに書き出したりする部分にあり、

```
# 以下を
echo "$DEPLOY_KEY"
# に変更する
echo -e "DEPLOY_KEY"
```

でできるようになる。
