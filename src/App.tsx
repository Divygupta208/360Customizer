import "./App.css";
import SampleCards from "./components/SampleCards";
import { Products } from "./data/products";

function App() {
  return (
    <>
      <SampleCards products={Products} />
    </>
  );
}

export default App;
