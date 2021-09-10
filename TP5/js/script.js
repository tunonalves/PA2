const limit = 10
let totalPages = 0
const apiUrl = 'https://utn-avanzanda2-tp5.herokuapp.com/api/user'

function get(url) {
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    return new Promise((resolve, reject) => {
        request.open('GET', url)
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                resolve(request.response)
            } else {
                reject(request.statusText)
            }
        }
        request.onerror = () => reject(request.statusText)
        request.send()
    })
}

function getTotal() {
    return get(`${apiUrl}/total`)
}

function getRecords(from, to) {
    return get(`${apiUrl}/${from}/${to}`)
}


function renderPagination(current, { min = 0, total = totalPages / limit, length = limit } = {}) {
    const pagination = document.getElementById("pagination")
    while (pagination.firstChild) pagination.removeChild(pagination.firstChild)

    if (length > total) length = total

    let start = current - Math.floor(length / 2)
    start = Math.max(start, min)
    start = Math.min(start, min + total - length)

    const previous = prevBtn((current * limit) - limit * 2, (current * limit) - limit)
    if (current == 1) previous.classList.add("disabled")
    const next = nextBtn(current * limit, (current * limit) + limit)
    if (current == total) next.classList.add("disabled")

    pagination.appendChild(previous)

    if (start > min) {
        pagination.appendChild(pagBtn(min, length, false))
        pagination.appendChild(dotsBtn())
    }

    const items = Array.from({ length: length }, (el, i) => start + i)

    items.forEach(i => {
        pagination.appendChild(pagBtn(i * length, (i * length) + length, i + 1 == current))
    })

    if (current + (current - start) < total) {
        pagination.appendChild(dotsBtn())
        pagination.appendChild(pagBtn(total * limit - limit, total * limit, false))
    }

    pagination.appendChild(next)
}

function prevBtn(from, to) {
    return navBtn("Previous", "&laquo", from, to)
}

function nextBtn(from, to) {
    return navBtn("Next", "&raquo", from, to)
}

function navBtn(text, icon, from, to) {
    const listItem = document.createElement("li")
    listItem.classList.add("page-item")
    const link = document.createElement("a")
    link.classList.add("page-link")
    link.setAttribute("aria-label", text)
    const span1 = document.createElement("span")
    span1.setAttribute("aria-hidden", "true")
    span1.innerHTML = icon
    const span2 = document.createElement("span")
    span2.classList.add("sr-only")
    span2.innerHTML = text
    link.appendChild(span1)
    link.appendChild(span2)
    link.addEventListener("click", () => next(from, to))
    listItem.appendChild(link)
    return listItem
}

function pagBtn(from, to, isActive) {
    const listItem = document.createElement("li")
    listItem.classList.add("page-item")
    if (isActive) listItem.classList.add("active")
    const link = document.createElement("a")
    link.classList.add("page-link")
    link.innerHTML = to / limit
    link.addEventListener("click", () => next(from, to))
    listItem.appendChild(link)
    return listItem
}

function dotsBtn() {
    const listItem = document.createElement("li")
    listItem.classList.add("page-item", "disabled")
    const link = document.createElement("a")
    link.classList.add("page-link")
    link.setAttribute("aria-label", "...")
    const span1 = document.createElement("span")
    span1.setAttribute("aria-hidden", "true")
    span1.innerHTML = "..."
    const span2 = document.createElement("span")
    span2.classList.add("sr-only")
    span2.innerHTML = "..."
    link.appendChild(span1)
    link.appendChild(span2)
    listItem.appendChild(link)
    return listItem
}

function next(from, to) {
    getRecords(from, to)
        .then(response => {
            renderRows(response)
            renderPagination(to / 10)
        })
}

function renderRows(response) {
    const table = document.getElementById("table").getElementsByTagName('tbody')[0]
    while (table.firstChild) table.removeChild(table.firstChild)
    response.forEach(r => {
        const row = table.insertRow(-1)

        var userId = row.insertCell(-1)
        userId.innerHTML = r.userId

        var firstName = row.insertCell(-1)
        firstName.innerHTML = r.firstName

        var lastName = row.insertCell(-1)
        lastName.innerHTML = r.lastName

        var email = row.insertCell(-1)
        email.innerHTML = r.email

        var gender = row.insertCell(-1)
        gender.innerHTML = r.gender

        var lastConnectedAddress = row.insertCell(-1)
        lastConnectedAddress.innerHTML = r.lastConnectedAddress
    })
}

window.onload = () => {
    getTotal()
        .then(response => {
            totalPages = response
            renderPagination(1)
        })
        .catch(error => console.log(error))

    getRecords(0, limit)
        .then(response => renderRows(response))
        .catch(error => console.log(error))
}