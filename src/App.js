import './App.css';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import SlotsView from './pages/SlotsView';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/slots' element={<SlotsView />} />
      </Routes>
    </div>
  );
}

export default App;
