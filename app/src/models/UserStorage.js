'use strice'

class UserStorage {
  static #users = {
    id: ['유진', '다인', '범기'],
    psword: ['1234', '1234', '1234'],
    names: ['전유진', '유다인', '김범기'],
  }

  static getUsers(...fields) {
    const users = this.#users
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field]
      }
      return newUsers
    }, {})
    return newUsers
  }
}

module.exports = UserStorage
