const inputFunc = (data) => {
  let str = '';
  for(let i=0; i<data.length; i++){

    data += `<Input value={${data[i].column_name}} setValue={set${data[i].column_name}} placeholder={${data[i].column_name}} />
    `;
  }
  return str;
}

module.exports = inputFunc;
