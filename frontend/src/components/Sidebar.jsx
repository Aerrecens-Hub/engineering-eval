import { NavLink } from "react-router-dom";
const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/projects", label: "Projects", end: false },
  { to: "/tasks", label: "Tasks", end: false },
  { to: "/engineers", label: "Engineers", end: false },
  { to: "/activity", label: "Activity", end: false },
  { to: "/settings", label: "Settings", end: false },
];
export function Sidebar() {
  return (
    <nav className="top-nav" aria-label="Primary">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
