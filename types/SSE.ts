
interface SSEMessage {
  type: 'connected' | 'item' | 'complete' | 'error';
  data?: ItineraryItem;
  message?: string;
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'completed' | 'error';