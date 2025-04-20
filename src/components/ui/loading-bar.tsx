// src/components/ui/loading-bar.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export const LoadingBar = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const startLoading = () => {
      setIsLoading(true);
      setProgress(0);
      
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);
    };

    const completeLoading = () => {
      clearInterval(interval);
      setProgress(100);
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    startLoading();
    completeLoading();

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress value={progress} className="h-1 bg-transparent" />
    </div>
  );
};