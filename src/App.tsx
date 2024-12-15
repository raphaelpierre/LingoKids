import React from 'react';
import { useAuthStore } from './stores/authStore';
import { useProgressStore } from './stores/progressStore';
import { AuthView } from './views/AuthView';
import { MainApp } from './views/MainApp';
import { LandingView } from './views/LandingView';
import { LoadingScreen } from './components/ui/LoadingScreen';

function App() {
  const { user, loading: authLoading, initialized } = useAuthStore();
  const { progress, loadProgress, loading: progressLoading } = useProgressStore();
  const [showLanding, setShowLanding] = React.useState(true);

  React.useEffect(() => {
    if (user && !progress) {
      loadProgress(user.uid);
    }
  }, [user, progress, loadProgress]);

  // Show loading screen while authentication is initializing
  if (!initialized || authLoading) {
    return <LoadingScreen />;
  }

  // Show loading screen while progress is being loaded for authenticated users
  if (user && progressLoading) {
    return <LoadingScreen />;
  }

  // Show landing page for non-authenticated users
  if (showLanding && !user) {
    return <LandingView onGetStarted={() => setShowLanding(false)} />;
  }

  // Show auth view if user is not authenticated and landing is dismissed
  if (!user) {
    return <AuthView />;
  }

  // Show main app for authenticated users
  return <MainApp />;
}

export default App;