"use client";
import { Calendar, dayjsLocalizer, View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect, useRef } from "react";
import itineraryItemList from "@/data/sample";
import {
  Calendar as CalendarIcon,
  Loader2,

} from "lucide-react";
import { Button } from "./ui/button";

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
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>(itineraryItemList);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("disconnected");
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>("week");
  const [events, setEvents] = useState<Activity[]>([]);

  console.log(itineraryItems)

  const startStreaming = (): void => {
    // Reset state
    setItineraryItems([]);
    setError(null);
    setIsComplete(false);
    setConnectionStatus("connecting");

    // Close existing connection if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    // Create new EventSource connection
    const eventSource = new EventSource(`${apiUrl}/stream-itinerary-sse`);
    eventSourceRef.current = eventSource;

    eventSource.onopen = (): void => {
      setConnectionStatus("connected");
      console.log("SSE connection opened");
    };

    eventSource.onmessage = (event: MessageEvent): void => {
      try {
        const data: SSEMessage = JSON.parse(event.data);

        switch (data.type) {
          case "connected":
            console.log("Stream started:", data.message);
            break;

          case "item":
            if (data.data) {
              // Add new itinerary item
              setItineraryItems((prev) => [...prev, data.data!]);
              console.log("New itinerary item:", data.data);
            }
            break;

          case "complete":
            console.log("Itinerary generation complete");
            setIsComplete(true);
            setConnectionStatus("completed");
            eventSource.close();
            break;

          case "error":
            console.error("Server error:", data.message);
            setError(data.message || "Unknown server error");
            setConnectionStatus("error");
            eventSource.close();
            break;

          default:
            console.log("Unknown message type:", data);
        }
      } catch (err) {
        console.error("Error parsing SSE data:", err);
        setError("Failed to parse server response");
      }
    };

    eventSource.onerror = (event: Event): void => {
      console.error("SSE error:", event);
      setConnectionStatus("error");
      setError("Connection error occurred");
      eventSource.close();
    };
  };

  const stopStreaming = (): void => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setConnectionStatus("disconnected");
  };

  // Cleanup on component unmount
  useEffect(() => {
    return (): void => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const formatDate = (timeString: string): Date => {
    const date = new Date(timeString);
    return date;
  };

  const getActivityColor = (
    activityType: ItineraryItem["activity_type"]
  ): string => {
    switch (activityType) {
      case "adventure":
        return "var(--color-orange-500)";
      case "tourist attraction":
        return "var(--color-orange-200)";
      case "rest":
        return "white";
      case "commute":
        return "var(--color-orange-100)";
      default:
        return "var(--color-orange-100)";
    }
  };

  const calculateDuration = (startTime: string, endTime: string): number => {
    return Math.round(
      (new Date(endTime).getTime() - new Date(startTime).getTime()) /
        (1000 * 60)
    );
  };

  useEffect(() => {
    const updateEventList = (itineraryItems: ItineraryItem[]) => {
      setEvents(
        itineraryItems.map((item) => {
          return {
            title: item.activity_name,
            start: formatDate(item.start_time),
            end: formatDate(item.end_time),
            color: getActivityColor(item.activity_type),
            activity_type:item.activity_type
          };
        })
      );
    };
    if (itineraryItems) {
      updateEventList(itineraryItems);
    }
  }, [itineraryItems]);
  return (
    <div className="h-full bg-white shadow-xl rounded-xl p-1 flex-3/4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
        view={view}
        date={date}
        step={10} // 15-minute steps
timeslots={2} 
        style={{ height: "95%", width: "100%" }}
        eventPropGetter={(event) => ({
          style: {
            background: event.color,
            color: `${event.activity_type=='rest'?"orange":"white"}`,
            border: `${event.activity_type=='rest'?"0.5px solid orange":"none"}`,
            borderRadius: "0.375rem",
            boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:"5%",
            boxShadow:"0px 20px 20px rgb(170,170,170)",
          },
        })}
      />
      <button
        onClick={startStreaming}
        disabled={
          connectionStatus === "connecting" || connectionStatus === "connected"
        }
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
      >
        {connectionStatus === "connecting" && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        {connectionStatus === "connecting"
          ? "Connecting..."
          : "Generate Itinerary"}
      </button>

      <button
        onClick={stopStreaming}
        disabled={connectionStatus === "disconnected"}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Stop Stream
      </button>

      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full transition-colors ${
            connectionStatus === "connected"
              ? "bg-green-500"
              : connectionStatus === "connecting"
              ? "bg-yellow-500 animate-pulse"
              : connectionStatus === "error"
              ? "bg-red-500"
              : connectionStatus === "completed"
              ? "bg-blue-500"
              : "bg-gray-500"
          }`}
        ></div>
        <span className="text-sm text-gray-600 capitalize">
          {connectionStatus}
        </span>
      </div>
    </div>
  );
};

export default TripCalendar;
