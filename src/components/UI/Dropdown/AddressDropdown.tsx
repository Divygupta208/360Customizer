import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import type { Address } from "../../../types/User";

const AddressDropdown = ({ addresses, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Address | null>();
  const dropdownRef = useRef(null);

  const handleSelect = (addr: any) => {
    setSelected(addr);
    setIsOpen(false);
    onSelect(addr);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer border p-4 rounded-md flex justify-between items-center bg-white shadow hover:shadow-md"
      >
        {selected ? (
          <div className="text-sm text-left">
            <p className="font-semibold">{selected.fullName}</p>
            <p className="text-gray-500 text-xs">
              {selected.city}, {selected.state}
            </p>
          </div>
        ) : (
          <p className="text-gray-400">Select delivery address</p>
        )}
        <FaChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto bg-white shadow-lg rounded-md border">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => handleSelect(addr)}
              className="p-4 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
            >
              <p className="font-semibold">{addr.fullName}</p>
              <p className="text-sm text-gray-600">
                {addr.street}, {addr.city} - {addr.pincode}
              </p>
              <p className="text-xs text-gray-400">{addr.mobile}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressDropdown;
