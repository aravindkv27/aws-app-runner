import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sky-500">TaskMaster</h1>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-gray-500" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
