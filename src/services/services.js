const urlBase = 'https://house-rules-jgwrbs.herokuapp.com/api/';

const services = {
  fetchGameList: () => {
    return fetch(urlBase + 'gameList')
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data;
    })
  },
  deleteGame: (gameId) => {
    fetch(`${urlBase}game/${gameId}/delete`, {
      method: "DELETE"
    })
    .then(response => {
      console.log("DELETE SUCCESSFUL: ", response);
    })
    .catch(error => {
      console.log("Failure to delete: ", error);
    })
  },
  deleteHouseRules: (gameId, rulesId) => {
    fetch(`${urlBase}game/${gameId}/alternate/${rulesId}/delete`, {
      method: "DELETE"
    })
    .then(response => {
      console.log("DELETE SUCCESSFUL: ", response);
    })
    .catch(error => {
      console.log("FAILURE TO DELETE: ", error);
    })
  },
  fetchSingleGame: (id) => {
     return fetch(`${urlBase}game/${id}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      return data;
    })
  },
  addHouseRules: (gameId, body) => {
    return fetch(`${urlBase}game/${gameId}/alternate`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log("Response data: ",data);
      return data;
    })
    .catch(error => {
      console.log("ERROR: ", error);
      return error;
    })
  },
  addGame: (gameItem) => {
    return fetch("https://house-rules-jgwrbs.herokuapp.com/api/game/new",
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
      console.log("ERROR: ", err);
      return;
    });
  }
}

export default services;
