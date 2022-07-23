import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAuthUser } from "./redux/actions/authActions";
import Profile from "./components/user/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import Reviews from "./components/admin/Reviews";

function App() {
  
  const [stripeApiKey, setstripeApiKey] = useState("")

  const dispatch = useDispatch();

  const { isAuth,loading } = useSelector((state) => state.authReducer);

  useEffect(() => {
if(!loading){
  dispatch(getAuthUser());

}

    const  getStripeApiKey = async()=>{
      const {data} = await axios.get("/api/stripeapi");
      setstripeApiKey(data.stripeApiKey)

    }
    getStripeApiKey()
  }, [dispatch, isAuth]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="/cart" element={<Cart />}/>
        <Route path="/shipping" element={<Shipping />}/>
        <Route path="/order/confirm" element={<ConfirmOrder />}/>
        {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
        <Route path="/payment" element={<Payment />}/>

          </Elements>}
        {/* <Route path="/order/me" element={<OrderSuccess />}/> */}
        <Route path="/orders/me" element={<ListOrders />}/>
        <Route path="/order/:id" element={<OrderDetails />}/>

        {/* admin dashboard */}
        <Route path="/dashboard"  element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/products" element={<ProductsList />}/>
        <Route path="/admin/product/new" element={<NewProduct />}/>
        <Route path="/admin/product/:id" element={<UpdateProduct />}/>
        <Route path="/admin/orders" element={<OrdersList />}/>
        <Route path="/admin/users" element={<UsersList />}/>
        <Route path="/admin/user/:id" element={<UpdateUser />}/>
        <Route path="/admin/reviews" element={<Reviews />}/>


        <Route path="/profile/update" element={<UpdateProfile />}/>
        <Route path="/password/update" element={<UpdatePassword />}/>
        <Route path="/password/forgot" element={<ForgotPassword />}/>
        <Route path="/password/reset/:token" element={<NewPassword />}/>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
