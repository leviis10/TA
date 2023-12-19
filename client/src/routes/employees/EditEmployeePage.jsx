import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import useLoading from "../../hooks/useLoading";
import useProtectedRoute from "../../hooks/useProtectedRoute";

function EditEmployeePage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const loading = useLoading();

  useProtectedRoute();

  useEffect(() => {
    (async function () {
      await loading({
        async fn() {
          // Get Employee data
          const { data } = await axios.get(`/api/employees/${employeeId}`);

          // Pre fill form with employee data
          setUsernameInput(data.username);
          setEmailInput(data.email);
          setPhoneNumberInput(data.phoneNumber);
          setAddressInput(data.address);
        },
        errorFn(err) {
          if (err.response.status === 404) {
            navigate("/employees");
          }
        },
      });
    })();
  }, [loading, employeeId, navigate]);

  function changeUsernameInputHandler(e) {
    setUsernameInput(e.target.value);
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

  async function editEmployee(e) {
    e.preventDefault();

    // Create edited employee object
    const employee = {
      username: usernameInput,
      email: emailInput,
      phoneNumber: phoneNumberInput,
      address: addressInput,
    };

    await loading({
      async fn() {
        // Send put request to the server
        await axios.put(`/api/employees/${employeeId}`, employee);

        // Clear all input
        setUsernameInput("");
        setEmailInput("");
        setPhoneNumberInput("");
        setAddressInput("");

        // redirect back to employee detail page
        navigate(`/employees/${employeeId}`);
      },
    });
  }

  return (
    <>
      <h1 className="text-center font-semibold text-4xl mb-8">Edit Employee</h1>
      <Card className="max-w-lg mx-auto">
        <form onSubmit={editEmployee}>
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
              disabled
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
          <div className="flex gap-2">
            <Button
              variant="red"
              type="link"
              href={`/employees/${employeeId}`}
              className="text-lg"
            >
              Cancel Edit
            </Button>
            <Button variant="amber" className="text-lg">
              Edit Employee
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default EditEmployeePage;
