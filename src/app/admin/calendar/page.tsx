'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Filter } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'inspection' | 'meeting' | 'deadline';
  location?: string;
  attendees?: string;
  status: 'scheduled' | 'pending' | 'completed';
}

export default function AdminCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'inspection' | 'meeting' | 'deadline'>('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      // Load inspection requests as events from API
      const response = await fetch('/api/inspection-requests');
      const inspections = await response.json();

      const inspectionEvents: Event[] = (inspections || []).filter((i: any) => ['scheduled', 'pending'].includes(i.status)).map((insp: any) => ({
        id: insp._id,
        title: `Inspection: ${insp.propertyTitle}`,
        date: insp.inspectionDate || insp.scheduledDate || new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        type: 'inspection',
        location: insp.propertyTitle,
        attendees: insp.fullName,
        status: insp.status === 'scheduled' ? 'scheduled' : 'pending',
      }));

      setEvents(inspectionEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    const filtered = events.filter(event => event.date === dateStr);
    if (filterType === 'all') return filtered;
    return filtered.filter(event => event.type === filterType);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setShowModal(true);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentDate);
  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return <div className="p-8">Loading calendar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-vor-navy">Calendar</h1>
          <p className="mt-2 text-vor-slate">Schedule inspections and manage meetings</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
          >
            <option value="all">All Events</option>
            <option value="inspection">Inspections</option>
            <option value="meeting">Meetings</option>
            <option value="deadline">Deadlines</option>
          </select>
          <button
            onClick={() => {
              setSelectedDate(new Date().toISOString().split('T')[0]);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-vor-navy text-white rounded-lg hover:bg-vor-navy-light"
          >
            <Plus className="h-4 w-4" />
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg hover:bg-vor-cream transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-semibold text-vor-navy">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-vor-cream transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-vor-slate py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            const dateStr = date ? date.toISOString().split('T')[0] : '';
            const dayEvents = getEventsForDate(date);
            const isToday = dateStr === today;

            return (
              <div
                key={index}
                onClick={() => date && handleDateClick(date)}
                className={`min-h-[100px] p-2 rounded-lg border transition-colors cursor-pointer ${
                  !date
                    ? 'bg-transparent border-transparent'
                    : isToday
                    ? 'bg-vor-navy/5 border-vor-navy'
                    : 'bg-white border-vor-border hover:bg-vor-cream'
                }`}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${isToday ? 'text-vor-navy' : 'text-vor-slate'}`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map(event => (
                        <EventBadge key={event.id} event={event} />
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-vor-slate">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-vor-navy mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-vor-slate">No upcoming events scheduled</p>
          ) : (
            events
              .filter(e => e.date >= today)
              .sort((a, b) => a.date.localeCompare(b.date))
              .slice(0, 5)
              .map(event => (
                <EventRow key={event.id} event={event} />
              ))
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-xl shadow-card p-6">
            <h2 className="text-xl font-semibold text-vor-navy mb-4">Add Event</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-vor-navy mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
                  placeholder="Event title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vor-navy mb-1">Date</label>
                <input
                  type="date"
                  defaultValue={selectedDate}
                  className="w-full px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vor-navy mb-1">Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-vor-navy mb-1">Type</label>
                <select className="w-full px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold">
                  <option value="inspection">Inspection</option>
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Deadline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-vor-navy mb-1">Location (optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-vor-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vor-gold"
                  placeholder="Location"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-vor-navy text-white rounded-lg font-medium hover:bg-vor-navy-light"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-vor-border rounded-lg font-medium hover:bg-vor-cream"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EventBadge({ event }: { event: Event }) {
  const colors = {
    inspection: 'bg-blue-100 text-blue-700',
    meeting: 'bg-purple-100 text-purple-700',
    deadline: 'bg-red-100 text-red-700',
  };

  return (
    <div className={`text-xs px-2 py-1 rounded truncate ${colors[event.type]}`}>
      {event.title}
    </div>
  );
}

function EventRow({ event }: { event: Event }) {
  const colors = {
    inspection: 'bg-blue-100 text-blue-700',
    meeting: 'bg-purple-100 text-purple-700',
    deadline: 'bg-red-100 text-red-700',
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-vor-border hover:bg-vor-cream transition-colors">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors[event.type]}`}>
        <CalendarIcon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-vor-navy">{event.title}</p>
        <div className="flex items-center gap-4 text-sm text-vor-slate mt-1">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {event.date} at {event.time}
          </span>
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {event.location}
            </span>
          )}
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        event.status === 'completed' ? 'bg-vor-trust/10 text-vor-trust' :
        event.status === 'scheduled' ? 'bg-vor-navy/10 text-vor-navy' :
        'bg-vor-gold/10 text-vor-gold'
      }`}>
        {event.status}
      </span>
    </div>
  );
}
