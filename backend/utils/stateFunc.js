const stateFunc = (data) => {
  let str = ``;
  for(let i=0; i<data; i++){
    str += `const [${data[i].column_name}, set${data[i].column_name}] = useState('');
    `
  }
  return str;
}

module.exports = stateFunc;
