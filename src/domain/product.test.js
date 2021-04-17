import { Product, Repository, ProductAlreadyExistsException, InvalidPageException } from './product'
import { describe, test, expect } from '@jest/globals'

describe('Repository', () => {
  test('add twise and error', () => {
    const want = new Product('cafe', 'cafe con azucar', 'juan valdez', 3000)
    const repo = new Repository()
    repo.save(want)
    expect(() => { repo.save(want) }).toThrowError(ProductAlreadyExistsException)
  })

  test('add and find', () => {
    const want = new Product('cafe', 'cafe con azucar', 'juan valdez', 3000)
    const repo = new Repository()
    repo.save(want)
    const got = repo.find(want.id())
    expect(got).toEqual(want)
  })

  test('add and all', () => {
    const want = [
      new Product('cafe', 'cafe con azucar', 'juan valdez', 3000),
      new Product('capuccino', 'capuccino con crema', 'starbucks', 5000)
    ]
    const repo = new Repository()
    for (const product of want) {
      repo.save(product)
    }
    const got = repo.all(1)
    expect(got).toEqual(want)
  })

  test('all invalid page', () => {
    const want = [
      new Product('cafe', 'cafe con azucar', 'juan valdez', 3000),
      new Product('capuccino', 'capuccino con crema', 'starbucks', 5000)
    ]
    const repo = new Repository()
    for (const product of want) {
      repo.save(product)
    }
    expect(() => { repo.all(0) }).toThrowError(InvalidPageException)
  })
})
