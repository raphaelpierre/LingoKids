import React from 'react';
import { Category } from '../types';
import { FolderOpen } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}

export function CategorySelector({ categories, selectedCategory, onSelect }: CategorySelectorProps) {
  const { language } = useLanguage();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 px-4 md:px-0">
        <FolderOpen className="text-emerald-600" />
        <h2 className="text-xl font-bold">
          {language === 'en' ? 'Categories' : 'Catégories'}
        </h2>
      </div>
      <div className="flex flex-nowrap overflow-x-auto gap-4 px-4 md:px-0 pb-2 md:pb-0 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`
              px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap
              ${selectedCategory === category.id
                ? 'bg-emerald-600 text-white'
                : 'bg-white hover:bg-emerald-50'
              }
            `}
          >
            {language === 'en' ? category.name : category.nameFr}
          </button>
        ))}
      </div>
    </div>
  );
}