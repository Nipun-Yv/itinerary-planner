"use client";
import { Calendar, dayjsLocalizer, View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { CalendarDays, MapPin, Clock, Users, Plus, Filter } from "lucide-react";

const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    title: "Team Meeting",
    start: new Date(2025, 5, 15, 10, 0),
    end: new Date(2025, 5, 15, 11, 0),
    color: "#ea580c",
    type: "meeting",
    location: "Conference Room A"
  },
  {
    title: "Lunch Break",
    start: new Date(2025, 5, 12, 12, 0),
    end: new Date(2025, 5, 12, 13, 0),
    color: "#fb923c",
    type: "meal",
    location: "Downtown Restaurant"
  },
  {
    title: "Flight to Paris",
    start: new Date(2025, 5, 16, 8, 0),
    end: new Date(2025, 5, 16, 12, 0),
    color: "#fdba74",
    type: "travel",
    location: "Airport Terminal 3"
  },
  {
    title: "Hotel Check-in",
    start: new Date(2025, 5, 16, 15, 0),
    end: new Date(2025, 5, 16, 16, 0),
    color: "#fed7aa",
    type: "accommodation",
    location: "Hotel Le Marais"
  }
];

const eventTypes = {
  meeting: { icon: Users, label: "Meeting" },
  meal: { icon: MapPin, label: "Dining" },
  travel: { icon: MapPin, label: "Travel" },
  accommodation: { icon: MapPin, label: "Stay" }
};

const TripCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>("week");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const customEventPropGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease-in-out"
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-6 mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Trip Calendar</h1>
                <p className="text-orange-600">Manage your travel itinerary</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-orange-200 rounded-lg text-sm font-medium text-orange-700 hover:bg-orange-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">no. of activities</p>
                <p className="text-2xl font-bold text-gray-900">{events.length} fetch krke abhi it's mock</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Trip to</p>
                <p className="text-2xl font-bold text-gray-900">location</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden backdrop-blur-sm">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onNavigate={(newDate) => setDate(newDate)}
            onView={(newView) => setView(newView)}
            onSelectEvent={setSelectedEvent}
            view={view}
            date={date}
            style={{ height: "700px" }}
            eventPropGetter={customEventPropGetter}
            popup={true}
          />
        </div>

        {/* Modal */}
        {selectedEvent && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <div 
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-orange-100 transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: selectedEvent.color }}
                  >
                    {(() => {
                      const EventIcon = eventTypes[selectedEvent.type]?.icon || CalendarDays;
                      return <EventIcon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
                    <p className="text-sm text-orange-600 font-medium">{eventTypes[selectedEvent.type]?.label}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-light w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-gray-600 p-3 bg-orange-50 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">
                    {dayjs(selectedEvent.start).format('MMM DD, YYYY HH:mm')} - 
                    {dayjs(selectedEvent.end).format('HH:mm')}
                  </span>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600 p-3 bg-orange-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{selectedEvent.location}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Edit Event
                </button>
                <button className="px-6 py-3 border border-orange-200 text-orange-700 rounded-lg hover:bg-orange-50 font-medium transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripCalendar;