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
