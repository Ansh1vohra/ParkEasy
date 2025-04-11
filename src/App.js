import './App.css';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from './pages/Home';
import Login from './pages/Login';
import ParkingLogin from './pages/ParkingLogin';
import SlotsView from './pages/SlotsView';
import Booking from './pages/Booking';
import BookingHistory from './pages/BookingHistory';
import ProviderDashboard from './pages/ProviderDashboard';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/slots' element={<SlotsView />} />
        <Route path='/parkinglogin' element={<ParkingLogin />} />
        {/* <Route path='/booking' element={<Booking />} /> */}
        <Route path='/booking/:slotNumber' element={<Booking />} />
        <Route path='/bookinghistory' element={<BookingHistory />} />
        <Route path='/provider-dashboard' element={<ProviderDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
