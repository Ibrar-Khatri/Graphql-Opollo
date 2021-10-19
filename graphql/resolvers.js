const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const { studentModal } = require("../module/studentModal");

const resolvers = {
	Query: {
		getAllStudents: async () => {
			let allStudnets = await studentModal.find({});
			return allStudnets;
		},
		searchedStudent: async (e, { input }) => {
			console.log(input)
			// let query = {}
			// if (input.stuClass) query = { ...query, stuClass: input.stuClass }
			// Object.entries(input.subjects).map(item => query[item[0]] = item[1])
			// console.log(query)
			return await studentModal.find({
				$or: [
					{ stuClass: input.stuClass },
					{ english: input.subjects.english },
					{ urdu: input.subjects.urdu },
					{ math: input.subjects.math },
					
				]
			})
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
				pubsub.publish("NEWSTUDENTADDED", { newStudent: stu });
				return;
			});
		},
		deleteStudent: async (e, { input }) => {
			console.log("inputed id", input.id);
			studentModal.deleteOne({ _id: input.id }, (err, studenDeleted) => {
				if (err) {
					console.log("Error in Student Delete");
				}
				console.log(studenDeleted);
				pubsub.publish("STUDENTREMOVED", { removeStud: { id: input.id } });
				return;
			});
		},
		updateStudent: async (e, { input }) => {
			let updates = {
				name: input.name,
				stuClass: input.stuClass,
				subjects: input.subjects,
			};
			studentModal.updateMany(
				{ _id: input.id },
				updates,
				(err, studendUpdated) => {
					if (err) {
						console.log("Error in Student Delete");
					}
					pubsub.publish("STUDENTUDPATED", { updateStud: input });
					return;
				},
			);
		},
	},
	Subscription: {
		newStudent: {
			subscribe: () => pubsub.asyncIterator(["NEWSTUDENTADDED"]),
		},
		removeStud: {
			subscribe: () => pubsub.asyncIterator(["STUDENTREMOVED"]),
		},
		updateStud: {
			subscribe: () => pubsub.asyncIterator(["STUDENTUDPATED"]),
		},
	},
};

module.exports = resolvers;
