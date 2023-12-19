import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import useLoading from "../../hooks/useLoading";

function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const { role } = useSelector((state) => state.auth);
  const loading = useLoading();

  useEffect(() => {
    (async function () {
      await loading({
        async fn() {
          // Fetch all stocks
          const { data } = await axios.get("/api/stocks");

          // set stock state
          setStocks(data);
        },
      });
    })();
  }, [loading]);

  async function deleteStockHandler(stock) {
    await loading({
      async fn() {
        // Delete stock from database
        await axios.delete(`/api/stocks/${stock.id}`);

        // Re-fetch stock
        const { data } = await axios.get("/api/stocks");

        // replace stock state
        setStocks(data);
      },
    });
  }

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mb-6">Stocks</h1>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end">
          <Button
            variant="emerald"
            type="link"
            href="/stocks/add"
            className="mb-2 flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add
          </Button>
        </div>

        <div className="mb-2">
          <Input placeholder="Search for stocks" />
        </div>

        {/* Stocks Table */}
        {/* If there is no stock */}
        {stocks.length === 0 && (
          <p className="text-center text-2xl font-medium">
            There is no stock yet
          </p>
        )}

        {stocks.length > 0 && (
          <div className="divide-y divide-zinc-400 ">
            {/* Heading row */}
            <div className="grid grid-cols-4 gap-x-4 justify-items-center">
              <p className="font-bold text-lg">Stock Name</p>
              <p className="font-bold text-lg">Supplier</p>
              <p className="font-bold text-lg">Quantity</p>
              <p className="font-bold text-lg">Action</p>
            </div>

            {/* Data row */}
            {stocks.map((stock) => (
              <div
                key={stock.id}
                className="grid grid-cols-4 gap-x-4 py-2 text-center items-center"
              >
                {/* Stock name row */}
                <p>{stock.name}</p>

                {/* supplier name row */}
                <p>{stock.Supplier.name}</p>

                {/* quantity row */}
                <p>{stock.quantity}</p>

                {/* Action button row */}
                <div className="flex gap-2">
                  <Button
                    variant="sky"
                    type="link"
                    href={`/stocks/${stock.id}`}
                  >
                    Detail
                  </Button>
                  {role === "admin" && (
                    <Button
                      variant="red"
                      onClick={deleteStockHandler.bind(null, stock)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default StocksPage;
