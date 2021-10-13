const { gql } = require("apollo-server");

const typeDefs = gql`
	type subjectSchema {
		english: String
		urdu: String
		math: String
	}
	type studentSchema {
		id: ID!
		name: String
		stuClass: String
		subjects: subjectSchema
	}
	input subjectsInput {
		english: String
		urdu: String
		math: String
	}
	input studentInput {
		name: String
		stuClass: String
		subjects: subjectsInput
	}
	input updateStud {
		id: ID
		name: String
		stuClass: String
		subjects: subjectsInput
	}
	input deleteStu {
		id: ID
	}
	type Query {
		getAllStudents: [studentSchema]
	}
	type Mutation {
		addStudent(input: studentInput): studentSchema
		deleteStudent(input: deleteStu): studentSchema
		updateStudent(input: updateStud): studentSchema
	}
	type Subscription {
		newStudent: studentSchema
		removeStud: studentSchema
		updateStud: studentSchema
	}
`;

module.exports = typeDefs;
