export interface SavedBook {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  subscriptionRequired: boolean;
  averageRating: number;
  savedAt: number;
}

export const saveBook = (book: SavedBook) => {
  const saved = getSavedBooks();
  const exists = saved.find(b => b.id === book.id);
  
  if (!exists) {
    saved.push({ ...book, savedAt: Date.now() });
    localStorage.setItem('savedBooks', JSON.stringify(saved));
  }
};

export const removeBook = (bookId: string) => {
  const saved = getSavedBooks();
  const filtered = saved.filter(b => b.id !== bookId);
  localStorage.setItem('savedBooks', JSON.stringify(filtered));
};

export const getSavedBooks = (): SavedBook[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('savedBooks');
  return saved ? JSON.parse(saved) : [];
};

export const isBookSaved = (bookId: string): boolean => {
  const saved = getSavedBooks();
  return saved.some(b => b.id === bookId);
};