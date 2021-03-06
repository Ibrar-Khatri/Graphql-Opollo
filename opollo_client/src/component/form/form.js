import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ADD_NEW_STUDENT, UPDATE_STUDENT } from "../../graphql/mutations";

export default function Form(props) {
	let [addStudent] = useMutation(ADD_NEW_STUDENT);
	let [updateStudent] = useMutation(UPDATE_STUDENT);
	let [english, setEnglish] = useState("");
	let [urdu, setUrdu] = useState("");
	let [math, setMath] = useState("");
	let [operation, setOperation] = useState(false);

	let {
		name,
		setName,
		stuClass,
		setStuClass,
		subjects,
		allStudents,
		setAllStudents,
		id,
		isEdit,
		setIsEdit,
	} = props;

	function addNewStudent(e) {
		console.log(stuClass)
		e.preventDefault();
		if (operation === "add") {
			let student = {
				name,
				stuClass,
				subjects: {
					english: english ? "English" : "",
					urdu: urdu ? "Urdu" : "",
					math: math ? "Math" : "",
				},
			};
			console.log(student);
			addStudent({
				variables: student,
			});
		} else {
			setIsEdit(false);
			let updates = {
				id,
				name,
				stuClass,
				subjects: {
					english: english ? "English" : "",
					urdu: urdu ? "Urdu" : "",
					math: math ? "Math" : "",
				},
			};
			updateStudent({
				variables: updates,
			});
		}
		setEnglish("");
		setUrdu("");
		setMath("");
		setName("");
		setStuClass("One");
	}
	useEffect(() => {
		if (subjects) {
			setEnglish(subjects.english);
			setUrdu(subjects.urdu);
			setMath(subjects.math);
			setIsEdit(true);
		}
	}, [subjects]);

	return (
		<div>
			<form className="form" onSubmit={addNewStudent}>
				<div className="form-group row">
					<label for="name" className="col-sm-2 col-form-label">
						Name
					</label>
					<div className="col-sm-10">
						<input
							type="text"
							className="form-control"
							id="name"
							placeholder="Name"
							value={name}
							onChange={(t) => setName(t.target.value)}
							required
						/>
					</div>
				</div>

				<div className="form-group row">
					<div className="col-sm-2 classText">
						<label className="mr-sm-2 classText" for="inlineFormCustomSelect">
							Class
						</label>
					</div>
					<div className="col-sm-10">
						<select
							className="custom-select mr-sm-2"
							id="inlineFormCustomSelect"
							required
							value={stuClass}
							onChange={(s) => setStuClass(s.target.value)}
						>
							<option disabled>Choose...</option>
							<option value="One">One</option>
							<option value="Two">Two</option>
							<option value="Three">Three</option>
							<option value="Four">Four</option>
							<option value="Five">Five</option>
						</select>
					</div>
				</div>

				<div className="form-group row">
					<div className="col-sm-2 classText">Subjects</div>
					<div className="col-sm-10 ">
						<div className="form-check check_box">
							<div>
								<input
									className="form-check-input"
									type="checkbox"
									value="English"
									id="english"
									required
									checked={english}
									onChange={() => setEnglish((prev) => !prev)}
								/>
								<label className="form-check-label" for="english">
									English
								</label>
							</div>
							<div>
								<input
									className="form-check-input"
									type="checkbox"
									id="urdu"
									value="Urdu"
									checked={urdu}
									onChange={() => setUrdu((prev) => !prev)}
								/>
								<label className="form-check-label" for="urdu">
									Urdu
								</label>
							</div>
							<div>
								<input
									className="form-check-input"
									type="checkbox"
									id="math"
									value="Math"
									checked={math}
									onChange={() => setMath((prev) => !prev)}
								/>
								<label className="form-check-label" for="math">
									Math
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group row">
					<div className="col-sm-10">
						{isEdit ? (
							<button
								type="submit"
								className="btn btn-primary"
								onClick={() => {
									setOperation("update");
									setIsEdit(true);
								}}
							>
								Update
							</button>
						) : (
							<button
								type="submit"
								className="btn btn-primary"
								onClick={() => {
									setOperation("add");
									setIsEdit(false);
								}}
							>
								Add
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
}
