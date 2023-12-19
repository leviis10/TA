import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import useLoading from "../../hooks/useLoading";
import { setAlert } from "../../store/reducers/ui";
import currencyFormatter from "../../utils/currencyFormatter";
import filterCart from "../../utils/filterCart";

function AddSellingTransactionPage() {
  const { id } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useLoading();

  const [cart, setCart] = useState([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [stocks, setStocks] = useState([]);

  // Input state
  const [searchInput, setSearchInput] = useState("");
  const [quantityInput, setQuantityInput] = useState(1);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    (async function () {
      // If isAddingItem === false
      if (!isAddingItem) {
        // Reset stocks query
        setStocks([]);
        return;
      }

      await loading({
        async fn() {
          // If isAddingItem === true, Request stocks from the database
          const { data } = await axios.get("/api/stocks");

          // Remove stocks if it's already in cart
          const filteredData = filterCart(data, cart);
          setStocks(filteredData);
        },
      });
    })();
  }, [cart, isAddingItem, loading]);

  function changeSearchInputHandler(e) {
    setSearchInput(e.target.value);
  }

  function showAddItemFormHandler() {
    setIsAddingItem(true);
  }

  async function searchStocksHandler(e) {
    // Prevent form default behaviour
    e.preventDefault();

    await loading({
      async fn() {
        // Request stock list from the database
        const { data } = await axios.get(
          `/api/stocks?query=${encodeURI(searchInput)}`
        );

        // Remove stock if it's already in the cart
        const filteredData = filterCart(data, cart);
        setStocks(filteredData);
      },
    });
  }

  function selectStockHandler(stock) {
    setSelectedStock(stock);
    setQuantityInput(1);
  }

  function changeQuantityInputHandler(e) {
    if (e.target.value > selectedStock.quantity) {
      setQuantityInput(selectedStock.quantity);
      return;
    }

    if (e.target.value <= 0) {
      setQuantityInput(1);
      return;
    }

    setQuantityInput(e.target.value);
  }

  function cancelAddStockHandler() {
    setSelectedStock(null);
    setQuantityInput(1);
    setIsAddingItem(false);
    setSearchInput("");
  }

  function addItemHandler() {
    // Validation
    if (!selectedStock) {
      return;
    }

    // create newItem object
    const newItem = {
      // Data to add to the database
      id: v4(),
      stockId: selectedStock.id,
      quantity: quantityInput,
      price: selectedStock.price,
      note: null,

      // Additional data
      stockName: selectedStock.name,
    };

    // add item to cart
    setCart((previousCart) => [...previousCart, newItem]);

    // Close add item modal
    cancelAddStockHandler();

    // Reset stock search input
    setSearchInput("");
  }

  async function addSellingTransactionHandler(e) {
    // Prevent form default behaviour
    e.preventDefault();

    // If there is no item in the cart
    if (cart.length === 0) {
      // Show error alert
      dispatch(
        setAlert({
          show: true,
          message: "Cart is empty",
          isError: true,
        })
      );
      return;
    }

    // Create new transaction group
    const newTransactionGroup = {
      buyer: null,
      seller: id,
      type: "sell",
    };

    await loading({
      async fn() {
        // Request to create new transaction group
        const { data } = await axios.post(
          "/api/transaction-groups",
          newTransactionGroup
        );

        // Add transactions
        for (const item of cart) {
          item.transactionGroupId = data.id;
          await axios.post("/api/transactions?type=sell", item);
        }

        // Redirect to transaction detail page
        navigate(`/transactions/${data.id}`);
      },
    });
  }

  async function removeItemFromCartHandler(stockId) {
    // Remove item from cart
    setCart((previousCart) =>
      previousCart.filter((item) => item.stockId !== stockId)
    );

    await loading({
      async fn() {
        // Request all stock from the database
        const { data } = await axios.get("/api/stocks");

        // Remove stocks that already in the cart
        const filteredData = filterCart(data, cart);
        setStocks(filteredData);
      },
    });
  }

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mb-6">
        Add Selling Transaction
      </h1>
      {cart.map((item) => (
        <Card
          key={item.id}
          className="mb-1 grid grid-cols-5 items-center justify-items-center"
        >
          {/* Stock name field */}
          <div className="text-center">
            <p className="font-semibold">Stock Name</p>
            <p>{item.stockName}</p>
          </div>

          {/* Quantity field */}
          <div className="text-center">
            <p className="font-semibold">Quantity</p>
            <p>{item.quantity}</p>
          </div>

          {/* Price field */}
          <div className="text-center">
            <p className="font-semibold">Price</p>
            <p>{currencyFormatter(item.price)}</p>
          </div>

          {/* Total Price */}
          <div className="text-center">
            <p className="font-semibold">Total Price</p>
            <p>{currencyFormatter(item.price * item.quantity)}</p>
          </div>

          {/* Cancel action button */}
          <div>
            <Button
              variant="red"
              onClick={removeItemFromCartHandler.bind(null, item.stockId)}
            >
              Remove Item
            </Button>
          </div>
        </Card>
      ))}

      {/* isAddingItem conditional state */}
      {/* isAddingItem is false */}
      {!isAddingItem && (
        <Card className="flex flex-col mb-2">
          <Button
            variant="emerald"
            className="mx-auto"
            onClick={showAddItemFormHandler}
          >
            Add New Item
          </Button>
        </Card>
      )}

      {/* isAddingItem is true */}
      {isAddingItem && (
        <Card className="grid grid-cols-4 items-center mb-2">
          {/* Stock column */}
          <div className="grow border-2 rounded flex flex-col">
            {/* Stock Search */}
            <form onSubmit={searchStocksHandler}>
              <input
                type="text"
                className="border-b-2 rounded text-lg outline-sky-400 py-1 px-3 w-full search"
                id="search"
                placeholder="Search for stocks"
                onChange={changeSearchInputHandler}
                value={searchInput}
              ></input>
            </form>

            {/* Stock search result */}
            <div className="text-center py-2 max-h-28 overflow-y-scroll">
              {stocks.length === 0 && <p>No Stocks found</p>}
              {stocks.length > 0 &&
                stocks.map((stock) => (
                  <div key={stock.id}>
                    <input
                      type="radio"
                      name="stockName"
                      id={stock.name.replace(" ", "")}
                      value={stock.id}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={stock.name.replace(" ", "")}
                      className="block py-1 peer-checked:bg-sky-400"
                      onClick={selectStockHandler.bind(null, stock)}
                    >
                      {stock.name}
                    </label>
                  </div>
                ))}
            </div>
          </div>

          {/* Quantity column */}
          <div className="grow flex flex-col">
            <p className="text-center font-semibold text-lg mb-3">Quantity</p>
            {selectedStock && (
              <small className="text-center">
                Max. {selectedStock.quantity}
              </small>
            )}
            <input
              type="number"
              id="quantity"
              className="border-2 rounded text-lg outline-sky-400 px-2.5 py-1.5 max-w-[50%] mx-auto"
              min={1}
              max={selectedStock?.quantity}
              value={quantityInput}
              onChange={changeQuantityInputHandler}
            />
          </div>

          {/* Summary column */}
          <div className="grow flex flex-col items-center">
            <p className="text-center font-semibold text-lg mb-3">Summary</p>
            {!selectedStock && <p>Summary will show here</p>}
            {selectedStock && (
              <>
                <p>Item: {selectedStock.name}</p>
                <p>Quantity: {quantityInput}</p>
                <p>
                  Total:{" "}
                  {currencyFormatter(selectedStock.price * quantityInput)}
                </p>
              </>
            )}
          </div>

          {/* Action column */}
          <div className="grow flex gap-2 justify-center">
            <Button variant="emerald" onClick={addItemHandler}>
              <CheckIcon className="h-4 w-4" />
            </Button>
            <Button variant="red" onClick={cancelAddStockHandler}>
              <XMarkIcon className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Add Transaction form */}
      <form
        className="flex justify-end"
        onSubmit={addSellingTransactionHandler}
      >
        <Button variant="emerald">Add New Selling Transaction</Button>
      </form>
    </>
  );
}

export default AddSellingTransactionPage;
