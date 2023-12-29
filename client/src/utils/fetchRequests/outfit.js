export function requestOOTDAdd(body) {
  return fetch(`ootd/add/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: add to OOTD: ERROR', err));
}

export function requestOOTDGet(id) {
  return fetch(`ootd/get/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: reading OOTD ', ': ERROR: ', err));
}

export function requestOOTDUpdate(id, body) {
  return fetch(`ootd/update/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: update OOTD: ERROR', err));
}

export function requestOOTDDelete(id) {
  return fetch(`OOTD/delete/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: delete OOTD item: ERROR: ', err));
}
