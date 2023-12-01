import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import { setIsLoading } from "../../store/reducers/ui";

function StockDetailPage() {
  const { stockId } = useParams();
  const [stock, setStock] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        // Render loading spinner
        dispatch(setIsLoading(true));

        // Fetch stock detail from database
        const { data } = await axios.get(`/api/stocks/${stockId}`);

        // set stock state
        setStock(data);
      } catch (err) {
        if (err.response) {
          console.error(err.response.data.message);
        }
        console.error(err);

        // Redirect to all stocks
        navigate("/stocks");
      } finally {
        // Remove loading spinner
        dispatch(setIsLoading(false));
      }
    })();
  }, [stockId, navigate, dispatch]);

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mb-6">Stock Detail</h1>
      {stock && (
        <div className="divide-y divide-zinc-400 max-w-2xl mx-auto">
          <Button
            variant="amber"
            type="link"
            href={`/stocks/${stock.id}/edit`}
            className="mb-4"
          >
            Edit Stock
          </Button>
          {/* id row */}
          <div className="grid grid-cols-2 py-3">
            <p>ID</p>
            <p>{stock.id}</p>
          </div>

          {/* supplier name row */}
          <div className="grid grid-cols-2 py-3">
            <p>Supplier</p>
            <p>{stock.Supplier.name}</p>
          </div>

          {/* stock name row */}
          <div className="grid grid-cols-2 py-3">
            <p>Stock Name</p>
            <p>{stock.name}</p>
          </div>

          {/* quantity row */}
          <div className="grid grid-cols-2 py-3">
            <p>Quantity</p>
            <p>{stock.quantity}</p>
          </div>

          {/* price row */}
          <div className="grid grid-cols-2 py-3">
            <p>Price</p>
            <p>{stock.price}</p>
          </div>

          {/* description row */}
          {stock.description && (
            <div className="grid grid-cols-2 py-3">
              <p>Description</p>
              <p>{stock.description}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default StockDetailPage;
