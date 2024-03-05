import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Home from "./pages/Home"
import {SignIn} from "./pages/SignIn"
import { signinAction } from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import {Action} from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Layout from "./layouts/Layout"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} action={signinAction}/>
      <Route path="/sign-up" element={<SignUp />} action={Action} />
      <Route path="/about" element={<About />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />      
      </Route>
    </Route>
  ))

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
