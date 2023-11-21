import { useState } from "react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import Textarea from "../components/UI/Textarea";

function AddEmployeePage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  function addEmployee(e) {
    e.preventDefault();
  }

  return (
    <>
      <h1 className="text-center font-semibold text-4xl mb-8">Add Employee</h1>
      <Card className="max-w-lg mx-auto">
        <form onSubmit={addEmployee} className="">
          {/* Username field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="username" className="text-lg">
              Username:
            </label>
            <Input type="text" id="username" value={usernameInput} />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password" className="text-lg">
              Password:
            </label>
            <Input type="password" id="password" value={passwordInput} />
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" className="text-lg">
              Email:
            </label>
            <Input type="email" id="email" value={emailInput} />
          </div>

          {/* Phone Number field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="phoneNumber" className="text-lg">
              Phone Number:
            </label>
            <Input type="tel" id="phoneNumber" value={phoneNumberInput} />
          </div>

          {/* Address field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="address" className="text-lg">
              Address:
            </label>
            <Textarea id="address" value={addressInput} />
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
