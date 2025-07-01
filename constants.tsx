import React from 'react';
import { AppInfo, UnitCategory } from './types';
import MarkdownIcon from './components/icons/MarkdownIcon';
import ConverterIcon from './components/icons/ConverterIcon';
import NotesIcon from './components/icons/NotesIcon';
import PromptGeneratorIcon from './components/icons/PromptGeneratorIcon';

export const APPS: AppInfo[] = [
  { id: 'prompt-generator', name: 'Prompt Generator', icon: <PromptGeneratorIcon /> },
  { id: 'markdown', name: 'Markdown Reader', icon: <MarkdownIcon /> },
  { id: 'converter', name: 'Unit Converter', icon: <ConverterIcon /> },
  { id: 'notes', name: 'Notes', icon: <NotesIcon /> },
];

export const PROMPT_SETTINGS = [
    { name: 'Instruction', options: ['Write', 'Explain', 'Translate', 'Summarize', 'Fix', 'Generate ideas', 'Continue', 'Rewrite'] },
    { name: 'Role/Persona', options: ['Teacher', 'Lawyer', 'UX Designer', 'Developer', 'Coach', 'Marketer', 'AI Agent', 'Consultant'] },
    { name: 'Tone', options: ['Friendly', 'Professional', 'Neutral', 'Empathetic', 'Witty', 'Academic', 'Bold', 'Critical'] },
    { name: 'Style', options: ['Bullet points', 'Step-by-step', 'Numbered list', 'Essay', 'Conversational', 'Visual-rich', 'Concise', 'Detailed'] },
    { name: 'Format', options: ['Plain text', 'Markdown', 'HTML', 'JSON', 'CSV', 'Code block', 'Table', 'Diagram'] },
    { name: 'Length', options: ['Very short', 'Short', 'Medium', 'Long', 'Exhaustive', '', '', ''] },
    { name: 'Audience', options: ['Children', 'Grade 5', 'Beginners', 'Professionals', 'Investors', '', '', ''] },
    { name: 'Language Level', options: ['Simple English', 'Business English', 'Technical', 'Layman', 'Poetic', 'Dramatic', '', ''] },
    { name: 'Creativity', options: ['Factual', 'Balanced', 'Creative', 'Funny', 'Poetic', 'Dramatic', '', ''] },
    { name: 'Response Format', options: ['List', 'Table', 'Paragraph', 'JSON', 'YAML', 'Code block', 'Diagram', 'Markdown'] },
    { name: 'Response Purpose', options: ['Education', 'Entertainment', 'Business', 'Technical documentation', 'Copywriting', 'Research', 'Support', ''] },
    { name: 'Output Focus', options: ['Accuracy', 'Clarity', 'Persuasion', 'Simplicity', 'Depth', 'Speed', 'Completeness', ''] },
    { name: 'Answer Voice', options: ['First-person', 'Third-person', 'Character voice', 'Neutral', 'Brand tone', 'Expert tone', 'Narrative style', ''] },
    { name: 'Constraints', options: ['Word limit', 'No passive voice', 'Include citations', 'Use short sentences', 'Formal grammar', 'Include emojis', 'Avoid jargon', 'Summarized bullets'] },
    { name: 'Output Variation', options: ['One best answer', 'Multiple versions', 'Comparison table', 'Pros & cons', 'Ranked list', 'Scenarios', 'Summarized bullets', ''] },
    { name: 'Target Device', options: ['Mobile-first', 'Desktop', 'Print-ready', 'Voice assistant', 'Presentation slide', 'Chat UI', 'Embedded widget', ''] },
    { name: 'Language Output', options: ['English', 'Arabic', 'Hindi', 'Spanish', 'Multilingual', 'Hinglish', 'French', 'Chinese'] },
    { name: 'Logic Level', options: ['Basic reasoning', 'Intermediate logic', 'Complex analysis', 'Deductive logic', 'Inductive reasoning', 'Chain-of-thought', 'Step-by-step logic', 'No logic needed'] },
    { name: 'Response Style', options: ['Direct answer', 'Socratic questioning', 'Analogies', 'Examples', 'Metaphors', 'Storytelling', 'Visual explanation', 'Contrasts'] },
    { name: 'Feedback Mode', options: ['Critique', 'Suggest improvements', 'Highlight errors', 'Praise strengths', 'Give score', 'Provide rubric', 'Ask questions', 'Auto-correct mistakes'] },
    { name: 'Engagement Style', options: ['Conversational', 'Formal', 'Interactive', 'Quiz-style', 'Role-play', 'Call to action', 'Challenge question', 'Guided journey'] },
    { name: 'Time Context', options: ['Past-focused', 'Present-day relevance', 'Future trends', 'Timeless', 'Historical comparison', '2020s-specific', 'Future predictions', 'Real-time analysis'] },
    { name: 'Cultural Tone', options: ['Western', 'Eastern', 'Middle Eastern', 'Global neutral', 'Youth-friendly', 'Traditional', 'Urban-modern', 'Rural-simple'] },
    { name: 'Cognitive Style', options: ['Visual', 'Verbal', 'Logical', 'Kinesthetic', 'Intuitive', 'Analytical', 'Creative', 'Reflective'] },
    { name: 'Ethical Filter', options: ['Strict neutrality', 'Value-sensitive', 'Inclusive language', 'Gender-neutral', 'Child-safe', 'Non-political', 'Brand-safe', 'Religious-neutral'] },
];

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    name: 'Length',
    baseUnit: 'Meter',
    units: [
      { name: 'Meter', symbol: 'm', factor: 1 },
      { name: 'Kilometer', symbol: 'km', factor: 1000 },
      { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 },
      { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { name: 'Mile', symbol: 'mi', factor: 1609.34 },
    ],
  },
  {
    name: 'Mass',
    baseUnit: 'Kilogram',
    units: [
      { name: 'Kilogram', symbol: 'kg', factor: 1 },
      { name: 'Gram', symbol: 'g', factor: 0.001 },
      { name: 'Milligram', symbol: 'mg', factor: 1e-6 },
      { name: 'Pound', symbol: 'lb', factor: 0.453592 },
      { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
    ],
  },
  {
    name: 'Temperature',
    baseUnit: 'Celsius',
    units: [
      { name: 'Celsius', symbol: '°C', factor: 1 },
      { name: 'Fahrenheit', symbol: '°F', factor: 1 }, // Special handling needed
      { name: 'Kelvin', symbol: 'K', factor: 1 }, // Special handling needed
    ],
  },
  {
    name: 'Time',
    baseUnit: 'Second',
    units: [
        { name: 'Second', symbol: 's', factor: 1 },
        { name: 'Minute', symbol: 'min', factor: 60 },
        { name: 'Hour', symbol: 'hr', factor: 3600 },
        { name: 'Day', symbol: 'd', factor: 86400 },
        { name: 'Week', symbol: 'wk', factor: 604800 },
    ]
  }
];