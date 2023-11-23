import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/UI/Button";

function EmployeeDetailPage() {
  const [employee, setEmployee] = useState();
  const { employeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`/api/employees/${employeeId}`);
        setEmployee(data);
      } catch (err) {
        navigate("/employees");
        console.error(err);
      }
    })();
  }, [employeeId, navigate]);

  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-8">
        Employee Detail
      </h1>
      {employee && (
        <div className="divide-y divide-zinc-400 max-w-2xl mx-auto">
          <Button
            variant="amber"
            type="link"
            href={`/employees/${employee.id}/edit`}
          >
            Edit Employee
          </Button>
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
      )}
    </>
  );
}

export default EmployeeDetailPage;
