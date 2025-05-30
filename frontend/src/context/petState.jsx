import PetContext from "./petContext";
import { useState, useEffect } from "react";
import axios from "axios";

// Animation imports
import A3Animation from '../assets/Animal Sample/A3.json'; // navigation animation
import PlayingAnimation from '../assets/Animal Sample/A2.json';
import SleepingAnimation from '../assets/Animal Sample/A4.json';
import EatingAnimation from '../assets/Animal Sample/A6.json';

const PetState = (props) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [petInfo, setPetInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(null);

  const infoGetter = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/profile/getuser');
      setProfileInfo(response.data);
    } catch (error) {
      console.error('Some Error Occurred!!');
    }
  };

  const petGetter = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/pets/fetchpet');
      setPetInfo(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updatePetOnServer = async (updatedStats) => {
    try {
      await axios.put('http://127.0.0.1:5000/api/pets/updatepet', {
        hunger: updatedStats.hunger,
        happiness: updatedStats.happiness,
        energy: updatedStats.energy
      });
    } catch (error) {
      console.error("Failed to update pet on server:", error);
    }
  };

  const handleNavigation = (navigate, to) => {
    setIsLoading(true);
    setCurrentAnimation(A3Animation);
    setTimeout(() => {
      setIsLoading(false);
      navigate(to);
    }, 300); // short delay for nav animation
  };

  useEffect(() => {
    infoGetter();
    petGetter();
  }, []);

  useEffect(() => {
  if (!petInfo) return;

  const interval = setInterval(() => {
    setPetInfo((prev) => {
      if (!prev?.petInfo) return prev;

      const updatedStats = {
        hunger: Math.max(prev.petInfo.hunger - 1, 0),
        happiness: Math.max(prev.petInfo.happiness - 0.5, 0),
        energy: Math.max(prev.petInfo.energy - 0.7, 0),
        name: prev.petInfo.name // ✅ preserve name
      };

      updatePetOnServer(updatedStats);

      return {
        ...prev,
        petInfo: updatedStats, // 🛠️ includes full data again
      };
    });
  }, 50000);

  return () => clearInterval(interval);
}, [petInfo]);

  const triggerActionWithAnimation = (animationData, statUpdater) => {
    setIsLoading(true);
    setCurrentAnimation(animationData);

    setTimeout(() => {
      statUpdater();
      setIsLoading(false);
    }, 2000); // Show animation for 5 seconds
  };

  const feedPet = () => {
    triggerActionWithAnimation(EatingAnimation, () => {
      setPetInfo((prev) => {
        const updatedStats = {
          ...prev.petInfo,
          hunger: Math.min(prev.petInfo.hunger + 20, 100),
        };
        updatePetOnServer(updatedStats);
        return {
          ...prev,
          petInfo: updatedStats,
        };
      });
    });
  };

  const playWithPet = () => {
    triggerActionWithAnimation(PlayingAnimation, () => {
      setPetInfo((prev) => {
        const updatedStats = {
          ...prev.petInfo,
          happiness: Math.min(prev.petInfo.happiness + 20, 100),
        };
        updatePetOnServer(updatedStats);
        return {
          ...prev,
          petInfo: updatedStats,
        };
      });
    });
  };

  const restPet = () => {
    triggerActionWithAnimation(SleepingAnimation, () => {
      setPetInfo((prev) => {
        const updatedStats = {
          ...prev.petInfo,
          energy: Math.min(prev.petInfo.energy + 20, 100),
        };
        updatePetOnServer(updatedStats);
        return {
          ...prev,
          petInfo: updatedStats,
        };
      });
    });
  };

  return (
    <PetContext.Provider value={{
      profileInfo,
      infoGetter,
      petInfo,
      petGetter,
      isLoading,
      handleNavigation,
      currentAnimation,
      feedPet,
      playWithPet,
      restPet
    }}>
      {props.children}
    </PetContext.Provider>
  );
};

export default PetState;
