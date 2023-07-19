import React, { useState, useEffect } from 'react';
import Container from '../../components/Container';
import { Navigate, useParams } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import WithParams from './../../components/WithParams/index';
import axios from 'axios';

const StorePage = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    console.log(id, 'is edited');
    setIsEditing(true);
  };

  useEffect(() => {
    (
     async () => {
      try {
        const response = await axios.get(`https://some-data.onrender.com/stores/${id}`);
        setStore(response.data);
      } catch (error) {
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
          <h1>Store {store.id}</h1>
          <h2>{store?.name}</h2>
          <p>{store.cities}</p>
        </>
      )}
      <button onClick={handleEdit}>Edit</button>
      {isEditing && <Navigate to={PATHS.STORES.EDIT.replace(':id', id)} replace />}
    </Container>
  );
};

export default WithParams(StorePage);
