const NAME_REGEX = /^[a-zA-Z]{1,20}$/
const AGE_REGEX = /^\d{0,2}$/
const EMAIL_REGEX = /^.*(@outlook\.com|@icloud\.com|@gmail\.com)$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{9,20}$/

const fields = {
    "fname": NAME_REGEX,
    "lname": NAME_REGEX,
    "age": AGE_REGEX,
    "email": EMAIL_REGEX,
    "pwd": PWD_REGEX
}

function validate() {
    for (let key in fields) {
        const element = document.getElementById(key)
        if (isValid(element, fields[key]))
            element.style.borderColor = "green"
        else
            element.style.borderColor = "red"
    }
}

function isValid(element, regex) {
    if (regex.exec(element.value) != null)
        return true
    return false;
}