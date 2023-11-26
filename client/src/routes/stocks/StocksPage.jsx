import { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import axios from "axios";
import { useSelector } from "react-redux";

function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/stocks");
        setStocks(data);
      } catch (err) {
        console.error(err.response.data.message);
      }
    })();
  }, []);

  async function deleteStockHandler(stock) {
    try {
      await axios.delete(`/api/stocks/${stock.id}`);

      const { data } = await axios.get("/api/stocks");
      setStocks(data);
    } catch (err) {
      console.error(err.response.data.message);
    }
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
            className="mb-2"
          >
            + Add
          </Button>
        </div>

        {/* Table */}
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
              className="grid grid-cols-4 gap-x-4 py-2 justify-items-center items-center"
            >
              <p className="text-center">{stock.name}</p>
              <p className="text-center">{stock.Supplier.name}</p>
              <p>{stock.quantity}</p>
              <div className="flex gap-2">
                <Button variant="sky" type="link" href={`/stocks/${stock.id}`}>
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
      </div>
    </>
  );
}

export default StocksPage;
