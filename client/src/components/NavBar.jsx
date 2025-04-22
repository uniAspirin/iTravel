import { href, NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigation = [
    { name: "Journey Plan", href: "/journey-plans" },
    { name: "Travel Log", href: "/travel-logs" },
  ];
  const navigate = useNavigate();

  return (
    <nav className="bg-violet-600 px-10 py-4 rounded-xl">
      <div className="flex flex-row items-baseline space-x-3">
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
                ? "text-white font-medium bg-violet-800 px-2 py-1 rounded"
                : "text-white font-medium hover:bg-violet-700 px-2 py-1 rounded"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
