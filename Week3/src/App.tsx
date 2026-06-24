// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App


import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import type { PipelineStage, PipelineEvent } from './types';
import { PipelineCard } from './components/PipelineCard';
import { EventList } from './components/EventList';
import './App.css';

// Navigation Component
function Navigation({ eventCount }: { eventCount: number }) {
  const location = useLocation();

  return (
    <nav className="navigation-bar">
      <Link to="/" className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}>
        Dashboard Pipeline
      </Link>
      <Link to="/logs" className={`nav-button ${location.pathname === '/logs' ? 'active' : ''}`}>
        View Event Logs ({eventCount})
      </Link>
    </nav>
  );
}

// Main App Component
export default function App() {
  const [stages, setStages] = useState<PipelineStage[]>([
    { id: '1', name: 'Input', status: 'waiting' },
    { id: '2', name: 'Detection', status: 'waiting' },
    { id: '3', name: 'Output', status: 'waiting' },
  ]);

  const [events, setEvents] = useState<PipelineEvent[]>([]);

  const handleRunStage = (id: string) => {
    setStages(prevStages =>
      prevStages.map(stage =>
        stage.id === id ? { ...stage, status: 'running' } : stage
      )
    );

    const targetStage = stages.find(s => s.id === id);
    if (targetStage) {
      const newEvent: PipelineEvent = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        message: `Stage [${targetStage.name}] transitioned from WAITING to RUNNING.`,
      };
      setEvents(prevEvents => [newEvent, ...prevEvents]);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Vision Intelligence Hub</h1>
          <Navigation eventCount={events.length} />
        </header>

        <main className="content-area">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="page-view">
                  <h2>Process Execution Controls</h2>
                  <div className="stages-grid">
                    {stages.map(stage => (
                      <PipelineCard 
                        key={stage.id} 
                        stage={stage} 
                        onRun={handleRunStage} 
                      />
                    ))}
                  </div>
                </div>
              } 
            />
            <Route 
              path="/logs" 
              element={
                <div className="page-view">
                  <EventList events={events} />
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}