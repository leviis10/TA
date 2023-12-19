import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import Anchor from "../../components/UI/Anchor";
import Button from "../../components/UI/Button";
import useLoading from "../../hooks/useLoading";
import countSupplier from "../../utils/countSupplier";
import currencyFormatter from "../../utils/currencyFormatter";
import dateFormatter from "../../utils/dateFormatter";

function TransactionsPage() {
  const [transactionGroups, setTransactionGroups] = useState([]);
  const loading = useLoading();

  useEffect(() => {
    (async function () {
      await loading({
        async fn() {
          // Fetch all transaction group
          const { data } = await axios.get("/api/transaction-groups");

          // Count suppliers
          const modifiedData = countSupplier(data);

          // set transactionGroups state
          setTransactionGroups(modifiedData);
        },
      });
    })();
  }, [loading]);

  function totalPriceColor(transactionType) {
    if (transactionType === "sell") {
      return "text-emerald-800";
    }

    if (transactionType === "purchase") {
      return "text-red-500";
    }
  }

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mb-6">Transactions</h1>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end gap-2 mb-2">
          <Button
            variant="emerald"
            type="link"
            href="/transactions/add/sell"
            className="flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Selling Transaction
          </Button>
          <Button
            variant="red"
            type="link"
            href="/transactions/add/purchase"
            className="flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Purchase Transaction
          </Button>
        </div>

        {/* Transactions table */}
        {/* If there is no transactionGroups */}
        {transactionGroups.length === 0 && (
          <p className="text-center text-2xl font-medium">
            There is no transaction yet
          </p>
        )}

        {/* If there is transactionGroups */}
        {transactionGroups.length > 0 && (
          <div className="divide-y divide-zinc-400 ">
            {/* Header row */}
            <div className="grid grid-cols-6 text-center font-bold text-lg">
              <p>Transaction Id</p>
              <p>Seller</p>
              <p>Buyer</p>
              <p>Type</p>
              <p>Date</p>
              <p>Total Price</p>
            </div>

            {/* Content row */}
            {transactionGroups.map((transactionGroup) => (
              <div
                key={transactionGroup.id}
                className="grid grid-cols-6 text-center items-center py-2"
              >
                {/* Transaction id column */}
                <Anchor href={`/transactions/${transactionGroup.id}`}>
                  {transactionGroup.id}
                </Anchor>

                {/* Seller column */}
                <p>
                  {transactionGroup.type === "sell"
                    ? transactionGroup.seller?.username || "Deleted Employee"
                    : `${transactionGroup.supplierCount} Supplier${
                        transactionGroup.supplierCount > 1 ? "s" : ""
                      }`}
                </p>

                {/* Buyer column */}
                <p>
                  {transactionGroup.type === "sell"
                    ? "Customer"
                    : transactionGroup.Employee?.username || "Deleted Employee"}
                </p>

                {/* Type column */}
                <p>{transactionGroup.type}</p>

                {/* Date column */}
                <p>{dateFormatter(transactionGroup.createdAt)}</p>

                {/* Total price column */}
                <p
                  className={`font-medium ${totalPriceColor(
                    transactionGroup.type
                  )}`}
                >
                  {currencyFormatter(
                    transactionGroup.Transactions.reduce(
                      (acc, transaction) =>
                        acc + transaction.price * transaction.quantity,
                      0
                    )
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default TransactionsPage;
