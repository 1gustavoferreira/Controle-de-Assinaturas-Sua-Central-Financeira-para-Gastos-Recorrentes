import React from 'react';
import { Subscription, BillingCycle, Category } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface SubscriptionItemProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

const categoryColors: { [key in Category]: string } = {
  [Category.STREAMING]: 'bg-blue-100 text-blue-800',
  [Category.SOFTWARE]: 'bg-indigo-100 text-indigo-800',
  [Category.MUSICA]: 'bg-pink-100 text-pink-800',
  [Category.JOGOS]: 'bg-green-100 text-green-800',
  [Category.NOTICIAS]: 'bg-amber-100 text-amber-800',
  [Category.OUTRO]: 'bg-slate-200 text-slate-800',
};

const calculateNextBillingDate = (startDateStr: string, cycle: BillingCycle): string => {
  const startDate = new Date(startDateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let nextDate = new Date(startDate);

  if (cycle === BillingCycle.MONTHLY) {
    while (nextDate < today) {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
  } else { // Yearly
    while (nextDate < today) {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    }
  }

  return nextDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({ subscription, onEdit, onDelete }) => {
  const { id, name, cost, billingCycle, startDate, category } = subscription;
  const nextBillingDate = calculateNextBillingDate(startDate, billingCycle);

  const cycleColor = billingCycle === BillingCycle.MONTHLY ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-md hover:border-indigo-300 transition-all duration-300 bg-slate-50/50">
      <div className="flex-1 mb-4 sm:mb-0">
        <div className="flex items-center gap-3">
            <p className="text-lg font-semibold text-slate-800">{name}</p>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[category]}`}>{category}</span>
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
          <span>Próximo Vencimento: {nextBillingDate}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cycleColor}`}>{billingCycle}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <p className="text-lg font-bold text-indigo-600 flex-grow sm:flex-grow-0">
          R$ {cost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-2">
            <button onClick={() => onEdit(subscription)} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-200 rounded-full transition-colors">
                <EditIcon />
            </button>
            <button onClick={() => onDelete(id)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-200 rounded-full transition-colors">
                <TrashIcon />
            </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionItem;