import React, { useState, useEffect } from 'react';
import Container from '../../components/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import axios from 'axios';
import {Base_URL} from '../../config/api'

const StorePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleEdit = () => {
    console.log(id, 'is edited');
    navigate(PATHS.STORES.EDIT.replace(':id', id));
  };

  useEffect(() => {
    (
     async () => {
      setIsLoading(true);
      try {
        const {data} = await axios.get(`${Base_URL}/stores/${id}`);
        setStore(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching store data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    )();
  }, [id]);

  return (
    <Container>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Store {store?.id}</h1>
          <h2>{store?.name}</h2>
          <p>{store?.cities}</p>
        </>
      )}
      <button onClick={handleEdit}>Edit</button>
    </Container>
  );
};

export default StorePage;
