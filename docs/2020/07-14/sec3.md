# 3. Opaque Predicates

*不明瞭な述語 (opaque predicates)*は、コード難読化を支援する技術としてCollvergら[8]が発表し、後に門田ら[11,12]が提案したソフトウェア透かし技術に組み込まれた。
端的に述べると、不明瞭な述語が挿入されると、敵対者がアプリケーションの制御フローを分析することが困難になる。
これは、アプリケーションの特定の部分が不要であることを特定することをより困難にする。
例えば、門田のアルゴリズムは不明瞭な述語を用いて、ダミーメソッドが実際には呼び出されないことを特定されにくくしている。

#### Definition 2 (Opaque Predicate)

<!-- textlint-disable ja-hiragana-keishikimeishi -->
<b>述語 \(P\) の値がプログラム中の点 \(p\) において、埋め込み時に判明していれば*opaque*であるいう。</b>
<!-- textlint-enable -->

<b>\(P\) が常に \(True\) に評価される場合 \(P_p^T\) と書き、常に \(False\) に評価されるならば \(P_p^F\) と書く。</b>

<!-- textlint-disable japanese/no-doubled-joshi -->
<!-- textlint-disable ja-technical-writing/no-exclamation-question-mark -->
<b>\(P\) があるときは \(True\)、またあるときは \(False\) と評価されるならば、 \(P_p^?\) と書く[8]。</b>
<!-- textlint-enable -->

#### Definition 3 (Opaque Method)

<b>ブーリアン型メソッド \(M\) が呼び出し点 \(p\) において、埋め込み時にその返り値が判明しているならば \(M\) は*opaque*であるという。</b>

<b>\(M\) が常に \(True\) を返す場合 \(M_p^T\) と書き、常に \(False\) を返すならば \(M_p^F\) と書く。</b>

<!-- textlint-disable japanese/no-doubled-joshi -->
<!-- textlint-disable ja-technical-writing/no-exclamation-question-mark -->
<b>\(M\) があるときは \(True\)、またあるときは \(False\) を返すならば、 \(M_p^?\) と書く[8]。</b>
<!-- textlint-enable -->

不明瞭な述語やメソッドを使用するうえで重要な課題は、様々な解析に耐えられるよう設計することである。
攻撃者が不明瞭な述語の値を簡単に解読できるならばソフトウェアを保護できない。
不明瞭な述語を構築するために、数論的な結果やポインタのエイリアス、非同期などの様々な技術が提案されている[8]。
数論的な結果に加え、Arboitは二次剰余を用いた不明瞭な述語のような技術も提案した。
Arboitのアルゴリズムの現状の実装は数論的には真に不明瞭な述語とメソッドを使用している。
表1にこれまでに実装した9つの実装を示す。
Arboitのアルゴリズム重要な点は、不明瞭な述語のライブラリは秘密にしておかなければならないことである。
攻撃者が埋め込みに用いられている不明瞭な述語を少しでも知っていれば、アプリケーション中不透明な述語を特定し、削除できるかも可能性がある。

現在の実装で用いられている9つの不明瞭な述語のいずれも、暗号学的に安全であるとは考えられていないし、解析に耐えられるとも考えられていない。
これは実装を弱めるが、Section 6で述べる分析を無効にするものでもない。
これらの不明瞭な述語の使用することの欠点は、アルゴリズムのステルス性が低く、後述する手動の攻撃を受けやすいことである。
<!-- textlint-disable japanese/no-doubled-joshi -->
より洗練された不明瞭な述語をS<span style="font-size: .7em">AND</span>M<span style="font-size: .7em">ARK</span>フレームワーク内で利用できるようになれば、表1で示した単純な埋め込み方法の代わりに透かしの埋め込みに利用できるようになる。
<!-- textlint-enable -->
