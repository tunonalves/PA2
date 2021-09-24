const url = "https://utn-lubnan-api-3.herokuapp.com/api/";
//----------------------------------------------------------------------------------------------------------------------------------------
const tbody = document.querySelector("#data");
//----------------------------------------------------------------------------------------------------------------------------------------
var studentsArray = new Array();
var careerArray = new Array();
//----------------------------------------------------------------------------------------------------------------------------------------
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
//----------------------------------------------------------------------------------------------------------------------------------------
function doRequest(method, url, responseType = null){
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url);
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
//----------------------------------------------------------------------------------------------------------------------------------------
async function getCareers() {
    try {
        let api_Controller = "Career";

        return await doRequest("GET", `${url}${api_Controller}`, "json");
    }
    catch (error) {
        console.log(error.message);
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------
async function getStudents() {
    try {
        let api_Controller = "Student";

        return await doRequest("GET", `${url}${api_Controller}`, "json");
    }
    catch (error) {
        console.log(error.message);
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------
async function deleteStudentByStudentId(studentId) {
    try {
        let api_Controller = "Student";

        await doRequest("DELETE", `${url}${api_Controller}/${studentId}`);
    } 
    catch (error) {
        console.log(error.message);
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------
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
//----------------------------------------------------------------------------------------------------------------------------------------
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
        td.append(document.createTextNode(student.careerId));
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
//----------------------------------------------------------------------------------------------------------------------------------------
    function btnOnDelete (deleteButton, studentId){
    deleteButton.append(document.createTextNode("Delete"));
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.onclick = async function(){
        await deleteStudentByStudentId(studentId);
        renderTable();
    };
}
//----------------------------------------------------------------------------------------------------------------------------------------
window.onload = () => renderTable();