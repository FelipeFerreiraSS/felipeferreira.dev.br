import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';

type ThemeToggleProps = {
  isCollapsed: boolean;
}

const ThemeToggle = ({ isCollapsed }: ThemeToggleProps) => {
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
    <ul>
      <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"onClick={toggleTheme}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        {!isCollapsed && 
          <span className="ml-4">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>  
        }
      </li>
    </ul>
  );
};

export default ThemeToggle;
