# EP1675031A1 - Watermarking computer program code by equivalent mathematical expressions

- **Date of publication**: 2006/06/28
- **Applicant**: Telefonaktiebolaget LM Ericsson
- **Nations**: DE, EP, US, CN
- **Google Patents**: https://patents.google.com/patent/EP1675031A1/

## 概要

数学的に等価な数式に着目することでソフトウェアに透かしを埋め込む方法に関する特許。

ソースコードに対して埋め込みを行う。

### 埋め込みの例

埋め込み例 1

$$
\begin{align}
& if (x == 2) \\\\
\Leftrightarrow
& if (x-2 == 0) \\\\
\Leftrightarrow
& if ((x-2)(x^2+x+4) == 0) \\\\
\Leftrightarrow
& if (x^3-x^2+2x-8 == 0)
\end{align}
$$

埋め込み例 2

$$
\begin{align}
& while (x > 2) \\\\
\Leftrightarrow
& while (x-2 > 0) \\\\
\Leftrightarrow
& while ((x-2)(x^2+x+4) > 0) \\\\
\Leftrightarrow
& while (x^3-x^2+2x-8 > 0)
\end{align}
$$

埋め込み例 3

$$
\begin{align}
y &= x - 2 \\\\
  &= \frac{(x-2)(x+1)(x+2)(x+3)}{(x+1)(x+2)(x+3)} \\\\
  &= \frac{(x-2)(x+1)(x+2)(x+2)}{(x+1)(x+2)(x+3)} + \frac{(x-2)(x+1)(x+2)}{(x+1)(x+2)(x+3)} \\\\
\end{align}
$$

## まとめ

- ソースコードに対して埋め込みを行う
- 数式の数学的等価性に着目する
- 特定のプログラミング言語に依らない
