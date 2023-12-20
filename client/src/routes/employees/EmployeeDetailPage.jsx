import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Anchor from "../../components/UI/Anchor";
import Button from "../../components/UI/Button";
import useLoading from "../../hooks/useLoading";
import currencyFormatter from "../../utils/currencyFormatter";
import dateFormatter from "../../utils/dateFormatter";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/reducers/ui";

function EmployeeDetailPage() {
  const [employee, setEmployee] = useState();
  const [transactionGroups, setTransactionGroups] = useState([]);
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const loading = useLoading();
  const dispatch = useDispatch();

  useProtectedRoute();

  useEffect(() => {
    (async function () {
      await loading({
        async fn() {
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

          // setTransactionGroups(transactionGroups);
          setTransactionGroups(transactionGroups);
        },
        errorFn(err) {
          if (err.response.status === 404) {
            navigate("/employees");
          }
        },
      });
    })();
  }, [employeeId, navigate, loading]);

  async function deleteEmployeeHandler() {
    await loading({
      async fn() {
        // Delete employee
        await axios.delete(`/api/employees/${employeeId}`);

        // Set success alert
        dispatch(
          setAlert({
            show: true,
            message: "Successfully delete an employee",
            isError: false,
          })
        );

        // Redirect to all employees page
        navigate("/employees");
      },
    });
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

            {/* If there is no transaction */}
            {transactionGroups.length === 0 && (
              <p className="text-center text-lg">
                There is no transaction yet!
              </p>
            )}

            {/* If there is transaction */}
            {transactionGroups.length > 0 && (
              <>
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
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default EmployeeDetailPage;
