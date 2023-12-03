import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/reducers/ui";

function EmployeeDetailPage() {
  const [employee, setEmployee] = useState();
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        // Render loading spinner
        dispatch(setIsLoading(true));

        // GET employee detail
        const { data } = await axios.get(`/api/employees/${employeeId}`);

        // Set employee detail to the state
        setEmployee(data);
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
        <div className="divide-y divide-zinc-400 max-w-2xl mx-auto">
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
