import { useState, useEffect } from 'react';
import { EventData } from '@/data/events-data';

interface UseEventsReturn {
  events: Record<string, EventData[]>;
  loading: boolean;
  error: string | null;
}

/**
 * Hook để fetch events data từ backend
 * Fallback về hardcoded data nếu backend không available
 */
export const useEvents = (): UseEventsReturn => {
  const [events, setEvents] = useState<Record<string, EventData[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Fetch từ backend API
        const response = await fetch('/api/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data);
        setError(null);
      } catch (err) {
        // Fallback: dùng hardcoded data nếu API không available
        console.warn('Failed to fetch events from API, using fallback data:', err);
        
        try {
          const { eventsData: fallbackData } = await import('@/data/events-data');
          setEvents(fallbackData);
        } catch (fallbackErr) {
          setError('Failed to load events data');
          console.error(fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
