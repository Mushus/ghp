---
title: Github Actions で簡単に GolangCI-Lint を使用できる golangci-linter を作った
---

# Github Actions で簡単に GolangCI-Lint を使用できる golangci-linter を作った

GitHub Actions で Lint をやるとしたら、ただ単純に結果が表示されるだけではなく、 File Changes に表示してほしいです。

GitHub Actions の `runs:` でシェルスクリプトを書くだけではそのようになりません。工夫を凝らす必要があります。

## 使い方

一般的な Golang プロジェクトであれば `steps:` に以下のコードを差し込むだけで終わりです。

```yaml
uses: Mushus/golangci-linter@v1
```

とても簡単です。
