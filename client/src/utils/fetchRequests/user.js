export function requestUserLogin(body) {
  // body = {username: String, password: string}
  return fetch('user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: log in: ERROR', err));
}

export function requestUserSignup(body) {
  // body = {username: String, password: string}
  return fetch('user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: log in: ERROR', err));
}

export function requestGetUser(id) {
  return fetch(`user/get/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: get user: ERROR', err));
}
