import { useContext, useState } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import AddressFormModal from "../../Forms/AddressForm";
import type { Address } from "../../../types/User";

const MyAddresses = () => {
  const auth = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditAddress] = useState<Address | undefined>();

  if (!auth) return <div>Loading...</div>;

  const { addAddress, addresses, deleteAddress, editAddress } = auth;

  const handleAddAddressClick = () => {
    setEditAddress(undefined);
    setModalOpen(true);
  };

  const handleSave = (newAddress: Address) => {
    if (editingAddress) {
      editAddress(newAddress);
    } else {
      addAddress(newAddress);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Your Addresses</h2>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="mb-6">
            <button
              onClick={handleAddAddressClick}
              className="flex items-center gap-2 text-black border-2 border-dashed  px-4 py-2 rounded-xl hover:bg-gray-200 transition h-50 w-full md:w-52 justify-center"
            >
              <FaPlus />
              Add New Address
            </button>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className="border rounded-lg shadow-sm bg-white p-4 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <p className="font-semibold">{address.fullName}</p>
                    <span>{address.street}</span> ,{" "}
                    <span>{address.landmark}</span>
                    <p>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p className="font-bold">{address.country}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {address.mobile}
                    </p>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditAddress(address);
                        setModalOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteAddress(address.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600 col-span-full">
                No addresses found!
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddressFormModal
          closeModal={() => setModalOpen(false)}
          onSave={handleSave}
          existingAddress={editingAddress}
        />
      )}
    </div>
  );
};

export default MyAddresses;
