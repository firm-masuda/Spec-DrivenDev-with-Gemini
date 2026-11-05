export function generateStandaloneHtml() {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI駆動型システム開発 演習進捗マネージャー（スタンドアロン版）</title>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #0f172a;
      --card-sub: #1e293b;
      --border: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      line-height: 1.6;
      padding-bottom: 60px;
    }
    header {
      background: #060911;
      border-bottom: 1px solid var(--border);
      padding: 14px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .brand { font-size: 15px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; }
    .container { max-width: 1240px; margin: 0 auto; padding: 20px 16px; }
    .grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
    @media (min-width: 992px) {
      .grid { grid-template-columns: 320px 1fr; }
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .progress-bar-bg {
      background: var(--card-sub);
      border-radius: 6px;
      height: 8px;
      overflow: hidden;
      margin: 8px 0;
    }
    .progress-bar-fill {
      background: linear-gradient(90deg, #38bdf8, #10b981);
      height: 100%;
      width: 0%;
      transition: width 0.3s ease;
    }
    .step-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid transparent;
      cursor: pointer;
      margin-bottom: 6px;
      background: #090d16;
      transition: all 0.2s;
    }
    .step-item:hover { border-color: var(--accent); }
    .step-item.active { border-color: var(--accent); background: #172554; }
    .btn {
      background: var(--card-sub);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 7px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn:hover { background: #334155; }
    .btn-primary { background: #0284c7; border-color: #0284c7; color: #fff; }
    .btn-primary:hover { background: #0369a1; }
    pre {
      background: #050811;
      border: 1px solid var(--border);
      padding: 12px;
      border-radius: 8px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 11px;
      overflow-x: auto;
      white-space: pre-wrap;
      line-height: 1.5;
    }
    canvas {
      display: block;
      background: #050811;
      border-radius: 8px;
      border: 1px solid var(--border);
      margin: 0 auto;
    }
    .badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }
    .badge-completed { background: rgba(16, 185, 129, 0.2); color: #34d399; }
    .badge-in-progress { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
    .badge-not-started { background: rgba(148, 163, 184, 0.2); color: #94a3b8; }
    .tabs { display: flex; gap: 8px; border-bottom: 1px solid var(--border); padding-bottom: 12px; margin-bottom: 20px; }
    .tab-btn { background: none; border: none; color: var(--text-muted); font-size: 13px; font-weight: 600; cursor: pointer; padding: 6px 12px; border-radius: 6px; }
    .tab-btn.active { color: var(--accent); background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <span style="color:var(--accent);">📘</span>
      <span>AI駆動型システム開発 演習進捗マネージャー</span>
    </div>
    <div style="font-size:12px; color:var(--text-muted);" id="header-progress-text">
      進捗: 0 / 11 工程完了 (0%)
    </div>
  </header>

  <div class="container">
    <div class="tabs">
      <button class="tab-btn active" onclick="switchTab('curriculum')">全11工程 ＆ プロンプト</button>
      <button class="tab-btn" onclick="switchTab('simulator')">Breakout 物理演算・MVCシミュレーター</button>
      <button class="tab-btn" onclick="switchTab('evaluation')">総合評価チェックリスト (第4章)</button>
    </div>

    <!-- Curriculum View -->
    <div id="view-curriculum" class="grid">
      <aside>
        <div class="card" style="padding:16px;">
          <h4 style="font-size:12px; color:var(--text-muted); margin-bottom:8px; font-weight:700;">工程進捗一覧</h4>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" id="sidebar-progress-bar"></div>
          </div>
          <div id="step-list-container"></div>
        </div>
      </aside>

      <main>
        <div class="card" id="step-detail-card"></div>
      </main>
    </div>

    <!-- Simulator View -->
    <div id="view-simulator" style="display:none;">
      <div class="card" style="text-align:center;">
        <h3 style="font-size:16px; margin-bottom:6px;">演習課題 Breakout 物理エンジン ＆ MVC分離シミュレーター</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">
          tkinter非依存のヘッドレス物理計算ロジック（1フレーム &lt;2.0ms）とAABB衝突判定、耐久2ブロック（EX仕様）を検証できます。
        </p>

        <div style="margin-bottom:12px; display:flex; justify-content:center; gap:20px; font-size:12px; font-family:monospace;">
          <span>SCORE: <strong id="sim-score" style="color:var(--accent);">0</strong></span>
          <span>LIVES: <strong id="sim-lives" style="color:var(--danger);">♥♥♥</strong></span>
          <span>tick()処理時間: <strong id="sim-tick-time" style="color:var(--success);">0.22ms</strong></span>
        </div>

        <canvas id="standalone-canvas" width="400" height="280"></canvas>

        <div style="margin-top:14px; display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:10px;">
          <button class="btn btn-primary" onclick="simTogglePlay()">発射 / 一時停止 (SPACE)</button>
          <button class="btn" onclick="simReset()">リセット</button>
          <label style="font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
            <input type="checkbox" id="sim-hitbox" checked onchange="simHitboxToggle(this.checked)"> AABB衝突枠可視化
          </label>
          <label style="font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
            <input type="checkbox" id="sim-hard" checked onchange="simHardToggle(this.checked)"> EX-2: 耐久力2ブロック
          </label>
        </div>
        <div style="font-size:11px; color:var(--text-muted); margin-top:8px;">
          操作方法: [←][→] キー または マウス移動でパドル操作 / [SPACE] で発射・一時停止
        </div>
      </div>
    </div>

    <!-- Evaluation View -->
    <div id="view-evaluation" style="display:none;">
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <h3 style="font-size:16px;">第4章 総合到達度チェックリスト（演習評価シート）</h3>
            <p style="font-size:12px; color:var(--text-muted);">全9項目の基準を満たしているか確認し、合否判定を行ってください。</p>
          </div>
          <button class="btn" onclick="copyEvalReport()">評価レポートをコピー</button>
        </div>
        <div id="eval-items-container"></div>
      </div>
    </div>
  </div>

  <script>
    const STEPS = [
      { id:'01', title:'要求定義 (Business Requirements)', tool:'Google AI Studio', artifact:'docs/01_business_requirements.md', goal:'クライアントヒアリングからコア体験（In-Scope）と初期除外対象（Out-of-Scope）を分離する。', prompt:\`# 役割\\nあなたはシニアITアーキテクトです。\\n\\n# 目的\\nクライアントヒアリングメモから「業務要求仕様書（docs/01_business_requirements.md）」を作成してください。\\n\\n# スコープ\\n- In-Scope: 基本ゲームループ、スコア計算、残機管理、ハイスコア保存\\n- Out-of-Scope: BGM/効果音、オンライン通信、複雑なパーティクル演出\` },
      { id:'02', title:'要件定義 (System Requirements)', tool:'Google AI Studio', artifact:'docs/02_requirements.md', goal:'キャンバス座標系、5状態マシン、60FPS維持（1フレーム計算2.0ms以内）を数値定義する。', prompt:\`# 目的\\n「システム要件定義書（docs/02_requirements.md）」を作成してください。\\n1. 座標系・エンティティ仕様（幅800x高さ600、パドル、ボール、ブロック）\\n2. 状態遷移（READY, PLAYING, PAUSED, GAMEOVER, VICTORY）\\n3. 非機能要件（1フレーム物理計算2.0ms以内、tkinter非依存ヘッドレステスト、破損JSON復旧）\` },
      { id:'03', title:'基本設計 / 外部設計', tool:'AI Studio × Desktop', artifact:'docs/03_architecture.md', goal:'Model/Engine層とView/GUI層を完全分離するMVCアーキテクチャを設計しMermaid図を検証する。', prompt:\`# 目的\\n「基本設計書（docs/03_architecture.md）」を作成してください。\\n- Model/Engine層（GUI非依存純粋Python）\\n- Storage層（ハイスコアJSON永続化）\\n- View/Controller層（tkinter薄いラッパー）\\n- Mermaidクラス図および状態遷移図\` },
      { id:'04', title:'環境構築・品質ガードレール', tool:'Antigravity IDE', artifact:'pyproject.toml, Makefile, .githooks/', goal:'MakefileとGitフック（pre-commit）を整備し、テスト未通過コードを物理遮断する。', prompt:\`sudo apt-get install -y python3-tk\\nmkdir -p ~/workspace/breakout && cd ~/workspace/breakout\\ngit init -b main\\nuv init --no-workspace --name breakout\\nuv add --dev pytest pytest-cov ruff\\nmake setup\` },
      { id:'05', title:'詳細設計 / 実装計画化', tool:'Antigravity IDE', artifact:'docs/04_implementation_plan.md', goal:'下位モデルから4つのPhaseに分割し、GUI描画を意図的に最後（Phase 4）に回す計画を策定する。', prompt:\`Phase 1: エンティティ定義 (models.py)\\nPhase 2: ゲームエンジン＆衝突物理 (engine.py)\\nPhase 3: ハイスコア永続化 (storage.py)\\nPhase 4: Tkinter GUI接続 (gui.py, main.py)\` },
      { id:'06', title:'実装 ＆ 単体テスト', tool:'IDE × Desktop', artifact:'src/breakout/, tests/unit/', goal:'Phase 1〜4を1つずつ実装し、自律テスト修復ループ（Self-Healing）でコミットを積む。', prompt:\`make verify が Exit Code 0 でパスするまで自律的に修正ループを継続し、make commit してください。\` },
      { id:'EX', title:'特別演習: 仕様変更＆ロールバック', tool:'Antigravity IDE', artifact:'更新計画書, ポストモーテム', goal:'意図的な破綻からの make rollback 復元と、最上段ハードブロック（耐久力2）追加を体験する。', prompt:\`make rollback で直前クリーンコミットに復帰し、原因診断を出力してください。続けて耐久力2のブロックを差分追加してください。\` },
      { id:'07', title:'結合テスト (Integration)', tool:'Antigravity IDE', artifact:'tests/integration/', goal:'ブロック全破壊クリアとゲームオーバー時のハイスコア保存を通し検証する。', prompt:\`tests/integration/test_game_lifecycle.py でVICTORYおよびGAMEOVER時のハイスコア更新・保持を検証してください。\` },
      { id:'08', title:'システムテスト / 総合テスト', tool:'Desktop × IDE', artifact:'tests/load/', goal:'10,000フレーム連続負荷試験（2.0ms以内）と破損JSON復旧（Resilience）を検証する。', prompt:\`10,000フレーム連続 tick() 実行で平均2.0ms以内、および壊れたJSONからのクラッシュフリー起動をテストしてください。\` },
      { id:'09', title:'運用準備・受入テスト', tool:'AI Studio × Desktop', artifact:'docs/05_operations_manual.md', goal:'運用手順書を生成し、実機プレイで操作感とEX仕様の受入判定（UAT）を完了する。', prompt:\`「アプリケーション運用・トラブルシューティング手順書（docs/05_operations_manual.md）」を作成してください。\` },
      { id:'10', title:'システム移行・実運用開始', tool:'Antigravity IDE', artifact:'scripts/migrate_scores.py', goal:'旧CSVスコアの安全移行（--dry-run付き）を実施し、v1.0.0 リリースタグを発行する。', prompt:\`scripts/migrate_scores.py で過去CSVからハイスコア移行を実装し、git tag -a v1.0.0 を発行してください。\` }
    ];

    const EVALS = [
      { id:'e1', cat:'上流設計', title:'要求定義に「Out-of-Scope」が明確に定義されているか', loc:'docs/01_business_requirements.md' },
      { id:'e2', cat:'上流設計', title:'要件定義に状態遷移と性能基準（2.0ms以内）があるか', loc:'docs/02_requirements.md' },
      { id:'e3', cat:'基本設計', title:'GameEngine が tkinter に非依存でMermaid描画できるか', loc:'docs/03_architecture.md' },
      { id:'e4', cat:'環境統制', title:'pre-commit フックが不正コミットを拒否するか', loc:'.githooks/' },
      { id:'e5', cat:'詳細設計', title:'実装計画でGUI実装が最終Phaseに分離されているか', loc:'docs/04_implementation_plan.md' },
      { id:'e6', cat:'実装・UT', title:'GUI画面なしで make verify が完走するか', loc:'make verify' },
      { id:'e7', cat:'例外対応', title:'make rollback による復元とハードブロック追加ができたか', loc:'git log' },
      { id:'e8', cat:'結合・ST', title:'10,000フレームベンチマークと破損JSON復旧テストがパスするか', loc:'tests/load/' },
      { id:'e9', cat:'運用・移行', title:'make run で快適に遊べ、--dry-run 移行スクリプトと v1.0.0 タグがあるか', loc:'git tag -l' }
    ];

    let currentStepIdx = 0;
    let stepStatuses = {};
    let evalStatuses = {};

    function loadProgress() {
      try {
        const saved = localStorage.getItem('breakout_progress_suite');
        if (saved) {
          const p = JSON.parse(saved);
          stepStatuses = p.stepStatuses || {};
          evalStatuses = p.evalStatuses || {};
        }
      } catch (e) {}
    }

    function saveProgress() {
      try {
        localStorage.setItem('breakout_progress_suite', JSON.stringify({ stepStatuses, evalStatuses }));
      } catch (e) {}
      updateProgressDisplay();
    }

    function updateProgressDisplay() {
      const completed = STEPS.filter(s => stepStatuses[s.id] === 'completed').length;
      const pct = Math.round((completed / STEPS.length) * 100);
      document.getElementById('header-progress-text').innerText = \`進捗: \${completed} / \${STEPS.length} 工程完了 (\${pct}%)\`;
      document.getElementById('sidebar-progress-bar').style.width = \`\${pct}%\`;
    }

    function renderStepList() {
      const c = document.getElementById('step-list-container');
      c.innerHTML = '';
      STEPS.forEach((step, idx) => {
        const item = document.createElement('div');
        const st = stepStatuses[step.id] || 'not-started';
        item.className = 'step-item' + (idx === currentStepIdx ? ' active' : '');
        item.onclick = () => { currentStepIdx = idx; renderStepList(); renderCurrentStep(); };
        
        let badgeHtml = '<span class="badge badge-not-started">未着手</span>';
        if (st === 'completed') badgeHtml = '<span class="badge badge-completed">完了</span>';
        else if (st === 'in-progress') badgeHtml = '<span class="badge badge-in-progress">進行中</span>';

        item.innerHTML = \`
          <div>
            <span style="font-family:monospace; font-size:11px; color:var(--text-muted); margin-right:4px;">\${step.id}</span>
            <span style="font-size:12px; font-weight:600;">\${step.title.split('(')[0]}</span>
          </div>
          \${badgeHtml}
        \`;
        c.appendChild(item);
      });
    }

    function renderCurrentStep() {
      const s = STEPS[currentStepIdx];
      const st = stepStatuses[s.id] || 'not-started';
      const c = document.getElementById('step-detail-card');
      c.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <span class="badge" style="background:#0369a1; color:#fff;">工程 \${s.id}</span>
            <span style="font-size:11px; color:var(--text-muted); margin-left:8px;">\${s.tool}</span>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn \${st==='not-started'?'btn-primary':''}" onclick="setStepStatus('\${s.id}', 'not-started')">未着手</button>
            <button class="btn \${st==='in-progress'?'btn-primary':''}" onclick="setStepStatus('\${s.id}', 'in-progress')">進行中</button>
            <button class="btn \${st==='completed'?'btn-success':''}" onclick="setStepStatus('\${s.id}', 'completed')">完了</button>
          </div>
        </div>
        <h2 style="font-size:18px; margin-bottom:6px;">\${s.title}</h2>
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">成果物: <code style="color:var(--accent); font-family:monospace;">\${s.artifact}</code></div>
        <div style="background:#071c2c; border:1px solid #0369a1; padding:12px; border-radius:8px; font-size:13px; margin-bottom:16px;">
          <strong style="color:var(--accent);">到達目標:</strong> \${s.goal}
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong style="font-size:12px; color:var(--text-muted);">最適化プロンプト</strong>
          <button class="btn" onclick="copyPrompt(\\\`\${s.prompt}\\\`)">プロンプトをコピー</button>
        </div>
        <pre>\${s.prompt}</pre>
      \`;
    }

    function setStepStatus(stepId, status) {
      stepStatuses[stepId] = status;
      saveProgress();
      renderStepList();
      renderCurrentStep();
    }

    function copyPrompt(text) {
      navigator.clipboard.writeText(text);
      alert('プロンプトをクリップボードにコピーしました！');
    }

    function switchTab(tab) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('view-curriculum').style.display = tab === 'curriculum' ? 'grid' : 'none';
      document.getElementById('view-simulator').style.display = tab === 'simulator' ? 'block' : 'none';
      document.getElementById('view-evaluation').style.display = tab === 'evaluation' ? 'block' : 'none';
    }

    function renderEvaluations() {
      const c = document.getElementById('eval-items-container');
      c.innerHTML = '';
      EVALS.forEach((e, idx) => {
        const isPassed = !!evalStatuses[e.id];
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'space-between';
        row.style.padding = '12px';
        row.style.borderBottom = '1px solid var(--border)';
        row.innerHTML = \`
          <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
            <input type="checkbox" \${isPassed ? 'checked' : ''} onchange="toggleEval('\${e.id}')">
            <span style="font-size:11px; color:var(--accent); font-family:monospace;">#\${idx+1} [\${e.cat}]</span>
            <span style="font-size:12px; font-weight:600;">\${e.title}</span>
          </label>
          <code style="font-size:11px; background:#050811; padding:3px 6px; border-radius:4px; color:var(--accent);">\${e.loc}</code>
        \`;
        c.appendChild(row);
      });
    }

    function toggleEval(id) {
      evalStatuses[id] = !evalStatuses[id];
      saveProgress();
      renderEvaluations();
    }

    function copyEvalReport() {
      const passed = EVALS.filter(e => evalStatuses[e.id]).length;
      let text = \`【AI駆動型開発 総合到達度評価レポート】\\n合格数: \${passed} / \${EVALS.length}\\n判定: \${passed === EVALS.length ? '★ 全項目合格' : '進行中'}\\n\`;
      navigator.clipboard.writeText(text);
      alert('評価レポートをコピーしました！');
    }

    /* Breakout Simulator Engine */
    const canvas = document.getElementById('standalone-canvas');
    const ctx = canvas.getContext('2d');
    let simPlaying = false;
    let simScore = 0;
    let simLives = 3;
    let simShowHitbox = true;
    let simEnableHard = true;
    const paddle = { x: 160, y: 255, w: 80, h: 10, speed: 6 };
    const ball = { x: 200, y: 240, r: 6, vx: 3, vy: -3 };
    const bricks = [];

    function initSimBricks() {
      bricks.length = 0;
      for (let r = 0; r < 4; r++) {
        const isTop = r === 0;
        const hp = isTop && simEnableHard ? 2 : 1;
        for (let c = 0; c < 8; c++) {
          bricks.push({ x: 14 + c * 46, y: 25 + r * 16, w: 42, h: 12, hp: hp, maxHp: hp });
        }
      }
    }

    function simTogglePlay() { simPlaying = !simPlaying; }
    function simReset() {
      paddle.x = 160;
      ball.x = 200;
      ball.y = 240;
      ball.vx = 3;
      ball.vy = -3;
      simScore = 0;
      simLives = 3;
      simPlaying = false;
      initSimBricks();
      document.getElementById('sim-score').innerText = simScore;
      document.getElementById('sim-lives').innerText = '♥♥♥';
    }
    function simHitboxToggle(v) { simShowHitbox = v; }
    function simHardToggle(v) { simEnableHard = v; simReset(); }

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      paddle.x = Math.max(0, Math.min(canvas.width - paddle.w, mouseX - paddle.w / 2));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') paddle.x = Math.max(0, paddle.x - paddle.speed * 2);
      if (e.key === 'ArrowRight') paddle.x = Math.min(canvas.width - paddle.w, paddle.x + paddle.speed * 2);
      if (e.key === ' ') { e.preventDefault(); simTogglePlay(); }
    });

    function simLoop() {
      const t0 = performance.now();
      if (simPlaying) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ball.r <= 0 || ball.x + ball.r >= canvas.width) ball.vx = -ball.vx;
        if (ball.y - ball.r <= 0) ball.vy = -ball.vy;

        // Paddle hit
        if (ball.y + ball.r >= paddle.y && ball.y - ball.r <= paddle.y + paddle.h &&
            ball.x >= paddle.x && ball.x <= paddle.x + paddle.w && ball.vy > 0) {
          ball.vy = -ball.vy;
          ball.vx = ((ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2)) * 4.5;
        }

        // Brick hit
        for (const b of bricks) {
          if (b.hp <= 0) continue;
          if (ball.x + ball.r >= b.x && ball.x - ball.r <= b.x + b.w &&
              ball.y + ball.r >= b.y && ball.y - ball.r <= b.y + b.h) {
            b.hp--;
            ball.vy = -ball.vy;
            if (b.hp <= 0) {
              simScore += b.maxHp === 2 ? 200 : 100;
              document.getElementById('sim-score').innerText = simScore;
            }
            break;
          }
        }

        if (ball.y > canvas.height) {
          simLives--;
          document.getElementById('sim-lives').innerText = '♥'.repeat(Math.max(0, simLives));
          if (simLives <= 0) {
            alert('GAME OVER! リセットします。');
            simReset();
          } else {
            ball.x = paddle.x + paddle.w / 2;
            ball.y = paddle.y - 10;
            ball.vy = -3;
            simPlaying = false;
          }
        }
      }

      const t1 = performance.now();
      document.getElementById('sim-tick-time').innerText = (t1 - t0).toFixed(2) + 'ms';

      // Draw View
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const b of bricks) {
        if (b.hp <= 0) continue;
        ctx.fillStyle = b.hp === 2 ? '#94a3b8' : (b.maxHp === 2 ? '#cbd5e1' : '#38bdf8');
        ctx.fillRect(b.x, b.y, b.w, b.h);
        if (simShowHitbox) {
          ctx.strokeStyle = '#ef4444';
          ctx.strokeRect(b.x, b.y, b.w, b.h);
        }
      }

      ctx.fillStyle = '#10b981';
      ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
      if (simShowHitbox) {
        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(paddle.x, paddle.y, paddle.w, paddle.h);
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(simLoop);
    }

    loadProgress();
    renderStepList();
    renderCurrentStep();
    renderEvaluations();
    updateProgressDisplay();
    initSimBricks();
    simLoop();
  </script>
</body>
</html>`;
}
