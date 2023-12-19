import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import useLoading from "../../hooks/useLoading";

function AddStockPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [stockNameInput, setStockNameInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [supplierNameInput, setSupplierNameInput] = useState("");
  const navigate = useNavigate();
  const loading = useLoading();

  useEffect(() => {
    (async function () {
      await loading({
        async fn() {
          // Fetch supplier
          const { data } = await axios.get("/api/suppliers");

          // Set supplier data
          setSuppliers(data);
        },
      });
    })();
  }, [loading]);

  function changeSupplierNameInput(e) {
    setSupplierNameInput(e.target.value);
  }

  function changeDescriptionInputHandler(e) {
    setDescriptionInput(e.target.value);
  }

  function changePriceInputHandler(e) {
    setPriceInput(e.target.value);
  }

  function changeStockNameHandler(e) {
    setStockNameInput(e.target.value);
  }

  function changeQuantityInputHandler(e) {
    setQuantityInput(e.target.value);
  }

  async function addStock(e) {
    // Prevent form default behaviour
    e.preventDefault();

    // Create new stock object
    const newStock = {
      supplier: supplierNameInput,
      name: stockNameInput,
      quantity: quantityInput,
      price: priceInput,
      description: descriptionInput,
    };

    await loading({
      async fn() {
        // Send POST request to the API
        const { data } = await axios.post("/api/stocks", newStock);

        // Redirect to the new stock detail page
        navigate(`/stocks/${data.id}`);
      },
    });
  }

  return (
    <>
      <h1 className="text-center font-semibold text-4xl mb-8">Add Stock</h1>
      <Card className="max-w-lg mx-auto">
        <form onSubmit={addStock}>
          {/* Stock name field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="stockName" className="text-lg">
              Stock Name:
            </label>
            <Input
              type="text"
              id="stockName"
              value={stockNameInput}
              onChange={changeStockNameHandler}
            />
          </div>

          {/* Supplier name Field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="supplierName" className="text-lg">
              Supplier Name:
            </label>
            <select
              id="supplierName"
              className="border-2 rounded text-lg outline-sky-400 px-2.5 py-1.5 w-full"
              onChange={changeSupplierNameInput}
              value={supplierNameInput}
            >
              <option value="">--- Select Supplier ---</option>
              {suppliers.map((supplier) => (
                <option value={supplier.id} key={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="quantity" className="text-lg">
              Quantity:
            </label>
            <Input
              type="number"
              id="quantity"
              value={quantityInput}
              onChange={changeQuantityInputHandler}
              min="0"
            />
          </div>

          {/* Price field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="price" className="text-lg">
              Price:
            </label>
            <Input
              type="number"
              id="price"
              value={priceInput}
              onChange={changePriceInputHandler}
              min="0"
            />
          </div>

          {/* Description field */}
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="description" className="text-lg">
              Description:
            </label>
            <Textarea
              id="description"
              value={descriptionInput}
              onChange={changeDescriptionInputHandler}
            />
          </div>

          {/* Button */}
          <Button variant="emerald" className="text-lg">
            Add Stock
          </Button>
        </form>
      </Card>
    </>
  );
}

export default AddStockPage;
