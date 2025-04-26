import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigation = [
    { name: "Journey Plan", href: "/journey-plans" },
    { name: "Travel Log", href: "/travel-logs" },
  ];
  const navigate = useNavigate();

  return (
    <nav className="flex flex-row items-center space-x-3 rounded-xl bg-violet-600/90 px-10 py-2">
      <h1
        className="mr-5 text-2xl font-semibold text-white hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        ✈️ iTravel
      </h1>
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            isActive
              ? "rounded-lg bg-violet-800/60 px-2 py-2.5 font-medium text-gray-50"
              : "rounded-lg px-2 py-2.5 font-medium text-white transition duration-175 hover:bg-violet-700"
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
