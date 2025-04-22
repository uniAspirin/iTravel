import { href, NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigation = [
    { name: "Journey Plan", href: "/journey-plans" },
    { name: "Travel Log", href: "/travel-logs" },
  ];
  const navigate = useNavigate();

  return (
    <nav className="bg-violet-600/90 px-10 py-2 rounded-xl flex flex-row items-center space-x-3">
      <h1
        className="text-white font-semibold text-2xl mr-5"
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
              ? "text-gray-50 font-medium bg-violet-800/60 px-2 py-2.5 rounded-lg"
              : "text-white font-medium hover:bg-violet-700 px-2 py-2.5 rounded-lg"
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
