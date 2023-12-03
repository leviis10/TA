import { useState, useEffect } from "react";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/reducers/ui";

function EditSupplierPage() {
  const [supplierNameInput, setSupplierNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        // Render loading spinner
        dispatch(setIsLoading(true));

        // Fetch supplier data from database
        const { data } = await axios.get(`/api/suppliers/${supplierId}`);

        // Fill form with the data from the database
        setSupplierNameInput(data.name);
        setPhoneNumberInput(data.phoneNumber);
        setAddressInput(data.address);
      } catch (err) {
        // Do something when wrong
        if (err.response) {
          console.error(err.response.data.message);
          return;
        }
        console.error(err);
      } finally {
        // Remove loading spinner
        dispatch(setIsLoading(false));
      }
    })();
  }, [supplierId, dispatch]);

  function changeSupplierNameInputHandler(e) {
    setSupplierNameInput(e.target.value);
  }

  function changePhoneNumberInputHandler(e) {
    setPhoneNumberInput(e.target.value);
  }

  function changeAddressInputHandler(e) {
    setAddressInput(e.target.value);
  }

  async function editSupplier(e) {
    try {
      // Prevent form default behaviour
      e.preventDefault();

      // Create updated supplier object
      const updatedSupplier = {
        name: supplierNameInput,
        phoneNumber: phoneNumberInput,
        address: addressInput,
      };

      // Render loading spinner
      dispatch(setIsLoading(true));

      // Send PUT request to API
      await axios.put(`/api/suppliers/${supplierId}`, updatedSupplier);

      // Clear input
      setSupplierNameInput("");
      setPhoneNumberInput("");
      setAddressInput("");

      // Redirect back to supplier detail page
      navigate(`/suppliers/${supplierId}`);
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
      <h1 className="text-center font-semibold text-4xl mb-8">
        Update Supplier
      </h1>
      <Card className="max-w-lg mx-auto">
        <form onSubmit={editSupplier}>
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
          <div className="flex gap-2 text-lg">
            <Button variant="sky" type="link" href={`/suppliers/${supplierId}`}>
              Cancel Update
            </Button>
            <Button variant="amber">Update Supplier</Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default EditSupplierPage;
