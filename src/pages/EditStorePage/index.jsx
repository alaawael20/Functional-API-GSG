import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { H1 } from '../../components/Typography';
import Container from '../../components/Container';
import { PATHS } from '../../router/paths';
import { Navigate, useParams } from 'react-router-dom';
import StoreForm from '../../components/StoreForm';
import { Base_URL } from '../../config/api'

const EditStorePage = () => {
  const { id } = useParams();
  const [store, setStore] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGoToListPage, setIsGoToListPage] = useState(false);

  useEffect(() => {
    axios.get(`${Base_URL}/stores/${id}`) 
      .then((response) => {
        setStore(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, [id]);

  const handleEditStore = async (body) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        Base_URL
        +
        `/stores/${id}`,
        body
      );
      console.log(res.data);
      setStore(res.data);
      setIsLoading(false);
      setIsGoToListPage(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Container>
        <H1>Edit Store {id}</H1>

        <StoreForm store={store} handleSubmit={handleEditStore} isLoading={isLoading} />
      </Container>
      {isGoToListPage && <Navigate to={PATHS.STORES.ROOT} replace />}
    </div>
  );
};

export default EditStorePage;
