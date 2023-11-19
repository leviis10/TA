import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/auth";
import Input from "../UI/Input";

function LoginModal() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const dispatch = useDispatch();

  async function loginHandler(e) {
    try {
      e.preventDefault();

      const { data } = await axios.post("/api/auth", {
        username: usernameInput,
        password: passwordInput,
      });
      dispatch(login(data));
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      }
    }
  }

  function changeUsernameHandler(e) {
    setUsernameInput(e.target.value);
  }

  function changePasswordHandler(e) {
    setPasswordInput(e.target.value);
  }

  return (
    <>
      <form
        onSubmit={loginHandler}
        className="max-w-md border-2 rounded-lg p-6 mt-16 mx-auto"
      >
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
    </>
  );
}

export default LoginModal;