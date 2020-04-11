"use strict";

const api = require("./api");
const errorHandler = require("./errorHandler");

const BASE_URL = "http://localhost:3001";

module.exports = {
  getCourses: async () => {
    let courses;

    try {
      courses = await api.getData(`${BASE_URL}/courses`);
    } catch (error) {
      errorHandler(error);
    }

    return courses;
  },
  getCourse: async (root, args) => {
    let course;

    try {
      course = await api.getData(`${BASE_URL}/courses/${args.id}`);
    } catch (error) {
      errorHandler(error);
    }

    return course;
  },
  getPeople: async () => {
    let students;

    try {
      students = await api.getData(`${BASE_URL}/students`);
    } catch (error) {
      errorHandler(error);
    }

    return students;
  },
  getPerson: async (root, args) => {
    let student;

    try {
      student = await api.getData(`${BASE_URL}/students/${args.id}`);
    } catch (error) {
      errorHandler(error);
    }

    return student;
  },
  searchItems: async (root, { keyword }) => {
    let courses;
    let people;
    let items;

    try {
      courses = await api.getData(`${BASE_URL}/courses?q=${keyword}`);
      people = await api.getData(`${BASE_URL}/students?q=${keyword}`);
      items = [...courses, ...people];
    } catch (error) {
      errorHandler(error);
    }

    return items;
  },
};
