// const urlBase = 'https://house-rules-jgwrbs.herokuapp.com/api/';
const urlBase = 'https://house-rules-api.herokuapp.com';


// const loginBaseURL = 'https://user-auth-test.herokuapp.com';
const loginBaseURL = 'https://house-rules-api.herokuapp.com';
const api = (path) => loginBaseURL + path;

const services = {
  login: (fields) => {
    return fetch(api('/login'), {
      method: "POST",
      body: JSON.stringify({email: fields.email, password: fields.password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    })
  },
  register: (fields) => {
    return fetch(api('/signup'), {
      method: "POST",
      body: JSON.stringify({email: fields.email, password: fields.password, username: fields.username, confirmPassword: fields.password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    })
  },
  fetchGameList: () => {
    return fetch(`${urlBase}/gameList`)
    .then(response => {
      return response.json();
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    })
  },
  deleteGame: (gameId) => {
    fetch(`${urlBase}/game/${gameId}/delete`, {
      method: "DELETE"
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    })
  },
  deleteHouseRules: (gameId, rulesId) => {
    fetch(`${urlBase}/game/${gameId}/alternate/${rulesId}/delete`, {
      method: "DELETE"
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    })
  },
  fetchSingleGame: (id) => {
     return fetch(`${urlBase}/game/${id}`)
    .then(results => {
      return results.json()
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    })
  },
  addHouseRules: (body) => {
    console.log(body);
    return fetch(`${urlBase}/game/${body.id}/alternate`, {
      method: "POST",
      body: JSON.stringify({title: body.title, objective: body.objective, rules: body.rules, userId: body.userId, gameId: body.id}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      return data;
    }).catch(error => {
      return error;
    })
  },
  addGame: (gameItem) => {
    return fetch(`${urlBase}/game/new`,
      {
        method: "POST",
        body: gameItem,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      return response.json();
    }).then(data => {
      return data;
    }).catch(err => {
      return err;
    });
  }
}

export default services;
