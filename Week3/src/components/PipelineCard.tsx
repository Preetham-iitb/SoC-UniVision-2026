import type { PipelineStage } from '../types';
import './PipelineCard.css';

interface PipelineCardProps {
  stage: PipelineStage;
  onRun: (id: string) => void;
}

export const PipelineCard = ({ stage, onRun }: PipelineCardProps) => {
  return (
    <div className="pipeline-card">
      <h3 className="card-title">{stage.name}</h3>
      <p className="card-status">
        Status: <span className={`status-badge status-${stage.status}`}>{stage.status}</span>
      </p>
      
      {stage.status === 'waiting' && (
        <button className="run-button" onClick={() => onRun(stage.id)}>
          Run Stage
        </button>
      )}
    </div>
  );
};