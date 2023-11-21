import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "../components/UI/Button";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/employees");
        setEmployees(data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        }
      }
    })();
  }, []);

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mb-10">Employees</h1>
      <div>
        <table className="mx-auto">
          <thead className="border-b-2 border-b-slate-700">
            <tr>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-24 py-3">{employee.username}</td>
                <td className="px-12 py-3 flex gap-2">
                  <Button
                    type="link"
                    href={`/employees/${employee.id}`}
                    variant="sky"
                  >
                    Detail
                  </Button>
                  {employee.id !== id && <Button variant="red">Delete</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployeesPage;
