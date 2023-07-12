const fs = require('fs');
const path = require('path');

const commonPath = "/home/kajlo/Documentos/Uru/react-homework/frontend/src/maintenance/dialogs/";
const API = "http://192.168.1.113:3000/api/global";

const createLayout = (catalog) => {

  for(let i=0; i<catalog.length; i++){
    fs.writeFile(path.join(commonPath, `Maintenance_dialog_${catalog[i].table_schema.table_name}.jsx`), `import { useState, useEffect } from 'react';
import { parseData } from '../../utils/parseData';
import { postFunction, updateFunction, deleteFunction, clearAllFunction } from '../../utils/fetchData';
import Input from '../../components/Input';
import Button from '../../components/Button';

const API = "http://192.168.1.113:3000/api/global";

const Maintenance_dialog_${catalog[i].table_schema.table_name} = () => {

  const [data, setData] = useState([]);
  const [hasOcurredSomething, setHasOcurredSomething] = useState(false);
  ${`${catalog[i].table_datatypes.map((val) => {
    return `const [${val.column_name}, set${val.column_name.charAt(0)}${val.column_name.substring(1, val.column_name.length)}] = useState('');
  `})}`.replaceAll(',const', 'const')}

  const ColumnsObject = {${catalog[i].table_datatypes.map((val) => { return ` ${val.column_name}`})} };

  const clearAllInputs = () => {
    ${`${catalog[i].table_datatypes.map((val) => {
      return `set${val.column_name.charAt(0)}${val.column_name.substring(1, val.column_name.length)}('');
    `})}`.replaceAll(',', '')}
  };

  const eventOcurred = () => setHasOcurredSomething(!hasOcurredSomething);

  const handleInsert = async () => {
    await postFunction(API, { tableObjetive: '${catalog[i].table_schema.table_name}', ...ColumnsObject });
    eventOcurred();
    clearAllInputs();
  }
  const handleUpdate = async () => {
    await updateFunction(API + '/' + id , { tableObjetive: '${catalog[i].table_schema.table_name}', ...ColumnsObject });
    eventOcurred();
    clearAllInputs();
  }

  const handleDelete = async () => {
    await deleteFunction(API + '/${catalog[i].table_schema.table_name}/' + id);
    eventOcurred();
    clearAllInputs();
  }

  const handleClearAll = async () => {
    await clearAllFunction(API + '/${catalog[i].table_schema.table_name}');
    eventOcurred();
    clearAllInputs();
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('${API}/${catalog[i].table_schema.table_name}', {
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
      <h2>Maintenance ${catalog[i].table_schema.table_name}</h2>
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
        ${`${catalog[i].table_datatypes.map((val) => {
          return `<Input value={${val.column_name}} setValue={set${val.column_name.charAt(0)}${val.column_name.substring(1, val.column_name.length)}} placeholder="${val.column_name}" />
        `})}`.replaceAll(',', '')}
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

export default Maintenance_dialog_${catalog[i].table_schema.table_name};`, (err => {
      if(err) {
        console.error('error');
      }
    }))

  }

}

module.exports = { createLayout };
