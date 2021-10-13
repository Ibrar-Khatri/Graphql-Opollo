import { gql } from "@apollo/client";

export const NEW_STUDENT_ADDED = gql`
	subscription {
		newStudent {
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
export const STUDENT_DELETED = gql`
	subscription {
		removeStud {
			id
		}
	}
`;
export const STUDEN_UPDATED = gql`
	subscription {
		updateStud {
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
