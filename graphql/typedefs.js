const { gql } = require("apollo-server");

const typeDefs = gql`
	type sucjectSchema {
		english: String
		urdu: String
		math: String
	}
	type studentSchema {
		_id: String
		name: String
		stuClass: String
		subjects: sucjectSchema
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
	input updateStu {
		id: Int
		name: String
		age: Int
	}
	input deleteStu {
		id: Int
	}
	type Query {
		getAllStudents: [studentSchema]
	}
	type Mutation {
		addStudent(input: studentInput): studentSchema
		# updateStudent(input: updateStu): Student
		# deleteStudent(input: deleteStu): Student
	}
	type Subscription {
		newStudent: studentSchema
		# removeStud: Student
		# updateStud: Student
	}
`;

module.exports = typeDefs;
