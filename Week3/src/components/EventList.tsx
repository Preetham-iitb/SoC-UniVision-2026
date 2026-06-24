import type { PipelineEvent } from '../types';
import './EventList.css';

interface EventListProps {
  events: PipelineEvent[];
}

export const EventList = ({ events }: EventListProps) => {
  return (
    <div className="event-list-container">
      <h3 className="list-heading">System History Log</h3>
      {events.length === 0 ? (
        <p className="empty-message">No execution data logged yet.</p>
      ) : (
        <ul className="log-stream">
          {events.map((event) => (
            <li key={event.id} className="log-item">
              <span className="log-time">[{event.timestamp}]</span>
              <span className="log-msg">{event.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};