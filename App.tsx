import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MarkdownReader from './components/MarkdownReader';
import UnitConverter from './components/UnitConverter';
import NotesApp from './components/NotesApp';
import PromptGenerator from './components/PromptGenerator';
import { AppId } from './types';

const App: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppId>('prompt-generator');

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'prompt-generator':
        return <PromptGenerator />;
      case 'markdown':
        return <MarkdownReader />;
      case 'converter':
        return <UnitConverter />;
      case 'notes':
        return <NotesApp />;
      default:
        return <PromptGenerator />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <main className="w-full max-w-screen-2xl h-[90vh] flex bg-black/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <aside className="w-1/5 min-w-[250px] bg-black/10 border-r border-white/10">
          <Sidebar activeApp={activeApp} setActiveApp={setActiveApp} />
        </aside>
        <section className="w-4/5 h-full overflow-y-auto">
          {renderActiveApp()}
        </section>
      </main>
    </div>
  );
};

export default App;
