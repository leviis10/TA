import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useLoading from "../../hooks/useLoading";
import { login } from "../../store/reducers/auth";
import Card from "../UI/Card";
import Input from "../UI/Input";

function LoginModal() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const dispatch = useDispatch();
  const loading = useLoading();

  async function loginHandler(e) {
    // Prevent form default behavioiur
    e.preventDefault();

    await loading({
      async fn() {
        // Send POST request to the backend
        const { data } = await axios.post("/api/auth", {
          username: usernameInput,
          password: passwordInput,
        });

        // Log user in
        dispatch(login(data));
      },
    });
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
