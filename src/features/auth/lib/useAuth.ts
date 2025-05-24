'use client';

import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/me');
      setIsAuthenticated(res.ok);
    };
    checkAuth();
  }, []);

  return { isAuthenticated };
};