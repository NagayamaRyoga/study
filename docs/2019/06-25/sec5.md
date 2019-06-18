# 5. Further Discussion

情報隠蔽システムの強さは、そのデータの希少性 (特定サイズのcovertextに埋め込むことのできる情報の量)、ステルス性、および復元力の関数である[[9]](#bib-9)。

この章では、Hydanで現在実装されている特性とそれらを改善する方法について説明する。

## Data Rate

現在の埋め込み率は約 1/110 である。

等価な命令を利用して埋め込んでいるので、埋め込み率は実行可能ファイルの命令の分布に大きく依存する。
我々の分析によるとUNIX系OS上での命令の分布はとても似通っていた。
OpenBSD、FreeBSD、NetBSD、Red Hatなどではそれぞれ数%ずつの違いしかなかった。
この理由は簡単に説明できる。
どれも同じコンパイラ (なんらかのバージョンのGCC) を利用していたためである。
Windows XP では、異なるコンパイラが使用されているので分布も最も異なる。

Figure 1 は異なる命令セット間の "the repartition of bandwidth" を示している。

![Figure 1. Instruction Distribution](fig1.png)

**Figure 1. Instruction Distribution**
