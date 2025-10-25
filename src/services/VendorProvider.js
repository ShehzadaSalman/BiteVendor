import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signOut } from '../redux/slices/authSlice';

const VendorContext = createContext({
  vendor: null,
  loading: false,
  error: '',
  refresh: async () => {},
  logout: async () => {},
});

export const useVendor = () => useContext(VendorContext);

export const VendorProvider = ({ children }) => {
  const auth = useSelector(state => state.auth);
  const token = auth?.user?.token;
  const dispatch = useDispatch();
  const [vendor, setVendor] = useState(auth?.user?.vendor || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(
        'https://development.bite.com.pk/api/vendor/me',
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000,
        },
      );
      const data = res?.data;
      if (data?.status && data?.vendor) {
        setVendor(data.vendor);
      } else {
        setError('Failed to load profile');
      }
    } catch (e) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post(
          'https://development.bite.com.pk/api/vendor/logout',
          {},
          { headers: { Authorization: `Bearer ${token}` }, timeout: 15000 },
        );
      }
    } catch (e) {
      // proceed regardless of API error
    } finally {
      delete axios.defaults.headers.common.Authorization;
      setVendor(null);
      dispatch(signOut());
    }
  };

  useEffect(() => {
    if (token) {
      // ensure axios default header also set
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      fetchProfile();
    } else {
      setVendor(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = useMemo(
    () => ({ vendor, loading, error, refresh: fetchProfile, logout }),
    [vendor, loading, error],
  );

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
};
