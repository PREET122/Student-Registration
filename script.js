/*
    Student Registration System
    Handles:
    - Add / Edit / Delete records
    - Local Storage persistence
    - Input validation
    - Dynamic vertical scrollbar
*/

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const wrapper = document.getElementById("tableWrapper");

let students = JSON.parse(localStorage.getItem("students")) || [];

/* Utility Functions */

// Save to local storage
function saveToLocal() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Render table
function renderTable() {
    table.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="actions">
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        table.appendChild(row);
    });

    // Dynamic scrollbar logic
    if (students.length > 5) {
        wrapper.style.overflowY = "scroll";
    } else {
        wrapper.style.overflowY = "hidden";
    }
}

/* Validation */
function validateInputs(name, id, email, contact) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const idRegex = /^[0-9]+$/;
    const contactRegex = /^[0-9]{10,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
        alert("Student name should contain only letters");
        return false;
    }
    if (!idRegex.test(id)) {
        alert("Student ID should contain only numbers");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Enter a valid email address");
        return false;
    }
    if (!contactRegex.test(contact)) {
        alert("Contact number must have at least 10 digits");
        return false;
    }
    return true;
}

/*  Form Submit  */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const editIndex = document.getElementById("editIndex").value;

    if (!name || !id || !email || !contact) {
        alert("Empty rows are not allowed");
        return;
    }

    if (!validateInputs(name, id, email, contact)) return;

    const studentData = { name, id, email, contact };

    if (editIndex === "") {
        students.push(studentData);
    } else {
        students[editIndex] = studentData;
        document.getElementById("editIndex").value = "";
    }

    saveToLocal();
    renderTable();
    form.reset();
});

/*  Edit Student  */
function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
    document.getElementById("editIndex").value = index;
}

/*  Delete Student */
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        saveToLocal();
        renderTable();
    }
}

/* Initial Load  */
renderTable();
