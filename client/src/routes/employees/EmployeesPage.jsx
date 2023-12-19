import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import useLoading from "../../hooks/useLoading";
import { setAlert } from "../../store/reducers/ui";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useLoading();

  useEffect(() => {
    (async function () {
      await loading({
        async fn() {
          // Get all employees detail
          const { data } = await axios.get("/api/employees");

          // Set employee to the state
          setEmployees(data);
        },
        errorFn(err) {
          // If error because forbidden(403)
          if (err.response.status === 403) {
            // Set error alert
            dispatch(
              setAlert({
                show: true,
                message: err.response.data.message,
                isError: true,
              })
            );

            // Redirect to home page
            navigate("/");
          }
        },
      });
    })();
  }, [dispatch, loading, navigate]);

  async function deleteEmployee(employee) {
    await loading({
      async fn() {
        // Delete employee
        await axios.delete(`/api/employees/${employee.id}`);

        // Fetch employee again from database
        const { data } = await axios.get("/api/employees");

        // Set new employees state
        setEmployees(data);
      },
    });
  }

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mb-6">Employees</h1>
      <div className="max-w-lg mx-auto">
        <div className="flex justify-end">
          <Button
            variant="emerald"
            type="link"
            href="/employees/add"
            className="mb-2 flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add
          </Button>
        </div>

        {/* Employee list table */}
        <div className="mb-2">
          <Input placeholder="Search for employees" />
        </div>
        <div className="divide-y divide-zinc-400 ">
          <div className="grid grid-cols-2">
            <p className="text-center font-bold text-lg">Username</p>
            <p className="text-center font-bold text-lg">Action</p>
          </div>
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="grid grid-cols-2 items-center py-3"
            >
              <p className="text-center text-lg">{employee.username}</p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="sky"
                  type="link"
                  href={`/employees/${employee.id}`}
                >
                  Detail
                </Button>
                {employee.id !== id && (
                  <Button
                    variant="red"
                    onClick={deleteEmployee.bind(null, employee)}
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

export default EmployeesPage;
