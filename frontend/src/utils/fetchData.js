export const postFunction = async (API, body) => {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}

export const updateFunction = async (API, body) => {
  const response = await fetch(API, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}

export const deleteFunction = async (API) => {
  const response = await fetch(API, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data;
}

export const clearAllFunction = async (API) => {
  const response = await fetch(API, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  return data;
}
