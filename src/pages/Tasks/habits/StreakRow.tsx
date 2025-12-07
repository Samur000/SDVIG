import { useMemo } from 'react';
import './Habits.css';

interface StreakRowProps {
  records: string[];
  color: string;
  days?: number; // количество отображаемых дней
}

export function StreakRow({ records, color, days = 30 }: StreakRowProps) {
  const squares = useMemo(() => {
    const result: { date: string; completed: boolean }[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      result.push({
        date: dateStr,
        completed: records.includes(dateStr)
      });
    }
    
    return result;
  }, [records, days]);

  return (
    <div className="streak-row">
      {squares.map((sq, index) => (
        <div
          key={sq.date}
          className={`streak-square ${sq.completed ? 'completed' : ''}`}
          style={{
            backgroundColor: sq.completed ? color : 'transparent',
            borderColor: sq.completed ? color : 'var(--border)',
            animationDelay: sq.completed ? `${index * 20}ms` : '0ms'
          }}
          title={sq.date}
        />
      ))}
    </div>
  );
}

