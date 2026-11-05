export const TOOLS_MATRIX = [
  {
    name: 'Google AI Studio',
    subtitle: 'Playground',
    position: 'プロンプト検証・上流思考用のWeb環境',
    target: 'プロンプト・長文仕様・テキスト',
    context: '会話履歴 / 投入したテキストのみ',
    output: '手動でコピー＆ペースト / ファイル保存',
    environment: 'なし（コード実行やターミナル操作は不可）',
    roleInBreakout: '企画の要求整理、物理演算・当たり判定仕様の策定、運用手順書の作成',
    tagColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
  },
  {
    name: 'Antigravity Desktop',
    subtitle: 'Visual Agent Hub',
    position: '複数エージェント統括・視覚検証用GUIアプリ',
    target: 'エージェント群・Mermaid図・GUIアプリ画面',
    context: '複数プロジェクト・タスクツリー全体',
    output: 'プレビュー表示・アーティファクト確認',
    environment: 'GUIプレビュー・視覚的インタラクション',
    roleInBreakout: 'クラス図・状態遷移図の視覚レビュー、実際のGUIウィンドウの描画・プレイ検証',
    tagColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
  },
  {
    name: 'Antigravity IDE',
    subtitle: 'Agentic Coding IDE',
    position: 'AIエージェント内蔵の統合開発環境 (IDE)',
    target: 'ローカルファイル・Git・内蔵ターミナル',
    context: 'ローカルリポジトリ全体（構造・依存関係）',
    output: '複数ファイルへ直接差分適用・自動生成',
    environment: '内蔵ターミナルでのビルド・テスト自律実行',
    roleInBreakout: 'ロジックと描画の分離設計、ヘッドレス自動テスト（pytest）の自己修復ループ、Git統制',
    tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
  }
];

export const CURRICULUM_STEPS = [
  {
    id: 'step-01',
    orderNumber: '01',
    title: '要求定義 (Business Requirements)',
    category: 'upstream',
    tools: ['Google AI Studio'],
    artifact: 'docs/01_business_requirements.md',
    verifiedAgainst: '09. 受入テスト',
    goal: 'クライアントの要望から、ゲームのコア体験（In-Scope）と初期リリースでは作らない要素（Out-of-Scope）を明確に分離する。',
    description: '曖昧なヒアリングメモから、プロジェクトの目的、成功基準、スコープ境界を厳密に言語化します。',
    practicalSteps: [
      {
        title: 'AI Studioのモデル選択とパラメータ確認',
        description: 'Google AI Studio を開きます。【最新UI対応注記】最新のAI Studio（特にThinkingモデル等）では、推論プロセスの自律最適化のため「Temperature」スライダーがUI上に表示されない（または自動制御・固定）場合があります。設定欄がない場合はデフォルトのままで問題ありません。非Thinkingモデルで詳細設定（Advanced Settings）にスライダーが表示されている場合のみ 0.2 に設定してください。'
      },
      {
        title: '要求定義プロンプトの実行',
        description: '下記のプロンプトを投入し、docs/01_business_requirements.md を生成します（プロンプト側でも「推測や装飾を排除し決定論的に構造化する」よう制約しています）。'
      },
      {
        title: '生成テキストの確認と手元保存',
        description: 'In-ScopeとOut-of-Scopeが明確に定義されているかを確認し、次工程の入力として保持します。'
      }
    ],
    prompt: `# 役割
あなたはゲーム開発およびソフトウェア設計に精通したシニアITアーキテクトです。

# 目的
以下のクライアントヒアリングメモから本質的な要求を抽出し、
「業務要求仕様書（docs/01_business_requirements.md）」をMarkdown形式で作成してください。
※推測や装飾的な演出アイデアなどの余計な拡散は排除し、論理的かつ厳密に構造化してください。

# 出力構成
1. プロジェクト背景と目的
2. コアゲーム体験とユーザーストーリー（As-Is / To-Be）
3. 成功基準（定量的目標：フレームレートの安定性、テスト自動化率など）
4. スコープ定義
   - 対象スコープ（In-Scope：基本ゲームループ、スコア計算、残機管理、ハイスコア保存）
   - 対象外スコープ（Out-of-Scope：オンラインランキング通信、BGM/効果音再生、複雑なパーティクル演出、マルチボールアイテムなど初期版で除外するもの）

# クライアントヒアリングメモ
社内イベントやプログラミング学習の題材として、Pythonで動くGUIの『ブロック崩しゲーム』を作りたい。
パドルを左右キーで操作してボールを跳ね返し、上部に並んだ複数段のブロックをすべて壊したらステージクリア、ボールを画面下に3回落としたらゲームオーバーにしたい。上段のブロックほど壊したときのスコアを高くし、ハイスコアをローカルファイル（JSON）に保存・表示できるようにしてほしい。
Ubuntu環境で標準ライブラリの tkinter を使ってPython 3.13で作りたい。また、GUI画面を開かなくてもゲームの計算ロジックや当たり判定を pytest で高速にテストできる構造にしてほしい。`,
    designIntent: {
      summary: 'ゲーム開発特有の「スコープ肥大化」を入口で完全に防ぐ',
      points: [
        {
          title: 'スコープクリープ防止',
          explanation: 'ゲーム開発は「アイテムを出したい」「音をつけたい」と要求が無限に膨らみがちです。工程01でOut-of-Scopeを明文化することが完成への絶対条件です。'
        },
        {
          title: '低Temperature (0.2) / 最新UIでの扱い',
          explanation: '従来はアイデア拡散を防ぐため0.2前後に設定していました。最新のAI StudioやThinkingモデルではTemperatureがUI上で非表示・自動制御される仕様になっているため、プロンプト内で「拡散の抑制と論理的構造化」を直接指示するアプローチが推奨されます。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-01-1', label: 'Out-of-Scopeの明確化', detail: 'BGM、オンライン通信、複雑演出が初期対象外として定義されている' },
      { id: 'c-01-2', label: '定量的成功基準の定義', detail: 'テスト自動化やフレームレート安定性が目標として記載されている' }
    ]
  },
  {
    id: 'step-02',
    orderNumber: '02',
    title: '要件定義 (System Requirements)',
    category: 'upstream',
    tools: ['Google AI Studio'],
    artifact: 'docs/02_requirements.md',
    verifiedAgainst: '08. システムテスト',
    goal: '曖昧な「ブロック崩し」を、座標系・速度ベクトル・当たり判定・状態遷移・非機能要件（60FPS = 1フレーム16.6ms以内）として数値定義する。',
    description: 'エンジニアおよびAIエージェントが自己修復テストを実行できるよう、全ての仕様を数値とステートマシンとして定義します。',
    practicalSteps: [
      {
        title: 'チャットセッションの継続',
        description: '工程01のコンテキストを保持したまま、以下の要件定義プロンプトを実行します。'
      },
      {
        title: '非機能要件の数値確認',
        description: '「1フレームあたりの物理計算 tick() が 2.0ms 以内」「tkinter非依存のヘッドレステスト」が含まれているかを厳密に確認します。'
      }
    ],
    prompt: `# 目的
確定した業務要求に基づき、エンジニアが実装・自動テスト可能な
「システム要件定義書（docs/02_requirements.md）」を作成してください。

# 出力構成
## 1. 画面・座標系およびエンティティ仕様
- キャンバスサイズ（例: 幅800px × 高さ600px）
- パドル（サイズ、初期位置、移動速度、画面端の移動制限）
- ボール（半径、初期位置、速度ベクトル (vx, vy)、反射ルール）
- ブロック配置（行数・列数、色、段ごとのスコア配点：例 1段目100点、2段目50点…）
## 2. ゲーム状態遷移ルール（State Machine）
- 状態一覧：READY（開始待機）、PLAYING（プレイ中）、PAUSED（一時停止）、GAMEOVER（残機0）、VICTORY（全ブロック破壊）
- 各状態間の遷移トリガー（スペースキー押下、Pキー押下、残機喪失、残ブロック0）
## 3. 非機能要件（測定可能な数値基準）
- 性能要件：60FPSの維持（1フレームあたりの物理更新処理 tick() が 2.0ms 以内に完了すること）
- テスト容易性（Testability）：GUI描画（tkinter）に一切依存せず、純粋なPythonクラスのみで1フレームごとのゲーム進行と当たり判定をヘッドレス検証できること
- データ永続化：ハイスコア保存JSONファイルが破損していた場合でもクラッシュせず初期値（0点）で復旧すること
- 技術スタック制約：Ubuntu Linux, Python 3.13, 標準ライブラリ tkinter, dataclasses, json`,
    designIntent: {
      summary: '「ヘッドレステスト容易性」を非機能要件で縛り、GUI結合の罠を回避する',
      points: [
        {
          title: 'GUI密結合の防止',
          explanation: 'GUIアプリ最大の落とし穴は、Canvas内に座標計算を直書きしてテスト不能になることです。非機能要件で「純粋Pythonクラスでの分離」を定義します。'
        },
        {
          title: '2.0ms以内の物理更新基準',
          explanation: '60FPS（16.6ms）のうち描画に約10ms使われることを考慮し、ロジック計算は2.0ms以内に収めることで将来の負荷にも耐えられます。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-02-1', label: '5つの状態遷移 (State Machine)', detail: 'READY, PLAYING, PAUSED, GAMEOVER, VICTORY の遷移条件が定義されている' },
      { id: 'c-02-2', label: 'ヘッドレス要件・破損耐性', detail: 'tkinter非依存とJSON破損時0点復旧の非機能要件が明記されている' }
    ]
  },
  {
    id: 'step-03',
    orderNumber: '03',
    title: '基本設計 / 外部設計 (Architecture)',
    category: 'architecture',
    tools: ['Google AI Studio', 'Antigravity Desktop'],
    artifact: 'docs/03_architecture.md',
    verifiedAgainst: '07. 結合テスト',
    goal: 'ロジック層（Model/Engine）と描画層（View/GUI）を完全分離するアーキテクチャを設計し、状態遷移図とクラス図を視覚レビューする。',
    description: 'AI StudioでMVC分離アーキテクチャとMermaid図を設計し、Desktopで視覚レンダリングして依存関係の歪みをレビューします。',
    practicalSteps: [
      {
        title: '基本設計書生成プロンプトの投入',
        description: 'AI Studio で以下のプロンプトを実行し、docs/03_architecture.md を作成します。'
      },
      {
        title: 'Antigravity DesktopでのMermaid図視覚レビュー',
        description: '生成された 03_architecture.md を Antigravity Desktop に読み込ませ、クラス図と状態遷移図を目視確認します。'
      },
      {
        title: '依存方向のチェック',
        description: 'GameEngine から tkinter への依存矢印が伸びていないか、状態遷移に袋小路（抜け出せない状態）がないかを確認します。'
      }
    ],
    prompt: `# 目的
docs/02_requirements.md を満たすための「基本設計書（docs/03_architecture.md）」を作成してください。

# 出力構成
## 1. アーキテクチャ設計（Model-View-Controller 分離パターン）
- Model / Engine層（GUI非依存）: 座標計算、衝突判定（AABB/円と矩形）、状態遷移、スコア計算を担う純粋Pythonモジュール
- Storage層: ハイスコアJSONの読み書きと破損時フォールバックを担うモジュール
- View / Controller層（tkinter 依存）: キャンバス描画、キー入力バインド、タイマーループ（after メソッド）のみを担う薄いラッパー
## 2. クラス図（Mermaid classDiagram）
- Ball, Paddle, Brick, GameStatus, GameEngine, ScoreRepository, BreakoutApp(GUI) の関係と主要メソッド
## 3. ゲーム状態遷移図（Mermaid stateDiagram-v2）
- READY / PLAYING / PAUSED / GAMEOVER / VICTORY の遷移図
## 4. 衝突判定（Collision Detection）アルゴリズム仕様
- 壁との反射、パドルとの反射（当たった位置による角度変化または単純反転）、ブロックとの衝突時の速度反転ルール`,
    designIntent: {
      summary: 'テキストコードの前に、図で依存関係と遷移ループのバグを先回り排除',
      points: [
        {
          title: '依存関係の視覚チェック',
          explanation: 'コードブロックだけではクラス間の不正な密結合を見落としがちです。DesktopのMermaidレンダリングで構造バグを実装前に潰します。'
        },
        {
          title: 'PAUSEDからの復帰確認',
          explanation: '一時停止から安全にPLAYINGに戻れるか、ゲームオーバー時にREADYへ初期化できるか、図でデッドロックがないか検証します。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-03-1', label: 'Model/Engine層のtkinter非依存', detail: 'GameEngineが描画モジュールを一切インポートしていない設計になっている' },
      { id: 'c-03-2', label: 'Mermaidクラス図・状態遷移図', detail: 'DesktopでMermaid図がエラーなくレンダリングされ目視確認できた' }
    ]
  },
  {
    id: 'step-04',
    orderNumber: '04',
    title: '環境構築・品質ガードレール整備',
    category: 'environment',
    tools: ['Antigravity IDE'],
    artifact: 'pyproject.toml, Makefile, .githooks/',
    goal: 'Ubuntuパッケージ（python3-tk）、uv仮想環境、Makefile、不正コミット遮断フック（pre-commit）を構築する。',
    description: 'AIエージェントが壊れたコードや適当なコミットメッセージをコミットできないよう、物理的なGitガードレールを敷きます。',
    practicalSteps: [
      {
        title: 'パッケージ・Git・uv 初期化',
        description: '端末で python3-tk の導入、ワークスペース作成、uv init、テスト依存関係の追加を行います。',
        language: 'bash',
        codeSnippet: `sudo apt-get update && sudo apt-get install -y python3-tk
mkdir -p ~/workspace/breakout && cd ~/workspace/breakout
git init -b main
mkdir -p docs src/breakout tests/unit tests/integration tests/load scripts .githooks
uv init --no-workspace --name breakout
uv add --dev pytest pytest-cov ruff
touch src/breakout/__init__.py tests/__init__.py`
      },
      {
        title: 'docsディレクトリへMarkdown配置',
        description: '工程01〜03の成果物を docs/ 配下に保存します。'
      },
      {
        title: 'Makefile の配置',
        description: '品質検証 make verify、安全コミット make commit、即時復元 make rollback を備えた Makefile を作成します。'
      },
      {
        title: 'Gitフックの設定とベースラインコミット',
        description: '.githooks/pre-commit（make verify強制）と commit-msg（Conventional Commits強制）を有効化し、初期コミットを行います。'
      }
    ],
    designIntent: {
      summary: 'プロンプトでの指示ではなく、OS/Gitレベルの物理的ガードレールでAIを統制',
      points: [
        {
          title: 'pre-commit による物理的拒絶',
          explanation: 'AIに「テストを通してからコミットして」と指示しても無視されることがあります。Gitフックで自動拒絶する仕組みが必須です。'
        },
        {
          title: 'make rollback コマンドの常備',
          explanation: 'AIが迷走した際、即座にクリーンなHEADに戻せる手段（git restore + clean）を1コマンドで用意しておきます。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-04-1', label: 'Makefile の動作確認', detail: 'make help, make setup が正常に動作する' },
      { id: 'c-04-2', label: 'Gitフックのブロック検証', detail: 'テストが落ちる状態や不正なコミット名がGitレベルでブロックされる' }
    ]
  },
  {
    id: 'step-05',
    orderNumber: '05',
    title: '詳細設計 / 実装計画化 (Planning)',
    category: 'architecture',
    tools: ['Antigravity IDE'],
    artifact: 'docs/04_implementation_plan.md',
    verifiedAgainst: '06. 単体テスト',
    goal: '上流ドキュメントと既存ディレクトリ構造を照合し、1フェーズ＝1コミット粒度の実装計画を作成する。',
    description: '下位のデータモデルから順に4つのPhaseに分割し、GUI描画を意図的に最後（Phase 4）に回す計画書を作らせます。',
    practicalSteps: [
      {
        title: 'Antigravity IDE でプロジェクトを開く',
        description: '~/workspace/breakout を開き、計画策定プロンプトを投入します。'
      },
      {
        title: '4つのPhase構成を確認',
        description: 'Phase 1: モデル → Phase 2: 物理エンジン → Phase 3: ハイスコア保存 → Phase 4: GUI統合 になっているか確認します。'
      },
      {
        title: '計画書のコミット',
        description: 'make commit m="docs(plan): create step-by-step breakout implementation plan" を実行します。'
      }
    ],
    prompt: `# 目的
docs/02_requirements.md と docs/03_architecture.md、および現在のリポジトリ構成（Makefile 等）を解析し、
段階的な実装計画書 docs/04_implementation_plan.md を作成してください。

# 計画策定ルール
1. 依存関係の低い下位レイヤから順に以下の4つのPhaseに分割すること：
   - Phase 1: エンティティとデータモデル定義 (src/breakout/models.py: Ball, Paddle, Brick, GameStatus Enum、座標・矩形判定メソッド)
   - Phase 2: ゲームエンジンと衝突・物理演算ロジック (src/breakout/engine.py: GameEngine クラス、1フレーム進める tick() メソッド、壁・パドル・ブロック反射、スコア・残機更新、状態遷移)
   - Phase 3: ハイスコア永続化リポジトリ (src/breakout/storage.py: ScoreRepository クラス、JSON保存・読込・破損時リカバリ)
   - Phase 4: Tkinter GUI ビュー＆コントローラ統合 (src/breakout/gui.py, src/breakout/main.py: キャンバス描画、キーイベント接続、60FPSタイマーループ)
2. 各Phaseには必ず以下を明記すること：
   - 作成・変更するファイルパス
   - 実装すべきクラス・メソッドのシグネチャと責務
   - 単体テストファイル（tests/unit/test_*.py）の検証項目（正常系・異常系・境界値）
   - 完了検証コマンド（make verify）
3. 今回は docs/04_implementation_plan.md の作成のみを行い、プロダクションコードはまだ書かないでください。`,
    designIntent: {
      summary: 'GUI描画を最後（Phase 4）に回すことで、バグの温床であるロジック混入を防ぐ',
      points: [
        {
          title: 'ボトムアップ分割の鉄則',
          explanation: '最初からtkinterと一緒に作らせると描画と物理が混ざり合います。画面なしで動く完全なエンジンを作ってから描画を乗せます。'
        },
        {
          title: '1Phase ＝ 1コミット',
          explanation: '各Phaseごとに単体テストとコミットを固定することで、万が一失敗したときのロールバック粒度を小さく保ちます。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-05-1', label: '4 Phase の依存順分割', detail: 'models → engine → storage → gui の順序で計画されている' },
      { id: 'c-05-2', label: '境界値テスト項目の明記', detail: '画面端・衝突判定の境界値テスト項目が各Phaseに記載されている' }
    ]
  },
  {
    id: 'step-06',
    orderNumber: '06',
    title: '実装 ＆ 単体テスト (Self-Healing)',
    category: 'implementation',
    tools: ['Antigravity IDE', 'Antigravity Desktop'],
    artifact: 'src/breakout/, tests/unit/',
    verifiedAgainst: '05. 詳細設計',
    goal: 'Phase 1〜Phase 4 を1つずつ順番に実行し、内蔵ターミナルでの自動テストと自己修復（Self-Healing）を経てコミットを積み上げる。',
    description: 'エージェントに1フェーズずつ実装とテストを作成させ、make verify が通るまで自律修正ループを回させます。',
    practicalSteps: [
      {
        title: 'Phase 1 (models.py) の自律実装ループ実行',
        description: 'Phase 1用プロンプトを投入し、tests/unit/test_models.py と models.py を作成・make verify 通過まで自律修正させます。'
      },
      {
        title: 'Phase 2 (engine.py) の自律実装ループ実行',
        description: '物理演算・反射・1フレーム進める tick() メソッドとテストを実装させ、コミットします。'
      },
      {
        title: 'Phase 3 (storage.py) の自律実装ループ実行',
        description: 'JSON保存・読み込み・破損時フォールバックテストを実装させ、コミットします。'
      },
      {
        title: 'Phase 4 (gui.py / main.py) の実装と実機起動',
        description: 'tkinter GUIを接続し、Antigravity Desktop または make run でゲームウィンドウを立ち上げて目視確認します。'
      }
    ],
    prompt: `# 目的
docs/04_implementation_plan.md の 「Phase 1: エンティティとデータモデル定義」 を実行してください。

# 実行ルール（自律ループ要件）
1. 対象ファイル（src/breakout/models.py）と対応する単体テスト（tests/unit/test_models.py）のみを作成・編集してください。先のPhaseのコードは書かないでください。
2. パドルの画面端移動制限（左端0未満・右端画面幅超えの防止）や矩形同士の重なり判定（AABB）の境界値テストを必ず含めてください。
3. 実装後、内蔵ターミナルで make verify を実行してください。
4. リントエラーやテスト失敗が発生した場合は、スタックトレースを解析して自律的にコードを修正し、make verify が Exit Code 0 でパスするまで修正ループを継続してください。
5. パスしたら docs/04_implementation_plan.md の Phase 1 チェックボックスを [x] に更新し、ターミナルで以下を実行してコミットしてください：
   make commit m="feat(models): implement Phase 1 game entities and boundary unit tests"`,
    designIntent: {
      summary: '境界値テストによる初期バグ殲滅と自律修復（Self-Healing）の確立',
      points: [
        {
          title: 'パドル突き抜け・ボールめり込みの防止',
          explanation: 'ブロック崩しで多発する「パドルが画面外へ消える」「ボールが壁に挟まって振動する」バグは、Phase 1〜2の単体テストで撲滅します。'
        },
        {
          title: '自己修復（Self-Healing）ループ',
          explanation: 'テスト失敗時に人間が指示を出すのではなく、スタックトレースからAI自身に自律修正させる習慣を定着させます。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-06-1', label: 'Phase 1〜3 ヘッドレス完走', detail: 'GUI画面なしで pytest が全件パスし、カバレッジが計測できる' },
      { id: 'c-06-2', label: 'Phase 4 make run 起動確認', detail: 'make run でウィンドウが開き、パドル操作とボール反射が動作する' }
    ]
  },
  {
    id: 'step-ex',
    orderNumber: 'EX',
    title: '特別演習: 仕様変更差分＆破綻ロールバック',
    category: 'implementation',
    tools: ['Antigravity IDE'],
    artifact: '更新版計画書, ポストモーテム記録',
    goal: '途中の仕様変更（ハードブロック追加）と実装失敗時の復旧（ロールバック）を体験する。',
    description: '実務で必須となる「失敗時の即時ロールバック習慣」と「既存テストを壊さない安全な差分拡張手法」を習得します。',
    practicalSteps: [
      {
        title: 'EX-1: 意図的な破綻とロールバック',
        description: '意図的に計算ロジックを壊してテストを落とし、make rollback でクリーンに戻した上でPost-mortem（事後診断）レポートを出力させます。'
      },
      {
        title: '仕様変更時の判断基準の理解',
        description: '小中規模（IDE内で完結）vs 大規模（AI Studioで基本設計やり直し）の境目を理解します。'
      },
      {
        title: 'EX-2: 耐久力2のハードブロック追加',
        description: '最上段ブロックを2回当てないと壊れない仕様変更を投入。下位互換性（hit_points=1デフォルト）を保ちつつPhase 5として追加実装・コミットします。'
      }
    ],
    prompt: `# 目的
現在発生しているテスト失敗・不整合を解消するため、直前の安定コミットへロールバックし、原因を事後診断（Post-mortem）してください。

# 実行手順
1. 現在の git diff と make test のエラー出力を確認・記憶してください。
2. 内蔵ターミナルで make rollback を実行し、git status が clean であることを確認してください。
3. チャット上に以下の診断レポートを出力してください：
   - 根本原因 (Root Cause): どの計算式の変更によってどのテストが破壊されたか
   - 次回試行時の必須制約 (Actionable Rules): 再発を防ぐための具体的な実装ルール`,
    designIntent: {
      summary: '泥沼化パッチの防止と、下位互換性を死守する安全な差分設計',
      points: [
        {
          title: '泥沼化の即時断絶 (make rollback)',
          explanation: 'AIが当て推量の修正を重ねるとコードベース全体が壊れます。「おかしくなったら即ロールバック」が最高速の復旧策です。'
        },
        {
          title: '下位互換性（デフォルト引数）',
          explanation: 'hit_points: int = 1 のようにデフォルト引数を設定することで、既存の全単体テストを1つも壊さずに機能拡張できます。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-ex-1', label: 'make rollback 復旧の体験', detail: '作業ツリーが直前のクリーンコミットへ即時復元されることを確認した' },
      { id: 'c-ex-2', label: 'ハードブロック (HP=2) の追加完了', detail: '最上段ブロックが2回ヒットで破壊され、既存テストも全件パスしている' }
    ]
  },
  {
    id: 'step-07',
    orderNumber: '07',
    title: '結合テスト (Integration Testing)',
    category: 'testing',
    tools: ['Antigravity IDE'],
    artifact: 'tests/integration/',
    verifiedAgainst: '03. 基本設計',
    goal: 'ゲーム開始からブロック全破壊（クリア）、ゲームオーバー、およびハイスコアのJSONファイル保存・再読込までを一気通貫で結合検証する。',
    description: 'GameEngine と ScoreRepository を結合し、実際のゲームプレイのライフサイクルを通しで自動検証します。',
    practicalSteps: [
      {
        title: '結合テストプロンプトの投入',
        description: 'tests/integration/test_game_lifecycle.py を作成するプロンプトを投入します。'
      },
      {
        title: '2つの通しシナリオの検証',
        description: '「ゲームクリア＆ハイスコア更新」と「ゲームオーバー＆既存ハイスコア維持」の両シナリオが網羅されているか確認します。'
      },
      {
        title: 'make verify での検証とコミット',
        description: 'make commit m="test(integration): add full game lifecycle and high-score persistence tests" を実行します。'
      }
    ],
    prompt: `# 目的
基本設計書（docs/03_architecture.md）に基づき、GameEngine と ScoreRepository を結合した通しシナリオテストを tests/integration/test_game_lifecycle.py に作成してください。

# 検証シナリオ要件
1. ゲームクリア＆ハイスコア更新シナリオ:
   - 一時ディレクトリ（tmp_path フィクスチャ）のJSONファイルを使用する。
   - ゲームを開始（PLAYING）し、残りのブロックをすべて破壊する状態まで tick() を進め、状態が VICTORY に遷移すること、および獲得スコアがJSONファイルにハイスコアとして正しく永続化されていることを検証する。
2. ゲームオーバー＆ハイスコア維持シナリオ:
   - 既存のハイスコア（例: 1000点）が保存されている状態で新規ゲームを開始し、スコア0点のままボールを3回落として GAMEOVER に遷移させる。JSONファイルのハイスコアが0点で上書きされず、1000点のまま維持されていることを検証する。
3. 実装後、make verify を実行し、全テストパス後に make commit m="test(integration): add full game lifecycle and high-score persistence tests" でコミットしてください。`,
    designIntent: {
      summary: '「ゲームには勝ったがスコアが消えた」モジュール間結合バグの完全防止',
      points: [
        {
          title: '一時ディレクトリ (tmp_path) の活用',
          explanation: 'テスト実行時に開発環境の実際のスコアJSONを汚さないよう、pytest標準の tmp_path フィクスチャで隔離します。'
        },
        {
          title: 'ハイスコア非上書きの検証',
          explanation: '低い点数でゲームオーバーになった際、過去のハイスコアを0点で上書きしてしまう退行バグを確実に防ぎます。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-07-1', label: 'VICTORY ＆ ハイスコア保存検証', detail: '全ブロック破壊でVICTORYとなりJSONに新記録が記録される' },
      { id: 'c-07-2', label: 'GAMEOVER ＆ ハイスコア保護検証', detail: '0点ゲームオーバー時に過去のハイスコアが保護される' }
    ]
  },
  {
    id: 'step-08',
    orderNumber: '08',
    title: 'システムテスト / 総合テスト (System Testing)',
    category: 'testing',
    tools: ['Antigravity IDE', 'Antigravity Desktop'],
    artifact: 'tests/load/',
    verifiedAgainst: '02. 要件定義',
    goal: '要件定義書で定めた非機能要件（1フレーム処理2.0ms以内＝60FPS余裕達成、破損JSONファイルからのクラッシュ回避）を実測検証する。',
    description: '10,000フレーム連続負荷ベンチマークと、破損JSONからの自己復旧（Resilience）を自動テストします。',
    practicalSteps: [
      {
        title: '性能・耐障害性テストの生成',
        description: 'tests/load/test_non_functional.py を作成するプロンプトを投入します。'
      },
      {
        title: '10,000フレームベンチマークの実行',
        description: 'PYTHONPATH=src uv run pytest tests/load -v -s を実行し、平均処理時間が 2.0ms 以内であることを実測します。'
      },
      {
        title: '破損JSONテストの確認とコミット',
        description: '壊れたJSON（"{broken_json"）からクラッシュせず0点で立ち上がることを確認し、コミットします。'
      }
    ],
    prompt: `# 目的
docs/02_requirements.md の非機能要件（性能・耐障害性）を検証するシステムテストを tests/load/test_non_functional.py に作成・実行してください。

# 検証内容
1. フレームレート性能要件検証（60FPS保証）:
   - ゲーム開始状態で engine.tick() を連続 10,000フレーム（約166秒相当のゲーム進行）実行し、1フレームあたりの平均処理時間および99パーセンタイル処理時間が 2.0ms 以内であることを計測・アサートする。
2. 破損データ耐障害性検証（Resilience）:
   - ハイスコアJSONファイルに不正なバイナリや壊れたJSON文字列（"{broken_json"）を書き込んだ状態で起動・読込を行い、例外でクラッシュせず初期値 0 にフォールバックして正常にゲームが開始できることを検証する。
3. 内蔵ターミナルで PYTHONPATH=src uv run pytest tests/load -v -s を実行し、実測された1フレーム処理時間をチャットに報告してください。`,
    designIntent: {
      summary: '10,000フレーム負荷試験で「長時間プレイ時のメモリリーク・速度低下」を即座に証明',
      points: [
        {
          title: 'メモリリーク・オブジェクト肥大化の検知',
          explanation: '破壊済みブロックがリストに残ったままだと、数分後にFPSが落ちます。10,000フレームをヘッドレスで回せば約1秒で証明できます。'
        },
        {
          title: '破損ファイル耐障害性 (Resilience)',
          explanation: 'ユーザーがJSONを手動編集して文法エラーを起こしても、アプリが即死せず初期値0で立ち上がる堅牢性を担保します。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-08-1', label: '1フレーム 2.0ms 以内の達成', detail: '10,000フレームベンチマークで平均処理時間が2.0ms未満であることを確認' },
      { id: 'c-08-2', label: '破損JSONからのクラッシュフリー起動', detail: '不正JSONが存在しても例外落ちせず初期値0点で復旧する' }
    ]
  },
  {
    id: 'step-09',
    orderNumber: '09',
    title: '運用準備・受入テスト (UAT & Ops)',
    category: 'operations',
    tools: ['Google AI Studio', 'Antigravity Desktop'],
    artifact: 'docs/05_operations_manual.md, 実機プレイ',
    verifiedAgainst: '01. 要求定義',
    goal: '実装コードをもとに運用・トラブルシューティング手順書を生成し、実際にGUIを起動して人間による受入プレイ検証（UAT）を完了させる。',
    description: 'AI Studioで運用マニュアルを生成し、人間が実際にパドルを動かして「ゲームとしての快適性」を受入判定します。',
    practicalSteps: [
      {
        title: 'AI Studioでの運用手順書作成プロンプト実行',
        description: '完成したコードと要件書を入力し、docs/05_operations_manual.md を生成・保存します。'
      },
      {
        title: 'Antigravity Desktop / make run による実機受入テスト',
        description: 'スペースキー発射、左右パドル移動、最上段ブロックが2回で壊れること、Pキー一時停止を確認します。'
      },
      {
        title: '受入完了コミット',
        description: 'make commit m="docs(ops): add operations manual and balance tuning guide" を実行します。'
      }
    ],
    prompt: `# 目的
完成したブロック崩しアプリケーションの仕様とコードに基づき、イベント運営者・保守担当者向けの
「アプリケーション運用・トラブルシューティング手順書（docs/05_operations_manual.md）」を作成してください。

# 出力構成
1. 起動・操作方法一覧（コマンド、キーバインド一覧：左右移動、発射、一時停止、リスタート）
2. ハイスコアデータ（JSON）のバックアップ・初期化（リセット）手順
3. ゲームバランス調整ガイド（ボール速度、パドル幅、ブロック段数を変更する際の対象ファイルと定数名）
4. トラブルシューティング（Ubuntu環境で DISPLAY 環境変数エラーが出た場合の対処、python3-tk 未導入時のエラー対処、フレームレート低下時の診断コマンド）`,
    designIntent: {
      summary: 'テスト自動化の「正しさ」と、人間による「操作の心地よさ」を両輪で満たす',
      points: [
        {
          title: '定数変更によるバランス調整',
          explanation: 'ボールの速度やパドル幅がハードコードされていると運営者が調整できません。定数定義された箇所を手順書に示します。'
        },
        {
          title: 'DISPLAY未設定トラブルの予防',
          explanation: 'SSH経由やコンテナで起動した際によくあるDISPLAYエラーの対処法をあらかじめドキュメント化しておきます。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-09-1', label: '運用手順書 (05_operations_manual.md)', detail: '起動方法・バランス調整・トラブルシューティングが記載されている' },
      { id: 'c-09-2', label: 'UAT 実機プレイ検証パス', detail: '実際にプレイして操作感・EX仕様・ポーズ機能に問題がないことを確認' }
    ]
  },
  {
    id: 'step-10',
    orderNumber: '10',
    title: 'システム移行・実運用開始 (Cutover)',
    category: 'operations',
    tools: ['Antigravity IDE'],
    artifact: 'scripts/migrate_scores.py, リリース判定',
    goal: '旧イベント時のスコア記録（CSV形式）から新システムのハイスコアJSONへデータを引き継ぐ移行スクリプトを作成・リハーサルし、リリースタグ（v1.0.0）を打つ。',
    description: '過去資産のデータマイグレーション（--dry-run 付き）を実施し、セマンティックバージョニングで製品リリースを完了します。',
    practicalSteps: [
      {
        title: '移行スクリプト作成プロンプトの投入',
        description: 'scripts/migrate_scores.py と単体テストを作成し、--dry-run オプションを実装させます。'
      },
      {
        title: 'ターミナルでの dry-run リハーサル',
        description: 'ファイルを書き換えずに検証結果のみを表示させ、安全性を確認します。'
      },
      {
        title: '最終コミットと v1.0.0 リリースタグの発行',
        description: 'make commit と git tag -a v1.0.0 -m "Release v1.0.0" を実行して開発を完遂します。',
        language: 'bash',
        codeSnippet: `make commit m="feat(migration): add legacy CSV score migration script with dry-run support"
git tag -a v1.0.0 -m "Release v1.0.0: Breakout GUI application production release"
git log --oneline --decorate -n 10`
      }
    ],
    prompt: `# 目的
過去のイベントで記録されたスコア一覧（CSV形式：player_name,score,recorded_at）から最高得点を抽出し、本アプリのハイスコアJSONファイルへ安全に移行するスクリプト scripts/migrate_scores.py とその単体テストを作成してください。

# 要件
1. CSV内の最大スコアを抽出し、現在のハイスコアJSONの値より高い場合のみ更新すること。
2. 不正な行（数値変換エラーや負のスコア）が含まれる場合はエラー報告して中断すること。
3. ファイルを実際には書き換えず検証結果のみを表示する --dry-run オプションを実装すること。
4. テストを作成して make verify をパスさせ、ターミナルで --dry-run の実行リハーサルを行ってください。`,
    designIntent: {
      summary: 'コード開発で終わらせず、データ移行とバージョン管理で実運用へ繋ぐ',
      points: [
        {
          title: '--dry-run による安全弁',
          explanation: '実データを直接書き換える移行は事故の元です。必ず事前にドライランで差分を確認できる設計を徹底します。'
        },
        {
          title: 'セマンティックバージョニング',
          explanation: 'v1.0.0 のGitタグを刻むことで、演習の全成果物がどこで完成したかを誰でも再現可能にします。'
        }
      ]
    },
    checkpoints: [
      { id: 'c-10-1', label: '--dry-run 移行リハーサル成功', detail: 'scripts/migrate_scores.py が安全に過去スコアを解析できる' },
      { id: 'c-10-2', label: 'v1.0.0 リリースタグの発行', detail: 'Gitリポジトリに v1.0.0 タグが打たれ全工程が完了した' }
    ]
  }
];

export const EVALUATION_ITEMS = [
  {
    id: 'eval-1',
    category: '上流設計',
    title: '要求定義に「Out-of-Scope」が明確に定義されているか',
    checkLocation: 'docs/01_business_requirements.md',
    description: 'BGMやオンライン通信など初期除外対象が定義され、スコープクリープが防止されていること。'
  },
  {
    id: 'eval-2',
    category: '上流設計',
    title: '要件定義に状態遷移（READY/PLAYING等）と性能基準（2.0ms以内）があるか',
    checkLocation: 'docs/02_requirements.md',
    description: 'ステートマシン5状態と、60FPS維持のための1フレーム2.0ms計算要件が明記されていること。'
  },
  {
    id: 'eval-3',
    category: '基本設計',
    title: 'GameEngine が tkinter に非依存の設計で、Mermaid図が描画できるか',
    checkLocation: 'docs/03_architecture.md',
    description: 'モデル層とビュー層がMVCパターンで分離され、Antigravity Desktopで図が正しくレンダリングできること。'
  },
  {
    id: 'eval-4',
    category: '環境統制',
    title: 'pre-commit と commit-msg フックが動作し、不正コミットを拒否するか',
    checkLocation: '.githooks/',
    description: 'make verify 未通過のコードや、Conventional Commits違反のメッセージがGitレベルで遮断されること。'
  },
  {
    id: 'eval-5',
    category: '詳細設計',
    title: '実装計画でGUI実装が最終Phaseに分離され、段階的に構成されているか',
    checkLocation: 'docs/04_implementation_plan.md',
    description: 'models → engine → storage → gui の依存順で4段階に分割計画されていること。'
  },
  {
    id: 'eval-6',
    category: '実装・UT',
    title: 'GUI画面を開かずに make verify（Format / Lint / Test）が完走するか',
    checkLocation: 'make verify (ターミナル)',
    description: 'ヘッドレス環境で pytest, ruff check, ruff format が Exit Code 0 でパスすること。'
  },
  {
    id: 'eval-7',
    category: '例外対応',
    title: 'make rollback による復元と「ハードブロック（耐久力2）」の追加ができたか',
    checkLocation: 'git log --oneline',
    description: '破綻時のロールバック体験と、既存テストを壊さない下位互換性を持ったPhase 5拡張が完了していること。'
  },
  {
    id: 'eval-8',
    category: '結合・ST',
    title: '10,000フレーム連続実行ベンチマークと破損JSON復旧テストがパスするか',
    checkLocation: 'tests/load/',
    description: '平均2.0ms以内の高負荷耐久と、不正データからのクラッシュフリーフォールバックが実証されていること。'
  },
  {
    id: 'eval-9',
    category: '運用・移行',
    title: 'make run でGUIが快適に遊べ、--dry-run 移行スクリプトと v1.0.0 タグがあるか',
    checkLocation: 'make run / git tag -l',
    description: '実機プレイでのUAT受入完了、過去スコア移行リハーサル、リリースタグが揃っていること。'
  }
];
