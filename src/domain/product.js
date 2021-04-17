export class ProductAlreadyExistsException {
  constructor (productId) {
    this.message = `${productId} already exists`
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
  constructor (name, desc, image, store, price) {
    this.name = name
    this.desc = desc
    this.store = store
    this.image = image
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

  all (page) {
    if (page < 1) {
      throw new InvalidPageException(page)
    }

    page -= 1
    page = page * 10
    return this.data.array.slice(page, page + 10)
  }

  find (productId) {
    return this.data.map[productId]
  }
}
