import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/reducers/ui";
import currencyFormatter from "../../utils/currencyFormatter";
import dateFormatter from "../../utils/dateFormatter";
import Anchor from "../../components/UI/Anchor";

function EmployeeDetailPage() {
  const [employee, setEmployee] = useState();
  const [transactionGroups, setTransactionGroups] = useState([]);
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        // Render loading spinner
        dispatch(setIsLoading(true));

        // GET employee detail
        const { data: employee } = await axios.get(
          `/api/employees/${employeeId}`
        );

        // GET transactionGroup for spesific employee
        const { data: transactionGroups } = await axios.get(
          `/api/employees/${employeeId}/transaction-groups`
        );

        // Set employee and transaction group to the state
        setEmployee(employee);
        setTransactionGroups(transactionGroups);
        // setTransactionGroups(transactionGroups);
      } catch (err) {
        // Do something when error
        if (err.response) {
          console.error(err.response.data.message);
        }
        console.error(err);
        navigate("/employees");
      } finally {
        // Remove loading spinner
        dispatch(setIsLoading(false));
      }
    })();
  }, [employeeId, navigate, dispatch]);

  async function deleteEmployeeHandler() {
    try {
      // Render loading spinner
      dispatch(setIsLoading(true));

      // Delete employee
      await axios.delete(`/api/employees/${employeeId}`);

      // Redirect to all employees page
      navigate("/employees");
    } catch (err) {
      // Do something when error
      if (err.response) {
        console.error(err.response.data.message);
        return;
      }
      console.error(err);
    } finally {
      // Remove loading spinner
      dispatch(setIsLoading(false));
    }
  }

  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-8">
        Employee Detail
      </h1>
      {employee && (
        <>
          <div className="max-w-2xl mx-auto mb-3">
            {/* Action section */}
            <div className="flex gap-2 mb-4">
              <Button
                variant="amber"
                type="link"
                href={`/employees/${employee.id}/edit`}
              >
                Edit Employee
              </Button>
              <Button variant="red" onClick={deleteEmployeeHandler}>
                Delete Employee
              </Button>
            </div>

            {/* Employee detail section */}
            <div className="divide-y divide-zinc-400">
              {/* id row */}
              <div className="grid grid-cols-2 py-3">
                <p>ID</p>
                <p>{employee.id}</p>
              </div>

              {/* username row */}
              <div className="grid grid-cols-2 py-3">
                <p>Username</p>
                <p>{employee.username}</p>
              </div>

              {/* email row */}
              <div className="grid grid-cols-2 py-3">
                <p>Email</p>
                <p>{employee.email}</p>
              </div>

              {/* phone number row */}
              <div className="grid grid-cols-2 py-3">
                <p>Phone Number</p>
                <p>{employee.phoneNumber}</p>
              </div>

              {/* address row */}
              <div className="grid grid-cols-2 py-3">
                <p>Address</p>
                <p>{employee.address}</p>
              </div>
            </div>
          </div>

          {/* Recent transaction section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center font-medium text-3xl mb-2">
              Recent Transactions
            </h2>

            {/* Recent transaction table */}
            <div className="divide-y divide-zinc-400">
              {/* Heading row */}
              <div className="grid grid-cols-4 text-center font-medium text-lg py-1">
                {/* Transaction id row */}
                <h3>Transaction Id</h3>

                {/* type row */}
                <h3>Type</h3>

                {/* Date row */}
                <h3>Date</h3>

                {/* Total price row */}
                <h3>Total</h3>
              </div>

              {/* Content row */}
              {transactionGroups.map((transactionGroup) => (
                <div
                  key={transactionGroup.id}
                  className="grid grid-cols-4 text-center text-lg py-2 items-center"
                >
                  {/* Transaction id row */}
                  <Anchor href={`/transactions/${transactionGroup.id}`}>
                    {transactionGroup.id}
                  </Anchor>

                  {/* type row */}
                  <h3>{transactionGroup.type}</h3>

                  {/* Date row */}
                  <h3>{dateFormatter(transactionGroup.createdAt)}</h3>

                  {/* Total price row */}
                  <h3
                    className={`font-medium ${
                      transactionGroup.type === "sell"
                        ? "text-emerald-800"
                        : "text-red-500"
                    }`}
                  >
                    {currencyFormatter(transactionGroup.totalPrice)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EmployeeDetailPage;
