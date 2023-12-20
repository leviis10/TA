import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import useLoading from "../../hooks/useLoading";
import currencyFormatter from "../../utils/currencyFormatter";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/reducers/ui";

function TransactionDetailPage() {
  const { transactionGroupId } = useParams();
  const [transactionGroup, setTransactionGroup] = useState(null);
  const navigate = useNavigate();
  const loading = useLoading();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      await loading({
        async fn() {
          // Request transaction group detail from the database
          const { data } = await axios.get(
            `/api/transaction-groups/${transactionGroupId}`
          );
          setTransactionGroup(data);
        },
      });
    })();
  }, [loading, transactionGroupId]);

  async function deleteTransactionGroupHandler() {
    await loading({
      async fn() {
        // Request to delete transaction group
        await axios.delete(`/api/transaction-groups/${transactionGroupId}`);

        // Show success alert
        dispatch(
          setAlert({
            show: true,
            message: "Successfully delete transaction",
            isError: false,
          })
        );

        // Redirect to all transactions page
        navigate("/transactions");
      },
    });
  }

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mb-6">
        Transaction Detail
      </h1>
      {transactionGroup && (
        <div className="max-w-3xl mx-auto">
          {/* Action button */}
          <Button
            variant="red"
            onClick={deleteTransactionGroupHandler}
            className="mb-4"
          >
            Delete Transaction
          </Button>
          {/* Transaction detail */}
          <div className="divide-y divide-zinc-400">
            {/* Transaction id row */}
            <div className="grid grid-cols-2 text-lg py-3">
              <h3 className="font-medium">Transaction Id</h3>
              <p>{transactionGroup.id}</p>
            </div>

            {/* Transaction type row */}
            <div className="grid grid-cols-2 text-lg py-3">
              <h3 className="font-medium">Transaction Type</h3>
              <p>{transactionGroup.type}</p>
            </div>

            {/* Buyer row */}
            <div className="grid grid-cols-2 text-lg py-3">
              <h3 className="font-medium">Buyer</h3>
              <p>
                {transactionGroup.type === "sell"
                  ? "Customer"
                  : transactionGroup.Employee?.username || "Deleted Employee"}
              </p>
            </div>

            {/* Seller row */}
            <div className="grid grid-cols-2 text-lg py-3">
              <h3 className="font-medium">Seller</h3>
              <p>
                {transactionGroup.type === "sell"
                  ? transactionGroup.seller?.username || "Deleted employee"
                  : "supplier"}
              </p>
            </div>
          </div>

          {/* Items Detail */}
          <div className="max-w-3xl mx-auto">
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
                  className="grid grid-cols-4 text-center py-2 items-center"
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
        </div>
      )}
    </>
  );
}

export default TransactionDetailPage;
