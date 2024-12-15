import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Logo } from '../components/Logo';
import { Star, Sparkles, Brain, Trophy, Rocket, Globe2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { LandingLanguageSelector } from '../components/LandingLanguageSelector';
import { dialects } from '../data/dialects';

function FloatingDialect({ flag, name, className }: { 
  flag: string;
  name: string;
  className: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative animate-float">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl border-4 border-emerald-200">
          <div className="text-4xl mb-2">{flag}</div>
          <div className="text-sm font-medium text-emerald-700 text-center whitespace-nowrap">
            {name}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedCharacter({ emoji, className }: { emoji: string; className: string }) {
  return (
    <div className={`absolute text-5xl ${className}`}>
      <div className="animate-bounce-slow">
        {emoji}
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, className, emoji }: {
  icon: typeof Star;
  title: string;
  description: string;
  className?: string;
  emoji: string;
}) {
  return (
    <div className={`transform transition-all duration-500 hover:scale-105 ${className}`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border-4 border-emerald-200">
        <div className="relative">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Icon className="text-emerald-600" size={32} />
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
            {emoji}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-center text-emerald-700">{title}</h3>
        <p className="text-lg text-emerald-600 text-center">{description}</p>
      </div>
    </div>
  );
}

export function LandingView({ onGetStarted }: { onGetStarted: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Floating Dialects */}
      {dialects.map((dialect, index) => (
        <FloatingDialect
          key={dialect.id}
          flag={dialect.flag}
          name={dialect.name}
          className={`
            hidden lg:block
            ${index === 0 ? 'top-32 left-[10%]' : ''}
            ${index === 1 ? 'top-48 right-[15%]' : ''}
            ${index === 2 ? 'bottom-48 left-[15%]' : ''}
          `}
        />
      ))}

      {/* Fun Characters */}
      <AnimatedCharacter emoji="👧" className="top-[20%] left-[5%] animation-delay-1000" />
      <AnimatedCharacter emoji="👦" className="top-[30%] right-[5%] animation-delay-2000" />
      <AnimatedCharacter emoji="🎨" className="bottom-[30%] left-[8%] animation-delay-1500" />
      <AnimatedCharacter emoji="🎮" className="bottom-[20%] right-[8%] animation-delay-2500" />

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="animate-bounce transform hover:rotate-12 transition-transform">
              <Logo className="w-32 h-32" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-emerald-800 mb-6">
            <span className="inline-block animate-bounce-slow">L</span>
            <span className="inline-block animate-bounce-slow animation-delay-1000">i</span>
            <span className="inline-block animate-bounce-slow animation-delay-2000">n</span>
            <span className="inline-block animate-bounce-slow animation-delay-1000">g</span>
            <span className="inline-block animate-bounce-slow animation-delay-2000">o</span>
            <span className="inline-block animate-bounce-slow">K</span>
            <span className="inline-block animate-bounce-slow animation-delay-1000">i</span>
            <span className="inline-block animate-bounce-slow animation-delay-2000">d</span>
            <span className="inline-block animate-bounce-slow animation-delay-1000">s</span>
          </h1>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-8">
            {t('landing.hero.title')}
          </h2>
          
          <div className="max-w-3xl mx-auto mb-12 relative">
            <p className="text-2xl text-emerald-600 leading-relaxed">
              {t('landing.hero.description')}
            </p>
            <div className="absolute -right-12 top-0 text-4xl animate-bounce">✨</div>
            <div className="absolute -left-12 bottom-0 text-4xl animate-bounce animation-delay-1000">🌟</div>
          </div>

          <div className="mb-12">
            <LandingLanguageSelector />
          </div>

          <Button
            onClick={onGetStarted}
            size="lg"
            className="text-2xl px-16 py-8 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all bg-gradient-to-r from-emerald-500 to-emerald-600"
            icon={<Rocket className="w-8 h-8 animate-bounce" />}
          >
            {t('landing.hero.cta')}
          </Button>
        </div>

        <div className="relative">
          <h3 className="text-4xl font-bold text-center text-emerald-700 mb-16">
            {t('landing.features.title')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <FeatureCard
              icon={Globe2}
              title={t('landing.features.languages.title')}
              description={t('landing.features.languages.description')}
              emoji="🗣️"
              className="transform rotate-[-3deg]"
            />
            <FeatureCard
              icon={Brain}
              title={t('landing.features.learning.title')}
              description={t('landing.features.learning.description')}
              emoji="🎯"
              className="transform translate-y-4"
            />
            <FeatureCard
              icon={Trophy}
              title={t('landing.features.progress.title')}
              description={t('landing.features.progress.description')}
              emoji="🏆"
              className="transform rotate-[3deg]"
            />
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 w-full py-6 text-center text-emerald-600 bg-white/30 backdrop-blur-sm">
        <p className="text-lg">
          &copy; 2024 LingoKids - {t('landing.footer.rights')}
        </p>
      </footer>
    </div>
  );
}