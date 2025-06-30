const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Products</h2>
          <p className="text-sm text-gray-400">
            Your go-to destination for quality products at the best prices. Shop
            smart, live better.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:underline">
                Men's Wear
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Women's Wear
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Accessories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Electronics
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Track Order
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
