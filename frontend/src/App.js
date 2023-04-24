import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {


  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    studentId: '',
    name: '',
    email: '',
    program: ''
  });


  const [programs, setPrograms] = useState([]);

  const [program, setProgram] = useState({
    programId: '',
    name: '',
    duration: ''
  });

  const [selectedStudentId, setSelectedStudentId] = useState('');

  const [searchedStudent, setSearchedStudent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/students')
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:3001/programs')
      .then(res => {
        setPrograms(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  const handleStudentInputChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };


  const handleProgramInputChange = e => {
    setProgram({ ...program, [e.target.name]: e.target.value });
  };


  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3001/students', student)
      .then(res => {
        setStudents([...students, res.data]);
        setStudent({
          studentId: '',
          name: '',
          email: '',
          program: ''
        });
      })
      .catch(err => console.log(err));
  };

  const handleUpdate = id => {
    axios.put(`http://localhost:3001/students/${id}`, student)
      .then(res => {
        setStudents(students.map(student => (student._id === id ? res.data : student)));
        setStudent({
          studentId: '',
          name: '',
          email: '',
          program: ''
        });
      })
      .catch(err => console.log(err));
  };


  const handleDelete = id => {
    axios.delete(`http://localhost:3001/students/${id}`)
      .then(res => {
        setStudents(students.filter(student => student._id !== id));
      })
      .catch(err => console.log(err));
  };


  const handleProgramSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3001/programs', program)
      .then(res => {
        setPrograms([...programs, res.data]);
        setProgram({
          programId: '',
          name: '',
          duration: ''
        });
      })
      .catch(err => console.log(err));
  };


  const handleStudentSearch = e => {
    e.preventDefault();
    axios.get(`http://localhost:3001/students/${selectedStudentId}`)
      .then(res => {
        setSearchedStudent(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleSelectChange = (event) => {
    const id = event.target.value;
    const selectedStudent = students.find((student) => student._id === id);
    setStudent(selectedStudent);
  };


  const [searchId, setSearchId] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/students/${searchId}`);
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  }





  return (
    <>
      <section>
        <h2>Student Registration System</h2>

        <div>
          <h3>Add Student</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="studentId" placeholder="Student ID" value={student.studentId} onChange={handleStudentInputChange} />
            <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleStudentInputChange} />
            <input type="text" name="email" placeholder="Email" value={student.email} onChange={handleStudentInputChange} />
            <select name="program" value={student.program} onChange={handleStudentInputChange}>
              <option value="">Select Program</option>
              {programs.map(program => (
                <option key={program._id} value={program._id}>{program.name}</option>
              ))}
            </select>

            <button type="submit">Add Student</button>
          </form>
        </div>

        <div>
          <h2>Programs List</h2>
          <table>
            <thead>
              <tr>
                <th>Program ID</th>
                <th>Name</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {programs.map(program => (
                <tr key={program._id}>
                  <td>{program.programId}</td>
                  <td>{program.name}</td>
                  <td>{program.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2>Student Update/Delete</h2>
          <div>
            <h3>Select a student to update/delete:</h3>
            <select name="students" onChange={handleSelectChange}>
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
            <br />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={student.name || ""}
              onChange={handleStudentInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={student.email || ""}
              onChange={handleStudentInputChange}
            />
            <button onClick={() => handleUpdate(student._id)}>Update</button>
            <button onClick={() => handleDelete(student._id)}>Delete</button>
          </div>
        </div>


      </section>


    </>

  );
}

export default App;
