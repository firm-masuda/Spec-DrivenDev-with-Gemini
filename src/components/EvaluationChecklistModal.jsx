import React, { useState } from 'react';
import { EVALUATION_ITEMS } from '../data/curriculum.js';
import { Award, Copy, Check, Sparkles } from 'lucide-react';

export function EvaluationChecklistModal({
  evaluations = {},
  onToggleItem,
  onReset,
  userName = ''
}) {
  const [copiedReport, setCopiedReport] = useState(false);

  const passedCount = EVALUATION_ITEMS.filter(item => evaluations[item.id]).length;
  const totalCount = EVALUATION_ITEMS.length;
  const isAllPassed = passedCount === totalCount;
  const passRate = Math.round((passedCount / totalCount) * 100);

  const generateReportText = () => {
    let report = `【AI駆動型開発 総合到達度評価レポート】\n`;
    report += `受講者: ${userName || '受講生'}\n`;
    report += `判定状況: ${passedCount}/${totalCount} 項目合格 (${passRate}%)\n`;
    report += `総合判定: ${isAllPassed ? '★ 合格 (合格基準達成)' : '▲ 演習進行中'}\n\n`;
    report += `--- 判定明細 ---\n`;
    EVALUATION_ITEMS.forEach((item, idx) => {
      const passed = evaluations[item.id];
      report += `${idx + 1}. [${passed ? '合格' : '未達'}] [${item.category}] ${item.title}\n`;
      report += `   確認箇所: ${item.checkLocation}\n`;
    });
    return report;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              第4章 総合到達度チェックリスト（演習評価シート）
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            すべての工程が完了したら、以下の項目を満たしているか最終判定を行ってください。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyReport}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow"
          >
            {copiedReport ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">レポートコピー完了</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>評価レポートをコピー</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
        isAllPassed
          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
          : 'bg-slate-950/60 border-slate-800 text-slate-300'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono ${
            isAllPassed ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-900/40' : 'bg-slate-800 text-cyan-400'
          }`}>
            {passRate}%
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">到達度スコア</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{passedCount} / {totalCount} 項目クリア</span>
              {isAllPassed && (
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[11px] rounded font-mono font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> 合格証発行可能
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 text-right">
          <div>受講者名: <strong className="text-slate-200">{userName || '受講生'}</strong></div>
          <div className="text-[11px] text-slate-500">判定基準: 全9項目達成</div>
        </div>
      </div>

      <div className="space-y-3">
        {EVALUATION_ITEMS.map((item, idx) => {
          const isPassed = !!evaluations[item.id];
          return (
            <div
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-start justify-between gap-4 ${
                isPassed
                  ? 'bg-slate-950/80 border-emerald-500/40 hover:border-emerald-500/60'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  type="button"
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition shrink-0 ${
                    isPassed
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                      : 'border-slate-700 bg-slate-900 hover:border-cyan-500'
                  }`}
                >
                  {isPassed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">
                      #{idx + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {item.category}
                    </span>
                  </div>

                  <h4 className={`text-xs font-bold ${isPassed ? 'text-white' : 'text-slate-300'}`}>
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-500 block mb-1">
                  確認箇所 / コマンド
                </span>
                <code className="text-[11px] font-mono bg-slate-900 px-2 py-1 rounded text-cyan-300 border border-slate-800">
                  {item.checkLocation}
                </code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
