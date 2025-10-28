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
    if (!token) {
      console.log('⚠️ VendorProvider: No token available');
      return;
    }
    try {
      console.log('🔄 VendorProvider: Fetching vendor profile...');
      setLoading(true);
      setError('');
      const res = await axios.get(
        'https://development.bite.com.pk/api/vendor/profile',
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000,
        },
      );
      const data = res?.data;
      console.log(
        '📦 VendorProvider: Full API response:',
        JSON.stringify(data, null, 2),
      );

      if (data?.success && data?.data) {
        console.log('✅ VendorProvider: Vendor profile loaded', {
          vendorId: data.data.id,
          vendorName: data.data.name || data.data.restaurant_name,
          fullVendorObject: data.data,
        });
        setVendor(data.data);
      } else if (data?.data) {
        // Handle case where success might be missing but data exists
        console.log(
          '⚠️ VendorProvider: Vendor data exists but success flag missing',
        );
        console.log('Vendor object:', data.data);
        setVendor(data.data);
      } else {
        console.log('❌ VendorProvider: Invalid response format');
        console.log('Response structure:', {
          hasSuccess: !!data?.success,
          hasData: !!data?.data,
          dataKeys: Object.keys(data || {}),
        });
        setError('Failed to load profile');
      }
    } catch (e) {
      console.error('❌ VendorProvider: Failed to load profile', e.message);
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
      console.log('🔑 VendorProvider: Token available, fetching profile...');
      // ensure axios default header also set
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      fetchProfile();
    } else {
      console.log('⚠️ VendorProvider: No token, clearing vendor data');
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
