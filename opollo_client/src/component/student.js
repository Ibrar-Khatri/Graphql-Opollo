import React, { useState } from "react";
import Form from "./form/form";
import "./student.css";

export default function Student() {
	let [name, setName] = useState();
	let [stuClass, setStuClass] = useState("one");
	let [subjects, setSubjects] = useState();
	let [allStudents, setAllStudents] = useState([]);
	let [index, setIndex] = useState();

	function operationPerform(operation, ind) {
		if (operation === "delete") {
			setAllStudents(allStudents.filter((_, i) => i !== ind));
		} else {
			setName(allStudents[ind].name);
			setStuClass(allStudents[ind].stuClass);
			setSubjects(allStudents[ind].subjects);
			setIndex(ind);
		}
	}

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
				index={index}
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
							<tr>
								<th scope="row">{i + 1}</th>
								<td>{stu.name}</td>
								<td>{stu.stuClass}</td>
								<td>{`${stu.subjects.english}  ${stu.subjects?.urdu} ${stu.subjects?.math}`}</td>
								<td>
									<button
										className="btn btn-primary"
										onClick={() => operationPerform("delete", i)}
									>
										Delete
									</button>
								</td>
								<td>
									<button
										onClick={() => operationPerform("edit", i)}
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
