import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const clearCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clear-cart");
      toast.success(res.data.message, {
        icon: "✅",
        style: { background: "#10b981", color: "#fff" },
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  useEffect(() => {
    clearCart();

    
    const timer = setTimeout(() => {
      setLoading(false);

      
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
        <div className="text-center">
          <PropagateLoader color="#10b981" size={20} />
          <p className="mt-6 text-gray-600 text-lg">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center border-t-4 border-green-500">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="text-white w-12 h-12" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Your order has been successfully placed.
          </p>
          <p className="text-gray-700 mb-2">
             Send your delivery location and screenshot of the payment to this number:
          </p>
          <p className="font-semibold text-green-600 text-lg">+923325577359</p>
          <p className="text-gray-500 text-sm mt-4">
            You will be redirected to the home page shortly...
          </p>
        </div>
      </div>
    </>
  );
};

export default Success;
