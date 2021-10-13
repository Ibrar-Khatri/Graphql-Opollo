import { gql } from "@apollo/client";

export const ADD_NEW_STUDENT = gql`
	mutation AddStudent(
		$name: String
		$stuClass: String
		$subjects: subjectsInput
	) {
		addStudent(
			input: { name: $name, stuClass: $stuClass, subjects: $subjects }
		) {
			id
			name
			stuClass
			subjects {
				english
				urdu
				math
			}
		}
	}
`;
export const DELETE_STUDENT = gql`
	mutation DeleteStudent($id: ID) {
		deleteStudent(input: { id: $id }) {
			id
		}
	}
`;

export const UPDATE_STUDENT = gql`
	mutation UpdateStudent(
		$id: ID
		$name: String
		$stuClass: String
		$subjects: subjectsInput
	) {
		updateStudent(
			input: { id: $id, name: $name, stuClass: $stuClass, subjects: $subjects }
		) {
			id
			name
			stuClass
			subjects {
				english
				urdu
				math
			}
		}
	}
`;
