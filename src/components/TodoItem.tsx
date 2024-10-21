import React from 'react';
import { useForm } from 'react-hook-form';
import { Trash2, Edit2, Calendar } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface TodoItemProps {
  todo: Todo;
  onUpdate: (data: Todo) => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: todo.title,
      completed: todo.completed,
      dueDate: todo.dueDate,
    },
  });

  const onSubmit = (data: Partial<Todo>) => {
    onUpdate({ ...todo, ...data });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 mr-4">
          <input
            {...register('title')}
            className="w-full p-2 border rounded"
            autoFocus
          />
          <input
            type="date"
            {...register('dueDate')}
            className="mt-2 p-2 border rounded"
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </form>
      ) : (
        <div className="flex items-center flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onUpdate({ ...todo, completed: !todo.completed })}
            className="mr-4"
          />
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.title}
          </span>
          {todo.dueDate && (
            <span className="text-sm text-gray-500 mr-4">
              <Calendar className="inline-block w-4 h-4 mr-1" />
              {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      )}
      <div className="flex items-center">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 text-blue-500 hover:text-blue-700"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button onClick={onDelete} className="p-2 text-red-500 hover:text-red-700">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;