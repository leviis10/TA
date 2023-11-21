import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
      <h1 className="text-4xl font-semibold text-center">Employee Detail</h1>
      {employee && (
        <div>
          <p>Id: {employee.id}</p>
          <p>Username: {employee.username}</p>
          <p>Email: {employee.email}</p>
          <p>Phone Number: {employee.phoneNumber}</p>
          <p>Address: {employee.address}</p>
        </div>
      )}
    </>
  );
}

export default EmployeeDetailPage;
