暗号化 (*Cryptography*) は秘密を秘密たらしめるための科学である。

送信者 *Alice* が受信者 *Bob* に対してメッセージ $m$ を送りたいと仮定する。

彼女はコンピュータネットワークや電話回線のような安全でない (insecure) 通信路を用いる。

もしそのメッセージ $m$ に機密情報が含まれている場合には、メッセージが傍受され中身を盗み見られるかもしれない。

あるいはもっと質の悪い攻撃者 *Eve* が受信者 *Bob* に気付かないようメッセージを改ざんしてしまう可能性だってある。

> [注釈]
>
> 暗号通信の分野では慣例的に 送信者 *Alice*、受信者に *Bob* という名前がよく使われる。
> 
> *Alice*: 送信者
>
> *Bob*: 受信者
>
> *Eve*: 攻撃者
>
> 参考: https://ja.wikipedia.org/wiki/アリスとボブ

暗号化の目的の1つはその様な攻撃を防ぐことだ。

他の目的は [Section 1.2.](#the-objective-of-cryptography-) で論じる。

# Encryption and Secrecy - 暗号化と秘密

暗号の基本的で古典的な役割は、暗号化方式 (*encryption methods*) による機密 (*confidentiality*) を提供することだ。

送信されるメッセージ (文章、数値、実行ファイル、etc) は平文 (*plaintext*) と呼ばれる。

*Alice* は平文 $m$ を暗号化し(*encrypts*)得られた暗号文 (*ciphertext*) $c$ を *Bob* に送信した。

*Bob* は復号(*decryption*)により暗号文を平文に戻す。

復号のため、*Bob* はある種の秘密の **解読キー** (*decryption key*) を必要とする。

攻撃者 *Eve* は依然として暗号文を傍受しているかもしれないが、暗号は *Eve* が暗号文から平文についての情報を得られないように防ぎ、秘密を保証しなければならない。

暗号の歴史はとても古い。例えば **シーザー暗号** (*Caesar's shift cipher*) は2000年以上も前に使われていた。

全ての暗号化方式には暗号化アルゴリズム $E$ と復号アルゴリズム $D$ がある。

古典的な暗号化方式では暗号化アルゴリズム $E$ と復号アルゴリズム $D$ の両方が共通の秘密鍵 $k$ に依存する。
この鍵 $k$ は暗号化と復号の両方に用いられる。
そのため、このような暗号化方式は **対称的** (*symmetric*) と呼ばれる。

例えばシーザー暗号の秘密鍵は文字のシフト量 (`3`) にあたる。

全ての平文 $m$ について以下が成り立つ。

$$ D(k, E(k, m)) = m $$

> [注釈]
>
> $c = E(k, m)$ は 平文$m$ を 鍵$k$ によって暗号化した暗号文。
>
> $D(k, c) = m$ は 暗号文$c$ を暗号化に用いた 鍵$k$ で復号すると 平文$m$ が得られることを表す。

対称鍵暗号とその重要な例である DES (Data Encryption Standard) 及び AES (Advanced Encryption Standard) については Section 2.1. で論じる。

1976年、Diffe と Hellman は論文 *"New Directions in Cryptography"* を発表した。

その中で彼らは革新的な **公開鍵暗号** (*public-key cryptography*) の概念を紹介した。

それは長く続いた鍵交換の問題を解決し、デジタル署名への方向性を示した。

Chapter 3. で学ぶ公開鍵暗号方式は **非対称** (*asymmetric*) である。

全てのメッセージ受信者は個人鍵 $k = (pk, sk)$ を持つ。
$pk$ は暗号化に用いられる公開鍵、$sk$ は復号に用いられる秘密鍵である。

*Alice* が *BoB* にメッセージ $m$ を送信する場合、$m$ を *Bob* の外部に公開されている公開鍵 $pk$ で暗号化する。

*Bob* は彼だけが知っている秘密鍵 $sk$ で暗号文を復号する。

$$ D(sk, E(pk, m)) = m. $$

> [注釈]
>
> $c = E(pk, m)$ は 平文$m$ を 公開鍵$pk$ によって暗号化した暗号文。
>
> $D(sk, c) = m$ は 暗号文$c$ を 秘密鍵$sk$ で復号すると 平文$m$ が得られることを表す。

数学的に言えば、公開鍵暗号は所謂 **秘密の抜け穴の付いた一方向関数** (*one way function* with a *trapdoor*) だ。

公開鍵$pk$ を使えば誰でも簡単に平文を暗号化出来るが、その逆は難しい。

実際的には 秘密鍵$sk$ を知らなければ平文から暗号文を推測するのは不可能だ。

公開鍵暗号方式は古典的な対称鍵暗号方式よりも複雑な計算を必要とし、効率も悪い。

従って、大量のデータの暗号化には対称鍵暗号方式が用いられる。

対称鍵暗号を適用する前に、*Alice* と *Bob* は安全な通信路を用いて鍵を共有しないといけない。

一般的にはこの鍵のやり取りに公開鍵暗号が用いられる。
