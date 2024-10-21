import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: todos, isLoading } = useQuery('todos', fetchTodos);

  const createMutation = useMutation(createTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos'),
  });

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos'),
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries('todos'),
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order of todos in the backend
    items.forEach((item, index) => {
      updateMutation.mutate({ ...item, order: index });
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoForm onSubmit={(data) => createMutation.mutate(data)} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4 mt-6">
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem
                        todo={todo}
                        onUpdate={(data) => updateMutation.mutate(data)}
                        onDelete={() => deleteMutation.mutate(todo.id)}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoList;