公開鍵暗号は **合同算術** (*modular arithmetic*) に基づいている。

この節では、暗号方式の理解に必須の代数と数論の概念と結果を要約する。

数論と合同算術に関する教科書には [HarWri79] [IreRos82] [Rose94] [Forster96] [Rosen00] などがある。

また、この節は表記を定めることも目的とする。

読者が　**群** (*groups*), **環** (*rings*), **体** (*fields*) に精通していることを前提とする。

# The Integers - 整数

$\Z$ は整数の環を表す。
$\N = \lbrace z \in \Z \| z > 0 \rbrace$ は自然数の部分集合を表す。

始めに **約数** (*divisors*) の概念と2数の **最大公約数** (*greatest common divisor*) を求めるための基本的な **ユークリッドの互除法** (*Euclidean algorithm*) について紹介する。

## Definition A.1.

1. $a,b \in \Z$ とする。

    $b = ac$ となる $c \in \Z$ が存在するとき、$b$ は $a$ を割り切れる。

    このとき $b$ を $a$ の **倍数** (*multiple*) と呼ぶ。

    $b$ が $a$ で割り切れることを $a \| b$ と書く。

2. 以下を満たす $d \in \N$ を $a$ と $b$ の **最大公約数** (*greatest common divisor*) と呼ぶ。

    1. $d$ は $a$, $b$ のどちらも割り切る。

    2. $d'$ が $a$, $b$ のどちらも割り切るとき、$d'$ は $d$ も割り切る。

    最大公約数は $\gcd(a,b)$ と書く。

3. $\gcd(a,b) = 1$ のとき、$a$ と $b$ は **互いに素** (*relatively prime*) と言う。

4. 以下を満たす $m \in \N$ を $a$ と $b$ の **最小公倍数** (*least common multiple*) と呼ぶ。

    1. $m$ は $a$, $b$ の倍数である。

    2. $m' \in \Z$ が $a$, $b$ の倍数であるとき、$m'$ は $m$ で割り切れる。

    最小公倍数は $\lcm(a,b)$ と書く。

## Proposition A.2.

$a,b \in \Z$ について $\gcd(a,b) \cdot \lcm(a,b) = |a \cdot b|$。

[証明]

1. $a,b \ge 0$ と仮定してもよい。

    $a = 0$ または $b = 0$ のとき、$\lcm(a,b) = 0$ となり、この式は成り立つ。

1. $a,b > 0$, $m := \lcm(a,b)$ とする。
    $ab$ は $a$ と $b$ の倍数であるため $m$ で割り切れる。
    すなわち $ab = md$。

    ここで、$d = \frac{ab}{m} = \gcd(a,b)$ であることを示す。

    $a = \frac{m}{b} d$, $b = \frac{m}{a} d$ であるため、$d$ は $a$, $b$ を割り切る。

    $a$ と $b$ の約数 $d'$ について、$\frac{a}{d'} b = a \frac{b}{d'}$ は $a$ と $b$ の倍数である。
    それゆえに $\frac{a}{d'} b$ は $m$ で割り切れる。
    よって $d = \frac{ab}{m}$ は $d'$ で割り切れる。

## Theorem A.3. Division with remainder. - 剰余

$z,a \in \Z, a \ne 0$ について、$z = q \cdot a + r$ かつ $0 \le r < |a|$ を満たす一意な $q,r \in \Z$ が存在する。

[証明]

始めに、題意を満たす $q$,$r$ が存在することを証明する。

1. $a > 0$ かつ $z \ge 0$ のとき、$z$ に帰納法を適用する。

    1. $0 \le z < a$ のとき、明らかに $z = 0 \cdot a + z$。

    2. $z \ge a$ のとき、帰納法によりある $q$ と $0 \le r < a$ について $z-a = q \cdot a + r$ が成り立つ、 よって $z = (q+1) \cdot a + r$。

2. $a > 0$ かつ $z < 0$ ならば、$-z = q \cdot a + r$ が成り立つ。

    1. $r = 0$ ならば $z = -q \cdot a$

    2. $0 < r < a$ ならば $0 < a - r < a$ なので $z = -q \cdot a - r = -(q + 1) \cdot a + (a - r)$

3. $a < 0$ のとき、$0 \le r < |a|$ について $z = q \cdot (-a) + r = -q \cdot a + r$

一意性の証明のために、$z = q_1 \cdot a + r_1 = q_2 \cdot a + r_2$ を考える。

このとき、$0 = (q_1-q_2) \cdot a + (r_1-r_2)$。

よって $(r_1-r_2)$ は $a$ で割り切れるが、$|r_1-r_2| < |a|$ であるため $q_1=q_2$, $r_1=r_2$。

## The Euclidean Algorithm. - ユークリッドの互除法

$a,b \in \Z, a > b > 0$ とする。

最大公約数 $\gcd(a,b)$ は剰余演算の繰り返しで求めることが出来る。

$r_0 := a$, $r_1 := b$ とする。

$$
\begin{split}
    r_0 &=& q_1 r_1 + r_2 \quad & (0 < r_2 < r_1) \\\\
    r_1 &=& q_2 r_2 + r_3 \quad & (0 < r_3 < r_2) \\\\
    & & \vdots & \\\\
    r_{k-1} &=& q_k r_k + r_{k+1} \quad & (0 < r_{k+1} < r_k) \\\\
    & & \vdots & \\\\
    r_{n-2} &=& q_{n-1} r_{n-1} + r_n \quad & (0 < r_n < r_{n-1}) \\\\
    r_{n-1} &=& q_n r_n + r_{n+1} \quad & (0 = r_{n+1})
\end{split}
$$

$r_1 > r_2 > ...$ であるため、有限回の試行で $r_{n+1} = 0$ になる。

最後の剰余 $r_n \ne 0$ は、次の命題で示すとおり最大公約数になる。

## Proposition A.4.

1. $r_n = \gcd(a,b)$

2. $\gcd(a,b) = da + eb$ となる $d,e \in \Z$ が存在する。

[証明]

1. ユークリッドの互除法に関する方程式を逆順で考えたとき、 $r_n$ が $r_k \; (k=n-1,n-2,...)$ を割り切れる。

    特に、$r_n$ は $r_1 = b$ と $r_0 = a$ を割り切れる。

    $t$ を $a$ と $b$ の約数とすれば、$t \| r_k \; (k=2,3,...)$、すなわち $t \| r_n$。

    従って、$r_n$ は最大公約数。

2. $r_{k+1}$ を $r_{k-1} - q_k r_k$ で繰り返し置換することで、以下の式が得られる。

$$
\begin{split}
    r_n &=& r_{n-2} - q_{n-1} \cdot r_{n-1} \\\\
        &=& r_{n-2} - q_{n-1} \cdot (r_{n-3} - q_{n-2} \cdot r_{n-2}) \\\\
        &=& (1 + q_{n-1} q_{n-2}) \cdot r_{n-2} - q_{n-1} \cdot r_{n-3} \\\\
        & & \vdots\\\\
        &=& da + eb
\end{split}
$$

ユークリッドの互除法と呼ばれる以下のアルゴリズムが最大公約数を出力することを示した。

## Algorithm A.5.

```
int gcd(int a, b)
1   while b ≠ 0 do
2       r ← a mod b
3       a ← b
4       b ← r
5   return abs(a)
```

$\gcd(a,b)$ のみでなく、線形結合 $\gcd(a,b) = da + eb$ の係数 $d$, $e$ も計算できるようにアルゴリズムを拡張する。

$$ r_{k-1} = q_kr_k + r_{k+1} $$

これを行列を用いて表現する。

$$
    \begin{pmatrix}
        r_k \\\\
        r_{k+1}
    \end{pmatrix}
    =
    Q_k
    \begin{pmatrix}
        r_{k-1} \\\\
        r_k
    \end{pmatrix}
    , \quad
    Q_k
    =
    \begin{pmatrix}
        0 & 1 \\\\
        1 & -q_k
    \end{pmatrix}
    , \quad
    (k = 1, ..., n)
$$

行列の乗算で以下が得られる。

$$
    \begin{pmatrix}
        r_n \\\\
        r_{n+1}
    \end{pmatrix}
    = Q_n \cdot Q_{n-1} \cdot ... \cdot Q_1
    \begin{pmatrix}
        r_0 \\\\
        r_1
    \end{pmatrix}
$$

以下の行列の繰り返し乗算で、最終的に $\Lambda_n = Q_n \cdot Q_{n-1} \cdot ... \cdot Q_1$ を得る。

$$
    \Lambda_0 =
    \begin{pmatrix}
        1 & 0 \\\\
        0 & 1
    \end{pmatrix},
    \quad
    \Lambda_k =
    \begin{pmatrix}
        0 & 1 \\\\
        1 & -q_k
    \end{pmatrix}
    \Lambda_{k-1},
    \quad
    (k = 1, ..., n)
$$

このようにして、**拡張ユークリッド互除法** (*extended Euclidean algorithm*) と呼ばれる以下のアルゴリズムを得る。

## Algorithm A.6.Eextended Euclidean Algorithm. - 拡張ユークリッド互除法

```
int array gcdCoef(int a,b)
 1  λ11 ← 1, λ22 ← 1, λ12 ← 0, λ21 ← 0
 2  while b ≠ 0 do
 3      q ← a div b
 4      r ← a mod b
 5      a ← b
 6      b ← r
 7      t21 ← λ21; t22 ← λ22
 8      λ21 ← λ11 - q ・ λ21
 9      λ22 ← λ12 - q ・ λ22
10      λ11 ← t21
11      λ12 ← t22
```

ユークリッドの互除法の時間計算量について考える。

## Definition A.7. The Fibonacci Numbers. - フィボナッチ数

フィボナッチ数 $f_n$ は再帰的に定義される。

$$
\begin{split}
    f_0 := 0, \quad f_1 := 1, & \\\\
    f_n := f_{n-1} + f_{n-2}, &\; (n \ge 2)
\end{split}
$$ 

[注]

フィボナッチ数は非再帰的に計算できる。

$$ f_n = \frac{1}{\sqrt{5}} (g^n - \tilde g^n) $$

ただし $g$, $\tilde g$ は $x^2 = x+1$ の解。

$$ g = \frac{1 + \sqrt{5}}{2}, \quad \tilde g = \frac{1 - \sqrt{5}}{2} $$

## Definition A.8. The Golden Ratio. - 黄金比

$g$ は **黄金比** (*Golden Ratio*) である。

## Lemma A.9.

$$ n \ge 2, \quad f_n \ge g^{n-2} $$

フィボナッチ数は指数関数的に増加する。

[証明]

$n = 2$ のとき自明。

$2 \le i \le n$ について成り立つと仮定する。

$$
    f_{n+1}
    = f_n + f_{n-1}
    \ge g^{n-2} + g^{n-3}
    = g^{n-3}(g + 1)
    = g^{n-3} g^2
    = g^{n-1}
$$

## Proposition A.10.

ユークリッドの互除法による $\gcd(a,b)$ の計算には $n$ 回の反復計算 (剰余演算) が必要であるならば、$a \ge f_{n+1}$ かつ $b \ge f_n$。

[証明]

$r_0 := a, r_1 := b$ とする。

$$
\begin{split}
    r_0 &=& q_1 r_1 + r_2 & & f_{n+1} &=& f_n + f_{n-1} \\\\
    r_1 &=& q_2 r_2 + r_3 & & f_n &=& f_{n-1} + f_{n-2} \\\\
    & & \vdots & \quad \quad & & \vdots & \\\\
    r_{n-2} &=& q_{n-1} r_{n-1} + r_n & & f_3 &=& f_2 + f_1 \\\\
    r_{n-1} &=& q_n r_n & & f_2 &=& f_1
\end{split}
$$

$i = n$ から降順に帰納法を用いて $r_i \ge f_{n+1-i}$ を示す。

1. $i = n$ について、$r_n \ge f_1 = 1$。

2. $n \ge k \ge i \quad (k \in \Z)$ で上が成り立つと仮定する。

$$
    r_{i-1} = q_i r_i + r_{i+1}
    \ge r_i + r_{i+1}
    \ge f_{n+1-i} + f_{n+1-(i+1)}
    = f_{n+1-(i-1)}
$$

よって、$a = r_0 \ge f_{n+1}$ かつ $b = r_1 \ge f_n$。

## Corollary A.11.

$a,b \in \Z$ とする。

ユークリッドの互除法を用いて $\gcd(a,b)$ を求めるための反復回数は最大でも $\lfloor \log_g(a) + 1 \rfloor$ 回である。

[証明]

反復回数を $n$ とする。

$a \ge f_{n+1} \ge g^{n-1}$ ([Lemma A.9.](#lemma-a-9-)) の対数をとって $n - 1 \le \lfloor \log_g(a) \rfloor$。

## The Binary Encoding of Numbers. - 数値の2進符号化

数値を入出力とするアルゴリズムを学ぶには数値の2進符号化が必要である。

bit列 $z_{k-1} z_{k-2} ... z_2 z_1 \; (z_i \in \{0,1\}, 0 \le i \le k-1)$ が符号なし整数 $n$ の2進符号であれば以下を満たす。

$$ n = z_0 + z_1 \cdot 2^1 + ... + z_{k-2} \cdot 2^{k-2} + z_{k-1} \cdot 2^{k-1} = \sum_{i=0}^{k-1} z_i \cdot 2^i $$

先頭桁 $z_{k-1}$ が $1$ である場合、$n$ を $k$ bit 整数と呼び、$k$ を $n$ のバイナリ長 (*binary length*) と言う。

$n \in \N$ のバイナリ長は通常 $|n|$ で表される (絶対値と紛らわしくない場合)。

$n \in \N$ のバイナリ長は $\lfloor \log_2(n) \rfloor + 1$ である。

バイナリ長が $k$ の自然数 $n \in \N$ は、$2^{k-1} \le n \le 2^k - 1$ である。

## The Bit-O Notation. - ランダウのO-記法

見積もりにはランダウのO-記法が便利だ。

$f(k)$ および $g(k)$ が正の数 $k$ (整数でなくてもよい) をとる正整数関数であると仮定する。

十分に大きな全ての $k$ について $f(k) \le C \cdot g(k)$ なる定数 $C$ が存在する場合、$f(k) = O(g(k))$ と言う。

[注]

古典的な方法では2つの $k$ bitの数の加減算には $O(k)$ のバイナリ演算が必要である。

乗除算には $O(k^2)$ のバイナリ演算で実現できる。

従って、2つの $k$ bitの数の最大公約数は $O(k^3)$ のバイナリ演算を伴うユークリッドの互除法で計算できる。

次に、全ての自然数は一意に複数の素数に素因数分解できることを示す。

## Definition A.12. Prime Numbers. - 素数

$p \in \N \; (p \ge 2)$ とする。

$1$ と $p$ 以外の正の約数を持たない $p$ を **素数** (*prime number*) という。

[注]

$p$ が素数で $p \| ab \; (a,b \in \Z)$ ならば、$p \| a$ または $p \| b$。

[証明]

$p$ は $a$, $b$ のどちらも割り切れないと仮定する。

このとき、[Proposition A.4.](#proposition-a-4-) より $1 = d_1 p + e_1 a = d_2 p + e_2 b$ なる $d_1,d_2,e_1,e_2 \in \Z$ が存在する。

また、 $1 = d_1 d_2 p^2 + d_1 e_2 b p + e_1 a d_2 p + e_1 e_2 a b$。

$p$ が $ab$ を割り切るなら $p$ は $1$ を割り切れることになるがこれはありえない。

背理法から、$p$ は $ab$ を割り切れない。

## Theorem A.13. Fundamental Theorem of Arithmetic. - 算術の基本定理

$n \in \N \; (n \ge 2)$ とする。

このとき、重複のない素数の組 $p_1, ..., p_r$ と指数 $e_1, ..., e_r \in \N \; (e_i \ge 1, i = 1, ..., r)$ が存在し、以下を満たす。

$$ n = \prod_{i=1}^r p_i^{e_i} $$

素数 $p_1, ..., p_r$ と指数 $e_1, ..., e_r$ は一意である。

[証明]

$n$ 上の帰納法によりこのような素因数分解の存在を示す。

1. $n = 2$ は素数。

2. $k \le n$ のとき、素因数分解が存在すると仮定する。

    $n+1$ は素数か、または$n+1 = l \cdot m, \; (l,m < n+1)$。

    仮定より $l$ と $m$ の素因数分解が存在し、従って $n+1$ の素因数分解も存在する。

次に素因数分解の一意性を示す。

$n$ の異なる2つの素因数分解があると仮定する。

両方の素因数分解を全ての共通する素数で割ると、それぞれの独立な素数の組 $p_1, ..., p_s$ と $q_1, ..., q_t$ を得られる。

ここで、$p_1 \cdot ... \cdot p_s = q_1 \cdot ... \cdot q_t$ なので、$q_1 \| q_1 \cdot ... \cdot q_t$。

しかし、$p_1$ と $q_i \; (1 \le i \le t)$ は互いに素なので矛盾する。
