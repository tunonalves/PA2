export class Cart {
    constructor(HTMLElement) {
        this.HTMLElement = HTMLElement
        this.items = []
    }

    render() {
        while (this.HTMLElement.firstChild) this.HTMLElement.removeChild(this.HTMLElement.firstChild)
        this.items.forEach(i => this.HTMLElement.appendChild(createCartItem(this, i)))
        const total = document.getElementById("total")
        total.innerHTML = `Total: $ ${this.calcTotal().toFixed(2)}`
    }

    calcPrice(element) {
        return element.price * element.quantity
    }

    calcTotal() {
        let subtotal = 0
        this.items.forEach(element => subtotal += this.calcPrice(element))
        return subtotal
    }

    addItem(product) {
        const element = this.items.find(p => p.id == product.id)
        ++element.quantity
        this.render()
    }

    removeItem(product) {
        const element = this.items.find(p => p.id == product.id)
        --element.quantity
        if (element.quantity === 0)
            this.items.splice(element, 1)
        this.render()
    }

    removeFromCart(product) {
        const elementId = this.items.findIndex(p => p.id == product.id)
        if (elementId !== -1) {
            this.items[elementId].quantity = 0
            this.items.splice(elementId, 1)
        }
        this.render()
    }
}

function createCartItem(cart, item) {
    const cartItem = document.createElement("li")
    cartItem.classList.add("media", "bottom-buffer")

    const itemBody = document.createElement("div")
    itemBody.classList.add("media-body")

    itemBody.appendChild(itemHeading(item.name))
    itemBody.appendChild(itemQuantity(item.quantity))
    itemBody.appendChild(itemPrice(cart.calcPrice(item).toFixed(2)))
    itemBody.appendChild(addItemBtn(() => cart.addItem(item)))
    itemBody.appendChild(removeItemBtn(() => cart.removeItem(item)))
    itemBody.appendChild(removeFromCartBtn(() => cart.removeFromCart(item)))

    cartItem.appendChild(itemImage())
    cartItem.appendChild(itemBody)

    return cartItem
}

function itemImage() {
    const img = document.createElement("img")
    img.classList.add("mr-3")
    img.src = "https://via.placeholder.com/64"
    return img
}

function itemHeading(name) {
    const heading = document.createElement("h5")
    heading.classList.add("mt-0", "mb-1")
    heading.innerHTML = name
    return heading
}

function itemQuantity(quantity) {
    const text = document.createElement("p")
    text.classList.add("cart-text")
    text.innerHTML = `Quantity: ${quantity}`
    return text
}

function itemPrice(price) {
    const text = document.createElement("p")
    text.classList.add("cart-text")
    text.innerHTML = `$ ${price}`
    return text
}

function addItemBtn(func) {
    const btn = document.createElement("button")
    btn.classList.add("btn", "btn-success", "btn-sm", "ml-3")
    btn.appendChild(plusIcon())
    btn.addEventListener("click", func)
    return btn
}

function plusIcon() {
    const icon = document.createElement("i")
    icon.classList.add("fa", "fa-plus")
    return icon
}

function removeItemBtn(func) {
    const btn = document.createElement("button")
    btn.classList.add("btn", "btn-success", "btn-sm", "ml-3")
    btn.appendChild(minusIcon())
    btn.addEventListener("click", func)
    return btn
}

function minusIcon() {
    const icon = document.createElement("i")
    icon.classList.add("fa", "fa-minus")
    return icon
}

function removeFromCartBtn(func) {
    const removeBtn = document.createElement("button")
    removeBtn.classList.add("btn", "btn-danger", "btn-sm", "ml-3")
    removeBtn.appendChild(trashIcon())
    removeBtn.addEventListener("click", func)
    return removeBtn
}

function trashIcon() {
    const icon = document.createElement("i")
    icon.classList.add("fa", "fa-trash")
    return icon
}

function createColumn() {
    const column = document.createElement("div")
    column.classList.add("col")
    return column
}