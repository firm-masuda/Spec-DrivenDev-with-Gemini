import React from 'react';
import { CURRICULUM_STEPS } from '../data/curriculum.js';
import { CheckCircle2, Clock, CircleDot, ArrowRight, ArrowLeftRight } from 'lucide-react';

export function VModelProgressMap({
  progress = { steps: {} },
  activeStepId,
  onSelectStep
}) {
  const getStepById = (id) => {
    return CURRICULUM_STEPS.find(s => s.id === id);
  };

  const getStatusBadge = (stepId) => {
    const s = progress.steps?.[stepId]?.status || 'not-started';
    if (s === 'completed') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          完了
        </span>
      );
    }
    if (s === 'in-progress') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400">
          <Clock className="w-3.5 h-3.5 shrink-0 animate-pulse" />
          進行中
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[11px] text-slate-500">
        <CircleDot className="w-3.5 h-3.5 shrink-0" />
        未着手
      </span>
    );
  };

  const renderNode = (step, align) => {
    if (!step) return null;
    const isSelected = activeStepId === step.id;
    const s = progress.steps?.[step.id]?.status || 'not-started';

    const borderClass = isSelected
      ? 'border-cyan-400 ring-2 ring-cyan-500/30 bg-slate-900 shadow-lg shadow-cyan-950/50'
      : s === 'completed'
      ? 'border-emerald-500/40 bg-slate-900/90 hover:border-emerald-500/70'
      : s === 'in-progress'
      ? 'border-cyan-500/50 bg-slate-900/90 hover:border-cyan-400'
      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700';

    return (
      <button
        onClick={() => onSelectStep(step.id)}
        className={`w-full p-3 rounded-xl border text-left transition-all group cursor-pointer ${borderClass}`}
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-cyan-300">
              {step.orderNumber}
            </span>
            <span className="text-xs font-semibold text-white truncate max-w-[160px]">
              {step.title.split('(')[0].trim()}
            </span>
          </div>
          {getStatusBadge(step.id)}
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate max-w-[170px] text-slate-500">{step.artifact}</span>
          <span className="font-mono text-[10px] text-cyan-500/80 uppercase">
            {step.tools[0].replace('Google ', '').replace('Antigravity ', '')}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800/80">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>開発工程 V字モデル ＆ 検証対応マップ</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            上流の設計と下流の検証が1対1で対応するV字開発モデル。クリックで該当工程へ移動できます。
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> 完了
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> 進行中
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span> 未着手
          </span>
        </div>
      </div>

      <div className="space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5">{renderNode(getStepById('step-01'), 'left')}</div>
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center text-center px-1">
            <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500/40 via-amber-500/50 to-emerald-500/40 relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 px-1 text-[10px] text-amber-300 font-mono flex items-center gap-0.5 whitespace-nowrap">
                <ArrowLeftRight className="w-2.5 h-2.5" /> 要求検証
              </span>
            </div>
          </div>
          <div className="md:col-span-5">{renderNode(getStepById('step-09'), 'right')}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 pl-0 md:pl-4">{renderNode(getStepById('step-02'), 'left')}</div>
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center text-center px-1">
            <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500/40 via-amber-500/50 to-emerald-500/40 relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 px-1 text-[10px] text-amber-300 font-mono flex items-center gap-0.5 whitespace-nowrap">
                <ArrowLeftRight className="w-2.5 h-2.5" /> 性能・耐障害検証
              </span>
            </div>
          </div>
          <div className="md:col-span-5 pr-0 md:pr-4">{renderNode(getStepById('step-08'), 'right')}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 pl-0 md:pl-8">{renderNode(getStepById('step-03'), 'left')}</div>
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center text-center px-1">
            <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500/40 via-amber-500/50 to-emerald-500/40 relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 px-1 text-[10px] text-amber-300 font-mono flex items-center gap-0.5 whitespace-nowrap">
                <ArrowLeftRight className="w-2.5 h-2.5" /> 結合・保存検証
              </span>
            </div>
          </div>
          <div className="md:col-span-5 pr-0 md:pr-8">{renderNode(getStepById('step-07'), 'right')}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 pl-0 md:pl-12">
            {renderNode(getStepById('step-04'), 'left')}
          </div>
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center text-center">
            <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              品質ゲート整備
            </span>
          </div>
          <div className="md:col-span-5 pr-0 md:pr-12">
            {renderNode(getStepById('step-10'), 'right')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 pl-0 md:pl-16">{renderNode(getStepById('step-05'), 'left')}</div>
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center text-center px-1">
            <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500/40 via-cyan-400 to-emerald-500/40 relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 px-1 text-[10px] text-cyan-300 font-mono flex items-center gap-0.5 whitespace-nowrap">
                <ArrowRight className="w-2.5 h-2.5" /> Phase実行
              </span>
            </div>
          </div>
          <div className="md:col-span-5 pr-0 md:pr-16">{renderNode(getStepById('step-06'), 'right')}</div>
        </div>

        <div className="pt-2 flex justify-center">
          <div className="w-full md:w-3/5 border-t border-dashed border-amber-500/30 pt-3">
            <div className="text-center text-[11px] font-mono text-amber-400 mb-1.5 font-semibold">
              ★ 必須演習: 泥沼化防止 ＆ 下位互換性
            </div>
            {renderNode(getStepById('step-ex'), 'center')}
          </div>
        </div>
      </div>
    </div>
  );
}
