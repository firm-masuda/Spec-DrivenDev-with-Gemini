import React from 'react';
import { ArrowRight, FileText, CheckCircle, Terminal, Monitor, Sparkles } from 'lucide-react';

export interface StepFlowItem {
  order: string;
  name: string;
  tool: string;
  toolCategory: 'studio' | 'desktop' | 'ide' | 'hybrid';
  input: string;
  output: string;
  verificationTarget?: string;
  keyPoint: string;
}

export const STEP_FLOW_ITEMS: StepFlowItem[] = [
  {
    order: '01',
    name: '要求定義 (Business Requirements)',
    tool: 'Google AI Studio',
    toolCategory: 'studio',
    input: 'クライアントからの生ヒアリングメモ',
    output: 'docs/01_business_requirements.md (業務要求仕様書)',
    verificationTarget: '09. 受入テスト',
    keyPoint: 'In-Scope と Out-of-Scope（BGM・通信等の除外）を明確化しスコープクリープを防止'
  },
  {
    order: '02',
    name: '要件定義 (System Requirements)',
    tool: 'Google AI Studio',
    toolCategory: 'studio',
    input: 'docs/01_business_requirements.md',
    output: 'docs/02_requirements.md (システム要件定義書)',
    verificationTarget: '08. システムテスト',
    keyPoint: '座標系・5状態マシン・非機能要件（1フレーム2.0ms以内、headlessテスト、破損JSON復旧）を数値定義'
  },
  {
    order: '03',
    name: '基本設計 / 外部設計 (Architecture)',
    tool: 'AI Studio × Desktop',
    toolCategory: 'hybrid',
    input: 'docs/02_requirements.md',
    output: 'docs/03_architecture.md (基本設計書、Mermaidクラス図・状態遷移図)',
    verificationTarget: '07. 結合テスト',
    keyPoint: 'Model/Engine層（GUI非依存）とView/GUI層（tkinter）を完全分離するMVCアーキテクチャの確立'
  },
  {
    order: '04',
    name: '環境構築・基盤整備 (Environment Setup)',
    tool: 'Antigravity IDE (Terminal)',
    toolCategory: 'ide',
    input: 'docs/01〜03、Ubuntu/Python 3.13要件',
    output: 'pyproject.toml, Makefile, .githooks/ (pre-commit, commit-msg)',
    keyPoint: 'make verify によるテスト自動検証と、テスト失敗コードをOS/Gitレベルで物理遮断するフック整備'
  },
  {
    order: '05',
    name: '詳細設計 / 実装計画化 (Planning)',
    tool: 'Antigravity IDE',
    toolCategory: 'ide',
    input: 'docs/02, docs/03, 既存リポジトリ構造',
    output: 'docs/04_implementation_plan.md (段階的実装計画書)',
    verificationTarget: '06. 単体テスト',
    keyPoint: '下位モデル（Phase 1）から順に分割し、GUI描画を意図的に最後（Phase 4）に回す計画化'
  },
  {
    order: '06',
    name: '実装 ＆ 単体テスト (Self-Healing)',
    tool: 'Antigravity IDE × Desktop',
    toolCategory: 'hybrid',
    input: 'docs/04_implementation_plan.md',
    output: 'src/breakout/ (models, engine, storage, gui), tests/unit/',
    verificationTarget: '05. 詳細設計',
    keyPoint: 'make verify が Exit Code 0 になるまでAIに自律修復（Self-Healing）ループを回させ1Phaseずつコミット'
  },
  {
    order: 'EX',
    name: '特別演習: 仕様変更＆ロールバック',
    tool: 'Antigravity IDE',
    toolCategory: 'ide',
    input: 'テスト失敗状態、クライアント追加仕様（耐久力2のハードブロック）',
    output: 'ポストモーテム事後診断レポート、Phase 5差分実装コード・テスト',
    keyPoint: '泥沼化パッチを防ぐ make rollback 復旧の習慣化と、既存テストを壊さない下位互換性（デフォルト引数）設計'
  },
  {
    order: '07',
    name: '結合テスト (Integration Testing)',
    tool: 'Antigravity IDE',
    toolCategory: 'ide',
    input: 'docs/03_architecture.md, src/breakout/',
    output: 'tests/integration/test_game_lifecycle.py',
    verificationTarget: '03. 基本設計',
    keyPoint: 'ゲームクリア時のハイスコアJSON保存と、ゲームオーバー時のスコア誤上書き防止を通し検証'
  },
  {
    order: '08',
    name: 'システムテスト / 総合テスト',
    tool: 'Desktop × IDE',
    toolCategory: 'hybrid',
    input: 'docs/02_requirements.md (非機能要件), src/breakout/',
    output: 'tests/load/test_non_functional.py (ベンチマーク・耐障害性テスト)',
    verificationTarget: '02. 要件定義',
    keyPoint: '10,000フレーム連続負荷試験（平均2.0ms以内＝60FPS保証）と、破損JSONからのクラッシュフリー起動実証'
  },
  {
    order: '09',
    name: '運用準備・受入テスト (UAT & Ops)',
    tool: 'Google AI Studio × Desktop',
    toolCategory: 'hybrid',
    input: 'docs/01〜03, src/breakout/ 全コード',
    output: 'docs/05_operations_manual.md (運用手順書), 実機受入プレイ結果',
    verificationTarget: '01. 要求定義',
    keyPoint: '運用マニュアル生成と、人間による実機GUIプレイでの操作感・EX仕様・ポーズ機能の受入完了'
  },
  {
    order: '10',
    name: 'システム移行・実運用開始 (Cutover)',
    tool: 'Antigravity IDE',
    toolCategory: 'ide',
    input: '過去イベントのスコアCSVファイル (player_name,score,recorded_at)',
    output: 'scripts/migrate_scores.py (--dry-run付き移行スクリプト), Gitタグ v1.0.0',
    keyPoint: '実データを壊さないドライラン検証による旧資産移行と、セマンティックバージョニングによる製品リリース'
  }
];

export const CurriculumOverviewTable: React.FC = () => {
  const getToolBadge = (tool: string, category: string) => {
    if (category === 'studio') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
          <Sparkles className="w-3 h-3" />
          {tool}
        </span>
      );
    }
    if (category === 'desktop') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <Monitor className="w-3 h-3" />
          {tool}
        </span>
      );
    }
    if (category === 'ide') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          <Terminal className="w-3 h-3" />
          {tool}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
        {tool}
      </span>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span>全工程フロー一覧（INPUT / OUTPUT / 担当ツール / 検証対応工程）</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          クライアントヒアリングメモの要求定義（01）から、本番移行・Gitタグ（10）までの全11工程の入力・成果物・到達目標のマトリクスです。
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase text-[11px]">
              <th className="py-3 px-3">工程</th>
              <th className="py-3 px-3">工程名</th>
              <th className="py-3 px-3">主担当ツール</th>
              <th className="py-3 px-3">入力 (INPUT)</th>
              <th className="py-3 px-3">成果物 (OUTPUT)</th>
              <th className="py-3 px-3">検証対応工程</th>
              <th className="py-3 px-3">到達目標・設計ポイント</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {STEP_FLOW_ITEMS.map(item => (
              <tr key={item.order} className="hover:bg-slate-950/40 transition">
                <td className="py-3 px-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                  {item.order}
                </td>
                <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                  {item.name}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  {getToolBadge(item.tool, item.toolCategory)}
                </td>
                <td className="py-3 px-3 text-slate-300 max-w-[180px]">
                  <span className="font-mono text-[11px] text-slate-400">{item.input}</span>
                </td>
                <td className="py-3 px-3 text-cyan-300 font-mono text-[11px] max-w-[200px]">
                  {item.output}
                </td>
                <td className="py-3 px-3 text-amber-400 font-medium whitespace-nowrap">
                  {item.verificationTarget || '—'}
                </td>
                <td className="py-3 px-3 text-slate-400 max-w-[260px] leading-relaxed">
                  {item.keyPoint}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
