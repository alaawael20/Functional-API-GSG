import React, { useState, useEffect } from 'react';
import Container from '../../components/Container';
import { Navigate, useParams } from 'react-router-dom';
import { PATHS } from '../../router/paths';

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
    fetch(`https://some-data.onrender.com/stores/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStore(data);
        setIsLoading(false);
      });
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

export default StorePage;
