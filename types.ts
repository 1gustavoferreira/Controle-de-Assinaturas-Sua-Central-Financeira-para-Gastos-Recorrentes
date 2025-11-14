export enum BillingCycle {
  MONTHLY = 'Mensal',
  YEARLY = 'Anual',
}

export enum Category {
  STREAMING = 'Streaming',
  SOFTWARE = 'Software',
  MUSICA = 'Música',
  JOGOS = 'Jogos',
  NOTICIAS = 'Notícias',
  OUTRO = 'Outro',
}

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingCycle: BillingCycle;
  startDate: string; // ISO date string e.g., "2023-10-27"
  category: Category;
}