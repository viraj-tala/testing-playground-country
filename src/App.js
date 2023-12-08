import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Country from "./component/Country";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/country/:countryCode",
    element: <Country />,
  },
]);

function App() {
  return (
    <>
      <div className="h-screen w-screen">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
