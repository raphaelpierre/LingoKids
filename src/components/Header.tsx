import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../hooks/useTranslation';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { DialectSelector } from './DialectSelector';
import { ProfileButton } from './ProfileButton';
import { NavigationSection } from '../hooks/useNavigation';

interface HeaderProps {
  onNavigate: (section: NavigationSection) => void;
  currentSection: NavigationSection;
}

export function Header({ onNavigate, currentSection }: HeaderProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (section: NavigationSection) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    handleNavigation('words');
  };

  const NavLink = ({ section }: { section: NavigationSection }) => (
    <button
      onClick={() => handleNavigation(section)}
      className={`hover:text-emerald-200 transition-colors ${
        currentSection === section ? 'text-emerald-200' : ''
      }`}
    >
      {t(`header.${section}`)}
    </button>
  );

  return (
    <header className="bg-emerald-600 text-white p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Logo />
            <h1 className="text-xl md:text-2xl font-bold">LingoKids</h1>
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6">
              <li><NavLink section="words" /></li>
              <li><NavLink section="games" /></li>
              <li><NavLink section="progress" /></li>
              <li><NavLink section="profile" /></li>
            </ul>
            <div className="flex items-center gap-4">
              <DialectSelector />
              <LanguageSelector />
              <ProfileButton />
            </div>
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 border-t border-emerald-500 pt-4">
            <ul className="flex flex-col gap-4">
              <li><NavLink section="words" /></li>
              <li><NavLink section="games" /></li>
              <li><NavLink section="progress" /></li>
              <li><NavLink section="profile" /></li>
              <li className="flex flex-col gap-2">
                <DialectSelector className="w-full" />
                <LanguageSelector className="w-full justify-center" />
                <ProfileButton />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}