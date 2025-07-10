import React, { useContext, useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PetContext from '../context/petContext';
import Lottie from 'lottie-react';
import animalAnimation from '../assets/Animal Sample/A1.json'; // Update path if needed
const backendUrl = import.meta.env.VITE_API_BASE_URL;

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: ""
  });

  const navigate = useNavigate();
  const { infoGetter, petGetter, profileInfo, isLoading, handleNavigation, currentAnimation } = useContext(PetContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/profile/createuser`, formData);
      await infoGetter();
      await petGetter();
      handleNavigation(navigate, '/pet');
    } catch (error) {
      console.error("Some Error Occurred!!", error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/profile/getuser`);
        if ( response.data && response.data.name) {
          handleNavigation(navigate, '/home');
        }
      } catch (error) {
        console.log('Register First.');
      }
    };
    checkUser();
  }, []);

  return (
    <div className="min-h-screen p-5 flex items-center justify-center bg-gradient-to-br from-purple-100 to-white">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full max-w-5xl relative">

        {/* Form Section */}
        <div className="relative w-full lg:w-2/3 z-10">
          {/* Heading and Animation Side-by-Side */}
          <div className="w-full flex items-center justify-between mb-6">
            {/* Text Content */}
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-purple-600 drop-shadow-[0_0_10px_rgba(147,112,219,0.7)]">
                <Typewriter
                  words={['Welcome!']}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h1>
              <p className="pt-4 text-purple-800">
                Tell us a bit about yourself. This helps us make your experience more delightful!
              </p>
            </div>

            {/* Lottie Animation */}
            <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[150px] lg:h-[150px] block">
              <Lottie animationData={animalAnimation} loop={true} />
            </div>

          </div>

          {/* Form Card */}
          <div className="card bg-white shadow-2xl transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(147,112,219,0.6)] w-full px-6 py-8">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="gap-4 flex flex-col">

                {/* Name Input */}
                <label className="w-full input bg-white text-purple-900 border border-purple-300 focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-purple-500 rounded px-3 py-2 flex items-center gap-2">
                  <svg className="h-[1em] text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </g>
                  </svg>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Username"
                    className="w-full text-purple-700 bg-transparent outline-none"
                    pattern="[A-Za-z][A-Za-z0-9\s\-]*"
                    minLength="3"
                    maxLength="30"
                    title="Only letters, numbers or dash"
                  />
                </label>

                {/* Email Input */}
                <label className="w-full input bg-white text-purple-900 border border-purple-300 focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-purple-500 rounded px-3 py-2 flex items-center gap-2">
                  <svg className="h-[1em] text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </g>
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="mail@site.com"
                    className="w-full text-purple-700 bg-transparent outline-none"
                  />
                </label>

                {/* Location Input */}
                <label className="w-full input bg-white text-purple-900 border border-purple-300 focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-purple-500 rounded px-3 py-2 flex items-center gap-2">
                  <svg className="h-[1em] text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </g>
                  </svg>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="City, State"
                    className="w-full text-purple-700 bg-transparent outline-none"
                    pattern="[A-Za-z\s,]{2,50}"
                    title="Use only letters, commas, and spaces. (2–50 chars)"
                  />
                </label>

                <button
                  type="submit"
                  className="btn mt-4 bg-purple-500 hover:bg-purple-600 text-white border-none"
                >
                  Submit
                </button>
              </form>
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

export default RegisterPage;
