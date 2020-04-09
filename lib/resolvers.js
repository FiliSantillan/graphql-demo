const api = require("./api");
const errorHandler = require("./errorHandler");
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
    getPeople: () => {
      let students = api.getData(`${BASE_URL}/students`);
      return students
    },
    getPerson: (root, args) => {
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

      let course = await api.setData(`${BASE_URL}/courses`, {
        ...defaults,
        ...input
      });

      return course;
    },
    createPerson: async (root, { input }) => {

      let student = await api.setData(`${BASE_URL}/students/`, {
        id: uniqid(),
        ...input
      });

      return student;
    },
    editCourse: async (root, { id, input }) => {

      let newCourse = await api.editData(`${BASE_URL}/courses/${id}`, {
        ...input
      })

      return newCourse;
    },
    editPerson: async (root, { id, input }) => {
      let newStudent = await api.editData(`${BASE_URL}/students/${id}`, {
        ...input
      })

      return newStudent;
    },
    addPeople: async (root, { courseID, personID } ) => {

      try {
        let course = await api.getData(`${BASE_URL}/courses/${courseID}`);
        let student = await api.getData(`${BASE_URL}/students/${personID}`);

        // if (isEmpty(course) || isEmpty(student)) {
        //   throw new Error("La persona o curso no existe");
        // }

        course.people.push(personID);

        let newCourse = await api.editData(`${BASE_URL}/courses/${courseID}`, {
          ...course,
        });

        return newCourse;

      } catch(error) {
        errorHandler(error);
      }
    }
  },
  Course: {
    people: async ({ people }) => {
      let ids = people ? people : [];
      let students = await api.getData(`${BASE_URL}/students`);

      let peopleData = ids.length > 0 ? students.filter((student) => {

        return ids.includes(student.id);

        // for(let i = 0; i <= ids.length; i++) {
        //   if(student.id === ids[i]) {
        //     return true;
        //   }
        // }

      }) : [];
      console.log(peopleData);
      return peopleData;
    }
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) {
        return "Monitor"
      }

      return "Student";
    }
  }
};