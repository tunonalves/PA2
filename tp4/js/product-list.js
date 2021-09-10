import { Product } from './product.js'

export class ProductList {
    constructor(cart, HTMLElement) {
        this.cart = cart
        this.HTMLElement = HTMLElement
        this.products = [
            new Product("Product 1", "Some description", 99.99),
            new Product("Product 2", "Some description", 59.99),
            new Product("Product 3", "Some description", 9.99),
            new Product("Product 4", "Some description", 0.49),
            new Product("Product 5", "Some description", 14.49),
            new Product("Product 6", "Some description", 11.49)
        ]
    }

    render() {
        while (this.HTMLElement.firstChild) this.HTMLElement.removeChild(this.HTMLElement.firstChild)
        this.products.forEach(p => this.HTMLElement.appendChild(createProductColumn(this, p)))
    }

    addToCart(product) {
        const p = this.cart.items.find(p => p.id == product.id)
        if (typeof p === 'undefined') {
            this.cart.items.push(product)
            ++product.quantity
        }
        else
            ++product.quantity
        this.cart.render()
    }
}

function createProductColumn(productList, product) {
    const productColumn = document.createElement("div")
    productColumn.classList.add("col-lg-6", "col-xl-4")

    const productCard = document.createElement("div")
    productCard.classList.add("card", "top-buffer")

    const productBody = document.createElement("div")
    productBody.classList.add("card-body")

    const innerRow = document.createElement("div")
    innerRow.classList.add("row")

    const leftColumn = createColumn()
    leftColumn.appendChild(productPrice(product.price))

    const rightColumn = createColumn()
    rightColumn.appendChild(addToCartBtn(() => productList.addToCart(product)))

    innerRow.appendChild(leftColumn)
    innerRow.appendChild(rightColumn)

    productBody.appendChild(productHeading(product.name))
    productBody.appendChild(productDesc(product.description))
    productBody.appendChild(innerRow)

    productCard.appendChild(producImage())
    productCard.appendChild(productBody)

    productColumn.appendChild(productCard)

    return productColumn
}

function producImage() {
    const img = document.createElement("img")
    img.classList.add("card-img-top")
    img.src = "https://via.placeholder.com/600x400"
    return img
}

function productHeading(name) {
    const heading = document.createElement("h4")
    heading.classList.add("card-title")
    heading.innerHTML = name
    return heading
}

function productDesc(desc) {
    const text = document.createElement("p")
    text.classList.add("card-text")
    text.innerHTML = desc
    return text
}

function productPrice(price) {
    const text = document.createElement("p")
    text.classList.add("btn", "btn-block")
    text.innerHTML = `$ ${price}`
    return text
}

function addToCartBtn(func) {
    const button = document.createElement("button")
    button.classList.add("btn", "btn-success", "btn-sm", "ml-3")
    button.appendChild(cartIcon())
    button.innerHTML = `${button.innerHTML} Add`
    button.addEventListener("click", func)
    return button
}

function cartIcon() {
    const cartIcon = document.createElement("i")
    cartIcon.classList.add("fa", "fa-shopping-cart")
    return cartIcon
}

function createColumn() {
    const column = document.createElement("div")
    column.classList.add("col-6")
    return column
}