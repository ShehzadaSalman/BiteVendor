import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const VendorContext = createContext({
  vendor: null,
  loading: false,
  error: '',
  refresh: async () => {},
});

export const useVendor = () => useContext(VendorContext);

export const VendorProvider = ({ children }) => {
  const auth = useSelector(state => state.auth);
  const token = auth?.user?.token;
  const [vendor, setVendor] = useState(auth?.user?.vendor || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(
        'https://development.bite.com.pk/api/vendor/auth/me',
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
    () => ({ vendor, loading, error, refresh: fetchProfile }),
    [vendor, loading, error],
  );

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
};
