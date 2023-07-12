export const parseData = (data) => {

  console.log(data);

  const getKeysName = Object.keys(data[0]);
  const getLength = Object.keys(data[0]).length;

  /*

    [
      {
        id,
        email,
        .
        .
        .
      }
    ],

    [
      {
        "id": [id, id1,id2,id3],
      },
      {
        "email": [email, email1,email2,email3],
      }
      .
      .
      .
      {
        "dataN": [dataN, n1, n2, n3],
      }
    ]

  */

  const resultArray = [];

  for(let value=0; value<getLength; value++){
    const keyName = getKeysName[value];
    const equalArray = [];

    data.map((elem) => {
      equalArray.push(elem[keyName]);
    });
    resultArray.push({ [getKeysName[value]]: [...[getKeysName[value]], ...equalArray] });
  }

  console.log(resultArray);

  return resultArray;
}
