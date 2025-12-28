import { useState, useEffect } from 'react';
import { getComplaints } from '../services/firestore';

export const useComplaints = (userId = null) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const data = await getComplaints(userId);
      setComplaints(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [userId]);

  return { complaints, loading, error, refetch: loadComplaints };
};
