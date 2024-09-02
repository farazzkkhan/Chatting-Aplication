import { useRef, useState } from 'react';
import './App.css';
import Login from "./pages/login/login";
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
  const {authUser} = useAuthContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <video
        ref={videoRef}
        src="../public/video.mp4"
        autoPlay
        loop
        muted
        id="video"
      >
        <source src="../public/video.mp4" type='video/mp4' />
      </video>

      <button className="play-pause-button" onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>


      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp /> } />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;


/*
FOR FRONTEND-
cd frontend and then npm run dev


FOR BACKEND-
npm run server in the chat directly


faraz is logged in pas-123456789



problems-
online status not showing - resolved
chat alligned to left side - resolved
real time not working - resolved
*/