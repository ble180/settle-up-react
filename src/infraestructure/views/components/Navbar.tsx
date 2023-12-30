import logo from '@/assets/images/logo.png';

export function Navbar() {
  return (
    <nav className="navbar">
      <img
        className="navbar__logo"
        src={logo}
        alt="logo"
        height="40"
        width="40"
      />
      <h1 className="navbar__title">Settle Up</h1>
    </nav>
  );
}
