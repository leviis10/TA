import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/reducers/ui";
import currencyFormatter from "../../utils/currencyFormatter";
import Anchor from "../../components/UI/Anchor";
import dateFormatter from "../../utils/dateFormatter";

function SupplierDetailPage() {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState();
  const [transactionGroups, setTransactionGroups] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        // Render loading spinner
        dispatch(setIsLoading(true));

        // Get supplier detail
        const { data: supplier } = await axios.get(
          `/api/suppliers/${supplierId}`
        );

        // Get TransactionGroups detail
        const { data: transactionGroups } = await axios.get(
          `/api/suppliers/${supplierId}/transaction-groups`
        );

        // set supplier and transaction group state
        setSupplier(supplier);
        setTransactionGroups(transactionGroups);
      } catch (err) {
        // Do something when error
        if (err.response) {
          console.error(err.response.data.message);
        }
        console.error(err);
        navigate("/suppliers");
      } finally {
        // Remove loading spinner
        dispatch(setIsLoading(false));
      }
    })();
  }, [supplierId, navigate, dispatch]);

  async function deleteSupplierHandler() {
    try {
      // Render loading spinner
      dispatch(setIsLoading(true));

      // Delete supplier
      await axios.delete(`/api/suppliers/${supplierId}`);

      // Redirect to all suppliers
      navigate("/suppliers");
    } catch (err) {
      // Do something when error
      if (err.response) {
        console.error(err.response.data.message);
        return;
      }
    } finally {
      // Remove loading spinner
      dispatch(setIsLoading(false));
    }
  }

  return (
    <>
      {supplier && (
        <>
          {/* Supplier detail section */}
          <h1 className="text-4xl font-semibold text-center mb-8">
            {supplier.name}
          </h1>
          <div className="divide-y divide-zinc-400 max-w-2xl mx-auto mb-5">
            <div className="flex gap-2 mb-4">
              <Button
                variant="amber"
                type="link"
                href={`/suppliers/${supplier.id}/edit`}
              >
                Edit Supplier
              </Button>
              <Button variant="red" onClick={deleteSupplierHandler}>
                Delete Supplier
              </Button>
            </div>
            {/* id row */}
            <div className="grid grid-cols-2 py-3">
              <p>ID</p>
              <p>{supplier.id}</p>
            </div>

            {/* phone number row */}
            <div className="grid grid-cols-2 py-3">
              <p>Phone Number</p>
              <p>{supplier.phoneNumber}</p>
            </div>

            {/* address row */}
            <div className="grid grid-cols-2 py-3">
              <p>Address</p>
              <p>{supplier.address}</p>
            </div>
          </div>

          {/* stock and transaction table section */}
          <div className="grid grid-cols-12 gap-9">
            {/* Stock table */}
            <div className="divide-y divide-zinc-400 col-start-1 col-end-6">
              <h2 className="text-2xl font-medium text-center mb-1">
                Stock List
              </h2>

              {/* Heading row */}
              <div className="grid grid-cols-3 font-medium text-lg text-center py-1">
                {/* Stock name */}
                <h3>Stock Name</h3>

                {/* quantity */}
                <h3>Quantity</h3>

                {/* Price */}
                <h3>Price</h3>
              </div>

              {/* Content row */}
              {supplier.Stocks.map((stock) => (
                <div
                  key={stock.id}
                  className="grid grid-cols-3 text-center py-2 items-center"
                >
                  {/* stockName row */}
                  <p className="text-start">{stock.name}</p>

                  {/* quantity row */}
                  <p>{stock.quantity}</p>

                  {/* price row */}
                  <p>{currencyFormatter(stock.price)}</p>
                </div>
              ))}
            </div>

            {/* Transaction table */}
            <div className="divide-y divide-zinc-400 col-span-7">
              <h2 className="text-2xl font-medium text-center mb-1">
                Recent Transaction{transactionGroups.length > 1 && "s"}
              </h2>

              {/* Heading row */}
              <div className="grid grid-cols-4 font-medium text-lg text-center py-1">
                {/* Transaction id row */}
                <h3>Transaction Id</h3>

                {/* buyer row */}
                <h3>Buyer</h3>

                {/* Total */}
                <h3>Price</h3>

                {/* Date row */}
                <h3>Date</h3>
              </div>

              {/* Content row */}
              {transactionGroups.map((transactionGroup) => (
                <div
                  key={transactionGroup.id}
                  className="grid grid-cols-4 text-center py-2 items-center"
                >
                  {/* transaction id row */}
                  <Anchor href={`/transactions/${transactionGroup.id}`}>
                    {transactionGroup.id}
                  </Anchor>

                  {/* buyer row */}
                  <p>
                    {transactionGroup.Employee?.username || "Deleted Employee"}
                  </p>

                  {/* total price row */}
                  <p>{currencyFormatter(transactionGroup.price)}</p>

                  {/* Date row */}
                  <p>{dateFormatter(transactionGroup.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SupplierDetailPage;
