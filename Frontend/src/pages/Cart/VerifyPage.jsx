import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying payment...");
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");
  const success = searchParams.get("success");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        if (success === "true" && orderId && sessionId) {

          const res = await axios.get(
            `http://localhost:4000/api/stripe/check-session/${sessionId}`
          );

          if (res.data?.paid === true) {
            setMessage("🎉 Payment successful! Your order has been placed.");
            toast.success("Payment successful! Redirecting to orders page...");
          } else {
            setMessage(
              "⚠ Payment was successful, but verification is pending."
            );
          }
        } else {
          setMessage("❌ Payment failed or cancelled.");
          toast.error("Payment failed or cancelled. Redirecting to orders...");
        }
      } catch (error) {
        console.error("Error during payment verification:", error);
        setMessage("🚨 Error verifying your payment.");
        toast.error("Error verifying payment.");
      }

      const timer = setTimeout(() => {
        navigate("/orders"); 
      }, 3000); 

      return () => clearTimeout(timer);
    };
    checkPaymentStatus();
  }, [success, orderId, sessionId, navigate]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyPage;
