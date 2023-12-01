import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/auth";
import { setIsLoading } from "../../store/reducers/ui";
import Input from "../UI/Input";
import Card from "../UI/Card";

function LoginModal() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const dispatch = useDispatch();

  async function loginHandler(e) {
    try {
      // Prevent form default behavioiur
      e.preventDefault();

      // Change isLoading global state
      dispatch(setIsLoading(true));

      // Send POST request to the backend
      const { data } = await axios.post("/api/auth", {
        username: usernameInput,
        password: passwordInput,
      });

      // Log user in
      dispatch(login(data));
    } catch (err) {
      // Do something
      console.error(err.response.data.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  function changeUsernameHandler(e) {
    setUsernameInput(e.target.value);
  }

  function changePasswordHandler(e) {
    setPasswordInput(e.target.value);
  }

  return (
    <Card className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-[32rem]">
      <form onSubmit={loginHandler}>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            id="username"
            value={usernameInput}
            onChange={changeUsernameHandler}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            value={passwordInput}
            onChange={changePasswordHandler}
          />
        </div>
        <button className="rounded-md bg-sky-400 hover:bg-sky-500 transition-all px-4 py-1.5">
          Login
        </button>
      </form>
    </Card>
  );
}

export default LoginModal;
