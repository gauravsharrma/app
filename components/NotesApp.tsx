import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { Note } from '../types';

const STORAGE_KEY = 'glassmorphism-notes-app';

const FormatButton: React.FC<{ onClick: () => void; title: string; children: React.ReactNode }> = ({ onClick, title, children }) => (
    <button
        onClick={onClick}
        title={title}
        className="w-9 h-9 flex items-center justify-center bg-black/40 rounded-md hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 font-sans text-lg"
    >
        {children}
    </button>
);


const NotesApp: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);

    // Load notes from localStorage on initial render
    useEffect(() => {
        try {
            const savedNotes = localStorage.getItem(STORAGE_KEY);
            if (savedNotes) {
                const parsedNotes = JSON.parse(savedNotes);
                setNotes(parsedNotes);
                if (parsedNotes.length > 0) {
                    setActiveNoteId(parsedNotes[0].id);
                }
            }
        } catch (error) {
            console.error("Failed to load notes from localStorage", error);
        }
    }, []);

    // Save notes to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch (error) {
            console.error("Failed to save notes to localStorage", error);
        }
    }, [notes]);
    
    // Effect to programmatically set selection after formatting
    useLayoutEffect(() => {
        if (selection && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(selection.start, selection.end);
            setSelection(null); // Reset after applying
        }
    }, [selection]);

    const filteredNotes = useMemo(() => {
        if (!searchQuery) {
            return notes;
        }
        return notes.filter(note => 
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [notes, searchQuery]);

    const activeNote = useMemo(() => {
        return notes.find(note => note.id === activeNoteId) || null;
    }, [notes, activeNoteId]);

    const handleNewNote = () => {
        const newNote: Note = {
            id: `note-${Date.now()}`,
            content: `# New Note\n\nStart writing here...`,
            lastModified: Date.now(),
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setActiveNoteId(newNote.id);
        setSearchQuery(''); // Clear search to show the new note
    };

    const handleDeleteNote = (idToDelete: string) => {
        setNotes(prevNotes => {
            const newNotes = prevNotes.filter(note => note.id !== idToDelete);
            if (activeNoteId === idToDelete) {
                setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null);
            }
            return newNotes;
        });
    };

    const handleUpdateNoteContent = (content: string) => {
        if (!activeNoteId) return;
        const now = Date.now();
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === activeNoteId ? { ...note, content, lastModified: now } : note
            )
        );
    };

    const handleFormat = (formatType: 'bold' | 'italic' | 'ul' | 'ol' | 'hr') => {
        if (!textareaRef.current || !activeNote) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        const selectedText = value.substring(start, end);
        let newText;
        let newStart;
        let newEnd;

        switch (formatType) {
            case 'bold':
            case 'italic': {
                const prefix = formatType === 'bold' ? '**' : '*';
                const placeholder = selectedText || formatType;
                newText = `${value.substring(0, start)}${prefix}${placeholder}${prefix}${value.substring(end)}`;
                newStart = start + prefix.length;
                newEnd = newStart + placeholder.length;
                break;
            }
            case 'ul':
            case 'ol': {
                const linePrefix = formatType === 'ul' ? '- ' : '1. ';
                const lineStartIndex = value.lastIndexOf('\n', start - 1) + 1;

                if (value.substring(lineStartIndex, lineStartIndex + linePrefix.length) === linePrefix) {
                    newText = `${value.substring(0, lineStartIndex)}${value.substring(lineStartIndex + linePrefix.length)}`;
                    newStart = Math.max(lineStartIndex, start - linePrefix.length);
                    newEnd = Math.max(lineStartIndex, end - linePrefix.length);
                } else {
                    newText = `${value.substring(0, lineStartIndex)}${linePrefix}${value.substring(lineStartIndex)}`;
                    newStart = start + linePrefix.length;
                    newEnd = end + linePrefix.length;
                }
                break;
            }
            case 'hr': {
                const lineStartIndex = value.lastIndexOf('\n', start - 1) + 1;
                const currentLine = value.substring(lineStartIndex, value.indexOf('\n', lineStartIndex) === -1 ? value.length : value.indexOf('\n', lineStartIndex));
                const hrText = (currentLine.trim() === '' ? '' : '\n') + '---\n';
                newText = `${value.substring(0, start)}${hrText}${value.substring(end)}`;
                newStart = newEnd = start + hrText.length;
                break;
            }
            default: return;
        }

        handleUpdateNoteContent(newText);
        setSelection({ start: newStart, end: newEnd });
    };

    const handleDownload = () => {
        if (notes.length === 0) {
            alert("There are no notes to download.");
            return;
        }
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `notes_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        
        setNotes([]);
        setActiveNoteId(null);
        alert("Notes downloaded and cleared from this device.");
    };
    
    const handleLoadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result as string;
                const loadedNotes = JSON.parse(text);
                if (Array.isArray(loadedNotes) && (loadedNotes.length === 0 || loadedNotes.every(n => 'id' in n && 'content' in n && 'lastModified' in n))) {
                    setNotes(loadedNotes);
                    setActiveNoteId(loadedNotes.length > 0 ? loadedNotes[0].id : null);
                    alert("Notes loaded successfully!");
                } else {
                    throw new Error("Invalid file format.");
                }
            } catch (error) {
                console.error("Failed to load notes:", error);
                alert("Failed to load notes. The file might be corrupted or in the wrong format.");
            }
        };
        reader.readAsText(file);
        if (e.target) e.target.value = '';
    };

    return (
        <div className="flex h-full text-white">
            <aside className="w-1/3 min-w-[300px] flex flex-col bg-black/10 border-r border-white/10">
                <div className="p-4 border-b border-white/10 flex-shrink-0">
                    <button onClick={handleNewNote} className="w-full text-center p-3 rounded-lg bg-purple-600/50 hover:bg-purple-600/80 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400">
                        New Note
                    </button>
                    <div className="flex space-x-2 mt-2">
                        <button onClick={handleLoadClick} className="w-full text-center p-2 rounded-lg bg-black/40 hover:bg-white/20 transition-all duration-200 text-sm">Load</button>
                        <button onClick={handleDownload} className="w-full text-center p-2 rounded-lg bg-black/40 hover:bg-white/20 transition-all duration-200 text-sm">Download & Clear</button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 bg-black/50 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
                        />
                    </div>
                </div>
                <div className="overflow-y-auto">
                    {filteredNotes.map(note => (
                        <div
                            key={note.id}
                            onClick={() => setActiveNoteId(note.id)}
                            className={`p-4 border-b border-white/10 cursor-pointer transition-colors duration-200 ${activeNoteId === note.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold truncate pr-2">{(note.content.split('\n')[0] || "New Note").replace(/#/g, '')}</h3>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }} className="text-red-400/70 hover:text-red-400 text-xs flex-shrink-0">Delete</button>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{new Date(note.lastModified).toLocaleString()}</p>
                        </div>
                    ))}
                    {filteredNotes.length === 0 && (
                        <p className="p-4 text-center text-gray-400">
                           {searchQuery ? 'No notes match your search.' : 'No notes yet.'}
                        </p>
                    )}
                </div>
            </aside>
            <main className="w-2/3 flex flex-col">
                {activeNote ? (
                    <>
                        <div className="flex-shrink-0 p-2 border-b border-white/10 bg-black/20">
                            <div className="flex items-center space-x-2">
                                <FormatButton onClick={() => handleFormat('bold')} title="Bold"><b>B</b></FormatButton>
                                <FormatButton onClick={() => handleFormat('italic')} title="Italic"><i>I</i></FormatButton>
                                <FormatButton onClick={() => handleFormat('ul')} title="Bulleted List">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                </FormatButton>
                                <FormatButton onClick={() => handleFormat('ol')} title="Numbered List">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>
                                </FormatButton>
                                <FormatButton onClick={() => handleFormat('hr')} title="Horizontal Line">&mdash;</FormatButton>
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col p-1">
                            <textarea
                                ref={textareaRef}
                                value={activeNote.content}
                                onChange={(e) => handleUpdateNoteContent(e.target.value)}
                                className="w-full h-full p-4 bg-black/30 text-white rounded-lg border border-transparent focus:outline-none focus:ring-0 font-mono resize-none"
                                placeholder="Your note content..."
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-gray-400">
                        <p>Select a note to view or create a new one.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NotesApp;