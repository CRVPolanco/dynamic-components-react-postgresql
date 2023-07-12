import { useState, useEffect } from 'react';
import { parseData } from '../../utils/parseData';
import { postFunction, updateFunction, deleteFunction, clearAllFunction } from '../../utils/fetchData';
import Input from '../../components/Input';
import Button from '../../components/Button';

const API = "http://192.168.1.113:3000/api/global";

const Maintenance_dialog_users = () => {

  const [data, setData] = useState([]);
  const [hasOcurredSomething, setHasOcurredSomething] = useState(false);
  const [id, setid] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  

  const ColumnsObject = { id, password, email };

  const clearAllInputs = () => {
    setid('');
    setpassword('');
    setemail('');
    
  };

  const eventOcurred = () => setHasOcurredSomething(!hasOcurredSomething);

  const handleInsert = async () => {
    await postFunction(API, { tableObjetive: 'users', ...ColumnsObject });
    eventOcurred();
    clearAllInputs();
  }
  const handleUpdate = async () => {
    await updateFunction(API + '/' + id , { tableObjetive: 'users', ...ColumnsObject });
    eventOcurred();
    clearAllInputs();
  }

  const handleDelete = async () => {
    await deleteFunction(API + '/users/' + id);
    eventOcurred();
    clearAllInputs();
  }

  const handleClearAll = async () => {
    await clearAllFunction(API + '/users');
    eventOcurred();
    clearAllInputs();
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://192.168.1.113:3000/api/global/users', {
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
      <h2>Maintenance users</h2>
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
        <Input value={password} setValue={setpassword} placeholder="password" />
        <Input value={email} setValue={setemail} placeholder="email" />
        
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

export default Maintenance_dialog_users;