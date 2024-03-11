import React from "react"
import { Form, Link, Navigate, useActionData, useNavigation } from "react-router-dom"

const Action = async ({request, params}) => {
  const formData = await request.formData()
  const username = formData.get("username")
  const email = formData.get("email")
  const password = formData.get("password")

  fetch('http://localhost:4000/api/user/signup', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, email, password})
  }).then(res => res.json())
    .then(data => localStorage.setItem('signupResult', JSON.stringify(data)))

  const signupResult = JSON.parse(localStorage.getItem('signupResult'))

  localStorage.removeItem('signupResult')
  if (signupResult.err !== undefined) { 
    return true
  } else {
    return false
  }
}

const SignUp = () => {
  const actionData = useActionData()
  const navigation = useNavigation()
  const navigationStateIsIdle = navigation.state == 'idle' ? true : false

  // if actionData is false then redirect to SignIn page
  if (actionData == false) {
    return <Navigate to={'/sign-in'} />
  }
  return (
    <div className="flex justify-center w-[100vw] grow bg-slate-100">
      <div className="w-[min(500px,100%)] mt-[40px]">
        <h1 className="text-center text-[2rem] mb-5 font-[500]">Sign up</h1>
        {actionData ? <h1 className="w-[min(450px,100%)] text-center text-[1rem] mb-2 text-red-600 font-[500] p-1">Username or Email already taken</h1> : null}
        <Form replace method="post">
          <input name="username" type="text" required placeholder="user name" className="w-[min(450px,100%)] rounded p-2 outline-none border-slate-400 mb-3" />
          <input name="email" type="email" required placeholder="email" className="w-[min(450px,100%)] rounded p-2 outline-none border-slate-400 mb-3" />
          <input name="password" type="password" required placeholder="password" className="w-[min(450px,100%)] rounded p-2 outline-none border-slate-400 mb-[30px]" />
          <button className={`w-[min(450px,100%)] mb-3 bg-red-600 text-white rounded p-2 ${!navigationStateIsIdle ? 'bg-slate-600 text-white' : null}`} disabled={!navigationStateIsIdle}>SIGN UP</button>
        </Form>
        <p className="text-[.9rem]">Already have an account? <Link to={'/sign-in'} className="text-blue-600 pointer hover:border-b-[.5px] border-blue-800">Sign in</Link></p>
      </div>
    </div>
  )
}

export {Action}
export default SignUp