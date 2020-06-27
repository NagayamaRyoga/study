# 2. Software Watermarking

ソフトウェア透かしは、海賊版のソフトウェアや著作権侵害を未然に防ぐため研究されている技術の1つである。
このアイデアは、人間の知覚できない歳によって画像、音声、動画像などに識別子を埋め込むメディア透かしに似ている。
<!-- textlint-disable ja-technical-writing/ja-no-redundant-expression -->
ソフトウェアの性質上、メディア透かしのアイデアをそのまま適用することはできない。
<!-- textlint-enable -->
ソフトウェアに情報を埋め込むためには、そのソフトウェアのもとの機能を維持しなければならない。

#### Definition 1 (Software Watermarking System)

<b>与えられたプログラムを \(P\)、透かしを \(w\)、鍵を \(k\) とする。ソフトウェア透かしシステムは次の2つの関数によって構成される。</b>

\[ \rm{embed}(P,w,k) \rightarrow P' \]
\[ \rm{recognize}(P',k) \rightarrow w \]

電子透かしアルゴリズムには、静的アルゴリズムと動的アルゴリズムの2つのアプローチが存在する。
<!-- textlint-disable japanese/no-doubled-joshi -->
<!-- textlint-disable ja-technical-writing/ja-no-redundant-expression -->
動的アルゴリズムは、アプリケーションの実行時に収集した情報に基づき、透かしの埋め込みと認識を行う。
<!-- textlint-enable -->
静的アルゴリズムは、静的なコードとデータのみに基づく。
ソフトウェア透かしに関する様々な技術が提案されているが、これらのアルゴリズムの実装と評価を記述した出版物はほとんどない。

静的アルゴリズムは動的な手法よりも多くの手法が提案されている。これは、実行可能ファイル中に情報を挿入できる箇所が、静的な手法のほうがはるかに多いためである。
例えば、Javaクラスファイルに対しては、定数プール、メソッドテーブルなどの箇所に透かしを挿入できる。
For example, in a Java classfile a static watermark can be embedded in the constant pool table, method table, etc.
最初の動的透かしアルゴリズムであるCTは、Collbergによって文献[7]で提案された。
これは、実行時に透かしを埋め込むためのグラフ構造を構築する。

DavidsonとMyhrvold[9]は、制御フローグラフの基本ブロックを並べ替えることで電子透かしを埋め込む静的透かしアルゴリズムを提案した。
Venkatesanら[21]はサブグラフを挿入することでメソッドの制御フローグラフを拡張することにより、透かしを構築するアルゴリズムを提案した。
門田ら[11,12]は、ダミーメソッド内の特殊な命令列に透かしを埋め込む手法を提案した。
Sternら[19]は透かしを埋め込むための命令列を検討した。
これらの手法は、命令の出現頻度を変更することで透かしを表現している。
QuとPotkonjak[16]は、レジスタ割当に透かしを埋め込むためにグラフ彩色問題を利用している。

これらの提案されたアルゴリズムの多くはその実装や評価を発表していない。
S<span style="font-size: .7em">AND</span>M<span style="font-size: .7em">ARK</span>フレームワーク内に実装されているものや、Palsbergらによる実装のように[15]、CTアルゴリズムの既存の実装はいくつか存在しているが、
Hachez[10]による近年の論文はSahoo[17]と同様、Sternアルゴリズムに関する分析を提供している。
QuとPotkonjakによる手法は、Myles[13]によって評価されている。

S<span style="font-size: .7em">AND</span>M<span style="font-size: .7em">ARK</span>[6]はソフトウェア保護技術、特にソフトウェア透かしやコード難読化、Javaバイトコードの耐タンパ性を研究するためのツールである。
S<span style="font-size: .7em">AND</span>M<span style="font-size: .7em">ARK</span>プロジェクトの目標の1つは、既知のすべてのソフトウェア透かしアルゴリズムを実装し、評価することである。
このシステムには、耐性やステルス性などの特性に関するアルゴリズムの調査を可能にする様々なツールが含まれている。
既知のソフトウェア透かしアルゴリズムの実装と評価を通じて、なにが透かしをより強力なものにするかの理解を可能にする。
