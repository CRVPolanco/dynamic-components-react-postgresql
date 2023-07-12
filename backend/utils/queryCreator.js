const queryCreator = ( QUERY_TYPE = { insert: false, update: true }, table, obj) => {

  const auxArrKeys = Object.keys(obj);

  for(let i=0; i<auxArrKeys.length; i++) {
    if(obj[auxArrKeys[i]] === '') {
      delete obj[auxArrKeys[i]];
    }
  }

  console.log('Object resultant: ', obj);

  const arrayKeys = Object.keys(obj);
  const arrayValues = Object.values(obj);

  if(!!QUERY_TYPE.insert){
    let query = `INSERT INTO ${table} (`;

    for(let i=0; i<arrayKeys.length; i++){
      if((i + 1) === arrayKeys.length){
        query += `${arrayKeys[i]}) `;
      }else{
        query += `${arrayKeys[i]}, `;
      }
    }
    query += `VALUES (`

    for(let i=0; i<arrayValues.length; i++) {
      if((i + 1) === arrayValues.length){
        query += `$${i+1})`;
      }else{
        query += `$${i+1}, `;
      }
    };
    query += ` RETURNING *;`;

    return {
      query: query,
      values: [...arrayValues],
    };
  }

  if(!!QUERY_TYPE.update){
    let query = `UPDATE ${table} SET `;
    for(let i=0; i<arrayKeys.length; i++){
      console.log(arrayKeys[i])
      if((i + 1) === arrayKeys.length){
        query += `${arrayKeys[i]} = $${i+2} `;
      }else {
        query += `${arrayKeys[i]} = $${i+2}, `;
      }
    }
    query += `WHERE id = $1 RETURNING *;`;

    return {
      query: query,
      values: arrayValues,
    };
  }
}

module.exports = queryCreator;
