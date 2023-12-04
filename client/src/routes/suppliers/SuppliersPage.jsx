import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/UI/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { setIsLoading } from "../../store/reducers/ui";
import Input from "../../components/UI/Input";

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        // Render loading spinner
        dispatch(setIsLoading(true));

        // Get all suppliers from database
        const { data } = await axios.get("/api/suppliers");

        // set suppliers state
        setSuppliers(data);
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
    })();
  }, [dispatch]);

  async function deleteSupplierHandler(supplier) {
    try {
      // Render loading spinner
      dispatch(setIsLoading(true));

      // Send DELETE request to the api
      await axios.delete(`/api/suppliers/${supplier.id}`);

      // Re-fetch suppliers data
      const { data } = await axios.get("/api/suppliers");

      // Set supplier again
      setSuppliers(data);
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
      <h1 className="text-4xl text-center font-semibold mb-6">Suppliers</h1>
      <div className="max-w-lg mx-auto">
        <div className="flex justify-end">
          <Button
            variant="emerald"
            type="link"
            href="/suppliers/add"
            className="mb-2 flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add
          </Button>
        </div>

        <div className="mb-2">
          <Input placeholder="Search for suppliers" />
        </div>

        {/* Suppliers table */}
        {/* If there is no supplier */}
        {suppliers.length === 0 && (
          <p className="text-center text-2xl font-medium">
            There is no suppliers yet
          </p>
        )}

        {/* If there is suppliers */}
        {suppliers.length > 0 && (
          <div className="divide-y divide-zinc-400 ">
            <div className="grid grid-cols-2">
              <p className="text-center font-bold text-lg">Suppliers Name</p>
              <p className="text-center font-bold text-lg">Action</p>
            </div>
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="grid grid-cols-2 items-center py-3"
              >
                <p className="text-center text-lg">{supplier.name}</p>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="sky"
                    type="link"
                    href={`/suppliers/${supplier.id}`}
                  >
                    Detail
                  </Button>
                  <Button
                    variant="red"
                    onClick={deleteSupplierHandler.bind(null, supplier)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SuppliersPage;
