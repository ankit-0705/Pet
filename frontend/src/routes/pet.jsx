import React, { useState, useContext } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PetContext from '../context/petContext';
import Lottie from 'lottie-react';
import petCreationAnimation from '../assets/Animal Sample/A5.json'; // Choose suitable animation
const backendUrl = import.meta.env.VITE_API_BASE_URL;

function CreatePetPage() {
  const [petData, setPetData] = useState({
    name: '',
    hunger: 50,
    happiness: 50,
    energy: 50,
  });

  const { petGetter, handleNavigation, isLoading, currentAnimation } = useContext(PetContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: name === 'name' ? value : parseInt(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/pets/createpet`, petData);
      await petGetter();
      handleNavigation(navigate, '/home');
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <div className="min-h-screen p-5 flex items-center justify-center bg-gradient-to-br from-green-100 to-white">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full max-w-5xl relative">

        {/* Form Section */}
        <div className="relative w-full lg:w-2/3 z-10">
          <div className="w-full flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-green-600 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
                <Typewriter
                  words={['Meet Your Pet!']}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h1>
              <p className="pt-4 text-green-800">
                Give your pet a name and customize its mood to start the journey!
              </p>
            </div>

            {/* Lottie Animation */}
            <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[150px] lg:h-[150px] block">
              <Lottie animationData={petCreationAnimation} loop />
            </div>
          </div>

          {/* Form */}
          <div className="card bg-white shadow-2xl transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.4)] w-full px-6 py-8">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="gap-4 flex flex-col">

                {/* Pet Name */}
                <label className="input bg-white text-green-900 border border-green-300 focus-within:ring-2 focus-within:ring-green-400 rounded px-3 py-2 flex items-center gap-2">
                  <span className="font-semibold">Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={petData.name}
                    onChange={handleChange}
                    required
                    placeholder="Pet's name"
                    className="w-full text-green-700 bg-transparent outline-none"
                    pattern="[A-Za-z][A-Za-z0-9\s\-]*"
                    minLength="2"
                    maxLength="30"
                  />
                </label>

                {/* Hunger */}
                <label className="input flex items-center gap-2 border border-green-300 px-3 py-2 rounded focus-within:ring-2 focus-within:ring-green-400 bg-base-100">
                  <span className="font-semibold">Hunger:</span>
                  <input
                    type="number"
                    name="hunger"
                    value={petData.hunger}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full text-green-700 bg-transparent outline-none"
                    required
                  />
                </label>

                {/* Happiness */}
                <label className="input flex items-center gap-2 border border-green-300 px-3 py-2 rounded focus-within:ring-2 focus-within:ring-green-400">
                  <span className="font-semibold">Happiness:</span>
                  <input
                    type="number"
                    name="happiness"
                    value={petData.happiness}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full text-green-700 bg-transparent outline-none"
                    required
                  />
                </label>

                {/* Energy */}
                <label className="input flex items-center gap-2 border border-green-300 px-3 py-2 rounded focus-within:ring-2 focus-within:ring-green-400">
                  <span className="font-semibold">Energy:</span>
                  <input
                    type="number"
                    name="energy"
                    value={petData.energy}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full text-green-700 bg-transparent outline-none"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="btn mt-4 bg-green-500 hover:bg-green-600 text-white border-none"
                >
                  Create Pet
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-80 flex items-center justify-center z-50">
          <Lottie animationData={currentAnimation} loop />
        </div>
      )}
    </div>
  );
}

export default CreatePetPage;
