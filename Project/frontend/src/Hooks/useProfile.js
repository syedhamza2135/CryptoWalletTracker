import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import * as userApi from "../api/user.js"

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateUser } = useContext(AuthContext);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getProfile();
      setProfile(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch user profile";
      setError(errorMessage);
      console.error("Fetch Profile error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.updateProfile(data);
      setProfile(response.data);
      updateUser(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update profile';
      setError(errorMessage);
      console.error('Update profile error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (passwords) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.changePassword(passwords);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to change password';
      setError(errorMessage);
      console.error('Change password error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { 
    profile, 
    loading, 
    error, 
    updateProfile, 
    changePassword, 
    fetchProfile 
  };
};