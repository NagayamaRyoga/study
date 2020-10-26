# 1. Introduction

ソフトウェアの違法コピーは研究コミュニティからの関心が高まっている [1,2,3]。
今日では、ソフトウェア開発者は主に暗号化やライセンス番号、キーファイル、ドングルなどの著作権保護技術を用いている [1,4]。
これらの技術はクラック攻撃に脆弱であり、また、海賊版の追跡は困難である。
その上、開発者は多くの時間や資源、努力を著作権保護のために費やさなければならない。
暗号システムのような信頼性の高いソフトウェア保護システムが存在すれば、ソフトウェアの保護だけでなく、さらに開発者はソフトウェアの開発にリソースを割けるようになる。
ソフトウェア透かしは上記のような価値に対する野心的な試みである [5]。

ソフトウェア透かしを実現する技術はいくつか提案されているが、既知のすべての攻撃に耐性を持つアルゴリズムは存在しない。

Davidsonら[6] は、プログラムを構成する基本ブロックの順序で電子透かしを静的にエンコードしている。これは、基本ブロックの順序を変えることで容易に改ざんできる。

Sternら[7] は、プログラム内の命令のスペクトラムを変更することで透かしを埋め込むために、スペクトラム拡散技術を導入した。
この手法は、様々な種類の信号処理にロバストである。
しかし、データレートが低く、冗長な命令を挿入したりコード最適化を行うことで簡単に破壊できる。

Collbergら[8] は、ポインタエイリアシング効果を用いて、秘密の入力シーケンスに対してヒープ上に構築される動的データ構造のトポロジーに透かしを埋め込む動的手法を提案した。
この手法はプログラムの基本データ型のポインタトポロジーを変更できるあらゆる攻撃に対して脆弱である。

Cousotら[9]は、ローカル変数に透かしを埋め込み、プログラムの一部のみからでも透かしを検出できた。
この手法は、透かしを表現するローカル変数が見つからないようにプログラムを難読化したり、中小インタプリタがそれらのろーぁる変数にどのような値が割り当てられているかを判断できないようにすることで攻撃できる。

Nagaraら[5]は、マルチスレッドのプログラムは本質的に解析が困難であり、解析の困難さは同時に"生きている"スレッドの数が多いほど増大するという前提のもとでスレッドベースの透かしを提案している。
しかし、この手法では多数のスレッドを導入する必要があり、性能の低下も無視できない。

一般的に、以下のような制限がある。

- (A) 想定される脅威モデルはほぼ自動攻撃 (コード最適化、難読化、データ再構成など) に基づいており、手動攻撃 (リバースエンジニアリングなど) にはほとんど基づいていない。
- (B) 透かしはプログラムの特定のモジュールに埋め込まれているだけで、すべてのモジュールを保護できるわけではなく、クロッピング攻撃に耐えられない。
- (C) 透かしはソースコードに埋め込まれるため再コンパイルが必要であり、埋め込み効率やフィンガープリンティングの効率は悪い。
- (D) 埋め込み手順では、プログラマがすべての作業、特に複雑な透かしの構築と埋め込みを引き受けなければならないため必ずしも実現可能とは限らない。

本論文では、カオスシステムとアンチリバースエンジニアリング技術、イースターエッグ透かしのアイデアを統合した新しい手法、***Chaos based Robust Software Watermarking*** (CRSW) を設計する。
この手法はイースターエッグソフトウェア透かしの機能と実現性と、様々な種類の意味保存コード変換攻撃に対する耐性を持つ。
カオスシステムが関係している場合、コード全体に透かしを分散させることでプログラムを大域的に保護できる。
さらに、アンチリバースエンジニアリング技術を用いることでリバースエンジニアリング攻撃に対する耐性を向上させる。

CRSWでは実行可能コードに直接透かしを埋め込むことができるため、プログラムの再コンパイルが不要になるため、効率性が向上する。
提案アルゴリズムの解析の結果、CRSWは様々な種類の意味変換に耐性があり、リバースエンジニアリング攻撃に対する耐性が高く、また性能の低下がわずかであることを示した。