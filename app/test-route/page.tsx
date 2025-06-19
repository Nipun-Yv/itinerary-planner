'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Loader2, AlertCircle, CheckCircle } from 'lucide-react';



const StreamingItinerary: React.FC = () => {
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const startStreaming = (): void => {
    // Reset state
    setItineraryItems([]);
    setError(null);
    setIsComplete(false);
    setConnectionStatus('connecting');

    // Close existing connection if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Get API URL from environment variable or use default
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Create new EventSource connection
    const eventSource = new EventSource(`${apiUrl}/stream-itinerary-sse`);
    eventSourceRef.current = eventSource;

    eventSource.onopen = (): void => {
      setConnectionStatus('connected');
      console.log('SSE connection opened');
    };

    eventSource.onmessage = (event: MessageEvent): void => {
      try {
        const data: SSEMessage = JSON.parse(event.data);
        
        switch(data.type) {
          case 'connected':
            console.log('Stream started:', data.message);
            break;
            
          case 'item':
            if (data.data) {
              // Add new itinerary item
              setItineraryItems(prev => [...prev, data.data!]);
              console.log('New itinerary item:', data.data);
            }
            break;
            
          case 'complete':
            console.log('Itinerary generation complete');
            setIsComplete(true);
            setConnectionStatus('completed');
            eventSource.close();
            break;
            
          case 'error':
            console.error('Server error:', data.message);
            setError(data.message || 'Unknown server error');
            setConnectionStatus('error');
            eventSource.close();
            break;
            
          default:
            console.log('Unknown message type:', data);
        }
      } catch (err) {
        console.error('Error parsing SSE data:', err);
        setError('Failed to parse server response');
      }
    };

    eventSource.onerror = (event: Event): void => {
      console.error('SSE error:', event);
      setConnectionStatus('error');
      setError('Connection error occurred');
      eventSource.close();
    };
  };

  const stopStreaming = (): void => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setConnectionStatus('disconnected');
  };

  // Cleanup on component unmount
  useEffect(() => {
    return (): void => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getActivityIcon = (activityType: ItineraryItem['activity_type']): string => {
    switch(activityType) {
      case 'adventure':
        return '🏔️';
      case 'tourist attraction':
        return '🏛️';
      case 'rest':
        return '☕';
      case 'commute':
        return '🚗';
      default:
        return '📍';
    }
  };

  const getActivityColor = (activityType: ItineraryItem['activity_type']): string => {
    switch(activityType) {
      case 'adventure':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'tourist attraction':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'rest':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'commute':
        return 'bg-gray-100 border-gray-300 text-gray-800';
      default:
        return 'bg-purple-100 border-purple-300 text-purple-800';
    }
  };

  const calculateDuration = (startTime: string, endTime: string): number => {
    return Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Streaming Itinerary Generator
        </h1>
        
        {/* Control Panel */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={startStreaming}
            disabled={connectionStatus === 'connecting' || connectionStatus === 'connected'}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {connectionStatus === 'connecting' && <Loader2 className="w-4 h-4 animate-spin" />}
            {connectionStatus === 'connecting' ? 'Connecting...' : 'Generate Itinerary'}
          </button>
          
          <button
            onClick={stopStreaming}
            disabled={connectionStatus === 'disconnected'}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Stop Stream
          </button>
          
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full transition-colors ${
              connectionStatus === 'connected' ? 'bg-green-500' :
              connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
              connectionStatus === 'error' ? 'bg-red-500' :
              connectionStatus === 'completed' ? 'bg-blue-500' :
              'bg-gray-500'
            }`}></div>
            <span className="text-sm text-gray-600 capitalize">
              {connectionStatus}
            </span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {/* Completion Status */}
        {isComplete && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-green-800">Itinerary generation completed!</span>
          </div>
        )}
      </div>

      {/* Itinerary Items */}
      <div className="space-y-4">
        {itineraryItems.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your Itinerary ({itineraryItems.length} items)
            </h2>
            <p className="text-gray-600 text-sm">
              {formatDate(itineraryItems[0].start_time)}
            </p>
          </div>
        )}

        {itineraryItems.map((item: ItineraryItem, index: number) => (
          <div 
            key={`${item.activity_name}-${index}`}
            className={`p-4 rounded-lg border-2 ${getActivityColor(item.activity_type)} transform transition-all duration-300 hover:scale-[1.02] opacity-0 animate-fade-in-up`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">
                {getActivityIcon(item.activity_type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg truncate pr-2">
                    {item.activity_name}
                  </h3>
                  <span className="text-xs uppercase tracking-wide font-medium px-2 py-1 rounded-full bg-white bg-opacity-50 flex-shrink-0">
                    {item.activity_type}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm flex-wrap">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {formatTime(item.start_time)} - {formatTime(item.end_time)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {calculateDuration(item.start_time, item.end_time)} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator when streaming */}
        {connectionStatus === 'connected' && !isComplete && (
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating more activities...</span>
            </div>
          </div>
        )}

        {/* Empty state */}
        {itineraryItems.length === 0 && connectionStatus === 'disconnected' && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No itinerary generated yet
            </h3>
            <p className="text-gray-600">
              Click "Generate Itinerary" to start streaming your travel plan
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StreamingItinerary;