import { useLayoutEffect, useState } from 'react';

interface ICountDownProps {
  renderer: ({ seconds }: { seconds: number }) => React.ReactNode;
  delaySeconds: number;
  onAfterCountdown?: () => void;
}

export const CountDown: React.FC<ICountDownProps> = ({ renderer, delaySeconds, onAfterCountdown }) => {
  const [seconds, setSeconds] = useState(delaySeconds);

  useLayoutEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    onAfterCountdown?.();
  }, [seconds]);

  return <>{renderer?.({ seconds })}</>;
};
