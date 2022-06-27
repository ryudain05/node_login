'use strict'

const id = document.querySelector('#id'),
  name = document.querySelector('#name'),
  psword = document.querySelector('#psword'),
  email = document.querySelector('#email'),
  confirmPsword = document.querySelector('#confirm-psword'),
  registerBtn = document.querySelector('#button')
registerBtn.addEventListener('click', register)

function chkPW(pw) {
  const num = pw.search(/[0-9]/g)
  const eng = pw.search(/[a-z]/gi)
  const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)

  if (pw.length < 6 || pw.length > 20) {
    alert('비밀번호를 6자리 ~ 20자리 이내로 입력해주세요.')
    return false
  } else if (pw.search(/\s/) != -1) {
    alert('비밀번호는 공백 없이 입력해주세요.')
    return false
  } else if (num < 0 || eng < 0 || spe < 0) {
    alert('영문,숫자,특수문자를 혼합하여 입력해주세요.')
    return false
  } else {
    console.log('통과')
    return true
  }
}

function register() {
  if (!id.value) {
    alert('아이디를 입력해주세요.')
    id.focus()
    return false
  } else if (!name.value) {
    alert('이름을 입력해주세요.')
    name.focus()
    return false
  } else if (!chkPW(psword.value)) {
    return false
  } else if (psword.value !== confirmPsword.value) {
    alert('비밀번호가 서로 맞지 않습니다.')
    return false
  } else {
    const req = {
      id: id.value,
      name: name.value,
      email: email.value,
      psword: psword.value,
    }

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          location.href = '/login'
        } else {
          alert(res.msg)
        }
      })
      .catch((err) => {
        console.error(new Error('회원가입 중 에러 발생'))
      })
  }
}
