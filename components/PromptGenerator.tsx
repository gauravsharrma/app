
import React, { useState, useMemo } from 'react';
import { PROMPT_SETTINGS } from '../constants';

// Reusable select component for consistent styling
// Moved outside the main component for performance and clarity.
const GlassSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select
    {...props}
    className="w-full p-2 bg-black/30 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none text-sm"
  />
);

const PromptGenerator: React.FC = () => {
    // Start with no selections.
    const [selections, setSelections] = useState<{ [key: string]: string }>({});
    const [useMemory, setUseMemory] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState('');

    const handleSelectionChange = (settingName: string, value: string) => {
        setSelections(prev => ({ ...prev, [settingName]: value }));
    };

    const generatedPrompt = useMemo(() => {
        const mainPrompt = PROMPT_SETTINGS
            .map(setting => {
                const selectedValue = selections[setting.name];
                // Only include the line if a value is selected and it's not empty
                if (selectedValue) {
                    return `${setting.name}: ${selectedValue}`;
                }
                return null;
            })
            .filter(Boolean) // Remove any null entries
            .join('\n');
        
        if (useMemory) {
            const memoryLine = `Use memory: ${useMemory === 'YES' ? 'YES' : 'NO – start fresh'}`;
            return mainPrompt ? `${mainPrompt}\n${memoryLine}` : memoryLine;
        }

        return mainPrompt;
    }, [selections, useMemory]);

    const handleCopy = () => {
        if (!generatedPrompt) return;
        navigator.clipboard.writeText(generatedPrompt).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const memoryButtonClass = (value: string) => 
        `px-4 py-2 rounded-lg transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm flex-grow ${
            useMemory === value
            ? 'bg-purple-600/80'
            : 'bg-black/30 hover:bg-white/20'
        }`;

    return (
        <div className="flex flex-col h-full text-white">
            <h2 className="text-3xl font-bold p-6 flex-shrink-0">Prompt Generator</h2>
            <div className="flex-grow flex flex-col lg:flex-row gap-6 p-6 pt-0 overflow-y-auto">
                {/* Left Side: Controls */}
                <div className="lg:w-1/2 flex flex-col flex-shrink-0">
                    <div className="overflow-y-auto pr-3">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {PROMPT_SETTINGS.map(setting => {
                                const validOptions = setting.options.filter(opt => opt.trim() !== '');
                                if (validOptions.length === 0) return null; // Don't render if no options
                                
                                return (
                                    <div key={setting.name}>
                                        <label className="block mb-1.5 text-sm font-semibold text-gray-300">{setting.name}</label>
                                        <GlassSelect
                                            value={selections[setting.name] || ''}
                                            onChange={(e) => handleSelectionChange(setting.name, e.target.value)}
                                        >
                                            <option value="" disabled>Select an option...</option>
                                            {validOptions.map(option => (
                                                <option key={option} value={option} className="bg-purple-800">{option}</option>
                                            ))}
                                        </GlassSelect>
                                    </div>
                                );
                            })}
                             {/* Memory selection */}
                            <div className="md:col-span-2 mt-2">
                                <label className="block mb-1.5 text-sm font-semibold text-gray-300">Use memory</label>
                                <div className="flex space-x-2">
                                    <button onClick={() => setUseMemory('YES')} className={memoryButtonClass('YES')}>
                                        YES
                                    </button>
                                    <button onClick={() => setUseMemory('NO')} className={memoryButtonClass('NO')}>
                                        NO – start fresh
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Output */}
                <div className="lg:w-1/2 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <label className="text-white font-semibold block">Generated Prompt</label>
                        <button
                            onClick={handleCopy}
                            disabled={!generatedPrompt}
                            className="px-4 py-2 rounded-lg bg-purple-600/50 hover:bg-purple-600/80 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm disabled:bg-gray-500/30 disabled:cursor-not-allowed"
                        >
                            {copySuccess || 'Copy'}
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={generatedPrompt}
                        className="w-full h-full flex-grow p-4 bg-black/30 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono text-sm resize-none"
                        placeholder="Select options to generate the prompt..."
                    />
                </div>
            </div>
        </div>
    );
};

export default PromptGenerator;
