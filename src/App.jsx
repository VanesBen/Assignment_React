
import heroImg from '../src/assets/images/hero-img.png'
import Navbar from './components/general/Navbar'
import Footer from './components/general/Footer'

import categoryImg1 from './assets/images/carousel-1-img.png'
import categoryImg2 from './assets/images/carousel-2-img.png'
import categoryImg3 from './assets/images/carousel-3-img.png'
import categoryImg4 from './assets/images/carousel-4-img.png'
import categoryImg5 from './assets/images/carousel-5-img.png'
import Card from './components/landing_page/Card'

import featuredImg from './assets/images/featured-img.png'
import Button from './components/general/Button'

import trendingImg1 from './assets/images/trending-1-img.png'
import trendingImg2 from './assets/images/trending-2-img.png'
import trendingImg3 from './assets/images/trending-3-img.png'
import trendingImg4 from './assets/images/trending-4-img.png'
import Home from './components/pages/Home'
import { Route, Routes } from 'react-router'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import DashboardAdmin from './components/pages/DashboardAdmin'
import UserDetail from './components/pages/UserDetail'
import ProductCategories from './components/pages/ProductCategories'
import ProtectedRoute from './components/general/ProtectedRoute'
import DashboardSeller from './components/pages/DashboardSeller'


function App() {

  
  return (
    <>
      <Navbar/>
      <Routes >
        <Route path="/" element={<Home />}  />
        <Route path="/login" element={<Login />}  />
        <Route path="/categories" element={<ProductCategories />}  />
        <Route path="/signup" element={<Signup />}  />
        <Route element={<ProtectedRoute allowedRoles={"admin"}/>}>
          <Route path="/admin/dashboard" element={<DashboardAdmin/>}/>
          <Route path="/admin/dashboard/:id" element={<UserDetail />}  />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={"seller"}/>}>
          <Route path="/seller/katalog" element={<DashboardSeller/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
