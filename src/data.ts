export type Category = 'Tudo' | 'Básico' | 'Sentimentos' | 'Saúde' | 'Ações' | 'Escola' | 'Pessoas' | 'Personalizados';

export interface PECItem {
  id: string;
  label: string;
  category: Exclude<Category, 'Tudo'>;
  iconName?: string; // Opcional se houver imagem
  imageUrl?: string; // Para imagens carregadas pelo usuário
  audioUrl?: string; // Para áudio gravado pelo usuário
  color: string;
}

export const PECS_DATA: PECItem[] = [
  // Básico
  { id: 'comer', label: 'Comer', category: 'Básico', iconName: 'Utensils', color: '#4ade80' },
  { id: 'beber', label: 'Beber', category: 'Básico', iconName: 'Coffee', color: '#60a5fa' },
  { id: 'banheiro', label: 'Banheiro', category: 'Básico', iconName: 'Bath', color: '#fbbf24' },
  { id: 'casa', label: 'Casa', category: 'Básico', iconName: 'Home', color: '#a78bfa' },
  
  // Ações
  { id: 'brincar', label: 'Brincar', category: 'Ações', iconName: 'Gamepad2', color: '#f87171' },
  { id: 'dormir', label: 'Dormir', category: 'Ações', iconName: 'Moon', color: '#312e81' },
  { id: 'falar', label: 'Falar', category: 'Ações', iconName: 'MessageSquare', color: '#2dd4bf' },
  
  // Sentimentos
  { id: 'feliz', label: 'Feliz', category: 'Sentimentos', iconName: 'Smile', color: '#fbbf24' },
  { id: 'triste', label: 'Triste', category: 'Sentimentos', iconName: 'Frown', color: '#94a3b8' },
  { id: 'amor', label: 'Amor', category: 'Sentimentos', iconName: 'Heart', color: '#f472b6' },
  
  // Saúde
  { id: 'dor', label: 'Dor', category: 'Saúde', iconName: 'AlertTriangle', color: '#ef4444' },
  { id: 'remedio', label: 'Remédio', category: 'Saúde', iconName: 'Pill', color: '#34d399' },
  { id: 'medico', label: 'Médico', category: 'Saúde', iconName: 'Stethoscope', color: '#60a5fa' },

  // Escola
  { id: 'escola', label: 'Escola', category: 'Escola', iconName: 'School', color: '#f59e0b' },
  { id: 'lapis', label: 'Lápis', category: 'Escola', iconName: 'Pencil', color: '#ec4899' },
  { id: 'livro', label: 'Livro', category: 'Escola', iconName: 'Book', color: '#8b5cf6' },
  { id: 'mochila', label: 'Mochila', category: 'Escola', iconName: 'Backpack', color: '#06b6d4' },

  // Pessoas
  { id: 'mamae', label: 'Mamãe', category: 'Pessoas', iconName: 'User', color: '#f43f5e' },
  { id: 'papai', label: 'Papai', category: 'Pessoas', iconName: 'User', color: '#3b82f6' },
  { id: 'professor', label: 'Professor', category: 'Pessoas', iconName: 'GraduationCap', color: '#10b981' },
  { id: 'amigo', label: 'Amigo', category: 'Pessoas', iconName: 'Users', color: '#8b5cf6' },
];
