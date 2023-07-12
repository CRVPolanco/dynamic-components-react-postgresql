const fs = require('fs');
const path = require('path');

const commonPath = "/home/kajlo/Documentos/Uru/react-homework/frontend/src/maintenance/cards/";

/*
const DialogCard = () => {
  return (
    <article className='DialogCard'>
      <h3>Table Name</h3>
      <p>Rows: 122</p>
    </article>
  );
}

export default DialogCard;

*/

const createCard = (catalog) => {
  for(let i=0; i<catalog.length; i++){

    fs.writeFile(path.join(commonPath,
      `Maintenance_card_${catalog[i].table_schema.table_name}.jsx`),

      `const Maintenance_card_${catalog[i].table_schema.table_name} = ({ handleSelect }) => {

  return (
    <article className='DialogCard' onClick={() => handleSelect('Maintenance_dialog_${catalog[i].table_schema.table_name}')}>
      <h3>${catalog[i].table_schema.table_name.charAt(0).toUpperCase()}${catalog[i].table_schema.table_name.substring(1, catalog[i].table_schema.table_name.length)}</h3>
    </article>
  )
}

export default Maintenance_card_${catalog[i].table_schema.table_name};
`, (err) => {
  if(err){
    console.error(err);
  }
});

  }

}

module.exports = { createCard };
