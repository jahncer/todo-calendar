import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

interface MiniCalendarProps {
  events: any[];
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const hasEvent = (date: Date) => {
    return events.some((event) => isSameDay(new Date(event.start), date));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={() => setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))}>
          &lt;
        </button>
        <h2 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))}>
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 p-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-gray-500 text-sm">
            {day}
          </div>
        ))}
        {monthDays.map((day) => (
          <div
            key={day.toISOString()}
            className={`text-center p-1 ${
              isSameMonth(day, currentDate)
                ? 'text-gray-900'
                : 'text-gray-400'
            } ${hasEvent(day) ? 'bg-blue-100 rounded-full' : ''}`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;