"use client";
import { Calendar, dayjsLocalizer, View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = dayjsLocalizer(dayjs);
const events = [
  {
    title: "Meeting",
    start: new Date(2025, 5, 15, 10, 0),
    end: new Date(2025, 5, 15, 11, 0),
    color: "var(--color-orange-500)",
  },
  {
    title: "Lunch",
    start: new Date(2025, 5, 12, 12, 0),
    end: new Date(2025, 5, 12, 13, 0),
    color: "var(--color-orange-200)",
  },
];

const TripCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>("week");

  return (
    <div className="h-full bg-white shadow-xl rounded-xl p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
        view={view}
        date={date}
        style={{ height: "90%", width: "75%" }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
          },
        })}
      />
    </div>
  );
};

export default TripCalendar;
