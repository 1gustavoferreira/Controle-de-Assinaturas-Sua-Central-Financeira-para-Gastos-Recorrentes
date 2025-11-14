
import React from 'react';
import { CurrencyIcon } from './icons/CurrencyIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface SummaryProps {
  monthlyTotal: number;
  yearlyTotal: number;
}

const SummaryCard: React.FC<{ title: string; amount: number; icon: React.ReactNode }> = ({ title, amount, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-start gap-4 transform transition-transform hover:scale-105 hover:shadow-xl">
        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-800">
                R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </div>
    </div>
);


const Summary: React.FC<SummaryProps> = ({ monthlyTotal, yearlyTotal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SummaryCard title="Custo Mensal Total" amount={monthlyTotal} icon={<CurrencyIcon />} />
      <SummaryCard title="Custo Anual Total" amount={yearlyTotal} icon={<CalendarIcon />} />
    </div>
  );
};

export default Summary;
