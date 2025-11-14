import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Subscription, BillingCycle, Category } from './types';
import Header from './components/Header';
import Summary from './components/Summary';
import SubscriptionList from './components/SubscriptionList';
import SubscriptionModal from './components/SubscriptionModal';
import CategoryChart from './components/CategoryChart';
import { PlusIcon } from './components/icons/PlusIcon';

const LOCAL_STORAGE_KEY = 'subscriptionsApp.subscriptions';

const initialSubscriptions: Subscription[] = [];

const calculateNextBillingDate = (startDateStr: string, cycle: BillingCycle): Date => {
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
  return nextDate;
};


const App: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    try {
      const storedSubscriptions = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedSubscriptions ? JSON.parse(storedSubscriptions) : initialSubscriptions;
    } catch (error) {
      console.error("Erro ao ler dados do localStorage", error);
      return initialSubscriptions;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subscriptions));
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage", error);
    }
  }, [subscriptions]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [sortBy, setSortBy] = useState('name-asc');

  const handleOpenModal = useCallback((subscription?: Subscription) => {
    setEditingSubscription(subscription || null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingSubscription(null);
    setIsModalOpen(false);
  }, []);

  const handleSaveSubscription = useCallback((subscription: Omit<Subscription, 'id'>) => {
    if (editingSubscription) {
      setSubscriptions(prev => prev.map(s => s.id === editingSubscription.id ? { ...subscription, id: s.id } : s));
    } else {
      setSubscriptions(prev => [...prev, { ...subscription, id: new Date().getTime().toString() }]);
    }
    handleCloseModal();
  }, [editingSubscription, handleCloseModal]);

  const handleDeleteSubscription = useCallback((id: string) => {
    const subToDelete = subscriptions.find(s => s.id === id);
    if (subToDelete && window.confirm(`Você tem certeza que deseja excluir a assinatura "${subToDelete.name}"?`)) {
      setSubscriptions(prev => prev.filter(s => s.id !== id));
    }
  }, [subscriptions]);

  const sortedSubscriptions = useMemo(() => {
    const sorted = [...subscriptions];
    switch (sortBy) {
        case 'cost-desc':
            sorted.sort((a, b) => {
                const costA = a.billingCycle === BillingCycle.MONTHLY ? a.cost * 12 : a.cost;
                const costB = b.billingCycle === BillingCycle.MONTHLY ? b.cost * 12 : b.cost;
                return costB - costA;
            });
            break;
        case 'date-asc':
            sorted.sort((a, b) => {
                const dateA = calculateNextBillingDate(a.startDate, a.billingCycle).getTime();
                const dateB = calculateNextBillingDate(b.startDate, b.billingCycle).getTime();
                return dateA - dateB;
            });
            break;
        case 'name-asc':
        default:
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    return sorted;
  }, [subscriptions, sortBy]);

  const { monthlyTotal, yearlyTotal, categoryData } = useMemo(() => {
    const totals = {
      monthlyTotal: 0,
      yearlyTotal: 0,
    };
    const categoryCosts: { [key in Category]?: number } = {};

    subscriptions.forEach(sub => {
      const monthlyCost = sub.billingCycle === BillingCycle.MONTHLY ? sub.cost : sub.cost / 12;
      totals.monthlyTotal += monthlyCost;
      totals.yearlyTotal += sub.billingCycle === BillingCycle.MONTHLY ? sub.cost * 12 : sub.cost;
      
      if (!categoryCosts[sub.category]) {
        categoryCosts[sub.category] = 0;
      }
      categoryCosts[sub.category]! += monthlyCost;
    });
    
    const chartData = Object.entries(categoryCosts).map(([name, value]) => ({
      name: name as Category,
      value: value || 0,
    }));

    return { ...totals, categoryData: chartData };
  }, [subscriptions]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Summary monthlyTotal={monthlyTotal} yearlyTotal={yearlyTotal} />
        
        {subscriptions.length > 0 && <CategoryChart data={categoryData} total={monthlyTotal} />}

        <div className="mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-700">Minhas Assinaturas</h2>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex-grow sm:flex-grow-0">
                  <label htmlFor="sort" className="sr-only">Ordenar por</label>
                  <select 
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2"
                  >
                      <option value="name-asc">Nome (A-Z)</option>
                      <option value="cost-desc">Custo (Maior primeiro)</option>
                      <option value="date-asc">Próximo Vencimento</option>
                  </select>
              </div>
              <button
                onClick={() => handleOpenModal()}
                className="flex-shrink-0 flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
              >
                <PlusIcon />
                <span>Adicionar</span>
              </button>
            </div>
          </div>
          <SubscriptionList 
            subscriptions={sortedSubscriptions}
            onEdit={handleOpenModal}
            onDelete={handleDeleteSubscription}
          />
        </div>
      </main>
      {isModalOpen && (
        <SubscriptionModal
          onClose={handleCloseModal}
          onSave={handleSaveSubscription}
          subscription={editingSubscription}
        />
      )}
    </div>
  );
};

export default App;