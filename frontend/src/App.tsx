import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Home from "./pages/Home"
import {SignIn} from "./pages/SignIn"
import { signinAction } from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import {Action} from "./pages/SignUp"
import About from "./pages/About.tsx"
import Profile from "./pages/Profile.tsx"
import Layout from "./layouts/Layout.tsx"
import PrivateRoute from "./components/PrivateRoute.tsx"
import CreateListing from "./pages/CreateListing.tsx"
import UpdateListing from "./pages/UpdateListing.tsx"
import Listing from "./pages/Listing.tsx"
import {Loader} from "./pages/Listing.tsx"
import Search, { searchLoader } from "./pages/Search.tsx"

const App: React.FC = () => {
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
