
let students = [
    { name: "Pradeep", marks: [80, 75, 90] },
    { name: "Rahul", marks: [60, 70, 65] },
    { name: "Anjali", marks: [85, 88, 92] }
];

function calculateAverage(marks) {
    let sum = 0;
    for (let i = 0; i < marks.length; i++) {
        sum += marks[i];
    }
    return (sum / marks.length).toFixed(2);
}

function analyzeStudents() {
    console.clear();
    console.log("=== STUDENT MANAGER ===\n");
    
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        let avg = calculateAverage(student.marks);
        console.log(`${student.name}: Marks = ${student.marks.join(", ")} | Average = ${avg}`);
    }
    
    console.log("\n✅ Analysis Complete!");
}

function clearConsole() {
    console.clear();
    console.log("Console cleared!");
}

analyzeStudents();