import React from 'react';
import { AppInfo, UnitCategory } from './types';
import MarkdownIcon from './components/icons/MarkdownIcon';
import ConverterIcon from './components/icons/ConverterIcon';
import NotesIcon from './components/icons/NotesIcon';

export const APPS: AppInfo[] = [
  { id: 'markdown', name: 'Markdown Reader', icon: <MarkdownIcon /> },
  { id: 'converter', name: 'Unit Converter', icon: <ConverterIcon /> },
  { id: 'notes', name: 'Notes', icon: <NotesIcon /> },
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