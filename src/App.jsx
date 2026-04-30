import { useEffect,useState } from "react";
import {
  FaGraduationCap,
  FaUserPlus,
  FaUser,
  FaPhone,
  FaIdCard,
  FaSearch,
  FaUsers,
  FaCog,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

function App() {
  const [student_name, setName] = useState("");
  const [student_id, setStudentId] = useState("");
  const [phone, setPhone] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [students, setStudents] = useState([
    {
      student_name: "Rahul",
      student_id: "101",
      phone: "8234567910",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleEdit = (student) => {
  console.log("EDIT CLICKED:", student);

  setName(student.student_name);
  setStudentId(student.student_id);
  setPhone(student.phone);

  setIsEditing(true);
  setEditId(student.student_id);
};
  
  useEffect(() => {
  fetchStudents();
}, []);

const fetchStudents = async () => {
  try {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  } catch (err) {
    console.log(err);
  }
};


async function addStudent() {
  console.log("Buttob is clicked")
  if (!student_name || !student_id || !phone) {
    alert("Please fill all fields");
    return;
  }

  const payload = {
    student_name,
    student_id,
    phone,
  };

  try {
    if (isEditing) {
      // UPDATE EXISTING STUDENT
      await axios.put(
        `http://localhost:5000/students/${editId}`,
        payload
      );

      setIsEditing(false);
      setEditId(null);
    } else {
      // CREATE NEW STUDENT
      await axios.post("http://localhost:5000/students", payload);
    }

    fetchStudents();

    setName("");
    setStudentId("");
    setPhone("");
  } catch (err) {
    console.log(err);
  }
}

  async function deleteStudent(id) {
  try {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  } catch (err) {
    console.log(err);
  }
  

  

}

  const filteredStudents = students.filter(
    (student) =>
      student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-200 py-10 px-4">

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-center text-blue-800 flex justify-center items-center gap-3">
        <FaGraduationCap />
        Student Record Management System
      </h1>

      <p className="text-center text-gray-700 mt-4 mb-10 text-lg font-medium">
        Simple • Smart • Efficient Student Management
      </p>

      {/* Add Student Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8 mb-8">

        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-8">
          <div className="bg-blue-100 p-3 rounded-full text-blue-700">
            <FaUserPlus />
          </div>
          Add Student
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mb-6">

          {/* Name */}
          <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-4 bg-white">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              placeholder="Enter Name"
              value={student_name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* ID */}
          <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-4 bg-white">
            <FaIdCard className="text-gray-500" />
            <input
              type="text"
              placeholder="Enter Student ID"
              value={student_id}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-4 bg-white">
            <FaPhone className="text-gray-500" />
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>

        <button
          onClick={addStudent}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
        >
          + Add Student
        </button>
      </div>

      {/* Search + Count */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 mb-8 flex flex-col md:flex-row gap-5 justify-between items-center">

        <div className="flex items-center gap-3 w-full md:w-3/4 border-2 border-blue-400 rounded-2xl px-5 py-4">
          <FaSearch className="text-blue-600 text-xl" />
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-lg"
          />
        </div>

        <div className="bg-blue-100 px-8 py-4 rounded-2xl text-center min-w-[220px]">
          <div className="flex justify-center text-blue-700 text-2xl mb-1">
            <FaUsers />
          </div>
          <p className="text-blue-700 font-semibold">Total Students</p>
          <p className="text-3xl font-bold text-slate-800">
            {students.length}
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="h-1 bg-blue-600"></div>

        <table className="w-full text-left">

          <thead className="bg-slate-100">
            <tr className="text-slate-800 text-lg">
              <th className="p-5">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-600" />
                  Name
                </div>
              </th>

              <th className="p-5">
                <div className="flex items-center gap-2">
                  <FaIdCard className="text-blue-600" />
                  ID
                </div>
              </th>

              <th className="p-5">
                <div className="flex items-center gap-2">
                  <FaPhone className="text-blue-600" />
                  Phone
                </div>
              </th>

              <th className="p-5">
                <div className="flex items-center gap-2">
                  <FaCog className="text-blue-600" />
                  Actions
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="border-t hover:bg-slate-50">

                <td className="p-5 font-medium">{student.student_name}</td>

                <td className="p-5">
                  <span className="bg-blue-100 px-4 py-2 rounded-xl text-blue-700 font-semibold">
                    {student.student_id}
                  </span>
                </td>

                <td className="p-5">{student.phone}</td>

                <td className="p-5 space-x-3">

                <button
                   onClick={() => handleEdit(student)}
                   className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium inline-flex items-center gap-2"
                >
              
                <FaEdit />
                   Edit
                </button>

                  
                  <button
                  onClick={() => deleteStudent(student.student_id)}
                   className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl"
                  >
                  <FaTrash />
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-700 mt-10 text-lg">
        Keep Records Organized, Keep Future Bright ✨
      </p>

    </div>
  );
}

export default App;