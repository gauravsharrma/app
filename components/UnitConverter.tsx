
import React, { useState, useMemo } from 'react';
import { UNIT_CATEGORIES } from '../constants';

const GlassSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select
    {...props}
    className="w-full p-3 bg-black/30 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
  />
);

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState(UNIT_CATEGORIES[0].name);
  const selectedCategory = UNIT_CATEGORIES.find(c => c.name === category)!;

  const [fromUnit, setFromUnit] = useState(selectedCategory.units[0].name);
  const [toUnit, setToUnit] = useState(selectedCategory.units[1].name);
  const [inputValue, setInputValue] = useState<string>('1');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryName = e.target.value;
    const newCategory = UNIT_CATEGORIES.find(c => c.name === newCategoryName)!;
    setCategory(newCategoryName);
    setFromUnit(newCategory.units[0].name);
    setToUnit(newCategory.units[1].name);
    setInputValue('1');
  };
  
  const outputValue = useMemo(() => {
    const inputNum = parseFloat(inputValue);
    if (isNaN(inputNum)) return '';

    const from = selectedCategory.units.find(u => u.name === fromUnit)!;
    const to = selectedCategory.units.find(u => u.name === toUnit)!;

    if (category === 'Temperature') {
        if (from.name === to.name) return inputNum;
        // Celsius to Fahrenheit
        if (from.name === 'Celsius' && to.name === 'Fahrenheit') return (inputNum * 9/5) + 32;
        // Celsius to Kelvin
        if (from.name === 'Celsius' && to.name === 'Kelvin') return inputNum + 273.15;
        // Fahrenheit to Celsius
        if (from.name === 'Fahrenheit' && to.name === 'Celsius') return (inputNum - 32) * 5/9;
        // Fahrenheit to Kelvin
        if (from.name === 'Fahrenheit' && to.name === 'Kelvin') return ((inputNum - 32) * 5/9) + 273.15;
        // Kelvin to Celsius
        if (from.name === 'Kelvin' && to.name === 'Celsius') return inputNum - 273.15;
        // Kelvin to Fahrenheit
        if (from.name === 'Kelvin' && to.name === 'Fahrenheit') return ((inputNum - 273.15) * 9/5) + 32;
    }

    const valueInBaseUnit = inputNum * from.factor;
    const result = valueInBaseUnit / to.factor;

    return Number(result.toPrecision(6));
  }, [inputValue, fromUnit, toUnit, category, selectedCategory]);
  
  return (
    <div className="flex flex-col h-full p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Unit Converter</h2>
      <div className="space-y-6 max-w-2xl mx-auto w-full p-8 bg-black/20 rounded-xl border border-white/10 shadow-lg">
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <GlassSelect value={category} onChange={handleCategoryChange}>
            {UNIT_CATEGORIES.map(cat => (
              <option key={cat.name} value={cat.name} className="bg-purple-800">{cat.name}</option>
            ))}
          </GlassSelect>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block mb-2 font-semibold">From</label>
              <GlassSelect value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                {selectedCategory.units.map(unit => (
                  <option key={unit.name} value={unit.name} className="bg-purple-800">{unit.name} ({unit.symbol})</option>
                ))}
              </GlassSelect>
            </div>
            <div>
              <label className="block mb-2 font-semibold">To</label>
              <GlassSelect value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                {selectedCategory.units.map(unit => (
                  <option key={unit.name} value={unit.name} className="bg-purple-800">{unit.name} ({unit.symbol})</option>
                ))}
              </GlassSelect>
            </div>
        </div>

        <div>
            <label htmlFor="input-value" className="block mb-2 font-semibold">Value to Convert</label>
            <input
                id="input-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-3 bg-black/30 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
        </div>

        <div className="text-center pt-4">
            <p className="text-lg text-gray-300">Result</p>
            <p className="text-4xl font-bold text-purple-300 break-words">{outputValue}</p>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
