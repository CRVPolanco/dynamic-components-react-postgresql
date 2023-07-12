import { useState, useEffect } from 'react';
import { parseData } from '../../utils/parseData';
import { postFunction, updateFunction, deleteFunction, clearAllFunction } from '../../utils/fetchData';
import Input from '../../components/Input';
import Button from '../../components/Button';

const API = "http://192.168.1.113:3000/api/global";

const Maintenance_dialog_products = () => {

  const [data, setData] = useState([]);
  const [hasOcurredSomething, setHasOcurredSomething] = useState(false);
  const [id, setid] = useState('');
  const [stock, setstock] = useState('');
  const [price, setprice] = useState('');
  const [name, setname] = useState('');
  

  const ColumnsObject = { id, stock, price, name };

  const clearAllInputs = () => {
    setid('');
    setstock('');
    setprice('');
    setname('');
    
  };

  const eventOcurred = () => setHasOcurredSomething(!hasOcurredSomething);

  const handleInsert = async () => {
    await postFunction(API, { tableObjetive: 'products', ...ColumnsObject });
    eventOcurred();
    clearAllInputs();
  }
  const handleUpdate = async () => {
    await updateFunction(API + '/' + id , { tableObjetive: 'products', ...ColumnsObject });
    eventOcurred();
    clearAllInputs();
  }

  const handleDelete = async () => {
    await deleteFunction(API + '/products/' + id);
    eventOcurred();
    clearAllInputs();
  }

  const handleClearAll = async () => {
    await clearAllFunction(API + '/products');
    eventOcurred();
    clearAllInputs();
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://192.168.1.113:3000/api/global/products', {
        method: 'GET',
      });
      const _data = await response.json();
      const maraña = parseData(_data.length ? _data : [ColumnsObject]);

      setData(maraña);
    };
    fetchData();
  }, [hasOcurredSomething]);



  return(
    <section className="Dialog">
      <h2>Maintenance products</h2>
      <div className='Dialog__tables'>
        {data.map((elem) => {
          const getKey = Object.keys(elem);
          return (
            <ul key={'list__' + getKey}>
              {elem[getKey].map((vals, index) => (
                <li key={'list__item--' + vals + '--' + index}>{vals}</li>
              ))}
            </ul>
          )
        })}
      </div>
      <div className='Dialog__NewData'>
        <h2>Add new data</h2>
        <Input value={id} setValue={setid} placeholder="id" />
        <Input value={stock} setValue={setstock} placeholder="stock" />
        <Input value={price} setValue={setprice} placeholder="price" />
        <Input value={name} setValue={setname} placeholder="name" />
        
      </div>
      <div className='Dialog__buttons'>
        <Button title="Insert" clickEvent={handleInsert} />
        <Button title="Update" clickEvent={handleUpdate} />
        <Button title="Delete" clickEvent={handleDelete} />
        <Button title="Clear all" clickEvent={handleClearAll} />
      </div>
    </section>
  )
};

export default Maintenance_dialog_products;