import DishForm from "./components/DishForm";
import "./App.css";

function App() {
  function showResults(values) {
    console.log(values);
  }

  return (
    <>
      <h1>HexOcean Dishes</h1>
      <DishForm onSubmit={showResults} />
    </>
  );
}

export default App;
