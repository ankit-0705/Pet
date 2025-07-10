import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import PetContext from '../context/petContext';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_API_BASE_URL;

function ProfilePage() {
  const navigate = useNavigate();
  const {
    isLoading,
    handleNavigation,
    currentAnimation,
    petInfo,
    petGetter,
  } = useContext(PetContext);

  const [profile, setProfile] = useState({ name: '', email: '', location: '' });
  const [editMode, setEditMode] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [message, setMessage] = useState('');

  const [petData, setPetData] = useState({
  name: '',
  hunger: 0,
  happiness: 0,
  energy: 0,
  });
  const [editPetMode, setEditPetMode] = useState(false);
  const [petMessage, setPetMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    try {
      handleNavigation(navigate, '/home');
    } catch (error) {
      console.log('Navigation failed');
    }
  };

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/profile/getuser`);
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setMessage('Failed to load user info.');
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // Load pet info from context
  useEffect(() => {
  if (petInfo?.petInfo) {
    setPetData({
      name: petInfo.petInfo.name,
      hunger: petInfo.petInfo.hunger,
      happiness: petInfo.petInfo.happiness,
      energy: petInfo.petInfo.energy,
    });
  }
}, [petInfo]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: name === 'name' ? value : +value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${backendUrl}/api/profile/updateuser`, profile);
      setMessage(res.data.Success);
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('Failed to update user info.');
    }
  };

  const handlePetUpdate = async () => {
    try {
      const res = await axios.put(`${backendUrl}/api/pets/updatepet`, petData);
      setPetMessage(res.data.Success || 'Pet updated successfully');
      setEditPetMode(false);
      petGetter(); // Refresh pet info in context
    } catch (err) {
      console.error('Pet update failed:', err);
      setPetMessage('Failed to update pet info.');
    }
  };

  return (
    <div className="p-8 min-h-screen bg-base-100">
      <button className="btn btn-outline btn-success mb-6" onClick={handleClick}>
        Get Back
      </button>

      {/* User Profile Section */}
      {loadingProfile ? (
        <div className="text-center text-lg font-semibold">Loading profile...</div>
      ) : (
        <div className="max-w-md mx-auto p-6 bg-base-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

          {message && (
            <div className="alert alert-info shadow-sm mb-4">
              <span>{message}</span>
            </div>
          )}

          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Name</span></label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered"
            />
          </div>

          <div className="form-control mb-6">
            <label className="label"><span className="label-text">Location</span></label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              disabled={!editMode}
              className="input input-bordered"
            />
          </div>

          {editMode ? (
            <div className="flex gap-4">
              <button className="btn btn-success" onClick={handleUpdate}>Save</button>
              <button className="btn btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <button className="btn btn-primary w-full" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>
      )}

      {/* Pet Info Section */}
      {petInfo && (
        <div className="max-w-md mx-auto mt-8 p-6 bg-base-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Pet Info</h2>

          {petMessage && (
            <div className="alert alert-info shadow-sm mb-4">
              <span>{petMessage}</span>
            </div>
          )}

          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Pet Name</span></label>
            <input
              type="text"
              name="name"
              value={petData.name}
              onChange={handlePetChange}
              disabled={!editPetMode}
              className="input input-bordered"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Hunger</span></label>
            <input
              type="number"
              name="hunger"
              value={petData.hunger}
              onChange={handlePetChange}
              disabled={!editPetMode}
              className="input input-bordered"
              min="0"
              max="100"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Happiness</span></label>
            <input
              type="number"
              name="happiness"
              value={petData.happiness}
              onChange={handlePetChange}
              disabled={!editPetMode}
              className="input input-bordered"
              min="0"
              max="100"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Energy</span></label>
            <input
              type="number"
              name="energy"
              value={petData.energy}
              onChange={handlePetChange}
              disabled={!editPetMode}
              className="input input-bordered"
              min="0"
              max="100"
            />
          </div>

          {editPetMode ? (
            <div className="flex gap-4">
              <button className="btn btn-success" onClick={handlePetUpdate}>Save</button>
              <button className="btn btn-ghost" onClick={() => setEditPetMode(false)}>Cancel</button>
            </div>
          ) : (
            <button className="btn btn-secondary w-full" onClick={() => setEditPetMode(true)}>
              Edit Pet Info
            </button>
          )}
        </div>
      )}

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50">
          <Lottie animationData={currentAnimation} loop={true} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
