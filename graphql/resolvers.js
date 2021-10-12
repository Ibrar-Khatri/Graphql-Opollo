const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const { studentModal } = require("../module/studentModal");

const resolvers = {
	Query: {
		getAllStudents: async () => {

			let allStudnets =await studentModal.find({}, ((err, stu) => {
				if (err) {
					console.log('error in gettting all students')
				}
				// console.log(stu)
				return stu
			}))
			console.log(allStudnets)
			return allStudnets
		},
	},
	Mutation: {
		addStudent: async (e, { input }) => {
			let addNewStudentInDB = new studentModal(input);
			let studentAdded;
			await addNewStudentInDB.save((err, stu) => {
				if (err) {
					console.log("Error in saving students");
				}
				pubsub.publish("STUDENTADDED", { newStudent: stu });
				return;
			});
		},
		// updateStudent: (e, { input }) => {
		// 	students.forEach((stu) => {
		// 		if (stu.id === input.id) {
		// 			stu.name = input.name;
		// 			stu.age = input.age;
		// 		}
		// 		console.log(stu);
		// 	});
		// 	pubsub.publish("UPDATESTUDENT", { updateStud: input });
		// 	return input;
		// },
		// deleteStudent: (e, { input }) => {
		// 	console.log(input.id);
		// 	students.forEach((stu, i) => {
		// 		if (stu.id === input.id) {
		// 			students.splice(i, 1);
		// 		}
		// 	});
		// 	pubsub.publish("STUDENTREMOVED", { removeStud: input });
		// 	return input;
		// },
	},
	Subscription: {
		newStudent: {
			subscribe: () => pubsub.asyncIterator(["STUDENTADDED"]),
		},
		// removeStud: {
		// 	subscribe: () => pubsub.asyncIterator(["STUDENTREMOVED"]),
		// },
		// updateStud: {
		// 	subscribe: () => pubsub.asyncIterator(["UPDATESTUDENT"]),
		// },
	},
};

module.exports = resolvers;
