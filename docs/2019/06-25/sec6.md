# Concluding Remarks

我々は機能的に等価な命令を冗長bitとして利用し、x86プログラムのバイナリにデータを埋め込むHydanというシステムを提案した。

OpenBSD、FreeBSD、NetBSD、Red Hat LinuxとWindows XP Professionalの各OSの実行可能ファイルを解析し、埋め込み率の推定を行った。
Hydanの実装について述べ、削除攻撃への耐性を発見した。

埋め込み率は約 1/110 である。
対して、典型的なJPEG画像の冗長bitは約 1/17 である。

我々は種々の方法によりHydanの埋め込み率を 1/36 まで改善できる可能性を論じた。

今後の予定は、容量を改善する新たな手法を発見することと、動的透かし手法の調査である。

Hydanの実装は以下からダウンロードできる。

http://www.crazyboy.com/hydan/
