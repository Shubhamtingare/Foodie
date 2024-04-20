import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { CartProvider } from "./components/ContextReducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import MyOrder from "./screens/MyOrder";

function App() {
  return (
    <>
      <div>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/myOrder" element={<MyOrder />}></Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </div>
    </>
  );
}

export default App;
