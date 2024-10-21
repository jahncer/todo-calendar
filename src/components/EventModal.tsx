import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  onSave: (data: any) => void;
  onDelete: (id: string) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event, onSave, onDelete }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: event?.title || '',
      start: event?.start || '',
      end: event?.end || '',
      allDay: event?.allDay || false,
    },
  });

  const onSubmit = (data) => {
    onSave({ ...data, id: event?.id });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded max-w-md mx-auto p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            {event ? 'Edit Event' : 'Add Event'}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register('title', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="start" className="block text-sm font-medium text-gray-700">
                Start
              </label>
              <input
                type="datetime-local"
                id="start"
                {...register('start', { required: true })}className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="end" className="block text-sm font-medium text-gray-700">
                End
              </label>
              <input
                type="datetime-local"
                id="end"
                {...register('end', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="allDay" className="flex items-center">
                <input
                  type="checkbox"
                  id="allDay"
                  {...register('allDay')}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">All Day</span>
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              {event && (
                <button
                  type="button"
                  onClick={() => onDelete(event.id)}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default EventModal;