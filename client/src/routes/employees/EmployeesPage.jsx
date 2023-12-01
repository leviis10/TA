import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/24/solid";
import Button from "../../components/UI/Button";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/employees");
        setEmployees(data);
      } catch (err) {
        console.error(err.response.data.message);
      }
    })();
  }, []);

  async function deleteEmployee(employee) {
    try {
      // Delete employee
      await axios.delete(`/api/employees/${employee.id}`);

      // Fetch employee again from database
      const { data } = await axios.get("/api/employees");
      setEmployees(data);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      }
    }
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
