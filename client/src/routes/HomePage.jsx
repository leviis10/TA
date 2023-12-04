import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/transactions");
  }, [navigate]);

  return <h1 className="text-xl">Home Route</h1>;
}

export default HomePage;
