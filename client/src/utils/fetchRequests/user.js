export function requestUserLogin(body) {
  // body = {username: String, password: string}
  fetch('user/login', {
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
  fetch('user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => console.log('App: log in: ERROR', err));
}
