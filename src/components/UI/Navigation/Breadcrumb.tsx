// src/components/Navigation/Breadcrumbs.tsx
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm p-2 text-gray-600">
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to}>
            {" / "}
            {isLast ? (
              <span className="text-black font-medium">{decodeURI(value)}</span>
            ) : (
              <Link to={to} className="hover:underline">
                {decodeURI(value)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
