import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import { STORES_COLUMNS } from '../../constants/stores';
import { Container } from './../../components/Container/index';
import {Base_URL} from './../../config/api'
import './style.css'
import useAPI from './../../hooks/useAPI';

const StoresPage = () => {
  const navigate = useNavigate();
  const { get, del, data, isLoading} = useAPI(Base_URL + '/stores');

  useEffect(() => {
    get();
  }, []);

  const handleDelete = async (id) => {
    del(id);
  };

  const handleEdit = (id) => {
    navigate(PATHS.STORES.EDIT.replace(':id', id));
  };

  const handleView = (row) => {
    navigate(PATHS.STORES.VIEW.replace(':id', row.id));
  };

  return (
    <Container>
      <h1>Stores</h1>
      <button onClick={() => navigate(PATHS.STORES.CREATE)}>Create Store</button>
      <Table
        columns={STORES_COLUMNS(handleDelete, handleEdit)}
        data={data}
        onRowClick={handleView}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default StoresPage;
