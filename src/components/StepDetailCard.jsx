import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  FileCode,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export function StepDetailCard({
  step,
  stepProgress = { status: 'not-started', completedCheckpoints: [], notes: '' },
  onUpdateStatus,
  onToggleCheckpoint,
  onUpdateNotes,
  onNavigate,
  prevStepId,
  nextStepId
}) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState(null);
  const [showIntent, setShowIntent] = useState(true);

  const handleCopyPrompt = () => {
    if (!step.prompt) return;
    navigator.clipboard.writeText(step.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopySnippet = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const status = stepProgress.status || 'not-started';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold rounded-md">
              工程 {step.orderNumber}
            </span>
            {step.tools.map(tool => (
              <span
                key={tool}
                className="px-2.5 py-1 bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium rounded-md"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => onUpdateStatus(step.id, 'not-started')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                status === 'not-started'
                  ? 'bg-slate-800 text-slate-200 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              未着手
            </button>
            <button
              onClick={() => onUpdateStatus(step.id, 'in-progress')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                status === 'in-progress'
                  ? 'bg-cyan-500 text-slate-950 shadow font-bold'
                  : 'text-cyan-400 hover:text-cyan-300'
              }`}
            >
              <Clock className="w-3 h-3" />
              進行中
            </button>
            <button
              onClick={() => onUpdateStatus(step.id, 'completed')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                status === 'completed'
                  ? 'bg-emerald-500 text-slate-950 shadow font-bold'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              完了
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
          {step.title}
        </h2>

        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
          <div>
            成果物: <code className="font-mono text-cyan-300">{step.artifact}</code>
          </div>
          {step.verifiedAgainst && (
            <div>
              検証対応工程: <span className="text-amber-400 font-semibold">{step.verifiedAgainst}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            到達目標 (Goal)
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {step.goal}
          </p>
        </div>

        {step.id === 'step-01' && (
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 text-xs space-y-1.5">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>最新 Google AI Studio UI での Temperature 設定について</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              最新の Google AI Studio（特に Thinking モデル等）では、モデル内部の思考推論プロセスを自律最適化するため、右側ペイン（Run settings）の <strong>「Temperature」スライダーが非表示・固定</strong> になっている場合があります。
            </p>
            <p className="text-slate-400 leading-relaxed">
              設定欄が表示されない場合は<strong>デフォルトのままで全く問題ありません</strong>。本アプリで提供しているプロンプト内に「推測や余計な装飾を排除し論理的・決定論的に構造化する」制約が組み込まれているため、パラメータ未設定でも期待通りの要求定義書が生成されます。
            </p>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            実践ステップ
          </h3>
          <div className="space-y-3">
            {step.practicalSteps.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-semibold text-white">{s.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  {s.description}
                </p>

                {s.codeSnippet && (
                  <div className="mt-2 pl-7">
                    <div className="relative group">
                      <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                        {s.codeSnippet}
                      </pre>
                      <button
                        onClick={() => handleCopySnippet(s.codeSnippet, idx)}
                        className="absolute top-2 right-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1 opacity-90 group-hover:opacity-100 transition shadow"
                      >
                        {copiedSnippetIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">コピー完了</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>コピー</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {step.prompt && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileCode className="w-4 h-4" />
                投入用最適化プロンプト（ワンクリックコピー対応）
              </h3>
              <button
                onClick={handleCopyPrompt}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">プロンプトをコピーしました！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>プロンプトをコピー</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-[320px] whitespace-pre-wrap leading-relaxed">
                {step.prompt}
              </pre>
            </div>
          </div>
        )}

        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
          <button
            onClick={() => setShowIntent(!showIntent)}
            className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>💡 なぜこの手順が必要か（設計意図・つまずき防止メモ）</span>
            </span>
            {showIntent ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showIntent && (
            <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 space-y-3">
              <div className="text-xs font-bold text-amber-300/90">
                {step.designIntent.summary}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {step.designIntent.points.map((pt, i) => (
                  <div key={i} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <h5 className="text-xs font-bold text-white mb-1">{pt.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">{pt.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            工程完了チェックポイント
          </h3>
          <div className="space-y-2">
            {step.checkpoints.map(cp => {
              const isChecked = stepProgress.completedCheckpoints?.includes(cp.id);
              return (
                <label
                  key={cp.id}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-900 cursor-pointer border border-transparent hover:border-slate-800 transition"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleCheckpoint(step.id, cp.id)}
                    className="mt-0.5 rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer w-4 h-4"
                  />
                  <div>
                    <div className={`text-xs font-semibold ${isChecked ? 'text-emerald-400 line-through' : 'text-slate-200'}`}>
                      {cp.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{cp.detail}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            作業メモ・エラーログ記録（自動保存）
          </label>
          <textarea
            value={stepProgress.notes || ''}
            onChange={e => onUpdateNotes(step.id, e.target.value)}
            placeholder="この工程で気付いた点、詰まったポイント、テスト実行時間などをメモしてください..."
            rows={2}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition resize-y font-mono"
          />
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          {prevStepId ? (
            <button
              onClick={() => onNavigate(prevStepId)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              前工程へ戻る
            </button>
          ) : (
            <div />
          )}

          {nextStepId && (
            <button
              onClick={() => onNavigate(nextStepId)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg shadow-cyan-900/20 transition"
            >
              次工程へ進む
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
