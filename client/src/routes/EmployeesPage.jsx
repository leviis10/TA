import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const { token } = useSelector((state) => state.auth);

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
      <h1 className="text-4xl text-center font-semibold">Employees</h1>
      <div>
        <table className="border border-slate-950 mx-auto">
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border border-slate-950 px-24 py-3">
                  {employee.username}
                </td>
                <td className="border border-slate-950 px-12 py-3">
                  <button className="border">Detail</button>
                  <button className="border">Delete</button>
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
