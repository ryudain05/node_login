const UserStorage = require('./UserStorage')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'carpeDM'

class User {
  constructor(body) {
    this.body = body
  }

  async login() {
    const client = this.body
    try {
      const { email, psword } = await UserStorage.getUserInfo(client.email)
      console.log(email)

      //토근발급확인
      if (email) {
        if (email === client.email && psword === client.psword) {
          const token = jwt.sign(
            {
              type: 'JWT',
              email: email,
            },
            SECRET_KEY,
            {
              expiresIn: '15m',
              issuer: 'admin_dain',
            }
          )
          return { success: true, message: '토큰발급 성공!', token: token }
        }
        return { success: false, msg: '비밀번호가 틀렸습니다.' }
      }
    } catch (err) {
      return { success: false, msg: err.message }
    }
  }

  register() {
    const client = this.body
    const response = UserStorage.save(client)
    return response
  }

  //저장된 정보로 로그인 시도를 했는 지 확인하는 작업
  async overlapCheck(checkType) {
    const client = this.body
    try {
      // const response = await UserStorage.getUserID(client.id)
      if (checkType === 'email') {
        const email = await UserStorage.getUserEmail(client.id)
        console.log(client)
        return email
      } else if (checkType === 'nickname') {
        const nickname = await UserStorage.getUserNickName(client.id)
        console.log(client)
        return nickname
      }
    } catch (err) {
      return { success: false, alert: '존재하지 않는 이메일입니다.' }
    }
  }
}

module.exports = User
