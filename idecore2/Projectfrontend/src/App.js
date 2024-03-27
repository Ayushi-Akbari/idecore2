import React from 'react'
import CustomerMain from './CustomerDashboard/CustomerMain'
import HomeMain from './MainDashboard/Screens/HomeMain'
import LoginScreen from './CustomerDashboard/LoginRegister/Login'
import './index.css'
import ProductForm from './SellerDashBoard/Screens/AddProduct/ProductFrom/ProductForm'
import MainScreen from './MainDashboard/MainScreen'
import RouteMainFile from './Mainroute/RouteMainFile'
import SellerMain from './SellerDashBoard/SellerMain'
import SearchBar from './MainDashboard/Components/SearchBar'
const App = () => {
  return (
    <div style={{flex:1}}>
{/* <CustomerMain/>    */}
{/* <HomeMain/> */}
{/* <LoginScreen/> */}
{/* <ProductForm/> */}
{/* <MainScreen/> */}
<RouteMainFile/>
{/* <SellerMain/> */}
 </div>
  )
}

export default App



