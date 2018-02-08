const services = {
  fetchGameList: () => {
    return fetch('https://house-rules-jgwrbs.herokuapp.com/api/gameList')
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data;
    })
  },
  deleteGame: (gameId) => {
    fetch(`https://house-rules-jgwrbs.herokuapp.com/api/game/${gameId}/delete`, {
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
    fetch(`https://house-rules-jgwrbs.herokuapp.com/api/game/${gameId}/alternate/${rulesId}/delete`, {
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
     return fetch(`https://house-rules-jgwrbs.herokuapp.com/api/game/${id}`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      return data;
    })
  },
  addHouseRules: (gameId, body) => {
    return fetch(`https://house-rules-jgwrbs.herokuapp.com/api/game/${gameId}/alternate`, {
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
  }
}

export default services;
