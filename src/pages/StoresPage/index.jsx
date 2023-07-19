import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Table';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import { STORES_COLUMNS } from '../../constants/stores';
import { Container } from './../../components/Container/index';
import './style.css'

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowId, setRowId] = useState("");
  const [editId, setEditId] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get('https://some-data.onrender.com/stores')
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
      await axios.delete(`https://some-data.onrender.com/stores/${id}`);
      setStores((prevStores) => prevStores.filter((store) => store.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    console.log(id, 'is edited');
    setEditId(id);
  };

  const handleView = (row) => {
    console.log(row.id, 'is viewed');
    setRowId(row.id);
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

      {rowId && <Navigate to={`${rowId}`} replace />}
      {editId && (
        <Navigate
          to={PATHS.STORES.EDIT.replace(':id', editId)}
          replace
        />
      )}
      {isCreating && <Navigate to={PATHS.STORES.CREATE} replace />}
    </Container>
  );
};

export default StoresPage;
