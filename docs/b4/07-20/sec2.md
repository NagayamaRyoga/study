# 3.4 The Discrete Logarithm - 離散対数

Section 3.3. では、RSA暗号方式について説明した。

RSA関数は要素 $m$ を $e$ 乗する。

これは全単射関数であり、効率的に計算できる。
しかし、$n$ の因数分解が不明のとき、$e$ 乗根を計算するための効率的なアルゴリズムは知られていない。

同じように、数論では簡単に計算できるが、原像を求めることの難しい関数が他にもある。

最も重要な関数は有限体における冪乗である。

$p$ を素数とし、$g$ を $\Z_p^*$ の原始根とする (Section A.4.)。

離散指数関数 $Exp$ は一方向関数である。

$$ Exp: \Z_{p-1} \longrightarrow \Z_p^*, \; x \longmapsto g^x $$
                                                                                                                                                                                                                                                                                                                                                                                                                     
これは、[平方乗算法 (Algorithm A.27.)](../06-08/#algorithm-a-27-fast-modular-exponentiation-algorithm-) などによって効率的に求められるが、$Exp$ の逆関数 $Log$ を計算するための効率的なアルゴリズムは知られておらず、また、そのようなアルゴリズムは存在しないと広く考えられている。

この仮定は、**離散対数仮定** (*discrete logarithm assumption*) と呼ばれている。(正確な定義は Definition 6.1.)


## 3.4.1. ElGamal Encryption

RSA関数とは対照的に、$Exp$ は "抜け穴" のない一方向関数である。

$Exp$ は逆関数の計算を簡単に行うための付加的な情報を持たない。

それにも関わらず、$Exp$ は ElGamal 暗号方式の基礎となっている。([ElGamal84])

### Key Generation - 鍵の生成

メッセージの受信者 Bob は次のように準備をする。

1. $p-1$ が大きな素因数をもち、$\Z_p^*$ が原始根 $g$ を持つような大きい素数 $p$ を選ぶ。

2. $1 \le x \le p-2$ なる整数 $x$ をランダムに選ぶ。

    $(p, g, x)$ が Bob の秘密鍵となる。

3. $\Z_p$ 上の $y = g^x$ を計算する。

    $(p, g, y)$ が Bob の公開鍵となる。($x$ は依然として秘密である)

大きな素数 $q$ について、素数 $p$ が $p = 2kq+1$ を満たす場合、$p-1$ は大きな素因数を持つことになる。

従って、Bob はまず大きな素数 $q$ を選ぶ必要がある。
$q$ RSA 鍵の生成のときと同じ方法で求められる (Section 3.3.1.)。

続いて $p$ を得るために、適切なbit長の $k$ をランダムに選択し、確率的素数検定を $z = 2kq+1$ に適用する。
$z$ が素数でなかった場合には $k$ の値を $1$ ずつ増やしながら繰り返す。

最初の素数が得られるまで $O(\ln z)$ 回の検定が期待される (Corollay A.85.)。

素数 $p = 2kq+1$ が見つかったので、次に $\Z_p^*$ の要素 $g$ をランダムに選択し、$g$ が原始根であるかどうかを調べる。
この検定には $k$ の因数分解が必要になる (Algorithm A.40)。

従って、$k$ が効率的に因数分解できるよう (= $k$ が十分小さくなるよう)、 $q$ は十分大きなものを選択しなければならない。

ただし、$p-1$ のすべての素因数が小さな数であることは避けなければならない。
そのような場合には、Silver, Pohlig, Hellman によって発明された離散対数の効率的な計算アルゴリズムがある。 ([Koblitz94])

### Encryption and Decryption - 暗号化と復号

送信者 Alice は Bob の公開鍵 $(p, g, y)$ を用いてメッセージを暗号化する。

Alice は要素 $m \in \Z_p$ を暗号化できる。
$m \in \Z_p$ の暗号化のために、Alice は $1 \le k \le p-2$ なる整数 $k$ をランダムに選ぶ。

暗号文は次なる $\Z_p$ の要素のペア $(c_1, c_2)$ になる。

$$ (c_1, c_2) := (g^k, y^km) $$

計算は $\Z_p$ の中で行われる。

$m$ を $y^k$ と乗算することで、Alice はメッセージ $m$ をランダムな要素 $y^k$ で隠す。

Bob は暗号文 $(c_1, c_2)$ を秘密鍵 $x$ で復号する。

$y^k = (g^x)^k = (g^k)^x = c_1^x $ であるため、$c_2$ に $c_1^x$ の逆元 $c_1^{-x}$ を乗じることで平文 $m$ を得られる。

$$ c_1^{-x} c_2 = y^{-k} y^k m = m $$

$c_1^{p-1} = [1]$ であるため, $c_1^{-x} = c_1^{-x} c_1^{p-1} = c_1^{p-1-x}$。(p.412 Computing Modulo a Prime)

従って、Bob は $c_1$ を $(p-1-x)$ 乗することで平文 $m = c_1^{p-1-x} c_2$ を取り出すことができる。

> [注釈]
>
> $1 \le x \le p-2$ であるため、$p-1-x$ は正の数になる。

暗号化アルゴリズムは決定的アルゴリズムではない。暗号文は、平文・公開鍵・乱数に依存する。

乱数が各メッセージについて独立に選択される場合、2つの平文が同じ暗号文になることはほぼない。

この方式の安全性は **Diffie-Hellman 問題** と呼ばれる次の仮定に依存している。

**Diffie-Hellman 問題**: $g^x$ と $g^k$ から $g^{xk}$ (つまり、$g^{-xk} = (g^{xk})^{-1}$ と平文 $m$) を計算することはできない。

離散対数を計算する効率的なアルゴリズムは Diffie-Hellman 問題を解く。
Diffie-Hellman 問題が離散対数を計算することと等価かは不明であるが、この問題を解く効率的なアルゴリズムは存在しないと考えられている。(Section 4.1.2.)

基本的な RSA (Section 3.3.2.) のように、ElGamal の暗号化は選択暗号文攻撃に脆弱である。

暗号文 $c = (c_1, c_2)$ を復号したい攻撃者 Eve が、ランダムな $\tilde{k}$ と $\tilde{m}$ を選び、Bob に $\tilde{c} = (c_1 g^\tilde{k}, c_2 y^\tilde{k} \tilde{m})$ を復号させる。

Bob は $\tilde{c} = (g^{k+\tilde{k}}, y^{k+\tilde{k}} m \tilde{m})$ の平文 $m \tilde{m}$ を Eve に送る。

Eve は単に $\tilde{m}$ で割ることで $c$ の平文 $m$ を得ることができる。

Bob にとって $m \tilde{m}$ は乱数にみえるため、それを疑わしく思うことはない。


## ElGamal Signatures - ElGamal署名

### Key Generation - 鍵の生成

<!-- textlint-disable preset-ja-technical-writing/max-comma -->

署名者 Alice は上と同じ方法で $y = g^x$ なる公開鍵 $(p, g, y)$ 及び秘密鍵 $(p, g, x)$ を得る。

<!-- textlint-enable preset-ja-technical-writing/max-comma -->

### Signing - 署名

署名されるメッセージ $m$ が $\Z_{p-1}$ の要素であると仮定する。
(実際にはハッシュ関数 $h$ を用いてメッセージを $\Z_{p-1}$ に写像し、そのハッシュ値に署名する。)

署名は、署名者 Alice によって次のように生成される。

1. ランダムな整数 $1 \le k \le p-2, \; (gcd(k, p-1) = 1)$ を選択する。

2. $r := g^k,$

    $s := k^{-1} (m-rx) \mod (p-1).$

3. $(m,r,s)$ が署名になる。

### Verification - 検証

受信者 Bob は以下のように署名 $(m, r, s)$ を検証する。

1. $1 \le r \le p-1$ であることを検証する。

2. $v := g^m,$

    $w := y^r r^s.$ ($y$ は Alice の公開鍵)

3. $v = w$ であることを検証する。

## Proposition 3.7.

メッセージ $(m, r, s)$ を署名したならば $v = w$。

[証明]

$$ w = y^r r^s = (g^x)^r (g^k)^s = g^{rx} g^{k k^{-1} (m-rx)} = g^m = v $$

ここで、$g^{p-1} = [1]$ を利用して $g$ の指数を $p-1$ 未満まで減らせる。
(p.412 Computing Modulo a Prime)

[備考]

以下の考察は暗号方式の安全性に関係する。

1. 暗号方式の安全性は離散対数仮定に依存する。

    離散対数を計算できる者がいたとすれば、与えられた入力 $m$、$r$ について $g^m = y^r r^s$ なる離散対数 $s$ を見つけることで、別の誰かの秘密鍵を取得して暗号を完全に破壊できる。

    メッセージ $m$ の署名を偽造するには、$g^m = y^r r^s$ なる $r$、$s$ を見つけなければならない。
    この問題が離散対数の計算と同値であるかは不明だが、この問題を解く効率的なアルゴリズムは存在しないとも考えられている。

2. 攻撃者 Eve が署名されたメッセージ $m$ について選択された乱数 $k$ を得ることに成功した場合、高い確率で $gcd(r, p-1) = 1$ であることから、 $r x \equiv (m-sk) \mod (p-1)$ から 秘密鍵 $x$ を計算できる。

    そのため、乱数 $k$ を得るための乱数生成器は高品質なものでなければならない。

    > [注釈]
    >
    > 質の悪い乱数生成器の例: 線形合同法
    >
    > 質の良い乱数生成器の例: メルセンヌ・ツイスタ

3. メッセージごとに新しい乱数を選択することは必須である。

    同じ乱数が相異なるメッセージ $m \neq m'$ に使用された場合、
    $s - s' \equiv (m - m') k^{-1} \mod (p-1)$ から、
    $k \equiv (s - s')^{-1} (m - m') \mod (p-1)$ と乱数 $k$ を計算できる。

4. ハッシュ関数を使用しない ElGamal 署名は偽造できる。

    例えば、攻撃者 Eve はメッセージ $m$ について有効な署名 $(m, r, s)$ を以下の手順で簡単に構築できる。

    まず、$b$、$c = gcd(c, p-1)$ とする。
    $r = g^b y^c$、$s = -r c^{-1} \mod (p-1)$、$m = -r b c^{-1} \mod (p-1)$ について $(m, r, s)$ は $g^m = y^r r^s$ を満たす。

    > $y^r r^s = y^r (g^b y^c)^{-r c^{-1}} = y^r g^{-rbc^{-1}} y^{-r c c^{-1}} = g^{-rbc^{-1}} = g^m$

    実際には元のメッセージにはハッシュ関数 $h$ が適用され、それが署名される。
    攻撃者 Eve は $h(\tilde{m}) = m$ なるメッセージ $\tilde{m}$ を見つけなければならない。

    $h$ が衝突耐性ハッシュ関数である場合、これを見つけることのできる可能性は非常に低い。

5. D. Bleichenbacher は、[Bleichenbacher96] で **検証** の 1. の手順が必須のものであることを確認した。

    > 1. $1 \le r \le p-1$

    そうでなければ、攻撃者 Eve は $m$ が $\Z_{p-1}$ の単元であるような有効な署名 $(m, r, s)$ を知っていれば、Eve の選択したメッセージに署名できる。

    $m'$ が Eve の選択したメッセージとする。

    $u = m' m^{-1} \mod (p-1)$、$s' = s u \mod (p-1)$ とする。

    $r' \equiv r \mod p$ かつ $r' \equiv r u \mod (p-1)$ なる $r' \in \Z$ が中国の剰余定理 (Theorem A.30.) で得られ、
    $(m', r', s')$ は有効な署名となる。


## 3.4.3. Digital Signature Algorithm

1991年、NIST は デジタル署名標準 (DSS) を提案した。([NIST94])

DSS は、政府機関や金融機関が標準的に使用する電子署名方式になった。

DSS には ElGamal アルゴリズムと非常によく似たデジタル署名アルゴリズム (DSA) が含まれている。

### Key Generation - 鍵の生成

鍵は ElGamal 署名方式とよく似た方法で生成される。

ElGamal 署名方式と同じように素数 $p$、$\Z_p^*$ の要素 $g$、指数 $x$ が選ばれる。

$x$ は秘密に保たれ、$p$、$g$、$y = g^x$ が公開される。

ただし、$g$ は ElGamal と異なり $\Z_p^\*$ の原始根ではなく、$p-1$ の素因数 $q$ について次数が $q$ であるような $\Z_p^*$ の要素である。
また、$q$ は 160bit である必要がある。

署名者 Alice は次の手順で公開鍵、及び秘密鍵を生成する。

1. 素数 $p$ と、$p-1$ を割り切るような 160 bit の素数 $q$ を選ぶ。($p$ は $|p| = 512+64t, \; (0 \le t \le 8)$ の bit 長をもつことが望ましい。)

    これは ElGamal 暗号方式の鍵生成と似た方法で選択できる。

    まず、$q$ をランダムに選び、それから適切な長さのランダムな整数 $k$ を用いて、素数 $p$ を $\{2kq+1, 2(k+1)q+1, 2(k+2)q+1, ...\}$ の中から探す。

2. 次数 $q$ である要素 $g$ を得るため、$g := h^{(p-1)/q} \neq [1]$ になるまで $h \in \Z_p^*$ をランダムに選択する。

    このとき、$g$ の次数は $q$ であり、基数 $q$ なる $\Z_p^*$ 内の固有の巡回群 $G_q$ を生成する。

    $G_q$ の要素は $p$ を法とし、指数は $q$ を法として計算されることに注意する。

3. 最後に、整数 $1 \le x \le q-1$ をランダムに選択する。

<!-- textlint-disable preset-ja-technical-writing/max-comma -->

4. $(p, q, g, x)$ が秘密鍵、$y := g^x$ について $(p, q, g, y)$ が公開鍵である。

<!-- textlint-enable preset-ja-technical-writing/max-comma -->

### Signing - 署名

DSA で署名されるメッセージ $m$ は $\Z_q$ の要素である必要がある。

DSSでは、ハッシュ関数 $h$ を用いて実メッセージから $\Z_q$ の要素へと写像する。

署名は次の手順で生成される。

1. 乱数 $1 \le k \le q-1$ を選択する。

2. $r := (g^k \mod p) \mod q$、$s := k^{-1} (m + rx) \mod q$

    $s = 0$ なら 手順1. に戻る。(非常に低い確率でしか起こらない。)

3. $(m, r, s)$ が署名になる。

ElGamal署名方式の検証条件を思い返す。

> $\tilde{r} := g^k \mod p$、
> $\tilde{s} := k^{-1} (m - \tilde{r} x) \mod (p-1)$
> なる $(m, \tilde{r}, \tilde{s})$ について、
>
> $$ y^\tilde{r} \tilde{r}^\tilde{s} \equiv g^m \mod p $$

> で署名の検証が行える。

DSA の $\tilde{s}$ は、ElGamal 署名方式の $(m {\color{red}-} \tilde{r} x)$ ではなく、$(m {\color{red}+} \tilde{r} x)$ を用いて $\tilde{s} = k^{-1} (m + \tilde{r} x) \mod (p-1)$ と定義される。
さらに、$y$ の指数 $\tilde{r}$ を $-\tilde{r}$ で置き換えると検証に用いる方程式は有効性を保つ。

$$ y^{-\tilde{r}} \tilde{r}^\tilde{s} \equiv g^m \mod p \tag{3.1} $$

> [注釈] 上の式の証明
>
> $y^{-\tilde{r}} \tilde{r}^\tilde{s} = (g^x)^{-\tilde{r}} (g^k)^{k^{-1} (m + \tilde{r} x)} = g^{-\tilde{r} x} g^{m + \tilde{r} x} = g^m$

DSA では、$g$ (と $\tilde{r}$ および $y$) は $\Z_p^*$ の次数 $q$ の要素であるため、式 (3.1) の指数 $\tilde{r}$ と $\tilde{s}$ はそれぞれ
$\tilde{r} \mod q = r$、$\tilde{s} \mod q = s$ と置き換えることができる。

ここで、式 (3.1) から ($\tilde{r}$ と $\tilde{s}$ ではなく) $q$ を法とする $r$ と $s$ を用いた検証条件の方程式が得られるのではないかという着想が得られる。

しかし、指数 $\tilde{r}$ は (3.1) の基数部分にも現れる。
両辺の等価性を維持したまま基数部分をより小さい数 $r$ に単に置き換えることはできないため、これは簡単には導けない。

この困難を克服するため、まず 式 (3.1) を次のように変換する。

$$ \tilde{r}^s \equiv g^m y^r \mod p $$

ここで、$s$ が $\Z_q^*$ の単元であることを利用して左辺の冪乗を取り除く。

すなわち、$t = s^{-1} \mod q$ について、

$$ \tilde{r} \equiv (g^m y^r)^t \mod p $$

次に、両辺について $q$ の法を取ることで、以下の検証条件を得られる。

$$ r = \tilde{r} \mod q \equiv ((g^m y^r)^t \mod p) \mod q $$

以下に検証条件の完全な証明を示す。([Proposition 3.8.](#proposition-3-8-))

右辺の累乗は $\Z_p$ で行われることに注意する。

### Verification - 検証

署名 $(m, r, s)$ を以下の手順で検証する。

1. $1 \le r \le q-1$ かつ $1 \le s \le q-1$ であることを検証する。

2. $q$ を法とした $s$ の逆数 $t := s^{-1}$ および、$v := ((g^m y^r)^t \mod p) \mod q$ を計算する。($y$ は 署名者 Alice の公開鍵。)

3. $v = r$ であることを検証する。

## Proposition 3.8.

署名 $(m, r, s)$ について、$v = r$。

[証明]

$g^q \equiv 1 \mod p$ であることを利用する。

$$
\begin{split}
    v &= ((g^m y^r)^t \mod p) \mod q \\\\
      &= ((g^{m} g^{rx})^t \mod p) \mod q \\\\
      &= (g^{(m+rx)t} \mod p) \mod q \\\\
      &= (g^{(m+rx)t \mod q} \mod p) \mod q \\\\
      &= (g^{(m+rx) s^{-1} \mod q} \mod p) \mod q \\\\
      &= (g^{(m+rx) (k^{-1} (m+rx))^{-1} \mod q} \mod p) \mod q \\\\
      &= (g^k \mod p) \mod q \\\\
      &= \tilde{r} \mod q \\\\
      &= r \\\\
\end{split}
$$

[注意]

1. ElGamal 署名方式に比べ、DSA は署名がかなり短く、160 bit 長の数 2つで構成される。

2. DSA ではほとんどの計算 (特に累乗) は $\Z_p^*$ で行われる。

    DSA の安全性は離散対数の計算の困難性、つまり、離散対数仮定に依存する。

    $g$ は (次数 $p-1$ の) 原始根ではなく、$p-1$ を割り切る大きな素数 $q$ について、次数 $q$ の要素である。

    秘密鍵 $x$ を得るためには、$g$ によって生成されるはるかに小さい部分群 $G_q$ からランダム要素 $y = g^x$ の離散対数を見つけるだけでよい。
    したがって、DSA の安全性は部分群 $G_q$ から無作為に選択された要素の離散対数を見つけることは不可能であるというより強い仮定を必要とする。

3. ElGamal 署名方式のセキュリティに関する注意は DSA および DSS にも適用される。

4. DSS では、DSA によって署名される前にメッセージをハッシュ化する。

    DSS は、SHA-1 をハッシュ関数に使用することを提案している。