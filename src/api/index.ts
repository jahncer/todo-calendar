import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // This should be replaced with your actual API URL
});

// Mocked data for development
const mockTodos = [
  { id: '1', title: 'Learn React', completed: false, dueDate: '2023-04-15' },
  { id: '2', title: 'Build a todo app', completed: true, dueDate: '2023-04-20' },
  { id: '3', title: 'Deploy the app', completed: false, dueDate: '2023-04-25' },
];

const mockEvents = [
  { id: '1', title: 'Team Meeting', start: '2023-04-15T10:00:00', end: '2023-04-15T11:00:00' },
  { id: '2', title: 'Project Deadline', start: '2023-04-20', end: '2023-04-20', allDay: true },
];

// Todo API calls
export const fetchTodos = () => Promise.resolve(mockTodos);
export const createTodo = (todo) => Promise.resolve({ ...todo, id: Date.now().toString() });
export const updateTodo = (todo) => Promise.resolve(todo);
export const deleteTodo = (id) => Promise.resolve({ id });

// Event API calls
export const fetchEvents = () => Promise.resolve(mockEvents);
export const createEvent = (event) => Promise.resolve({ ...event, id: Date.now().toString() });
export const updateEvent = (event) => Promise.resolve(event);
export const deleteEvent = (id) => Promise.resolve({ id });

export const syncGoogleCalendar = () => Promise.resolve({ message: 'Synced successfully' });

// Uncomment these when you have a real API to connect to
// export const fetchTodos = () => api.get('/todos').then((res) => res.data);
// export const createTodo = (todo) => api.post('/todos', todo).then((res) => res.data);
// export const updateTodo = (todo) => api.put(`/todos/${todo.id}`, todo).then((res) => res.data);
// export const deleteTodo = (id) => api.delete(`/todos/${id}`).then((res) => res.data);

// export const fetchEvents = () => api.get('/events').then((res) => res.data);
// export const createEvent = (event) => api.post('/events', event).then((res) => res.data);
// export const updateEvent = (event) => api.put(`/events/${event.id}`, event).then((res) => res.data);
// export const deleteEvent = (id) => api.delete(`/events/${id}`).then((res) => res.data);

// export const syncGoogleCalendar = () => api.post('/sync-google-calendar').then((res) => res.data);