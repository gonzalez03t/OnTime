import { Link } from 'react-router-dom';

export default function RouteLinks() {
  return (
    <div>
      <p>Links:</p>

      <ul>
        <li>
          <Link to="/">Landing Page</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/sign_up">Register</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/test">Test NSFW Image Detection</Link>
        </li>
        <li>
          <Link to="/company_search">Company Search</Link>
        </li>
      </ul>
    </div>
  );
}
