---
title: Go言語
---

# Go 言語

## よく使うライブラリ

### go-cmp

[github.com/google/go-cmp/cmp](https://github.com/google/go-cmp)

データ構造が同等か比較する比較をする。

木構造を巡って比較してくれるので、ポインターの値が違っていても比較できる。

テストで期待した木構造になってるかを比較するのに使用すると良い。

リフレクションを使っていて速度面が気になるためテスト以外で使う場合はコードの方を見直したほうがいいかもしれない。

### pp

[github.com/k0kubun/pp]http://godoc.org/github.com/k0kubun/pp

pretty printer のライブラリ。

コンソールに木構造をカラフルにわかりやすく表示してくれる。

テストやデバッグのときに使える。
