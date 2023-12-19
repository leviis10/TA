import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/UI/Layout";
import Spinner from "../components/UI/Spinner";
import LoginModal from "../components/auth/LoginModal";
import { login } from "../store/reducers/auth";
import { setIsLoading } from "../store/reducers/ui";

function Root() {
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async function () {
      try {
        // Render loading spinner
        dispatch(setIsLoading(true));

        // GET user token from cookies
        const { data } = await axios.get("/api/auth");

        // If there is a token then user is logged in
        dispatch(login(data));
      } catch (err) {
        // Redirect user to "/" if there is no authToken in cookies
        if (location.pathname !== "/") {
          navigate("/");
        }
      } finally {
        // Delete loading spinner
        dispatch(setIsLoading(false));
      }
    })();
  }, [dispatch, navigate, location]);

  return (
    <Layout>
      {isLoading && <Spinner />}
      {!token && <LoginModal />}
      {token && <Outlet />}
    </Layout>
  );
}

export default Root;
