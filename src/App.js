import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Các component quản lý
import TicketManagement from './components/TicketManagement';
import RouteManagement from './components/RouteManagement';
import PassengerManagement from './components/PassengerManagement';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Sidebar />
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/route-management" element={<RouteManagement />} />
          <Route path="/ticket-management" element={<TicketManagement />} />
          <Route path="/passenger-management" element={<PassengerManagement />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
};

export default App;
