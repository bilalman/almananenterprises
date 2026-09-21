import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  // Normalize initial path, supporting both standard path and hash path
  const getInitialPath = (): string => {
    if (typeof window === 'undefined') return '/';
    
    // Check if hash exists (e.g. /#about or #/about)
    if (window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, '/');
      if (hash) return hash;
    }
    
    return window.location.pathname || '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash) {
        const hash = window.location.hash.replace(/^#\/?/, '/');
        if (hash) {
          setCurrentPath(hash);
          return;
        }
      }
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;

    try {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    } catch {
      // Fallback to hash if pushState is restricted
      window.location.hash = path;
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};
