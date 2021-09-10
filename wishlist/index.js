const products = [
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4"
]

const wishlist = []

window.onload = () => renderProductsList()

function renderProductsList() {
    products.forEach(product => {
        const listItem = document.createElement("LI")
        listItem.appendChild(document.createTextNode(product));
        listItem.appendChild(document.createTextNode('\u00A0'))
        listItem.appendChild(addToWishlistButton(product))
        document.getElementById("productList").appendChild(listItem)
    })
}

function renderWishlist() {
    const wishlistNode = document.getElementById("wishlist")
    while (wishlistNode.firstChild) {
        wishlistNode.removeChild(wishlistNode.firstChild);
    }
    wishlist.forEach(product => {
        const listItem = document.createElement("LI")
        listItem.appendChild(document.createTextNode(`${wishlist.indexOf(product) + 1}. ${product}`));
        listItem.appendChild(document.createTextNode('\u00A0'))
        listItem.appendChild(removeFromWishlistButton(product))
        listItem.appendChild(document.createTextNode('\u00A0'))
        listItem.appendChild(increasePriorityButton(product))
        listItem.appendChild(document.createTextNode('\u00A0'))
        listItem.appendChild(decreasePriorityButton(product))
        listItem.appendChild(document.createTextNode('\u00A0'))
        wishlistNode.appendChild(listItem)
    })
}

function addToWishlistButton(product) {
    const button = document.createElement("BUTTON")
    button.innerHTML = "Add to wishlist"
    button.id = product
    button.addEventListener("click", () => addToWishlist(product), false)
    return button
}

function removeFromWishlistButton(product) {
    const button = document.createElement("BUTTON")
    button.innerHTML = "-"
    button.id = product
    button.addEventListener("click", () => removeFromWishlist(product), false)
    return button
}

function increasePriorityButton(product) {
    const button = document.createElement("BUTTON")
    button.innerHTML = "&#x2B06;"
    button.id = product
    button.addEventListener("click", () => increasePriority(product), false)
    return button
}

function decreasePriorityButton(product) {
    const button = document.createElement("BUTTON")
    button.innerHTML = "&#x2B07;"
    button.id = product
    button.addEventListener("click", () => decreasePriority(product), false)
    return button
}

function addToWishlist(elementId) {
    if (!wishlist.includes(elementId)) {
        wishlist.push(products.find(p => p === elementId))
        renderWishlist()
    } else
        window.alert(`The product ${elementId} has already been added.`)
}

function removeFromWishlist(elementId) {
    wishlist.splice(wishlist.indexOf(elementId), 1)
    renderWishlist()
}

function increasePriority(elementId) {
    const previousIndex = wishlist.indexOf(elementId)
    if (previousIndex > 0) {
        wishlist.splice(previousIndex, 1)
        wishlist.splice(previousIndex - 1, 0, elementId)
        renderWishlist()
    }
}

function decreasePriority(elementId) {
    const previousIndex = wishlist.indexOf(elementId)
    if (previousIndex < wishlist.length) {
        wishlist.splice(previousIndex, 1)
        wishlist.splice(previousIndex + 1, 0, elementId)
        renderWishlist()
    }
}