import { ToastContainer } from "react-toastify";

import ThemeToggle from "./components/ThemeToggle";
import Gallery from "./components/Gallery";
import Main from "./components/Main";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <main>
      <ThemeToggle />

      <Main />

      <Gallery />

      <ToastContainer />
    </main>
  );
};

export default App;
