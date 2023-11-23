import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/UI/Button";

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/suppliers");
        setSuppliers(data);
      } catch (err) {
        console.error(err.response.data.message);
      }
    })();
  }, []);

  async function deleteSupplierHandler(supplier) {
    try {
      // Send DELETE request to the api
      await axios.delete(`/api/suppliers/${supplier.id}`);

      // Re-fetch suppliers data
      const { data } = await axios.get("/api/suppliers");
      setSuppliers(data);
    } catch (err) {
      console.error(err.response.data.message);
    }
  }

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mb-10">Suppliers</h1>
      <div className="max-w-lg mx-auto">
        <div className="flex justify-end">
          <Button variant="emerald" type="link" href="/suppliers/add">
            + Add
          </Button>
        </div>
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
      </div>
    </>
  );
}

export default SuppliersPage;
