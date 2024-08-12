import React from 'react';
import FlashcardViewer from './components/FlashcardViewer';
import Dashboard from './components/Dashboard';
import { FlashcardProvider } from './components/FlashcardContext';
import './index.css'; // Include Tailwind styles

const App = () => {
  const [dashboardVisible, setDashboardVisible] = React.useState(false);

  const toggleDashboard = () => {
    setDashboardVisible(!dashboardVisible);
  };

  return (
    <FlashcardProvider>
      <div className="flex h-92 max-w-screen">
        {/* Sidebar (Dashboard) */}
        <div className='w-[30%]'       >
          

          <Dashboard onClose={() => setDashboardVisible(false)} />
        </div>

        {/* Main Content Area */}
        <div className='w-[70%]'>
          
        
          <FlashcardViewer />
        </div>

        {/* Toggle Button */}
        
      </div>
    </FlashcardProvider>
  );
};

export default App;
