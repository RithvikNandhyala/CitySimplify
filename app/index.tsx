import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';

export default function IndexRedirect() {
  const router = useRouter();
  const rootNavigation = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigation?.key) return; // 🛑 Wait for router to be ready
    router.replace('/sign-in'); // ✅ Safe to redirect now
  }, [rootNavigation]);

  return null;
}