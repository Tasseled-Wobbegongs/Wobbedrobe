export function requestWobbedrobeAdd(category, body) {
  return fetch(`wobbedrobe/add/${category}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: add to wobbedrobe: ERROR', err));
}

export function requestWobbedrobeGet(category) {
  return fetch(`wobbedrobe/get/${category}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) =>
      console.log('App: reading wobbedrobe ', category, ': ERROR: ', err)
    );
}

export function requestWobbedrobeUpdate(category, id, body) {
  return fetch(`wobbedrobe/update/${category}/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: update wobbedrobe: ERROR', err));
}

export function requestWobbedrobeDelete(category, id) {
  return fetch(`wobbedrobe/delete/${category}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: delete wobbedrobe item: ERROR: ', err));
}
