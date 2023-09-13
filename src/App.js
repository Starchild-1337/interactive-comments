import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./context";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
