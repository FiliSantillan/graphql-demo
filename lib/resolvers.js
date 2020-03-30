const api = require("./api");
const uniqid = require("uniqid");

const BASE_URL = "http://localhost:3001";

"use strict";

module.exports = {
  Query: {
    getCourses: async () => {
      let courses = api.getData(`${BASE_URL}/courses`);
      return courses;
    },
    getCourse: (root, args) => {
      let course = api.getData(`${BASE_URL}/courses/${args.id}`);
      return course;
    },
    getStudents: () => {
      let students = api.getData(`${BASE_URL}/students`);
      return students
    },
    getStudent: (root, args) => {
      let student = api.getData(`${BASE_URL}/students/${args.id}`);
      return student;
    }
  },
  Mutation: {
    createCourse: async (root, { input }) => {
      const defaults = {
        id: uniqid(),
        teacher: "",
        topic: ""
      };

      let course = await {
        ...defaults,
        ...input,
      }

      // let course = Object.assign(defaults, input);

      let newCourse = await api.setData(`${BASE_URL}/courses`, course);
      return newCourse;
    },
    createStudent: (root, { input }) => {
      api.setData(BASE_URL, input);
      return input;
    },
    editCourse: (root, { _id, input }) => {
      let index = courses.findIndex((object) => object["_id"] === _id);
      courses[index] = input;
      return courses[index];
    },
    editStudent: (root, { _id, input }) => {
      let index = students.findIndex((object) => object["_id"] === _id);
      students[index] = input;
      return students[index];
    },
    addPeople: (root, { courseID, personID } ) => {
      let person = students.findIndex(object => object["_id"] == personID );
      let course = courses.findIndex(object => object["_id"] == courseID);

      if(course < 0 || person < 0) throw new Error("La persona o curso no existe");

      courses[course].people.push(personID);
      return courses[course];
    }
  },
  Course: {
    people: ({ people }) => {
      let ids = people ? people : [];
      let peopleData = ids.length > 0 ? students.filter((student) => {

        return ids.includes(student._id);

        // for(let i = 0; i <= ids.length; i++) {
        //   if(student._id === ids[i]) {
        //     return true;
        //   }
        // }

      }) : [];
      console.log(peopleData);
      return peopleData;
    }
  }
};