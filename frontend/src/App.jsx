import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Home from "./pages/Home.jsx"
import {SignIn} from "./pages/SignIn.jsx"
import { signinAction } from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import {Action} from "./pages/SignUp.jsx"
import About from "./pages/About.jsx"
import Profile from "./pages/Profile.jsx"
import Layout from "./layouts/Layout.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import CreateListing from "./pages/CreateListing.jsx"
import UpdateListing from "./pages/UpdateListing.jsx"
import Listing from "./pages/Listing.jsx"
import {Loader} from "./pages/Listing.jsx"
import Search, { searchLoader } from "./pages/Search.jsx"

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} action={signinAction}/>
      <Route path="/sign-up" element={<SignUp />} action={Action} />
      <Route path="/about" element={<About />} />
      <Route path="/listing/:id" element={<Listing />} loader={Loader} />
      <Route path="/search" element={<Search />} loader={searchLoader} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} /> 
        <Route path="/update-listing/:listingId" element={<UpdateListing />}></Route>
      </Route>
    </Route>
  ))

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export {App}
