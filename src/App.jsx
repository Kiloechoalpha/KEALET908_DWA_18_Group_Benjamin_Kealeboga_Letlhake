import './styles.css';
import Navbar from '../components/navbar';
import Home from '../components/home';
import Season from '../components/seasons';
import Show from '../components/show';
import ShowDetails from '../components/showPreview';
import Login from '../components/login';
import SeasonList from '../components/seasonList';
import AudioPlayer from '../components/audioPlayer';
import LandingPage from '../components/landingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Show" element={<Show />} />
        <Route path="/Season" element={<Season />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<ShowDetails />} />
        <Route path="/showPreview/:id" element={<SeasonList/>} />
        <Route path="/seasonList/:id" element={<AudioPlayer/>} />
        <Route path="/landingPage" element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;