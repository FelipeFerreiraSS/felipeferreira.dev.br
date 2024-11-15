import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';

type ThemeToggleProps = {
  isCollapsed?: boolean;
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
      <li className="rounded-lg flex items-center px-3 py-2 hover:bg-gray-200 hover:dark:bg-zinc-800 cursor-pointer"onClick={toggleTheme}>
        <div className="text-xl w-8 flex justify-center">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </div>
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
