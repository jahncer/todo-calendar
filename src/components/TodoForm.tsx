import React from 'react';
import { useForm } from 'react-hook-form';

interface TodoFormProps {
  onSubmit: (data: any) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex items-center space-x-2">
      <input
        {...register('title', { required: true })}
        placeholder="Add a new task"
        className="flex-1 p-2 border rounded"
      />
      <input
        type="date"
        {...register('dueDate')}
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;