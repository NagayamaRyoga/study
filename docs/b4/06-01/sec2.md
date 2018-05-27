# A.2. Residues. - 剰余

公開鍵暗号方式では、通常 $n$ を法とする剰余を計算する必要がある。

これは計算が **剰余環** (*residue class ring*) $\Z_n$ で行われることを意味する。

## Definition A.14. Residue Classes. - 剰余類

$n$ を正の整数とする。

1. $a$, $b$ が $n$ を法として合同とは、$a-b$ が $n$ で割り切れることを意味し、 $a \equiv b \mod n$ 書く。

    これは、$a$ と $b$ を $n$ で割ったときの剰余が等しいことを表す。

2. $a \in \Z$ とする。

    $[a] := \{ x \in \Z \| x \equiv a \mod n \}$

    は $m$ を法とする $a$ の **剰余類** (*residue class*) と呼ばれる。

3. $\Z_n := \{ [a] \| a \in \Z \}$ は $n$ を法とする剰余類の集合である。

[注]

「$n$ を法として合同」とは **対称的** (*symmetric*) で **反射的** (*reflexive*) で **推移的** (*transitive*) な関係、すなわち **同値関係** (*equivalence relation*) である。

剰余類は **同値類** (*equivalence classes*) である。

剰余類 $[a]$ は要素の1つが分かれば完全に決定される。

$a' \in [a]$ ならば $[a] = [a']$。

$[a]$ の要素 $x \in [a]$ を $[a]$ の **代表元** (*representative*) と呼ぶ。

$n$ との剰余によって $0, ..., n-1$ が得られる。従って、$n$ の剰余類 $\Z_n = \{ [0], ..., [n-1] \}$。

整数 $0, ..., n-1$ は **自然代表元** (*natural representatives*) と呼ぶ。

$[x] \in \Z_n$ の自然代表元は単に 剰余 $x \mod n$ である。

入出力が剰余類であるアルゴリズムを学ぶには剰余類の2進符号化が必要である。$[x] \in \Z_n$ の2進符号は、符号なし整数としての自然代表元 $x \mod n$ の2進符号である。

## Definition A.15. Addition and Multiplication - 加算と乗算

$$ [a] + [b] = [a+b] $$

$$ [a] \cdot [b] = [a \cdot b] $$

<!-- textlint-disable preset-japanese/no-doubled-joshi -->

$\Z_n$ は $[1]$ を **単位元** (*unit element*) に持つ **可換環** (*commutative ring*) であり、$n$ を法とする **剰余環** (*residue class ring*) と呼ぶ。

<!-- textlint-enable preset-japanese/no-doubled-joshi -->
