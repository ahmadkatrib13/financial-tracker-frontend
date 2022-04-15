import Cookies from "universal-cookie";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar2/SideBar";

const ProtectedRoutes = () => {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  return token ? (
    <>
      <div className="App" style={{ display: "flex" }}>
        <SideBar />
        <main
          style={{
            padding: "0 3.5rem  0 3.5rem",
            "background-color": "#f1f1f1f1",
          }}
        >
          <Outlet />
          {/* <PopUp title="Edit"/> */}
        </main>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedRoutes;
