import { useState, useEffect } from 'react';

export default function useFetch(url, options) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;

    async function fetchData() {
      setStatus('fetching');
      const response = await fetch(url, options);
      const resData = await response.json();
      setData(resData);
      setStatus('fetched');
    }

    fetchData();
  }, [url]);

  return { status, data };
}
