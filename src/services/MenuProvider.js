import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchMenu } from './DashboardService';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MenuContext = createContext({
  menu: [],
  loading: false,
  error: '',
  refresh: async () => {},
});

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = useSelector(state => state?.auth?.user?.token);

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const categories = await fetchMenu();
      // categories is already an array of { id, name, menu_items }
      setMenu(Array.isArray(categories) ? categories : []);
    } catch (e) {
      setError(e?.message || 'Failed to fetch menu');
      setMenu([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setMenu([]);
      setError('');
      setLoading(false);
      return;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    load();
  }, [token]);

  const value = useMemo(
    () => ({ menu, loading, error, refresh: load }),
    [menu, loading, error],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
