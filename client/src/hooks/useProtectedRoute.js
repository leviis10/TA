import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../store/reducers/ui";

function useProtectedRoute() {
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (role !== "admin") {
      // Set error alert
      dispatch(
        setAlert({ show: true, message: "You are not allowed", isError: true })
      );

      // Redirect to home route
      navigate("/");
    }
  }, [dispatch, navigate, role]);
}

export default useProtectedRoute;
