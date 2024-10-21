import React from 'react';
import { useQuery } from 'react-query';
import { fetchTodos, fetchEvents } from '../api';
import TodoItem from '../components/TodoItem';
import MiniCalendar from '../components/MiniCalendar';

const Dashboard: React.FC = () => {
  const { data: todos } = useQuery('todos', fetchTodos);
  const { data: events } = useQuery('events', fetchEvents);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Tasks</h2>
        <ul className="space-y-4">
          {todos?.slice(0, 5).map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                onUpdate={() => {}} // We'll implement this later
                onDelete={() => {}} // We'll implement this later
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
        <MiniCalendar events={events || []} />
      </div>
    </div>
  );
};

export default Dashboard;