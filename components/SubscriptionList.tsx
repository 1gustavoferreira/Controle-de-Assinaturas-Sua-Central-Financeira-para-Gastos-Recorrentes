import React from 'react';
import { Subscription } from '../types';
import SubscriptionItem from './SubscriptionItem';

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions, onEdit, onDelete }) => {
  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
        <p className="text-slate-500">Nenhuma assinatura adicionada ainda.</p>
        <p className="text-sm text-slate-400 mt-2">Clique em "Adicionar" para começar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {subscriptions.map(sub => (
        <SubscriptionItem 
          key={sub.id} 
          subscription={sub} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default SubscriptionList;