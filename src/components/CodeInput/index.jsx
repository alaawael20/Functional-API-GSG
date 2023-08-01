import { useRef } from 'react';
import "./style.css";

const CodeInput = () => {
  const refs = useRef([]);
  const arr = [1, 2, 3, 4];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.length === 1 && name < refs.current.length - 1) {
      refs.current[+name + 1].focus();
    }
    if (value.length === 0 && name > 0) {
      refs.current[+name - 1].focus();
    }
    if (name === `${arr.length - 1}` && !/^\d{2}$/.test(value)) {
      e.target.value = value.replace(/[^\d]/g, '').slice(0, 2);
    }
  };

  return (
    <div className='code__input'>
      {arr.map((ref, index) => (
        <input
          key={index}
          autoFocus={index === 0}
          ref={(inputRef) => (refs.current[index] = inputRef)}
          name={index}
          type="text"
          onChange={handleChange}
          autocomplete="off"
        />
      ))}
    </div>
  );
};

export default CodeInput;
