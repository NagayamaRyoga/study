# 3.4 The Discrete Logarithm - 離散対数

[Section 3.3.](#TODO) では、RSA暗号方式について説明した。

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
