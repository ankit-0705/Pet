import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PetContext from '../context/petContext';
import Lottie from 'lottie-react';
import petAnimation from '../assets/Animal Sample/A1.json';
import {CakeIcon, FaceSmileIcon, BoltIcon, UserIcon} from '@heroicons/react/24/outline'


function HomePage() {
  const lottieRef = useRef();
  const navigate = useNavigate();
  const { isLoading, handleNavigation, currentAnimation, petInfo, feedPet, playWithPet, restPet } = useContext(PetContext);

  const handleHover = () => {
    if (lottieRef.current) {
      lottieRef.current.stop();
      lottieRef.current.playSegments([0, 120], true); // play once
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    try {
      handleNavigation(navigate, '/profile');
    } catch (error) {
      console.log('Navigation failed');
    }
  };

  const statusColor = (value) =>{
    if(value>70) return 'bg-green-100';
    if(value>40) return 'bg-yellow-100';
    return 'bg-red-100';
  }

  // useEffect=(()=>{
  //   console.log()
  // },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-white flex flex-col items-center p-12 pt-30 relative">
      {/* Top Content */}
      <div className="flex flex-col items-center">
        {/* Lottie Animation */}
        <div 
          className="w-80 h-80 cursor-pointer"
          onMouseEnter={handleHover}
        >
          <Lottie 
            lottieRef={lottieRef} 
            animationData={petAnimation} 
            loop={false} 
            autoplay={false} 
          />
        </div>

        {/* Pet Info */}
        <div className="mt-6 text-center space-y-2">
          <h2 className="text-3xl font-semibold text-purple-700">
            {petInfo?.petInfo?.name || "Loading..."}
          </h2>

        </div>
      </div>

      {/* Status Bar */}
      <div className="w-full mt-10 p-4 shadow-inner border border-slate-400 rounded-xl">
      <div className="grid grid-cols-4 gap-2 text-center text-purple-800">

        {/* Status Item Template */}
        <div className={`relative group w-20 h-20 border border-purple-400 rounded-full flex items-center justify-center transition hover:bg-purple-100 ${statusColor(petInfo?.petInfo?.hunger)} cursor-pointer`} onClick={feedPet}>
          <CakeIcon className="h-10 w-10 text-purple-600" />
          {petInfo?.petInfo?.hunger !== undefined && (
            <div className="absolute -top-3 -right-3 hidden group-hover:block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded shadow-md">
              {petInfo.petInfo.hunger}%
            </div>
          )}
        </div>

        <div className={`relative group w-20 h-20 border border-purple-400 rounded-full flex items-center justify-center transition hover:bg-purple-100 ${statusColor(petInfo?.petInfo?.happiness)} cursor-pointer`} onClick={playWithPet}>
          <FaceSmileIcon className="h-10 w-10 text-purple-600" />
          {petInfo?.petInfo?.happiness !== undefined && (
            <div className="absolute -top-3 -right-3 hidden group-hover:block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded shadow-md">
              {petInfo.petInfo.happiness}%
            </div>
          )}
        </div>

        <div className={`relative group w-20 h-20 border border-purple-400 rounded-full flex items-center justify-center transition hover:bg-purple-100 ${statusColor(petInfo?.petInfo?.energy)} cursor-pointer`} onClick={restPet}>
          <BoltIcon className="h-10 w-10 text-purple-600" />
          {petInfo?.petInfo?.energy !== undefined && (
            <div className="absolute -top-3 -right-3 hidden group-hover:block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded shadow-md">
              {petInfo.petInfo.energy}%
            </div>
          )}
        </div>

        <div className="relative group w-20 h-20 border border-purple-400 rounded-full flex items-center justify-center transition hover:bg-purple-100 cursor-pointer" onClick={handleClick}>
          <UserIcon className="h-10 w-10 text-purple-600"/>
          <div className="absolute -top-3 -right-3 hidden group-hover:block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded shadow-md">
            Profile
          </div>
        </div>
      </div>
    </div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-80 flex items-center justify-center z-50">
          <Lottie animationData={currentAnimation} loop={true} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
