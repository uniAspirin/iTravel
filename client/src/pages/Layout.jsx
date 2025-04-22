import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <div className="bg-neutral-800 h-screen">
      <div className="container mx-auto h-full max-w-300 px-4 pt-8 ">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
