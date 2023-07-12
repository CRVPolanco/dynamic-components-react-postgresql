import { useState, useEffect } from 'react';
import { parseData } from '../../utils/parseData';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Dialog = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/global/products', {
        method: 'GET',
      });
      const _data = await response.json();
      const maraña = parseData(_data);

      setData(maraña);
    };
    fetchData();
  }, []);

  return(
    <section className="Dialog">
      <h2>Maintenance TABLE NAME</h2>
      <div className='Dialog__tables'>
        {data.map((elem) => {
          const getKey = Object.keys(elem);
          return (
            <ul key={`list__${getKey}`}>
              {elem[getKey].map((vals) => (
                <li key={`list__item--${vals}`}>{vals}</li>
              ))}
            </ul>
          )
        })}
      </div>
      <div className='Dialog__NewData'>
        <h2>Add new data</h2>
        <Input placeholder="id" />
        <Input placeholder="First Name" />
        <Input placeholder="Birth Date" />
        <Input placeholder="User Id" />
      </div>
      <div className='Dialog__buttons'>
        <Button title="Insert" />
        <Button title="Update" />
        <Button title="Delete" />
        <Button title="Clear all" />
      </div>
    </section>
  )
};

export default Dialog;
