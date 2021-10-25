import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { DELETE_STUDENT } from "../graphql/mutations";
import { GET_ALL_STUDENTS } from "../graphql/queries";
import {
	NEW_STUDENT_ADDED,
	STUDENT_DELETED,
	STUDEN_UPDATED,
} from "../graphql/subscription";
import Form from "./form/form";
import "./student.css";

export default function Student() {
	let [name, setName] = useState();
	let [stuClass, setStuClass] = useState("One");
	let [subjects, setSubjects] = useState();
	let [allStudents, setAllStudents] = useState([]);
	let [id, setID] = useState();
	let [isEdit, setIsEdit] = useState(false);

	let students = useQuery(GET_ALL_STUDENTS);
	let newStudentAdded = useSubscription(NEW_STUDENT_ADDED);
	let studentDeleted = useSubscription(STUDENT_DELETED);
	let studentUpdated = useSubscription(STUDEN_UPDATED);
	let [deleteStudent] = useMutation(DELETE_STUDENT);

	function operationPerform(operation, stu) {
		if (operation === "delete") {
			setName("");
			setStuClass("");
			setSubjects("");
			setID("");
			setIsEdit(false);
			deleteStudent({
				variables: { id: stu.id },
			});
		} else {
			setName(stu.name);
			setStuClass(stu.stuClass);
			setSubjects(stu.subjects);
			setID(stu.id);
		}
	}

	useEffect(() => {
		if (students.data) {
			setAllStudents(students.data?.getAllStudents);
		}
	}, [students.data]);
	useEffect(() => {
		if (newStudentAdded.data) {
			console.log(newStudentAdded.data);
			let update = [...allStudents, newStudentAdded.data?.newStudent];
			setAllStudents([...allStudents, newStudentAdded.data?.newStudent]);
		}
	}, [newStudentAdded.data]);
	useEffect(() => {
		if (studentDeleted.data) {
			console.log(studentDeleted.data.removeStud.id);
			let update = allStudents.filter(
				(stu) => stu.id !== studentDeleted.data.removeStud.id,
			);
			setAllStudents(update);
		}
	}, [studentDeleted.data]);
	useEffect(() => {
		if (studentUpdated.data) {
			console.log(studentUpdated.data.updateStud.id);
			let update = allStudents.map((stu) => {
				// console.log(stu);
				if (stu.id === studentUpdated.data.updateStud.id) {
					return studentUpdated.data.updateStud;
				}
				return stu;
			});
			setAllStudents(update);
		}
	}, [studentUpdated.data]);

	return (
		<div>
			<Form
				name={name}
				setName={setName}
				stuClass={stuClass}
				setStuClass={setStuClass}
				subjects={subjects}
				setSubjects={setSubjects}
				allStudents={allStudents}
				setAllStudents={setAllStudents}
				id={id}
				isEdit={isEdit}
				setIsEdit={setIsEdit}
			/>
			<div className="tableDiv">
				<table class="table table-striped">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Class</th>
							<th scope="col">Subjects</th>
							<th scope="col">Delete</th>
							<th scope="col">Edit</th>
						</tr>
					</thead>
					<tbody>
						{allStudents?.map((stu, i) => (
							<tr key={i}>
								<th scope="row">{i + 1}</th>
								<td>{stu.name}</td>
								<td>{stu.stuClass}</td>
								<td>{`${stu.subjects?.english}  ${stu.subjects?.urdu} ${stu.subjects?.math}`}</td>
								<td>
									<button
										className="btn btn-primary"
										onClick={() => operationPerform("delete", stu)}
									>
										Delete
									</button>
								</td>
								<td>
									<button
										onClick={() => operationPerform("edit", stu)}
										className="btn btn-primary"
									>
										Edit
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
