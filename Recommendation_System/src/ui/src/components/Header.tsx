import { Link } from "react-router-dom";
import { routes } from "@/config/routes";
export default function Header() {
  return (
    <div className="flex justify-between py-4 mx-10">
      <h1>GroceWise</h1>
      <nav className="flex gap-4">
        <ul className="flex gap-4 ">
          {Object.values(routes).map((route) => (
            <li key={route.path} className="hover:underline">
              <Link to={route.path}>{route.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex gap-4">
        <button>Login</button>
        <button>Sign In</button>
      </div>

    </div>
  )
}
