import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


// Các component quản lý
import TicketManagement from './components/TripManagement';
import RouteManagement from './components/RouteManagement';
import PassengerManagement from './components/PassengerManagement';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CarManagement from './components/CarManagement';

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
          <Route path="/car-management" element={<CarManagement />} />
          <Route path="/passenger-management" element={<PassengerManagement />} />
        </Routes>
        <ToastContainer /> 
      </div>
    </Router>
    </ThemeProvider>
  );
};

export default App;
