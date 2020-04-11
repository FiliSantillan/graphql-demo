"use strict";

const fetch = require("node-fetch");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

module.exports = {
  getData: async (url) => {
    let data = await fetch(url);
    return data.json();
  },

  setData: async (url, input) => {
    let data = await fetch(url, {
      headers,
      method: "POST",
      body: JSON.stringify(input),
    });
    return data.json();
  },

  editData: async (url, input) => {
    let data = await fetch(url, {
      headers,
      method: "PATCH",
      body: JSON.stringify(input),
    });
    return data.json();
  },
};
