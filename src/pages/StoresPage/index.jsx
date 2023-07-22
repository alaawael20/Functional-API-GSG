import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Table';
import { Navigate, useNavigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import { STORES_COLUMNS } from '../../constants/stores';
import { Container } from './../../components/Container/index';
import {Base_URL} from './../../config/api'
import './style.css'

const StoresPage = () => {
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get(Base_URL + '/stores')
          setStores(data)
        } catch (error) {
          console.log(error.message)
          setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }
    )();
  }, []);

  const handleDelete = async (id) => {
    console.log(id, 'is deleted');
    try {
      await axios.delete(`${Base_URL}/stores/${id}`);
      setStores((prevStores) => prevStores.filter((store) => store.id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log(id, 'is edited');
    navigate(PATHS.STORES.EDIT.replace(':id', id));
  };

  const handleView = (row) => {
    console.log(row.id, 'is viewed');
    navigate(PATHS.STORES.VIEW.replace(':id', row.id));
  };

  return (
    <Container>
      <h1>Stores</h1>

      <button onClick={() => setIsCreating(true)}>Create Store</button>

      <Table
        columns={STORES_COLUMNS(handleDelete, handleEdit)}
        data={stores}
        onRowClick={handleView}
        isLoading={isLoading}
      />
      
      {isCreating && <Navigate to={PATHS.STORES.CREATE} replace />}
    </Container>
  );
};

export default StoresPage;
