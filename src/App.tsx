import "./App.css";
import ProductListing from "./components/Pages/ProductListing";
import { Products } from "./data/products";
function App() {
  return (
    <>
      <ProductListing products={Products} />
    </>
  );
}

export default App;
