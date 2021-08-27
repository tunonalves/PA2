var person1 = { firstName:"Fede", lastName: "Tuñon"};

var person2 = new Object();
person2.firstName = "Facundo";
person2.lastName = "Tuñon Alves";

var person3 = person2;

console.log(person1);
console.log(person3);

function Person(firstName,lastName){
	this.firstName = firstName;
	this.lastName = lastName;
}

var Employee = function(employeid, firstName, lastName){
	this.employeid = employeid;
	this.firstName = firstName;
	this.lastName = lastName;
	this.fullName = function(){
		return this.firstName+''+this.lastName;
	}
}

Employee.prototype.getEmployeeid = function(){
	return this.employeid;
}

var employee = new Object();
employee.employeid = 1;
employee.firstName = "Claudio";
employee.lastName = "Perez Harbou";

for(prototypeName in employee){
	console.log(prototypeName + '' + employee[prototypeName]);
}