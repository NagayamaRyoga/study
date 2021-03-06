# Attacks - 攻撃

暗号化の主な目的は平文についての情報を盗聴者から秘密に保つことだ。

また、敵対者は積極的にメッセージを改ざんしようとするかも知れない。
そのため、暗号化はメッセージの完全性を保証することが求められる。

攻撃者は通信路への完全なアクセスが可能であると想定する。

**暗号解読** (*cryptanalysis*) は、暗号化方式に対する攻撃を研究する科学だ。

暗号文から平文の全てまたは一部を復元するような攻撃が成功すれば、メッセージを改ざんしたり、あるいは電子署名を偽造できたりするかもしれない。

暗号化および暗号解読はより一般的な用語の、**暗号学** (*cryptology*) という言葉で総称されることがある。

暗号解読における基本的な仮定――**ケルクホフの原理** (*Kerckhoffs' Principle*)――は、19世紀に *Auguste Kerckhoffs* という人物によって初めて述べられた。

>  ケルクホフの原理
>
> 攻撃者はそのアルゴリズムや実装を含めた暗号の方式について全てを知り尽くしている場合にも秘密を守れなければならない。

暗号方式に対する攻撃は、暗号文から平文を復元したり、あるいはもっと大胆に秘密鍵を復元しようとする。

次の調査は受動的な攻撃に限定されている。
攻撃者 *Eve* はメッセージを改ざんしようとはしない。

攻撃者は通信路とその終点 (送信者および受信者) を監視している。

そのため、彼女は暗号文を傍受するのみでなく、時にはメッセージの暗号化と復号の様子を観察することが出来るかもしれない。
彼女は鍵についての情報は一切知らない。

例えば、攻撃者は銀行のコンピュータのオペレータかもしれない。

彼女は到着した暗号文といくつかのそれに対応する平文の情報、もしくは送信された暗号文とその平文に関する情報を得られる。

そのような場合、おそらく彼女は任意の平文を暗号化したり、暗号文を解読できたりする。

ここで可能な攻撃は、攻撃者の持つリソースに依る。

それらは通常以下のように分類される。

1. **暗号文単独攻撃** (*ciphertext-only attack*)

    暗号文のみを用いて平文を求める攻撃。

    どのような状況においてもそうであることが多い。

    暗号文単独攻撃に耐えられない暗号化方式は全くもって安全ではない。

2. **既知平文攻撃** (*known-plaintext attack*)

    攻撃者が既知の平文に対応する暗号文を得られる条件で、暗号文から未知の平文を求める攻撃。

    メッセージはしばしば攻撃者の知っているような標準的な方法で送信されるため、このような状況も発生しうる。

3. **選択平文攻撃** (*chosen-plaintext attack*)

    攻撃者が任意の平文に対応する暗号文を得られる条件で、暗号文から平文を求める攻撃。

    これもまたそんなに起こらない状況に思えるかもしれないが、実際ままある。

    例えば、攻撃者が攻撃の被害者に対して何らかの(興味深い)情報を送信し、その返答を推測することで行う。
    この類の攻撃では、最初に攻撃者が何らかの平文と対応する暗号文のペアを取得してから、それを基に(それ以上の接触なく)暗号を解析する必要があると仮定している。

    つまり、攻撃者は暗号化装置にたった一度アクセスできれば良いことを表している。

4. **適応的選択平文攻撃** (*adaptive-chosen-plaintext attack*)

    これは選択平文攻撃に似ているが、攻撃者は平文と暗号文のペアについて解析することで、また別の平文とそれに対応する暗号文を求める攻撃。

    攻撃者は望む限り解析とペアの採集出来る。

    > She may switch between gathering pairs and performing the analysis as often as she likes.

    これは、攻撃者が暗号化装置に長期間アクセス可能であるか、何らかの形でそれを繰り返し利用できることを意味する。

5. **選択暗号文攻撃**および**適応的選択暗号文攻撃** (*Chosen- and adaptively-chosen-ciphertext attacks*)

    攻撃者が暗号文に対応する平文を求める攻撃。

    攻撃者は解読装置にアクセスできる。
