import { useState } from "react";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/reducers/ui";

function AddSupplierPage() {
  const [supplierNameInput, setSupplierNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function changeSupplierNameInputHandler(e) {
    setSupplierNameInput(e.target.value);
  }

  function changePhoneNumberInputHandler(e) {
    setPhoneNumberInput(e.target.value);
  }

  function changeAddressInputHandler(e) {
    setAddressInput(e.target.value);
  }

  async function addSupplier(e) {
    try {
      // Prevent form default behaviour
      e.preventDefault();

      // Create new supplier object
      const supplier = {
        name: supplierNameInput,
        phoneNumber: phoneNumberInput,
        address: addressInput,
      };

      // Render loading spinner
      dispatch(setIsLoading(true));

      // Send request to the API
      const { data } = await axios.post("/api/suppliers", supplier);

      // Clear form
      setSupplierNameInput("");
      setPhoneNumberInput("");
      setAddressInput("");

      // Redirect to new supplier detail page
      navigate(`/suppliers/${data.id}`);
    } catch (err) {
      // Do something when error
      if (err.response) {
        console.error(err.response.data.message);
        return;
      }
      console.error(err);
    } finally {
      // Remove loading spinner
      dispatch(setIsLoading(false));
    }
  }

  return (
    <>
      <h1 className="text-center font-semibold text-4xl mb-8">Add Supplier</h1>
      <Card className="max-w-lg mx-auto">
        <form onSubmit={addSupplier}>
          {/* Supplier name field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="supplierName" className="text-lg">
              Supplier Name:
            </label>
            <Input
              type="text"
              id="supplierName"
              value={supplierNameInput}
              onChange={changeSupplierNameInputHandler}
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
            Add Supplier
          </Button>
        </form>
      </Card>
    </>
  );
}

export default AddSupplierPage;
