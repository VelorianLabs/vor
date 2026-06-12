import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SESSION_TIMEOUT = 7 * 60 * 1000; // 7 minutes in milliseconds

export function useSessionTimeout() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      const adminAuth = sessionStorage.getItem('adminAuth');
      const adminTimestamp = sessionStorage.getItem('adminTimestamp');

      if (!adminAuth || !adminTimestamp) {
        router.push('/admin/login');
        return;
      }

      const loginTime = parseInt(adminTimestamp);
      const currentTime = Date.now();
      const elapsed = currentTime - loginTime;

      if (elapsed >= SESSION_TIMEOUT) {
        // Session expired, clear storage and redirect
        sessionStorage.removeItem('adminAuth');
        sessionStorage.removeItem('adminUser');
        sessionStorage.removeItem('adminTimestamp');
        sessionStorage.removeItem('bypassAuth');
        router.push('/admin/login');
      }
    };

    // Check immediately
    checkSession();

    // Check every 30 seconds
    const interval = setInterval(checkSession, 30000);

    return () => clearInterval(interval);
  }, [router]);
}
