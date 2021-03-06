# Abstract

C/C++プログラムに対する電子透かしの開発第一段階の成果を報告する。
透かしはソースコードに、動作を変更しない僅かな変形を加えることで埋め込まれる。

この種の透かしは、攻撃者がソースコードにアクセス出来ない場合、バイナリ実行ファイルに対する攻撃に堅牢であると考えられている。
典型的なSymbianアプリケーションへの埋め込み率が実験的に得られた。

> Symbian: ノキアのスマートフォン向けOS

# I. Introduction

電子透かしは除去・改竄が困難なようにデジタルメディアやファイルにデータ (透かし) を埋め込むデータ隠蔽技術の一種である。

電子透かしは多くの場合、ファイルに透かしが埋め込まれているかどうかが事前に分かっているため、古典的なデータ隠蔽技術とは対照的に透かしの存在を隠す必要がない。

電子透かしの機能の1つは著作者の保護である。

例えば、作成したあるソフトウェアパッケージに「FRUCT」という透かしを埋め込んだとする。
その後、内部のファイル名やメタデータを変更して、そのパッケージの作成者を偽って販売している会社が見つかった。
透かしが除去・改竄に耐え、「FRUCT」というデータを取り出せた場合、裁判所に対してそのパッケージの作成者であることを示せる。
このとき、「FRUCT」の透かしが偶然に発生する確率は非常に低い。

その他の機能には不正コピーの防止がある。
データの各コピーに、ユーザー毎にユニークな透かしを埋め込むことで違法コピーの作成者を追跡出来るようにする。
ここでの問題は、2人以上のユーザーによる連合攻撃である。
それぞれのデータを比較することで相違点を見つけ出せる。
それによって透かしの破壊されたコピーが生成されうる。

この攻撃を防ぐために、いわゆる **fingerprinting codes** が透かしとして使用される。
そのようなコードは、特別な構成と冗長性により、事前に設定されているより少ない人数による連合が追跡不可能な透かしを生成出来ないことを保証する。
この場合の電子透かし方式の課題は、長いフィンガープリントを埋め込むための十分なスペースを提供することにある。

プログラムに対する透かしの埋め込む際に、実行可能ファイルのbitを変更した場合、大抵プログラムが壊れてしまうことに注意しなければならない。
透かしはプログラムの機能を損なわない方法で埋め込まなければならない。

ソフトウェアへの透かしの問題点は参考資料 [1]~[7]で述べられている。

ソフトウェアへの透かしには2つの基本的なアプローチが存在する。

1つ目は、特殊な関数をプログラムに追加する方法である。
追加された関数は、何らかの方法で計算された透かしのbit列を含む。

これらの追加された関数は、デッドコード除去アルゴリズムによって容易に削除されてしまう可能性があるため、デッドコードに見えてはならない。
そのため、それらの関数はプログラムと密接に結合されており、プログラムの実行中に呼び出されなければならない。

この手法には埋め込める透かしの長さに制限がないという利点がある。

欠点はプログラム実行効率の潜在的な低下である。
もう1つの欠点に、透かしの構成や呼び出し手法のパターンを見つけ出す攻撃に対する脆弱性がある。

2つ目のアプローチは、コードを追加するのではなく、プログラムの微妙な冗長性 (*redundancies*) を利用して透かしを埋め込むものだ。
この手法の特徴は、実行ファイルへ加える等価な変更の選択を通じて透かしを埋め込むことである。
その"選択"には、例えば命令タイプの選択/命令スケジューリング/コードレイアウト/レジスタ割当/変数の並び替え/インポートテーブル内のアドレス置換がある。

幾つかの手法は実行可能ファイルへの埋め込みが可能である。
そうでない場合には、埋め込みを効率的に行えるのはコンパイル時のみであり、特別に設計されたコンパイラを必要とすることに注意しなければならない。
それぞれの方法を簡単に説明する。

この論文中の例はC/C++及びARMプロセッサ用のアセンブリ言語で提供される。ARMプロセッサはモバイル市場で支配的である。

命令選択手法は同じ実行結果を得られる、異なる命令列を見つけることで構成される。

例えば、`d = d + 1` は `d = d - -1` にも置換できる。`d = d * 2` は同じく `d = d << 1` や `d = d + 1` に置換可能である。

これらの代替表現は`0`/`1`に符号化出来る。どちらの命令列を選択するかは埋め込むデータのbitによって決まる。

代替表現を効率的に実装する方法はプロセッサに依存し、ARMのようにRISCの場合には制限されることに注意する必要がある。

例えば変数を2倍する操作について、ARMの場合には`add rd, rd, #0`/`mov rd, rd, asl #1`という2つの表現が出来る。
どちらもバイト長や実行時間では同等であるが、負の即値に対する減算は出来ない。

命令スケジューリングによる手法は、独立したプロセッサ命令列を見つけることで行われる。
独立命令列の順列を辞書順に並べ、それぞれが等価であるとみなす。
データはそれぞれの順列に対応する数値として埋め込まれる。

例えば、

```
mov r3, r4
add r0, r4, #1
```

の各命令は独立であり、

```
add r0, r4, #1
mov r3, r4
```

は上と等価である。これを利用して1bitの情報を符号化出来る。

コードレイアウトによる方法は、ジャンプ命令によって分離された命令列からなるブロックの集合で情報を表現する手法である。
コードブロックは異なる順序で配置し直すことが出来る。
データは同じく順列に対応する数として符号化される。

レジスタ割当法は、変数に異なるレジスタを割り当てることでデータを埋め込む。
レジスタまたはメモリの割当のありうるすべての組み合わせによってデータを埋め込むことが出来る。

現在流行っている動的リンク技術も利用できる。インポート/エクスポートテーブル及び補助構造のエントリの順列でデータを埋め込める。

様々な方法を組み合わせることで埋め込み率を高めることが出来る。

しかし、データの埋め込みは必ずしも堅牢でないという問題が存在する。
まず第一に、埋め込みがバイナリ実行ファイルに直接行われる場合、データを埋め込むのに使用されたプログラムを用いて透かしを消去/変更出来る。

そのため、本プロジェクトでは埋め込みはソースコードに対して行われる。
