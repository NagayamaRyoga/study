# 3. Embedding and Extraction of the CRSW

本節では、\(P\)に対しどのように\(W\)、\(C_m\)、\(C_d\) および \(C_a\) を埋め込むのかについて論じる。
\(C_m\)、\(C_d\)、\(C_a\) の構築については次節で述べる。

埋め込みと抽出について述べる前に、カオス置換 (***chaotic substitution***) とカオス分散符号化 (***chaotic dispersion coding***) について説明する。


## 3.1. Chaotic Substitution \(\partial\)

カオス置換 (***chaotic substitution***) は \(i\) を \(c\) に置き換えることであり (\(c\)、\(i\) は8bitの2進整数)、その結果 \(i\) の値は \(c\) と等しくなり \(s\) が得られる。
\(c\) と \(s\) から、逆カオス置換 (***reverse chaotic substitution***) によって元の \(i\) の値を復元できる。

\(G\) をデジタルカオスシステムとする。
一般性を損なうことなく、\(G\) の状態空間を \([a,b)\)。
このとき、カオス置換は以下のように表される。

\[
    s = \partial(i,c,G) \\
      = \left\lfloor 2^8 \times \frac{G(x,m) - a}{b-a} \right\rfloor \oplus i,
\]
\[
    x = \frac{c(b-a)}{2^8} + a, \tag{1}
\]
\[
    m = \left\lfloor \frac{c}{\lambda} \right\rfloor + 1
\]

ただし、\(\oplus\) はXORを意味する。
ここで、\(G(x,m)\) は初期値 \(x\) で \(m\) 回反復した \(G\) の状態であり、\(lambda\) は反復回数を調整できるパラメータである。

逆カオス置換は次式で与えられる。

<!-- textlint-disable -->

\[
    i = \partial^{-1}(s,c,G) = \partial(s,c,G) \tag{2}
\]

一般に、集合 \(A = \{\alpha_1, \alpha_2, \dots, \alpha_k\}\) によって \(B = \{b_1, b_2, \dots, b_k\}\) が置き換えられ、結果として以下が得られる。

\[
    R = \{r_j\} = \partial(B,A,G) = \{\partial(b_j,a_j,G)\}, \quad j=1,2,\dots,k \tag{3}
\]

逆カオス置換は以下のようになる。

\[
    B = \partial^{-1}(R,A,G) = \partial(R,A,G) \tag{4}
\]

<!-- textlint-enable -->
