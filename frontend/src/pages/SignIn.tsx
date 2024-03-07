import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Link, Navigate, useActionData, useNavigation } from "react-router-dom"
import { action } from "../redux/userSlice"
import axios from "axios"

const signinAction = async ({request, params}) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  const resp = await fetch('http://localhost:4000/api/auth/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: email, password: password})
  })
  const data = await resp.json()
  
  return data.message
}

const SignIn: React.FC = () => {
  const navigation = useNavigation()
  const navigationStateIsIdle = navigation.state == 'idle' ? true : false
  const actionData = useActionData()
  const dispatch = useDispatch()

  if (!(actionData === 'User not found!' || actionData === undefined)) { // nor logical operator
    dispatch(action(actionData))
    return <Navigate to={'/'} />
  }
  return (
    <div className="flex justify-center w-[100vw] grow bg-slate-100">
      <div className="w-[min(500px,100%)] mt-[40px]">
        <h1 className="text-center text-[2rem] mb-5 font-[500]">Sign In</h1>
        {actionData == 'User not found!' ? <h1 className="w-[min(450px,100%)] text-center text-[1rem] mb-2 text-red-600 font-[500] p-1">Wrong credentials</h1> : null}
        <Form replace method="post">
          <input name="email" type="email" required placeholder="email" className="w-[min(450px,100%)] rounded p-2 outline-none border-slate-400 mb-3" />
          <input name="password" type="password" required placeholder="password" className="w-[min(450px,100%)] rounded p-2 outline-none border-slate-400 mb-[30px]" />
          <button className={`w-[min(450px,100%)] mb-3 bg-red-600 text-white rounded p-2 ${!navigationStateIsIdle ? 'bg-slate-600 text-white' : null}`} disabled={!navigationStateIsIdle}>SIGN IN</button>
        </Form>
        <p className="text-[.9rem]">Dont have an account? <Link to={'/sign-up'} className="text-blue-600 pointer hover:border-b-[.5px] border-blue-800">Sign up</Link></p>
      </div>
    </div>
  )
}

export {SignIn, signinAction}