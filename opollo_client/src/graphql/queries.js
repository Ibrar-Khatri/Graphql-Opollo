import { gql } from "@apollo/client";

export const GET_ALL_STUDENTS = gql`
	query GetAllStudent {
		getAllStudents {
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
export const GET_SEARCHED_STUDENTS = gql`
	query GetSearchedStudent($stuClass: String, $subjects: subjectsInput) {
		searchedStudent(input: { stuClass: $stuClass, subjects: $subjects }) {
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
