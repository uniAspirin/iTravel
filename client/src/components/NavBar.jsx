import { NavLink, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LogOut } from "lucide-react";

export default function NavBar() {
  const navigation = [
    { name: "JourneyPlan", href: "/journey-plans" },
    { name: "TravelLog", href: "/travel-logs" },
  ];
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <p>Loading</p>;
  }

  return (
    <nav className="flex flex-row items-center justify-between space-x-3 rounded-xl bg-violet-600/90 px-10 py-2">
      <div className="flex flex-row items-center gap-2">
        <h1
          className="mr-8 font-mono text-3xl font-bold tracking-tighter text-white hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          ✈️iTravel
        </h1>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              isActive
                ? "rounded-lg bg-violet-800/60 px-2 py-2.5 font-mono font-medium text-gray-50"
                : "rounded-lg px-2 py-2.5 font-mono font-medium text-white transition duration-175 hover:bg-violet-700"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="flex flex-row items-center gap-2">
        <img src={avatar} className="size-14 rounded-full p-2" />
        <p className="font-mono font-medium text-white">{user.username}</p>
        <button
          className="cursor-pointer rounded-lg p-2 transition duration-175 hover:bg-violet-800/60"
          onClick={logout}
        >
          <LogOut color="white" />
        </button>
      </div>
    </nav>
  );
}
