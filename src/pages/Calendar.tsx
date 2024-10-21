import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api';
import EventModal from '../components/EventModal';

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { data: events } = useQuery('events', fetchEvents);

  const createMutation = useMutation(createEvent, {
    onSuccess: () => queryClient.invalidateQueries('events'),
  });

  const updateMutation = useMutation(updateEvent, {
    onSuccess: () => queryClient.invalidateQueries('events'),
  });

  const deleteMutation = useMutation(deleteEvent, {
    onSuccess: () => queryClient.invalidateQueries('events'),
  });

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventDrop = (dropInfo) => {
    updateMutation.mutate({
      id: dropInfo.event.id,
      start: dropInfo.event.start,
      end: dropInfo.event.end,
    });
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
        eventDrop={handleEventDrop}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onSave={(eventData) => {
          if (eventData.id) {
            updateMutation.mutate(eventData);
          } else {
            createMutation.mutate(eventData);
          }
          setIsModalOpen(false);
        }}
        onDelete={(id) => {
          deleteMutation.mutate(id);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Calendar;