import React, { useState, useEffect } from 'react';
import { CURRICULUM_STEPS, Step } from './data/curriculum';
import { UserProgressData, DEFAULT_USER_PROGRESS, StepStatus } from './types/progress';
import { VModelProgressMap } from './components/VModelProgressMap';
import { StepDetailCard } from './components/StepDetailCard';
import { BreakoutArchitectureSimulator } from './components/BreakoutArchitectureSimulator';
import { EvaluationChecklistModal } from './components/EvaluationChecklistModal';
import { ToolsMatrixView } from './components/ToolsMatrixView';
import { StandaloneHtmlExporter } from './components/StandaloneHtmlExporter';
import { CurriculumOverviewTable } from './components/CurriculumOverviewTable';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  RotateCcw,
  Download,
  Upload,
  Share2,
  Sparkles,
  Layers,
  Award,
  Activity,
  User,
  Check,
  FileText
} from 'lucide-react';

const STORAGE_KEY = 'ai_driven_breakout_progress_v1';

export default function App() {
  const [progress, setProgress] = useState<UserProgressData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return DEFAULT_USER_PROGRESS;
  });

  const [activeTab, setActiveTab] = useState<'map' | 'curriculum' | 'flow' | 'simulator' | 'evaluation' | 'tools' | 'standalone'>('map');
  const [activeStepId, setActiveStepId] = useState<string>('step-01');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Derived progress statistics
  const totalSteps = CURRICULUM_STEPS.length;
  const completedStepsCount = Object.values(progress.steps).filter(s => s.status === 'completed').length;
  const inProgressStepsCount = Object.values(progress.steps).filter(s => s.status === 'in-progress').length;
  const overallPercentage = Math.round((completedStepsCount / totalSteps) * 100);

  // Step Status Update Handlers
  const handleUpdateStatus = (stepId: string, status: StepStatus) => {
    setProgress(prev => ({
      ...prev,
      lastActiveAt: new Date().toISOString(),
      steps: {
        ...prev.steps,
        [stepId]: {
          ...(prev.steps[stepId] || { completedCheckpoints: [], notes: '' }),
          status,
          updatedAt: new Date().toISOString()
        }
      }
    }));
  };

  const handleToggleCheckpoint = (stepId: string, checkpointId: string) => {
    setProgress(prev => {
      const current = prev.steps[stepId]?.completedCheckpoints || [];
      const updated = current.includes(checkpointId)
        ? current.filter(id => id !== checkpointId)
        : [...current, checkpointId];

      return {
        ...prev,
        lastActiveAt: new Date().toISOString(),
        steps: {
          ...prev.steps,
          [stepId]: {
            ...(prev.steps[stepId] || { status: 'not-started', notes: '' }),
            completedCheckpoints: updated,
            updatedAt: new Date().toISOString()
          }
        }
      };
    });
  };

  const handleUpdateNotes = (stepId: string, notes: string) => {
    setProgress(prev => ({
      ...prev,
      steps: {
        ...prev.steps,
        [stepId]: {
          ...(prev.steps[stepId] || { status: 'not-started', completedCheckpoints: [] }),
          notes
        }
      }
    }));
  };

  const handleToggleEvaluationItem = (id: string) => {
    setProgress(prev => ({
      ...prev,
      evaluations: {
        ...prev.evaluations,
        [id]: !prev.evaluations[id]
      }
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('これまでの進捗状態をすべて初期化しますか？')) {
      setProgress({
        ...DEFAULT_USER_PROGRESS,
        startedAt: new Date().toISOString()
      });
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `breakout-progress-${progress.userName || 'student'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.steps) {
          setProgress(parsed);
          alert('進捗データをインポートしました！');
        }
      } catch (err) {
        alert('無効なJSONファイルです。');
      }
    };
    reader.readAsText(file);
  };

  const handleCopyProgressReport = () => {
    let report = `【AI駆動型開発 演習進捗サマリー】\n`;
    report += `受講者: ${progress.userName} (${progress.organization})\n`;
    report += `全体進捗: ${completedStepsCount}/${totalSteps} 工程完了 (${overallPercentage}%)\n`;
    report += `進行中工程数: ${inProgressStepsCount}\n\n`;
    report += `--- 工程別ステータス ---\n`;
    CURRICULUM_STEPS.forEach(s => {
      const st = progress.steps[s.id]?.status || 'not-started';
      const mark = st === 'completed' ? '完了' : st === 'in-progress' ? '進行中' : '未着手';
      report += `[${mark}] 工程${s.orderNumber}: ${s.title.split('(')[0].trim()} (${s.artifact})\n`;
    });
    navigator.clipboard.writeText(report);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Navigation helpers
  const currentStep = CURRICULUM_STEPS.find(s => s.id === activeStepId) || CURRICULUM_STEPS[0];
  const currentStepIndex = CURRICULUM_STEPS.findIndex(s => s.id === activeStepId);
  const prevStepId = currentStepIndex > 0 ? CURRICULUM_STEPS[currentStepIndex - 1].id : undefined;
  const nextStepId = currentStepIndex < CURRICULUM_STEPS.length - 1 ? CURRICULUM_STEPS[currentStepIndex + 1].id : undefined;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Contract (3 Zones) */}
      <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-sm shadow-md shadow-cyan-900/30">
            AI
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            AI駆動開発 演習進捗マネージャー
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-400">
          <button
            onClick={() => setActiveTab('map')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'map' ? 'text-cyan-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            V字モデルマップ
          </button>
          <button
            onClick={() => setActiveTab('flow')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'flow' ? 'text-cyan-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            全工程フロー (INPUT/OUTPUT)
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'curriculum' ? 'text-cyan-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            全11工程ハンズオン
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'simulator' ? 'text-cyan-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            物理シミュレーター
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'evaluation' ? 'text-cyan-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            総合到達度評価
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'tools' ? 'text-cyan-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            3大ツール比較
          </button>
          <button
            onClick={() => setActiveTab('standalone')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'standalone' ? 'text-cyan-400 font-bold' : 'hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            単一HTML版DL
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCopyProgressReport}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow"
          >
            {copiedSummary ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">進捗サマリーコピー完了</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>進捗共有サマリー</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* KPI & Status Dashboard Strip */}
      <section className="border-b border-slate-800/80 bg-slate-950/40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* User profile & Progress Bar */}
          <div className="flex items-center gap-4 min-w-[280px]">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isEditingUser ? (
                  <input
                    type="text"
                    value={progress.userName}
                    onChange={e => setProgress(prev => ({ ...prev, userName: e.target.value }))}
                    onBlur={() => setIsEditingUser(false)}
                    onKeyDown={e => e.key === 'Enter' && setIsEditingUser(false)}
                    autoFocus
                    className="px-2 py-0.5 bg-slate-900 border border-cyan-500 rounded text-xs text-white"
                  />
                ) : (
                  <button
                    onClick={() => setIsEditingUser(true)}
                    className="text-xs font-bold text-white hover:text-cyan-400 transition flex items-center gap-1"
                    title="受講生名を編集"
                  >
                    <span>{progress.userName || '受講生'}</span>
                    <span className="text-[10px] text-slate-500 font-normal">(編集)</span>
                  </button>
                )}
                <span className="text-slate-600">/</span>
                <span className="text-[11px] text-slate-400">{progress.organization}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                <span>演習課題: <strong className="text-slate-200">Python GUI Breakout</strong></span>
                <span>・</span>
                <span>全11工程中 <strong className="text-cyan-400 font-mono">{completedStepsCount}</strong> 完了</span>
              </div>
            </div>
          </div>

          {/* Progress gauge bar */}
          <div className="flex-1 max-w-md min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">全体進捗率</span>
              <span className="text-cyan-400 font-mono tabular-nums">{overallPercentage}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>

          {/* Controls: Reset / Export / Import */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              title="進捗JSONエクスポート"
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs flex items-center gap-1 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">JSON保存</span>
            </button>

            <label
              title="進捗JSONインポート"
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs flex items-center gap-1 cursor-pointer transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">復元</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>

            <button
              onClick={handleResetProgress}
              title="進捗リセット"
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 rounded-lg text-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 text-xs font-semibold border-b border-slate-800">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'map' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 bg-slate-900'
            }`}
          >
            V字マップ
          </button>
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'flow' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 bg-slate-900'
            }`}
          >
            工程フロー(IN/OUT)
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'curriculum' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 bg-slate-900'
            }`}
          >
            ハンズオン手順
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'simulator' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 bg-slate-900'
            }`}
          >
            シミュレーター
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'evaluation' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 bg-slate-900'
            }`}
          >
            到達度評価
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'tools' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 bg-slate-900'
            }`}
          >
            3大ツール比較
          </button>
          <button
            onClick={() => setActiveTab('standalone')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'standalone' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 bg-slate-900'
            }`}
          >
            単一HTML版
          </button>
        </div>

        {/* Tab 1: V-Model Map & Active Step View */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <VModelProgressMap
              progress={progress}
              activeStepId={activeStepId}
              onSelectStep={stepId => {
                setActiveStepId(stepId);
              }}
            />

            {/* Selected Step quick preview / action */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <StepDetailCard
                  step={currentStep}
                  stepProgress={progress.steps[currentStep.id] || { status: 'not-started', completedCheckpoints: [], notes: '' }}
                  onUpdateStatus={handleUpdateStatus}
                  onToggleCheckpoint={handleToggleCheckpoint}
                  onUpdateNotes={handleUpdateNotes}
                  onNavigate={id => setActiveStepId(id)}
                  prevStepId={prevStepId}
                  nextStepId={nextStepId}
                />
              </div>

              <div className="lg:col-span-4 space-y-6">
                {/* Simulator widget */}
                <BreakoutArchitectureSimulator />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Curriculum Step by Step */}
        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Step list sidebar */}
            <div className="lg:col-span-4 space-y-2">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-3">
                <div className="text-xs font-bold text-slate-300 mb-1">工程ナビゲーション</div>
                <div className="text-[11px] text-slate-400">
                  クリックして手順書・プロンプト・チェックリストを表示
                </div>
              </div>

              <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
                {CURRICULUM_STEPS.map(step => {
                  const s = progress.steps[step.id]?.status || 'not-started';
                  const isSelected = activeStepId === step.id;

                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStepId(step.id)}
                      className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                          : s === 'completed'
                          ? 'bg-slate-950/60 border-emerald-500/30 hover:border-emerald-500/60'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center font-bold shrink-0 ${
                          isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {step.orderNumber}
                        </span>
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">
                            {step.title}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {step.artifact}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {s === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : s === 'in-progress' ? (
                          <Clock className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-700" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main detail card */}
            <div className="lg:col-span-8">
              <StepDetailCard
                step={currentStep}
                stepProgress={progress.steps[currentStep.id] || { status: 'not-started', completedCheckpoints: [], notes: '' }}
                onUpdateStatus={handleUpdateStatus}
                onToggleCheckpoint={handleToggleCheckpoint}
                onUpdateNotes={handleUpdateNotes}
                onNavigate={id => setActiveStepId(id)}
                prevStepId={prevStepId}
                nextStepId={nextStepId}
              />
            </div>
          </div>
        )}

        {/* Tab: Full Flow Table (INPUT / OUTPUT) */}
        {activeTab === 'flow' && (
          <div className="space-y-6">
            <CurriculumOverviewTable />
            <ToolsMatrixView />
          </div>
        )}

        {/* Tab 3: Standalone Simulator view */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <BreakoutArchitectureSimulator />
          </div>
        )}

        {/* Tab 4: Evaluation Checklist */}
        {activeTab === 'evaluation' && (
          <div className="space-y-6">
            <EvaluationChecklistModal
              evaluations={progress.evaluations || {}}
              onToggleItem={handleToggleEvaluationItem}
              onReset={() => setProgress(prev => ({ ...prev, evaluations: {} }))}
              userName={progress.userName}
            />
          </div>
        )}

        {/* Tab 5: Tools Matrix view */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <ToolsMatrixView />
          </div>
        )}

        {/* Tab 6: Standalone HTML Exporter */}
        {activeTab === 'standalone' && (
          <div className="space-y-6">
            <StandaloneHtmlExporter />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            AI駆動型システム開発 総合演習テキスト（Breakout Python GUI開発）
          </div>
          <div>
            Google AI Studio × Antigravity Desktop × Antigravity IDE
          </div>
        </div>
      </footer>
    </div>
  );
}
