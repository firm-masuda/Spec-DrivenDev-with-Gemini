import React from 'react';
import { TOOLS_MATRIX } from '../data/curriculum';
import { Layers, Terminal, Monitor, Sparkles } from 'lucide-react';

export const ToolsMatrixView: React.FC = () => {
  const getToolIcon = (name: string) => {
    if (name.includes('Studio')) return <Sparkles className="w-5 h-5 text-amber-400" />;
    if (name.includes('Desktop')) return <Monitor className="w-5 h-5 text-cyan-400" />;
    return <Terminal className="w-5 h-5 text-emerald-400" />;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span>第1章 3大ツールの適材適所マトリクス ＆ 役割定義</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          AI駆動型開発では、ツールの性質に応じて「上流思考（AI Studio）」「視覚検証（Desktop）」「自律実装（IDE）」を明確に使い分けることが成功の鍵です。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TOOLS_MATRIX.map(tool => (
          <div
            key={tool.name}
            className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    {getToolIcon(tool.name)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{tool.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{tool.subtitle}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">ツールの位置づけ</span>
                  <p className="text-slate-200 font-medium">{tool.position}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">主な操作対象</span>
                  <p className="text-slate-300">{tool.target}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">作業コンテキスト</span>
                  <p className="text-slate-300">{tool.context}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">生成物の反映</span>
                  <p className="text-slate-300">{tool.output}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 bg-slate-900/60 -mx-5 -mb-5 p-4 rounded-b-xl">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                ブロック崩し開発での役割
              </span>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {tool.roleInBreakout}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
