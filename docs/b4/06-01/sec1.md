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

    最大公約数は $gcd(a,b)$ と書く。

3. $gcd(a,b) = 1$ のとき、$a$ と $b$ は **互いに素** (*relatively prime*) と言う。

4. 以下を満たす $m \in \N$ を $a$ と $b$ の **最小公倍数** (*least common multiple*) と呼ぶ。

    1. $m$ は $a$, $b$ の倍数である。

    2. $m' \in \Z$ が $a$, $b$ の倍数であるとき、$m'$ は $m$ で割り切れる。

    最小公倍数は $lcm(a,b)$ と書く。

## Proposition A.2.

$a,b \in \Z$ について $gcd(a,b) \cdot lcm(a,b) = |a \cdot b|$。

[証明]

$a,b \ge 0$ と仮定してもよい。

$a = 0$ または $b = 0$ のとき、$lcm(a,b) = 0$ となり、この式は成り立つ。

$a,b > 0$, $m := lcm(a,b)$ とする。
$ab$ は $a$ と $b$ の倍数であるため $m$ で割り切れる。
すなわち $ab = md$。

ここで、$d = \frac{ab}{m} = gcd(a,b)$ であることを示す。

$a = \frac{m}{b} d$, $b = \frac{m}{a} d$ であるため、$d$ は $a$, $b$ を割り切る。

$a$ と $b$ の除数 $d'$ について、$\frac{a}{d'} b = a \frac{b}{d'}$ は $a$ と $b$ の倍数である。
それゆえに $\frac{a}{d'} b$ は $m$ で割り切れる。
よって $d = \frac{ab}{m}$ は $d'$ で割り切れる。
