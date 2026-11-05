import React, { useState } from 'react';
import { Download, Code2, Copy, Check, Sparkles } from 'lucide-react';
import { generateStandaloneHtml } from '../utils/generateStandaloneHtml.js';

export function StandaloneHtmlExporter() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCodePreview, setShowCodePreview] = useState(false);

  const handleDownload = () => {
    const html = generateStandaloneHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'breakout-ai-exercise-manager.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    const html = generateStandaloneHtml();
    navigator.clipboard.writeText(html);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              ブラウザ単体で完結するスタンドアロンHTML版
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            外部CDNや追加ライブラリに依存せず、HTML5 / CSS3 / Vanilla JS のみで構成された完全な単一ファイル。オフラインの受講生PCや演習環境でもダブルクリックだけで即起動できます。
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">コードをコピーしました</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>HTMLコードをコピー</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-cyan-900/30 transition"
          >
            <Download className="w-4 h-4" />
            <span>単一HTMLファイルをダウンロード (.html)</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>包含機能: 全11工程進捗チェック / プロンプト一発コピー / 評価判定 / 物理シミュレーター</span>
        </div>
        <button
          onClick={() => setShowCodePreview(!showCodePreview)}
          className="text-cyan-400 hover:underline font-medium"
        >
          {showCodePreview ? 'ソースコードプレビューを閉じる' : 'ソースコードプレビューを表示'}
        </button>
      </div>

      {showCodePreview && (
        <div className="relative">
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-[360px] whitespace-pre-wrap leading-relaxed">
            {generateStandaloneHtml().slice(0, 3000)}
            {'\n... (全コードは約1,200行の単一HTMLファイルとして生成されます) ...'}
          </pre>
        </div>
      )}
    </div>
  );
}
