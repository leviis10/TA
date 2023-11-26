import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";

function EditStockPage() {
  const { stockId } = useParams();
  const [stock, setStock] = useState();
  const [quantityInput, setQuantityInput] = useState();
  const [priceInput, setPriceInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`/api/stocks/${stockId}`);
        setStock(data);

        // Pre fill form
        setQuantityInput(data.quantity);
        setPriceInput(data.price);
        setDescriptionInput(data.description || "");
      } catch (err) {
        console.error(err.response.data.message);
      }
    })();
  }, [stockId]);

  function changeDescriptionInputHandler(e) {
    setDescriptionInput(e.target.value);
  }

  function changeQuantityInputHandler(e) {
    setQuantityInput(e.target.value);
  }

  function changePriceInputHandler(e) {
    setPriceInput(e.target.value);
  }

  async function editStock(e) {
    try {
      e.preventDefault();
      const updatedStock = {
        quantity: quantityInput,
        price: priceInput,
      };
      await axios.patch(`/api/stocks/${stockId}`, updatedStock);
      navigate(`/stocks/${stockId}`);
    } catch (err) {
      console.error(err.response.data.message);
    }
  }

  return (
    <>
      <h1 className="text-center font-semibold text-4xl mb-8">Edit Stock</h1>
      {stock && (
        <Card className="max-w-lg mx-auto">
          <form onSubmit={editStock}>
            {/* Id field */}
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="stockId" className="text-lg">
                Stock Id:
              </label>
              <Input type="text" id="stockId" value={stock.id} disabled />
            </div>

            {/* Supplier name field */}
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="supplierName" className="text-lg">
                Supplier Name:
              </label>
              <Input
                type="text"
                id="supplierName"
                value={stock.Supplier.name}
                disabled
              />
            </div>

            {/* Stock name field */}
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="stockName" className="text-lg">
                Stock Name:
              </label>
              <Input type="tel" id="stockName" value={stock.name} disabled />
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
                min={0}
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
                min={0}
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
            <div className="flex gap-2">
              <Button
                variant="red"
                type="link"
                href={`/stocks/${stock.id}`}
                className="text-lg"
              >
                Cancel Edit
              </Button>
              <Button variant="amber" className="text-lg">
                Edit Stock
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}

export default EditStockPage;
