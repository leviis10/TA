import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/reducers/ui";

function SupplierDetailPage() {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        // Render loading spinner
        dispatch(setIsLoading(true));

        // Get supplier detail
        const { data } = await axios.get(`/api/suppliers/${supplierId}`);

        // set supplier state
        setSupplier(data);
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

  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-8">
        Supplier Detail
      </h1>
      {supplier && (
        <div className="divide-y divide-zinc-400 max-w-2xl mx-auto">
          <Button
            variant="amber"
            type="link"
            href={`/suppliers/${supplier.id}/edit`}
            className="mb-4"
          >
            Edit Supplier
          </Button>
          {/* id row */}
          <div className="grid grid-cols-2 py-3">
            <p>ID</p>
            <p>{supplier.id}</p>
          </div>

          {/* username row */}
          <div className="grid grid-cols-2 py-3">
            <p>Supplier Name</p>
            <p>{supplier.name}</p>
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
      )}
    </>
  );
}

export default SupplierDetailPage;
