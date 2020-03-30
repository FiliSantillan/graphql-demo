async function callApi(endpoint, options = {}) {
  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  badges: {
    list() {
      // throw new Error("500: Server Error");
      return callApi("/badges");
      // return [];
    },
    create(badge) {
      // throw new Error("500: Server error");
      return callApi(`/badges`, {
        method: "POST",
        body: JSON.stringify(badge)
      });
    },
    read(badgeId) {
      return callApi(`/badges/${badgeId}`);
    },
    update(badgeId, updates) {
      return callApi(`/badges/${badgeId}`, {
        method: "PUT",
        body: JSON.stringify(updates)
      });
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    remove(badgeId) {
      return callApi(`/badges/${badgeId}`, {
        method: "DELETE"
      });
    }
  }
};

const fetch = require("node-fetch");

module.exports = {
  getData: async url => {
    let data = await fetch(url);
    return data.json();
  },
  setData: async (url, input) => {
    let data = await fetch(url, {
      "Content-Type": "application/json",
      Accept: "application/json",
      method: "POST",
      body: JSON.stringify(input)
    });
    return data.json();
  }
};
