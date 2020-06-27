# Abstract

ソフトウェア業界ではソフトウェアの著作権侵害が大きな懸念事項となっている。
本論文では、この問題に対しソフトウェア透かしと呼ばれる技術を用いて対処する。
どのようにソフトウェア透かしが適用されるかによっては、所有権や購入の証明、あるいは違法な再配布元の追跡などの著作権の侵害を阻止できる。
特に、Geneviève Arboit によって *A Method for Watermarking Java Programs via Opaque Predicates* で提案されたアルゴリズムを分析する。
この透かし手法は、アプリケーション対してに*不明瞭な述語 (opaque predicates)*を追加することによって透かしを埋め込む。
Arboitの手法はある種の攻撃に耐性を持ち、高いデータレートを持つことが、ある種のdistortive攻撃の影響を受けやすい。
<!-- textlint-disable japanese/no-doubled-joshi -->
ソフトウェア透かしの分野における未解決問題の1つは、動的透かしが本質的に、静的透かしよりも攻撃に強いかどうかである。
<!-- textlint-enable -->
我々は、S<span style="font-size: .7em">AND</span>M<span style="font-size: .7em">ARK</span>フレームワーク内で、静的透かしと動的透かしの両方を経験的に評価した。

> [注釈]
>
> distortive攻撃: 媒体の全域に意味論を維持した変更 (最適化や難読化など) を加え、透かしの品質を低下させる攻撃。
