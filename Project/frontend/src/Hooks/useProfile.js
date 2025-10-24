// src/hooks/useProfile.js
import { useState, useEffect } from 'react';
import * as userApi from '../api/user';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getProfile();
      setProfile(response.data);
    } catch (err) {
      setError(err.message);
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
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (passwords) => {
    try {
      await userApi.changePassword(passwords);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, updateProfile, changePassword, fetchProfile };
};