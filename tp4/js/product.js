let id = 0

export class Product {
    constructor(name, description, price) {
        this.id = ++id
        this.name = name
        this.description = description
        this.price = price
        this.quantity = 0
    }
}