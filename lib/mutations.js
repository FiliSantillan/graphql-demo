"use strict";

const api = require("./api");
const uniqid = require("uniqid");
const errorHandler = require("./errorHandler");

const BASE_URL = "http://localhost:3001";

module.exports = {
  createCourse: async (root, { input }) => {
    let course;

    const defaults = {
      id: uniqid(),
      teacher: "",
      topic: "",
      people: []
    };

    try {
      course = await api.setData(`${BASE_URL}/courses`, {
        ...defaults,
        ...input,
      });
    } catch (error) {
      errorHandler(error);
    }

    return course;
  },
  createPerson: async (root, { input }) => {
    let person

    try {
      person = await api.setData(`${BASE_URL}/students/`, {
        id: uniqid(),
        ...input,
      });
    } catch (error) {
      errorHandler(error);
    }

    return person;
  },
  editCourse: async (root, { id, input }) => {
    let course;

    try {
      course = await api.editData(`${BASE_URL}/courses/${id}`, {
        ...input,
      });
    } catch(error) {
      errorHandler(error);
    }

    return course;
  },
  editPerson: async (root, { id, input }) => {
    let person;

    try {
      person = await api.editData(`${BASE_URL}/students/${id}`, {
        ...input,
      });
    } catch (error) {
      errorHandler(error);
    }

    return person;
  },
  addPeople: async (root, { courseID, personID }) => {

    let course;
    let student;
    let newCourse;

    try {
      course = await api.getData(`${BASE_URL}/courses/${courseID}`);
      student = await api.getData(`${BASE_URL}/students/${personID}`);

      course.people.push(personID);

      newCourse = await api.editData(`${BASE_URL}/courses/${courseID}`, {
        ...course,
      });

    } catch (error) {
      errorHandler(error);
    }

    return newCourse;
  },
};
