export class ProductAlreadyExistsException {
  constructor (product) {
    this.message = `${product} already exists`
    this.name = 'ProductAlreadyExistsException'
  }
}

export class InvalidPageException {
  constructor (number) {
    this.message = `${number} is not a valid page number`
    this.name = 'InvalidPageException'
  }
}

export class Product {
  constructor (name, desc, store, price) {
    this.name = name
    this.desc = desc
    this.store = store
    this.price = price
  }

  id () {
    return `${this.name}-${this.store}`
  }
}

export class Repository {
  constructor () {
    this.data = {
      length: 0,
      map: {},
      array: []
    }
  }

  _checkExists (id) {
    return this.data.map[id] !== undefined
  }

  save (product) {
    if (this._checkExists(product.id())) {
      throw new ProductAlreadyExistsException(product.id())
    }

    this.data.map[product.id()] = product
    this.data.array.push(product)
    this.length += 1
  }

  find (id) {
    return this.data.map[id]
  }

  all (page) {
    if (page < 1) {
      throw new InvalidPageException(page)
    }

    page -= 1
    return this.data.array.slice(page, page + 11)
  }
}
