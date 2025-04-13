const gradingSchemes = {
    SEE: {
        subjects: [
            { name: "Nepali", theoryMax: 75, practicalMax: 25, creditHour: 5 },
            { name: "English", theoryMax: 75, practicalMax: 25, creditHour: 5 },
            { name: "Mathematics", theoryMax: 75, practicalMax: 25, creditHour: 5 },
            { name: "Science", theoryMax: 75, practicalMax: 25, creditHour: 5 },
            { name: "Social Studies", theoryMax: 75, practicalMax: 25, creditHour: 4 },
            { name: "Optional I", theoryMax: 50, practicalMax: 50, creditHour: 4 },
            { name: "Optional II", theoryMax: 75, practicalMax: 25, creditHour: 4 }
        ],
        grades: [
            { min: 90, grade: "A+", point: 4.0 },
            { min: 80, grade: "A", point: 3.6 },
            { min: 70, grade: "B+", point: 3.2 },
            { min: 60, grade: "B", point: 2.8 },
            { min: 50, grade: "C+", point: 2.4 },
            { min: 40, grade: "C", point: 2.0 },
            { min: 35, grade: "D", point: 1.6 },
            { min: 0, grade: "NG", point: 0 }
        ]
    },
    NEB: {
        science: {
            subjects: [
                { name: "Physics", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "Chemistry", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "Biology", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "Mathematics", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "English", theoryMax: 75, practicalMax: 25, creditHour: 4 },
                { name: "Nepali", theoryMax: 75, practicalMax: 25, creditHour: 4 }
            ],
            grades: [
                { min: 90, grade: "A+", point: 4.0 },
                { min: 80, grade: "A", point: 3.6 },
                { min: 70, grade: "B+", point: 3.2 },
                { min: 60, grade: "B", point: 2.8 },
                { min: 50, grade: "C+", point: 2.4 },
                { min: 40, grade: "C", point: 2.0 },
                { min: 35, grade: "D", point: 1.6 },
                { min: 0, grade: "NG", point: 0 }
            ]
        },
        management: {
            subjects: [
                { name: "Accountancy", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "Business Math", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "Economics", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "Marketing", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "English", theoryMax: 75, practicalMax: 25, creditHour: 4 },
                { name: "Nepali", theoryMax: 75, practicalMax: 25, creditHour: 4 }
            ],
            grades: [
                { min: 90, grade: "A+", point: 4.0 },
                { min: 80, grade: "A", point: 3.6 },
                { min: 70, grade: "B+", point: 3.2 },
                { min: 60, grade: "B", point: 2.8 },
                { min: 50, grade: "C+", point: 2.4 },
                { min: 40, grade: "C", point: 2.0 },
                { min: 35, grade: "D", point: 1.6 },
                { min: 0, grade: "NG", point: 0 }
            ]
        },
        humanities: {
            subjects: [
                { name: "Sociology", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "Psychology", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "Population Studies", theoryMax: 75, practicalMax: 25, creditHour: 5 },
                { name: "English", theoryMax: 75, practicalMax: 25, creditHour: 4 },
                { name: "Nepali", theoryMax: 75, practicalMax: 25, creditHour: 4 },
                { name: "Optional Subject", theoryMax: 75, practicalMax: 25, creditHour: 5 }
            ],
            grades: [
                { min: 90, grade: "A+", point: 4.0 },
                { min: 80, grade: "A", point: 3.6 },
                { min: 70, grade: "B+", point: 3.2 },
                { min: 60, grade: "B", point: 2.8 },
                { min: 50, grade: "C+", point: 2.4 },
                { min: 40, grade: "C", point: 2.0 },
                { min: 35, grade: "D", point: 1.6 },
                { min: 0, grade: "NG", point: 0 }
            ]
        }
    }
};

window.onload = function () {
    changeGradeLevel();
    createGradeTable();
};

function changeGradeLevel() {
    const gradeLevel = document.getElementById('gradeLevel').value;
    const streamSelect = document.getElementById('stream');

    if (gradeLevel === 'NEB') {
        streamSelect.style.display = 'inline';
        changeStream();
    } else {
        streamSelect.style.display = 'none';
        createSubjectInputs(gradingSchemes.SEE.subjects, 'SEE');
    }
    createGradeTable();
}

function changeStream() {
    const stream = document.getElementById('stream').value;
    const subjects = gradingSchemes.NEB[stream].subjects;
    createSubjectInputs(subjects, 'NEB');
    createGradeTable();
}

function createSubjectInputs(subjects, gradeLevel) {
    let html = `<table class="subject-table">
        <thead>
            <tr>
                <th>Subject</th>
                <th>Theory</th>`;

    const hasPractical = subjects.some(subject => subject.practicalMax !== null);

    if (hasPractical) {
        html += `<th>Practical</th>`;
    }

    html += `<th>Total</th>
             <th>Grade</th>
             <th>Point</th>
            </tr>
        </thead>
        <tbody>`;

    subjects.forEach((subject, index) => {
        html += `<tr>
            <td>${subject.name}</td>
            <td><input type="number" id="theory-${index}" max="${subject.theoryMax}" min="0" oninput="calculateRow(${index}, '${gradeLevel}')"></td>`;

        if (hasPractical && subject.practicalMax !== null) {
            html += `<td><input type="number" id="practical-${index}" max="${subject.practicalMax}" min="0" oninput="calculateRow(${index}, '${gradeLevel}')"></td>`;
        } else if (hasPractical) {
            html += `<td>-</td>`;
        }

        html += `<td id="total-${index}">-</td>
                 <td id="grade-${index}">-</td>
                 <td id="point-${index}">-</td>
        </tr>`;
    });

    html += `</tbody></table>
            <button onclick="calculateGPA('${gradeLevel}')">Calculate GPA</button>
            <p>GPA: <strong id="finalGPA">-</strong></p>`;

    document.getElementById('calculatorContainer').innerHTML = html;
}

function calculateRow(index, gradeLevel) {
    const theoryId = `theory-${index}`;
    const practicalId = `practical-${index}`;
    let subject, grades, stream;

    if (gradeLevel === 'SEE') {
        subject = gradingSchemes.SEE.subjects[index];
        grades = gradingSchemes.SEE.grades;
    } else {
        stream = document.getElementById('stream').value;
        subject = gradingSchemes.NEB[stream].subjects[index];
        grades = gradingSchemes.NEB[stream].grades;
    }

    const theoryMarks = parseInt(document.getElementById(theoryId).value) || 0;
    let practicalMarks = 0;

    if (subject.practicalMax !== null && document.getElementById(practicalId)) {
        practicalMarks = parseInt(document.getElementById(practicalId).value) || 0;
    }

    const totalMarks = theoryMarks + practicalMarks;
    const maxMarks = subject.theoryMax + (subject.practicalMax || 0);
    const percentage = (totalMarks / maxMarks) * 100;

    const grade = grades.find(g => percentage >= g.min) || { grade: "NG", point: 0 };

    document.getElementById(`total-${index}`).innerText = totalMarks;
    document.getElementById(`grade-${index}`).innerText = grade.grade;
    document.getElementById(`point-${index}`).innerText = grade.point.toFixed(2);
}

function calculateGPA(gradeLevel) {
    let subjects, grades, stream;
    let totalCredits = 0;
    let totalPoints = 0;

    if (gradeLevel === 'SEE') {
        subjects = gradingSchemes.SEE.subjects;
        grades = gradingSchemes.SEE.grades;
    } else {
        stream = document.getElementById('stream').value;
        subjects = gradingSchemes.NEB[stream].subjects;
        grades = gradingSchemes.NEB[stream].grades;
    }

    subjects.forEach((subject, index) => {
        const theoryId = `theory-${index}`;
        const practicalId = `practical-${index}`;
        const theoryMarks = parseInt(document.getElementById(theoryId).value) || 0;
        let practicalMarks = 0;

        if (subject.practicalMax !== null && document.getElementById(practicalId)) {
            practicalMarks = parseInt(document.getElementById(practicalId).value) || 0;
        }

        const totalMarks = theoryMarks + practicalMarks;
        const maxMarks = subject.theoryMax + (subject.practicalMax || 0);
        const percentage = (totalMarks / maxMarks) * 100;
        const grade = grades.find(g => percentage >= g.min) || { grade: "NG", point: 0 };

        totalCredits += subject.creditHour;
        totalPoints += grade.point * subject.creditHour;
    });

    const gpa = totalPoints / totalCredits;
    document.getElementById('finalGPA').textContent = gpa.toFixed(2);
}

function createGradeTable() {
    const gradeLevel = document.getElementById('gradeLevel').value;
    let grades, stream;

    if (gradeLevel === 'SEE') {
        grades = gradingSchemes.SEE.grades;
    } else {
        stream = document.getElementById('stream').value;
        grades = gradingSchemes.NEB[stream].grades;
    }

    let html = `
        <tr>
            <th>Marks Range</th>
            <th>Grade</th>
            <th>Grade Point</th>
        </tr>`;

    grades.forEach(grade => {
        html += `
            <tr>
                <td>${grade.min}% +</td>
                <td>${grade.grade}</td>
                <td>${grade.point.toFixed(2)}</td>
            </tr>`;
    });

    document.getElementById('gradeTable').innerHTML = html;
}
