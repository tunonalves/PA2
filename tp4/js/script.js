import { Cart } from './cart.js'
import { ProductList } from './product-list.js'

window.onload = () => {
    const cart = new Cart(document.getElementById("cart"))
    cart.render()

    const products = new ProductList(cart, document.getElementById("product-list"))
    products.render()
}