公開鍵暗号は **合同算術** (*modular arithmetic*) に基づいている。

この節では、暗号方式の理解に必須の代数と数論の概念と結果を要約する。

数論と合同算術に関する教科書には [HarWri79] [IreRos82] [Rose94] [Forster96] [Rosen00] などがある。

また、この節は表記を定めることも目的とする。

読者が　**郡** (*groups*), **環** (*rings*), **体** (*fields*) に精通していることを前提とする。

# The Integers - 整数

$\Z$ は整数の環を表す。
$\N = \lbrace z \in \Z \| z > 0 \rbrace$ は自然数の部分集合を表す。

始めに **除数** (*divisors*) の概念と2数の **最大公約数** (*greatest common divisor*) を求めるための基本的な **ユークリッドの互除法** (*Euclidean algorithm*) について紹介する。

## Definition A.1.

1. $a,b \in \Z$ とする。

    $b = ac$ となる $c \in \Z$ が存在するとき、$b$ は $a$ を割り切れる。

    このとき $b$ を $a$ の **倍数** (*multiple*) と呼ぶ。

    $b$ が $a$ で割り切れることを $a \| b$ と書く。

2. 以下を満たす $d \in \N$ を $a$ と $b$ の **最大公約数** (*greatest common divisor*) と呼ぶ。

    1. $d$ は $a$, $b$ のどちらも割り切る。

    2. $d'$ が $a$, $b$ のどちらも割り切るとき、$d'$ は $d$ も割り切る。

    最大公約数は $\rm{gcd}(a,b)$ と書く。

3. $\rm{gcd}(a,b) = 1$ のとき、$a$ と $b$ は **互いに素** (*relatively prime*) と言う。

4. 以下を満たす $m \in \N$ を $a$ と $b$ の **最小公倍数** (*least common multiple*) と呼ぶ。

    1. $m$ は $a$, $b$ の倍数である。

    2. $m' \in \Z$ が $a$, $b$ の倍数であるとき、$m'$ は $m$ で割り切れる。

    最小公倍数は $\rm{lcm}(a,b)$ と書く。

## Proposition A.2.

$a,b \in \Z$ について $\rm{gcd}(a,b) \cdot \rm{lcm}(a,b) = |a \cdot b|$。

[証明]

1. $a,b \ge 0$ と仮定してもよい。

    $a = 0$ または $b = 0$ のとき、$\rm{lcm}(a,b) = 0$ となり、この式は成り立つ。

1. $a,b > 0$, $m := \rm{lcm}(a,b)$ とする。
    $ab$ は $a$ と $b$ の倍数であるため $m$ で割り切れる。
    すなわち $ab = md$。

    ここで、$d = \frac{ab}{m} = \rm{gcd}(a,b)$ であることを示す。

    $a = \frac{m}{b} d$, $b = \frac{m}{a} d$ であるため、$d$ は $a$, $b$ を割り切る。

    $a$ と $b$ の除数 $d'$ について、$\frac{a}{d'} b = a \frac{b}{d'}$ は $a$ と $b$ の倍数である。
    それゆえに $\frac{a}{d'} b$ は $m$ で割り切れる。
    よって $d = \frac{ab}{m}$ は $d'$ で割り切れる。

## Theorem A.3. Division with remainder - 剰余

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

## The Euclidean Algorithm - ユークリッドの互除法

$a,b \in \Z, a > b > 0$ とする。

最大公約数 $\rm{gcd}(a,b)$ は剰余演算の繰り返しで求めることが出来る。

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

1. $r_n = \rm{gcd}(a,b)$

2. $\rm{gcd}(a,b) = da + eb$ となる $d,e \in \Z$ が存在する。

[証明]

1. ユークリッドの互除法に関する方程式を逆順で考えたとき、 $r_n$ が $r_k \; (k=n-1,n-2,...)$ を割り切れる。

    特に、$r_n$ は $r_1 = b$ と $r_0 = a$ を割り切れる。

    $t$ を $a$ と $b$ の除数とすれば、$t \| r_k \; (k=2,3,...)$、すなわち $t \| r_n$。

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
