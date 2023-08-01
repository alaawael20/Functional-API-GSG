import React, { useEffect } from 'react';
import Container from '../../components/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import {Base_URL} from '../../config/api'
import useAPI from './../../hooks/useAPI';

const StorePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {getSingle, item: store, isLoading} = useAPI(`${Base_URL}/stores`)

  const handleEdit = () => {
    navigate(PATHS.STORES.EDIT.replace(':id', id));
  };

  useEffect(() => {
    getSingle(id);
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
