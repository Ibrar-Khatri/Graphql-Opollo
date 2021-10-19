import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_SEARCHED_STUDENTS } from "../graphql/queries";
import './searchStudent.css'

export default function SearchStudent() {

    let [stuClass, setStuClass] = useState("");
    let [subjects, setSubjects] = useState();
    let [allStudents, setAllStudents] = useState([]);
    let [stuDetail, setStuDetail] = useState()

    const [searchStu, { loading, error, data }] = useLazyQuery(GET_SEARCHED_STUDENTS)
    useEffect(() => {
        console.log(data, "data")
        console.log(error, "error")
        console.log(loading, "loading")
    }, [data])
    function searchStudentByDet(e) {

        e.preventDefault()
        // console.log(name)
        // console.log(stuClass)
        let student = {};
        if (stuClass) {
            student = { ...student, stuClass }
        }
        if (subjects) {
            if (subjects.english === '') {
                const sub = subjects
                delete sub['english']
                setSubjects(sub)
            }
            if (subjects.urdu === '') {
                const sub = subjects
                delete sub['urdu']
                setSubjects(sub)
            }
            if (subjects.math === '') {
                const sub = subjects
                delete sub['math']
                setSubjects(sub)
            }
            student = { ...student, subjects: subjects }
        }

        // console.log(student);
        searchStu({
            variables: student,
        });
    }

    return <div>
        <h1>Search Student</h1>

        <form className="form" onSubmit={searchStudentByDet}>
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
                        value={stuClass}
                        onChange={(s) => setStuClass(s.target.value)}
                    >
                        <option value=''>Choose...</option>
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
                                checked={subjects?.english}
                                onChange={() => subjects?.english ?
                                    setSubjects({ ...subjects, english: '' }) :
                                    setSubjects({ ...subjects, english: "English" })}


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
                                checked={subjects?.urdu}
                                onChange={() => subjects?.urdu ?
                                    setSubjects({ ...subjects, urdu: "" }) :
                                    setSubjects({ ...subjects, urdu: "Urdu" })}
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
                                checked={subjects?.math}
                                onChange={() => subjects?.math ?
                                    setSubjects({ ...subjects, math: "" }) :
                                    setSubjects({ ...subjects, math: "Math" })}
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
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                            // setOperation("update");
                            // setIsEdit(true);
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}