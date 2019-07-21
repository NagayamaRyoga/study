# 4. Recognition

状況によっては、ソフトウェアに埋め込まれたすべての透かしbitを抽出する必要はないこともある。
どのソフトウェアに透かしが埋め込まれているかのみを知りたい場合である。

また他の状況では、ソフトウェア透かし埋め込み器が本質的に抽出不可能であったり、もしくは抽出可能であったとしても抽出器がなんらかのアプリケーションに対して非効率的であるような場合もある。

本章では、ソフトウェアに埋め込まれた透かしの存在を判定する問題について議論する。
以下の節では、**知識あり認識**(*informed recognition*) について取り扱う。
第1引数が透かしの存在をテストするプログラム、第2引数がもとのプログラムであるような、2引数の認識関数である。

## 4.1. Recognizers and Partial Recognizers

実際にプログラムへ透かしが埋め込まれていれば認識器がそれを検出するが、透かしが埋め込まれていないにもかかわらずプログラムが透かしを持っていると判定するかもしれないような認識をポジティブ部分認識という。

---

### Definition 8. (Positive-partial recognition)

埋め込み器 $A : \bf{P} \times W \rightarrow \bf{P}$ について、 関数 $R : P \times P \rightarrow \{TRUE, FALSE\}$ が以下を満たすならば、$R$ を埋め込み器 $A$ に関するポジティブ部分認識関数と呼ぶ。

<!-- textlint-disable preset-ja-technical-writing/max-comma -->
- 任意の $P, P' \in \bf{P}$ について $P' = A(P, W)$ であるような $W \in candidate(A, P)$ が存在すれば $R(P', P) = TRUE$ である。
<!-- textlint-enable preset-ja-technical-writing/max-comma -->
--W \in candidate-

実際にプログラムへ透かしが埋め込まれていれば認識器がそれを検出するが、透かしが埋め込まれているにもかかわらずプログラムが透かしを持っていないと判定するかもしれないような認識をネガティブ部分認識という。

- のうちのいずれかと一致するかの判定によって構成できる。--

埋め込み器 $A : \bf{P} \times W \rightarrow \bf{P}$ について、 関数 $R : P \times P \rightarrow \{TRUE, FALSE\}$ が以下を満たすならば、$R$ を埋め込み器 $A$ に関するポジティブ部分認識関数と呼ぶ。

- 任意の $P, P' \in \bf{P}$ について $R(P', P) = TRUE$ ならばある $W \in \bf{W}$ について $P' = A(P, W)$ である。

---

(部分認識に対して) 完全な認識器はプログラム中の透かしの有無を正確に判定できる。

---

### Definition 10. (Recognizer)

埋め込み器 $A : \bf{P} \times W \rightarrow \bf{P}$ について、 関数 $R : P \times P \rightarrow \{TRUE, FALSE\}$ が以下を満たすならば、$R$ を埋め込み器 $A$ に関する完全認識関数と呼ぶ。

<!-- textlint-disable preset-ja-technical-writing/max-comma -->
- 任意の $P, P' \in \bf{P}$ と、ある $W \in candidate(A, P)$ について $R(P', P) = TRUE \Longleftrightarrow P' = A(P, W)$ である。
<!-- textlint-enable preset-ja-technical-writing/max-comma -->

また、$A$ に関する認識器が存在するとき、$A$ を認識可能であるという。

---

<!-- textlint-disable preset-japanese/no-doubled-conjunction -->
$A$ が抽出可能であれば認識可能でもある。
$X$ を $A$ に関する抽出アルゴリズムとするとき、認識関数 $R(P', P)$ は抽出された透かし $X(P', P)$ が $W \in candidate(A, P)$ のうちのいずれかと一致するかの判定によって構成できる。
<!-- textlint-enable preset-japanese/no-doubled-conjunction -->
