import { WorkflowBuilder } from './componenets/workFlowBuilder/workFlowBuilder';
import './App.css';
function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand-group">
          <h1 className="brand-title">
            Main intention of this was to learn about topological sort(Kahn's algo) and catch circular paths
          </h1>
        </div>
        <div className="badge-info">
          Directed Acyclic Graph (DAG) Studio
        </div>
      </header>

      <main className="app-main-workspace">
        <WorkflowBuilder />
      </main>
    </div>
  );
}

export default App;