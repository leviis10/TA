import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Anchor from "../../components/UI/Anchor";
import Button from "../../components/UI/Button";
import useLoading from "../../hooks/useLoading";
import dateFormatter from "../../utils/dateFormatter";

function StockDetailPage() {
  const { stockId } = useParams();
  const [stock, setStock] = useState();
  const navigate = useNavigate();
  const loading = useLoading();

  useEffect(() => {
    (async function () {
      await loading({
        async fn() {
          // Fetch stock detail from database
          const { data } = await axios.get(`/api/stocks/${stockId}`);

          // set stock state
          setStock(data);
        },
        errorFn() {
          // Redirect to all stocks
          navigate("/stocks");
        },
      });
    })();
  }, [loading, stockId, navigate]);

  async function deleteStockHandler() {
    await loading({
      async fn() {
        await axios.delete(`/api/stocks/${stockId}`);
        navigate("/stocks");
      },
    });
  }

  return (
    <>
      {stock && (
        <>
          <h1 className="text-3xl text-center font-medium mb-6">
            {stock.name} ({stock.Supplier.name})
          </h1>

          <div className="max-w-5xl mx-auto">
            {/* Action button */}
            <div className="flex gap-2 mb-2">
              <Button
                variant="amber"
                type="link"
                href={`/stocks/${stock.id}/edit`}
              >
                Edit Stock
              </Button>
              <Button variant="red" onClick={deleteStockHandler}>
                Delete Stock
              </Button>
            </div>

            {/* Stock Detail */}
            <div className="divide-y divide-zinc-400 mb-3">
              <h2 className="text-2xl font-medium">Stock Detail</h2>
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

            {/* Recent stock transaction */}
            <div className="divide-y divide-zinc-400">
              {/* Sub-title */}
              <h2 className="font-semibold text-2xl mb-1">
                Recent Transaction{stock.Transactions.length > 1 && "s"}
              </h2>

              {/* If stock doesn't have any transaction */}
              {stock.Transactions.length === 0 && (
                <p className="text-center pt-2 text-lg">
                  There is no transaction yet
                </p>
              )}

              {/* If stock have transaction */}
              {stock.Transactions.length > 0 && (
                <div className="divide-y divide-zinc-400">
                  {/* Table header */}
                  <div className="grid grid-cols-6 text-center font-medium text-lg py-1">
                    {/* createdAt */}
                    <h3>Date</h3>

                    {/* Transaction group id */}
                    <h3>Transaction Id</h3>

                    {/* Quantity */}
                    <h3>Quantity</h3>

                    {/* Transaction Type */}
                    <h3>Transaction Type</h3>

                    {/* Seller */}
                    <h3>Seller</h3>

                    {/* Buyer */}
                    <h3>Buyer</h3>
                  </div>

                  {/* Table content */}
                  {stock.Transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="grid grid-cols-6 text-center items-center py-2"
                    >
                      {/* createdAt row */}
                      <p>
                        {dateFormatter(transaction.TransactionGroup.createdAt)}
                      </p>

                      {/* transactionGroupId row */}
                      <Anchor
                        href={`/transactions/${transaction.transactionGroupId}`}
                      >
                        {transaction.transactionGroupId}
                      </Anchor>

                      {/* quantity row */}
                      <p>{transaction.quantity}</p>

                      {/* TransactionGroup.type row */}
                      <p>{transaction.TransactionGroup.type}</p>

                      {/* seller row */}
                      {transaction.TransactionGroup.type === "sell" && (
                        <p>{transaction.seller}</p>
                      )}
                      {transaction.TransactionGroup.type === "purchase" && (
                        <p>{transaction.seller}</p>
                      )}

                      {/* buyer row */}
                      {transaction.TransactionGroup.type === "sell" && (
                        <p>Customer</p>
                      )}
                      {transaction.TransactionGroup.type === "purchase" && (
                        <p>
                          {transaction.TransactionGroup.Employee?.username ||
                            "Deleted Employee"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default StockDetailPage;
