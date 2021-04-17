import fs from 'fs'
import { Product } from '../domain/product.js'

export class FetchPaginated {
  constructor (repo) {
    this.repo = repo
    const products = JSON.parse(fs.readFileSync('./test/data/products.json'))
    for (const p of products) {
      this.repo.save(new Product(p.name, p.desc, p.image, p.store, p.price))
    }
  }

  exec (page) {
    return this.repo.all(page)
  }
}
