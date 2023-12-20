import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import useLoading from "../../hooks/useLoading";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/reducers/ui";

function AddEmployeePage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const navigate = useNavigate();
  const loading = useLoading();
  const dispatch = useDispatch();

  useProtectedRoute();

  function changeUsernameInputHandler(e) {
    setUsernameInput(e.target.value);
  }

  function changePasswordInputHandler(e) {
    setPasswordInput(e.target.value);
  }

  function changeEmailInputHandler(e) {
    setEmailInput(e.target.value);
  }

  function changePhoneNumberInputHandler(e) {
    setPhoneNumberInput(e.target.value);
  }

  function changeAddressInputHandler(e) {
    setAddressInput(e.target.value);
  }

  async function addEmployee(e) {
    // Prevent form default behaviour
    e.preventDefault();

    // Create employee object
    const employee = {
      username: usernameInput,
      password: passwordInput,
      email: emailInput,
      phoneNumber: phoneNumberInput,
      address: addressInput,
    };

    await loading({
      async fn() {
        // Add User to the database
        const { data } = await axios.post("/api/employees", employee);

        // Set success alert
        dispatch(
          setAlert({
            show: true,
            message: "Successfully create new employee",
            isError: false,
          })
        );

        // Clear all input field
        setUsernameInput("");
        setPasswordInput("");
        setEmailInput("");
        setPhoneNumberInput("");
        setAddressInput("");

        // Redirect user to all employees page
        navigate(`/employees/${data.id}`);
      },
    });
  }

  return (
    <>
      <h1 className="text-center font-semibold text-4xl mb-8">Add Employee</h1>
      <Card className="max-w-lg mx-auto">
        <form onSubmit={addEmployee}>
          {/* Username field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="username" className="text-lg">
              Username:
            </label>
            <Input
              type="text"
              id="username"
              value={usernameInput}
              onChange={changeUsernameInputHandler}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password" className="text-lg">
              Password:
            </label>
            <Input
              type="password"
              id="password"
              value={passwordInput}
              onChange={changePasswordInputHandler}
            />
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" className="text-lg">
              Email:
            </label>
            <Input
              type="email"
              id="email"
              value={emailInput}
              onChange={changeEmailInputHandler}
            />
          </div>

          {/* Phone Number field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="phoneNumber" className="text-lg">
              Phone Number:
            </label>
            <Input
              type="tel"
              id="phoneNumber"
              value={phoneNumberInput}
              onChange={changePhoneNumberInputHandler}
            />
          </div>

          {/* Address field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="address" className="text-lg">
              Address:
            </label>
            <Textarea
              id="address"
              value={addressInput}
              onChange={changeAddressInputHandler}
            />
          </div>

          {/* Button */}
          <Button variant="emerald" className="text-lg">
            Add Employee
          </Button>
        </form>
      </Card>
    </>
  );
}

export default AddEmployeePage;
