import React, { useState, useEffect } from 'react';
import './style.css';

const inputsArray = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    id: 'cities',
    name: 'cities',
    type: 'text',
    label: 'Cities',
  },
];

const StoreForm = ({ store, handleSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [cities, setCities] = useState('');
  const [isGetFirstTimeData, setIsGetFirstTimeData] = useState(true);

  useEffect(() => {
    if (store && isGetFirstTimeData) {
      setName(store.name);
      setCities(store.cities);
      setIsGetFirstTimeData(false);
    }
  }, [store, isGetFirstTimeData]);

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'cities') {
      setCities(value);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      name,
      cities,
    };

    handleSubmit(data);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      {inputsArray.map((input) => (
        <div className='inputForm' key={input.id}>
          <label htmlFor={input.id}>{input.label}</label>
            <input
              type={input.type}
              id={input.id}
              name={input.name}
              value={input.name === 'name' ? name : cities}
              onChange={handleChangeInput}
              style={{
                padding: 10,
                width: 300,
              }}
            />
        </div>
      ))}
      <button type='submit'>{isLoading ? 'Loading...' : 'Submit'}</button>
    </form>
  );
};

export default StoreForm;
