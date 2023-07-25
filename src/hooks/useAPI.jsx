import axios from 'axios';
import { useState } from 'react';

const useAPI = (url, config) => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const get = async (getConfig) => {
    try {
      const res = await axios.get(url, { ...config, ...getConfig });
      setIsLoading(true);
      setData(res.data);
      console.log(res.data)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSingle = async (id, getConfig) => {
    try {
      const res = await axios.get(`${url}/${id}`, { ...config, ...getConfig });
      setIsLoading(true);
      setItem(res?.data?.data || res?.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const post = async (cities) => {
  try {
    const res = await axios.post(url, cities, config); // Corrected the method to axios.post
    setIsLoading(true);
    setData((prevState) => [...prevState, res.data.data]);
    setMessage('Success!');
  } catch (error) {
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

const put = async (cities) => {
  try {
    const res = await axios.put(url, cities, config); // Corrected the method to axios.put
    setIsLoading(true);
    setData((prevState) =>
      prevState.map((item) => (item.id === cities.id ? res.data.data : item))
    );
    setMessage('Success!');
  } catch (error) {
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

  const del = async (id) => {
    try {
      await axios.delete(`${url}/${id}`, config);
      setData((prevState) => prevState.filter((item) => item.id !== id));
      setIsLoading(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    message,
    get,
    post,
    put,
    del,
    getSingle,
    item,
  };
};

export default useAPI;
