import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string | null>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);


  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme('light')
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <Button variant="outline" onClick={toggleTheme}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      <span className="ml-2">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </Button>
  );
};

export default ThemeToggle;
