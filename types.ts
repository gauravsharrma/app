import React from 'react';

export type AppId = 'markdown' | 'converter' | 'notes';

export interface AppInfo { 
  id: AppId; 
  name: string; 
  icon: React.ReactNode; 
}

export interface Unit {
  name: string;
  symbol: string;
  // Factor to convert from the base unit of its category
  factor: number;
}

export interface UnitCategory {
  name: string;
  // The unit that all other factors are relative to
  baseUnit: string; 
  units: Unit[];
}

export interface Note {
  id: string;
  content: string;
  lastModified: number; // Unix timestamp
}