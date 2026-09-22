import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import StorefrontHome from './screens/User/StorefrontHome';
import OrderHistory from './screens/User/OrderHistory';
import ShoppingCart from './screens/User/ShoppingCart';
import ProductDetails from './screens/User/ProductDetails';
import Header from './components/User/Header'
import Footer from './components/User/Footer'
import UserLogin from './screens/User/UserLogin';
import UserSignup from './screens/User/UserSignup';
import UserProfile from './screens/User/UserProfile';
import AdminLogin from './screens/Admin/AdminLogin';
import AdminDashboard from './screens/Admin/AdminDashboard';
import AdminSales from './screens/Admin/AdminSales';
import AdminProducts from './screens/Admin/AdminProducts';
import AdminUsers from './screens/Admin/AdminUsers';
import AdminProductDirectory from './screens/Admin/AdminProductDirectory';
import AdminOrderDirectory from './screens/Admin/AdminOrderDirectory';
import CheckoutPage from './screens/User/CheckoutPage';
import { getCurrentAdmin } from './utils/auth';

function AdminRoute({ children }) {
  return getCurrentAdmin() ? children : <AdminLogin />;
}

function App() {
   const location=useLocation();
   const hideheaderfooter=location.pathname.startsWith('/a')
  return (
   

    <div className="app-shell d-flex flex-column min-vh-100">
      {!hideheaderfooter && <Header/>}
  
      <main className='flex-grow-1'>
    <Routes>
      <Route path="/" element={<StorefrontHome />} />
      <Route path="/order" element={<OrderHistory />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/detail" element={<ProductDetails />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/alogin" element={<AdminLogin />} />
      <Route path="/ahome" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/asales" element={<AdminRoute><AdminSales /></AdminRoute>} />
      <Route path="/aproduct" element={<AdminRoute><AdminProducts /></AdminRoute>} />
      <Route path="/auser" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      <Route path="/aorder" element={<AdminRoute><AdminOrderDirectory /></AdminRoute>} />
      <Route path="/aallproduct" element={<AdminRoute><AdminProductDirectory /></AdminRoute>} />
      <Route path="/billing" element={<CheckoutPage />} />
      
    </Routes>
    </main>
    {!hideheaderfooter && <Footer/>}
    
    </div>
  );
}

export default App;