# 2. Related Work

音声や画像などの媒体とは対照的に、実行可能ファイルにデータを埋め込む研究は少ない。

機械語を埋め込みの媒体とするうえで障害となる特性は、データを埋め込むための冗長性が少ないことである。
機械語に対するほとんどの先行研究はソースコードやコンパイルレベルで埋め込みを行っている。
我々の研究は、ソースコードを用いずに機械語レベルで埋め込みを行うという点でそれらと異なる。

この章では、古典的な情報隠蔽とコードに対する情報隠蔽の双方に関する研究について述べる。

## 古典的な情報隠蔽

Potitcolasら[[3]](#bib-3) は、情報隠蔽技術をいくつかの下位区分に分類した。

- 秘密チャネルの作成
- ステガノグラフィ
- 匿名性
- 著作権表示

これらの各分野には固有の要件があり、多くの場合その要求は重複している。

ステガノグラフィは文字通り 覆い隠された文書("covered writing") の技術であり、第三者に知覚されてはならない という要求がある。
ステガノグラフィの焦点は密かににより多くの情報を伝達することであり、著作権表示とは異なり改ざんに耐性を持つ必要がない。

対照的に、著作権表示ではデータは必ずしも隠蔽される必要がなく、システムによっては可視の透かしを使用しているものもある。

これらは正反対な要求を持つが、どちらも情報隠蔽技術の一種である。

情報隠蔽とステガノグラフィに対する一般的な情報理論的アプローチは [[4]](#bib-4)[[2]](#bib-2) にあり、そのようなシステムの設計の基礎を形成している。

## 機械語へのステガノグラフィ

コードを対象としたステガノグラフィに関する研究は比較的少ないにも関わらず、いくつかの一般的な技術が開発されており、少なくとも4つの先行研究がある[[5]](#bib-5)[[6]](#bib-6)[[7]](#bib-7)[[8]](#bib-8)。
これらの技術は主にソフトウェア保護や電子透かしを対象としている。
[[9]](#bib-9)で紹介された分類に従って、これらの技術は静的または動的の2つのカテゴリに大別できる。

静的な透かしはコンパイル時に埋め込まれ、アプリケーションの実行中には変化しない。
透かしの検証は、"どこになにがあるか"の問題になる。

例えば、以下のようなものが含まれる。

- 静的なデータによる電子透かし

    ```c
    const char c[] = "Copyright (c)..";
    ```

    または

    ```c
    const struct wmark = {0x12, 0x34, ...}; // [5]
    ```

- `case`文の順序、機能的に独立した文の順序、スタックにレジスタをpush/popする順序[[10]](#bib-10)、またはプログラムの制御フローグラフ[[6]](#bib-6)のような特性に依存するコードへの電子透かし

動的な透かしでは、特定の入力とともにユーザがプログラムを実行したときに、透かしを表す状態になる。

例えば、以下のようなものがある。

- "イースターエッグ": 特定の秘密のキーストロークが入力されたときにのみ発生する機能 (アニメーションのようなもの)

- 動的なデータ構造透かし: プログラムが実行されるとデータ構造が変化し、その最終的な状態が透かしを表現する[[9]](#bib-9)。

- 動的な実行トレースによる透かし: 実行される命令の選択順序が透かしを構成する[[9]](#bib-9)。

これらの技術はすべて、データの埋め込みを行う人が ソースコードもしくはデコンパイル結果にアクセスできるときのみ適用可能である。

ただし、デコンパイルの容易さはプログラミング言語によって大きく異なる。
理論的には、フォン・ノイマンマシンにおけるデータとコードの区別は停止性問題に帰着され、それゆえ完全なデコンパイルは不可能である。
したがって、実用の上では失敗する可能性があるヒューリスティックな手法などの不完全な解決策を用いなければならない。
これらのヒューリスティックな技法は、アプリケーションが記述された言語に応じてそれなりの成功を収めている。

例えば、Javaや.Netはx86 アセンブリに比べて簡単にディスアセンブルできる。
Javaの場合、大量のメタデータがそのクラス群に挿入され、JVMコードは実行の前に厳重なチェックを通過する必要がある。
これらの正当性の制約のもとで、Javaバイトコードの正確なデコンパイルは容易である。

x86ではそのような制約はないので、デコンパイルは非常に困難である。
そのため、ほとんどの電子透かしの研究はJavaバイトコードに対する実装である。

x86のコードに対して開発されたある研究[[11]](#bib-11)では、透かしを埋め込むためのスペクトル拡散手法の概要について述べている。
この手法は、その後Javaバイトコードに対しても実装された。
提案手法は、それをx86向けに実装したという点で異なる。

歴史的に、プログラマが手書きの署名をZ80や6502のプログラムに対して埋め込んできたことも注目に値する。
署名の埋め込みを自動的に行った最初のツールはA86アセンブラである。
これは、登記を目的として等価な命令から選択することで生成されたコードに署名を行った。
これも前述の技術とおなじくソースコードが必要になる。