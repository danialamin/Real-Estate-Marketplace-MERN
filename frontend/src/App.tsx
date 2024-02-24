import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
// import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<p className="text-black text-[2rem]">Hello</p>} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />      
    </Route>
  ))

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
