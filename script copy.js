const url_career = "https://utn-lubnan-api-3.herokuapp.com/api/Career";
const url_student = "https://utn-lubnan-api-3.herokuapp.com/api/Student";

const tbody = document.querySelector("#data");

var careerArray = new Array();
var studentsArray = new Array();
class Career {
    constructor(careerId,name,active){
        this.careerId = careerId;
        this.name = name;
        this.active = active;
    }
}
class Student {
    constructor(studentId, careerId, firstName, lastName, email) {
        this.studentId = studentId;
        this.careerId = careerId;
        this.firstName = firstName;
        this.lastName = lastName;        
        this.email = email;
    }
}

function doRequest_career(method, url_career, responseType = null){
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url_career);
        if(responseType != null)
            request.responseType = responseType;
        request.onload = () => {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error("Request error: " + request.statusText));
            }
        }
        request.onerror = () => {
            reject(Error("Oops!, there was a network error"));
        }
        request.send();
    });
}
function doRequest_student(method, url_student, responseType = null){
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url_student);
        if(responseType != null)
            request.responseType = responseType;
        request.onload = () => {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error("Request error: " + request.statusText));
            }
        }
        request.onerror = () => {
            reject(Error("Oops!, there was a network error"));
        }
        request.send();
    });
}

async function getCareers() {
    try {
        let apiController = "Career";

        return await doRequest_career("GET", `${url_career}${apiController}`, "json");
    }
    catch (error) {
        console.log(error.message);
    }

}

async function getStudents() {
    try {
        let apiController = "Student";

        return await doRequest("GET", `${url_student}${apiController}`, "json");
    }
    catch (error) {
        console.log(error.message);
    }
}

async function deleteStudentByStudentId(studentId) {
    try {
        let apiController = "Student";

        await doRequest_student("DELETE", `${url_student}${apiController}/${studentId}`);
    } 
    catch (error) {
        console.log(error.message);
    }
}

async function generateStudentsArray() {
    let careers = await getCareers();
    let students = await getStudents();
    
    studentsArray = [];

    students.forEach(student => {
        let i = 0;

        if(student.careerId != null){
            while(i < careers.length){
                let career = careers[i];
    
                if((career.careerId == student.careerId) && (career.active)){
                    let newStudent = new Student(student.studentId, career.name, student.firstName, student.lastName, student.email);
    
                    studentsArray.push(newStudent);
                    break;
                }

                i++;
            }
        }
    });

    return studentsArray.sort(function(a, b){
        return (b.lastName < a.lastName) ? 1 : -1;
    });
}

async function renderTable(){
    tbody.innerHTML = "";

    studentsArray = await generateStudentsArray();

    let i = 0;

    while(i < studentsArray.length){        
        let student = studentsArray[i];

        
        let tr = document.createElement("tr");

        td = document.createElement("td");
        td.append(document.createTextNode(student.studentId));
        tr.append(td);

        td = document.createElement("td");
        td.append(document.createTextNode(student.career));
        tr.append(td);

        td = document.createElement("td");
        td.append(document.createTextNode(student.lastName));
        tr.append(td);

        td = document.createElement("td");
        td.append(document.createTextNode(student.firstName));
        tr.append(td);
        
        td = document.createElement("td");
        let deleteButton = document.createElement("button");
        btnOnDelete(deleteButton, student.studentId);
        td.append(deleteButton);
        tr.append(td);        

        tbody.append(tr);
        i++;
    }    
}

    function btnOnDelete (deleteButton, studentId){
    deleteButton.append(document.createTextNode("Delete"));
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.onclick = async function(){
        await deleteStudentByStudentId(studentId);
        
        renderTable();
    };
}

window.onload = () => renderTable();