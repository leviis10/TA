import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import currencyFormatter from "../../utils/currencyFormatter";
import Button from "../../components/UI/Button";

function TransactionDetailPage() {
  const { transactionGroupId } = useParams();
  const [transactionGroup, setTransactionGroup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(
          `/api/transaction-groups/${transactionGroupId}`
        );
        setTransactionGroup(data);
      } catch (err) {
        console.error(err.response.data.message);
      }
    })();
  }, [transactionGroupId]);

  async function deleteTransactionGroupHandler() {
    try {
      await axios.delete(`/api/transaction-groups/${transactionGroupId}`);
      navigate("/transactions");
    } catch (err) {
      console.error(err.response.data.message);
    }
  }

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mb-6">
        Transaction Detail
      </h1>
      {transactionGroup && (
        <>
          <p>Transaction Id: {transactionGroup.id}</p>
          <p>Transaction Type: {transactionGroup.type}</p>
          <p>
            buyer:{" "}
            {transactionGroup.type === "sell"
              ? "Customer"
              : transactionGroup.Employee?.username || "Deleted Employee"}
          </p>
          <p>
            seller:{" "}
            {transactionGroup.type === "sell"
              ? transactionGroup.seller?.username || "Deleted employee"
              : "Supplier"}
          </p>

          {/* Items Table */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-end">
              <Button variant="red" onClick={deleteTransactionGroupHandler}>
                Delete
              </Button>
            </div>
            <h2 className="text-3xl text-center font-semibold mb-2">
              Items Detail
            </h2>
            <div className="divide-y divide-zinc-400">
              {/* Header Row */}
              <div className="grid grid-cols-4 text-center font-bold text-lg">
                <p>Item Name</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Total Price</p>
              </div>

              {/* Content Row */}
              {transactionGroup.Transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid grid-cols-4 text-center py-2"
                >
                  <p className="text-left">
                    {transaction.Stock?.name || "Deleted Stock"}
                  </p>
                  <p>{transaction.quantity}</p>
                  <p>{currencyFormatter(transaction.price)}</p>
                  <p>
                    {currencyFormatter(
                      transaction.price * transaction.quantity
                    )}
                  </p>
                </div>
              ))}

              {/* Grand Total Price row */}
              <div className="border-t border-zinc-400 grid grid-cols-4 items-center">
                <p className="text-xl font-semibold">Total</p>
                <p className="col-start-4 col-end-4 text-center">
                  {currencyFormatter(
                    transactionGroup.Transactions.reduce(
                      (acc, transaction) =>
                        acc + transaction.price * transaction.quantity,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TransactionDetailPage;
