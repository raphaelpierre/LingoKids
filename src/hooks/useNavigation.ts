export type NavigationSection = 'words' | 'games' | 'progress' | 'profile';

export function useNavigation() {
  const [currentSection, setCurrentSection] = useState<NavigationSection>('words');

  const navigateTo = (section: NavigationSection) => {
    setCurrentSection(section);
  };

  return {
    currentSection,
    navigateTo,
  };
}