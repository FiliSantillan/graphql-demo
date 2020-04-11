"use strict";

const api = require("./api");
const errorHandler = require("./errorHandler");

const BASE_URL = "http://localhost:3001";

module.exports = {
  Course: {
    people: async ({ people }) => {
      let ids = people ? people : [];
      let students;
      let peopleData;

      try {
        students = await api.getData(`${BASE_URL}/students`);
        peopleData = ids.length > 0 ? students.filter((student) => {
          return ids.includes(student.id);
        }) : [];
      } catch (error) {
        errorHandler(error);
      }

      return peopleData;
    },
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) {
        return "Monitor";
      }

      return "Student";
    },
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) {
        return "Course";
      }

      if (item.phone) {
        return "Monitor";
      }

      return "Student";
    },
  },
};
