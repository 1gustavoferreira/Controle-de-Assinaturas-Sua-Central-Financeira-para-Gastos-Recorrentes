import React, { useState, useEffect } from 'react';
import { Subscription, BillingCycle, Category } from '../types';
import { XIcon } from './icons/XIcon';

interface SubscriptionModalProps {
  onClose: () => void;
  onSave: (subscription: Omit<Subscription, 'id'>) => void;
  subscription: Subscription | null;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose, onSave, subscription }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY);
  const [startDate, setStartDate] = useState('');
  const [category, setCategory] = useState<Category>(Category.OUTRO);
  const [error, setError] = useState('');

  useEffect(() => {
    if (subscription) {
      setName(subscription.name);
      setCost(subscription.cost.toString());
      setBillingCycle(subscription.billingCycle);
      setStartDate(subscription.startDate);
      setCategory(subscription.category);
    } else {
        // Set default start date to today
        setStartDate(new Date().toISOString().split('T')[0]);
    }
  }, [subscription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const costValue = parseFloat(cost);
    if (!name || isNaN(costValue) || costValue <= 0 || !startDate) {
        setError('Por favor, preencha todos os campos com valores válidos.');
        return;
    }
    setError('');
    onSave({ name, cost: costValue, billingCycle, startDate, category });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <XIcon />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{subscription ? 'Editar Assinatura' : 'Nova Assinatura'}</h2>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Nome do Serviço</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Netflix, Spotify" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="cost" className="block text-sm font-medium text-slate-600 mb-1">Custo (R$)</label>
                <input type="number" id="cost" value={cost} onChange={e => setCost(e.target.value)} placeholder="Ex: 39.90" step="0.01" min="0" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-600 mb-1">Categoria</label>
                <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
          </div>
          <div>
            <label htmlFor="billingCycle" className="block text-sm font-medium text-slate-600 mb-1">Ciclo de Pagamento</label>
            <select id="billingCycle" value={billingCycle} onChange={e => setBillingCycle(e.target.value as BillingCycle)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              <option value={BillingCycle.MONTHLY}>Mensal</option>
              <option value={BillingCycle.YEARLY}>Anual</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-slate-600 mb-1">Data de Início/Primeiro Pagamento</label>
            <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors">Cancelar</button>
            <button type="submit" className="py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal;