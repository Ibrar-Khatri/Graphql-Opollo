import { gql, } from "@apollo/client";


export const GET_ALL_STUDENTS = gql`
query GetAllStudent {
    getAllStudents{
        name 
        stuClass
        subjects {
            english
            urdu
            math
        }
    }   
}
`