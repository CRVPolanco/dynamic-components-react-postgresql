import { useState, useEffect } from 'react';
import { parseData } from '../../utils/parseData';
import { postFunction, updateFunction, deleteFunction, clearAllFunction } from '../../utils/fetchData';
import Input from '../../components/Input';
import Button from '../../components/Button';

const API = "http://192.168.1.113:3000/api/global";

const Maintenance_dialog_clients = () => {

  const [data, setData] = useState([]);
  const [hasOcurredSomething, setHasOcurredSomething] = useState(false);
  const [id, setid] = useState('');
  const [full_name, setfull_name] = useState('');
  const [birth_date, setbirth_date] = useState('');
  const [user_id, setuser_id] = useState('');
  

  const ColumnsObject = { id, full_name, birth_date, user_id };

  const clearAllInputs = () => {
    setid('');
    setfull_name('');
    setbirth_date('');
    setuser_id('');
    
  };

  const eventOcurred = () => setHasOcurredSomething(!hasOcurredSomething);

  const handleInsert = async () => {
    await postFunction(API, { tableObjetive: 'clients', ...ColumnsObject });
    eventOcurred();
    clearAllInputs();
  }
  const handleUpdate = async () => {
    await updateFunction(API + '/' + id , { tableObjetive: 'clients', ...ColumnsObject });
    eventOcurred();
    clearAllInputs();
  }

  const handleDelete = async () => {
    await deleteFunction(API + '/clients/' + id);
    eventOcurred();
    clearAllInputs();
  }

  const handleClearAll = async () => {
    await clearAllFunction(API + '/clients');
    eventOcurred();
    clearAllInputs();
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://192.168.1.113:3000/api/global/clients', {
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
      <h2>Maintenance clients</h2>
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
        <Input value={full_name} setValue={setfull_name} placeholder="full_name" />
        <Input value={birth_date} setValue={setbirth_date} placeholder="birth_date" />
        <Input value={user_id} setValue={setuser_id} placeholder="user_id" />
        
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

export default Maintenance_dialog_clients;