import React from 'react';
import { Category } from '../types';
import { ChartPieIcon } from './icons/ChartPieIcon';

interface ChartData {
  name: Category;
  value: number;
}

interface CategoryChartProps {
  data: ChartData[];
  total: number;
}

const categoryColors: { [key in Category]: string } = {
  [Category.STREAMING]: '#3b82f6', // blue-500
  [Category.SOFTWARE]: '#6366f1', // indigo-500
  [Category.MUSICA]: '#ec4899', // pink-500
  [Category.JOGOS]: '#22c55e', // green-500
  [Category.NOTICIAS]: '#f59e0b', // amber-500
  [Category.OUTRO]: '#64748b', // slate-500
};

const DonutChart: React.FC<{ data: ChartData[], total: number }> = ({ data, total }) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const radius = 80;
  const strokeWidth = 25;
  const innerRadius = radius - strokeWidth;
  const circumference = 2 * Math.PI * innerRadius;
  let accumulatedPercent = 0;

  if (total === 0) return null;

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90 transform">
      <circle
        cx="100"
        cy="100"
        r={innerRadius}
        fill="transparent"
        stroke="#e2e8f0" // slate-200
        strokeWidth={strokeWidth}
      />
      {sortedData.map(({ name, value }) => {
        const percent = value / total;
        const strokeDashoffset = circumference * (1 - percent);
        const rotation = accumulatedPercent * 360;
        accumulatedPercent += percent;

        return (
          <circle
            key={name}
            cx="100"
            cy="100"
            r={innerRadius}
            fill="transparent"
            stroke={categoryColors[name]}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50% 50%' }}
            className="transition-all duration-500"
          />
        );
      })}
    </svg>
  );
};


const CategoryChart: React.FC<CategoryChartProps> = ({ data, total }) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  return (
    <div className="mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <ChartPieIcon />
        <h2 className="text-2xl font-bold text-slate-700">Gastos por Categoria</h2>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
        <div className="relative flex-shrink-0 flex justify-center items-center">
          <DonutChart data={data} total={total} />
           <div className="absolute flex flex-col items-center justify-center">
                <span className="text-slate-500 text-sm">Custo Mensal</span>
                <span className="text-2xl font-bold text-slate-800">
                    R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>
        </div>
        <div className="w-full sm:w-auto space-y-2">
          {sortedData.map(({ name, value }) => (
            <div key={name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: categoryColors[name] }}></span>
                <span className="text-slate-600">{name}</span>
              </div>
              <div className="font-semibold text-slate-700">
                <span>R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className="ml-2 text-slate-400 font-normal">({((value / total) * 100).toFixed(0)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
