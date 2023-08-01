import React, { useState } from 'react';
import axios from 'axios';
import { H1 } from '../../components/Typography';
import Container from '../../components/Container';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import StoreForm from '../../components/StoreForm';
import {Base_URL} from '../../config/api'

const CreateStorePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoToListPage, setIsGoToListPage] = useState(false);

  const handleCreateStore = async (body) => {
    setIsLoading(true);
    try {
      await axios.post(Base_URL + '/stores', body);
      setIsLoading(false); 
      setIsGoToListPage(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Container>
        <H1>Create Store</H1>

        <StoreForm handleSubmit={handleCreateStore} isLoading={isLoading} />
      </Container>
      {isGoToListPage && <Navigate to={PATHS.STORES.ROOT} />}
    </div>
  );
};

export default CreateStorePage;
