import encours from "../encours";
import { Link } from "../encours/router/Link";

const Header = () => {
  return (
    <div className="header">
      <span>Logo</span>
      <nav style="display: flex; justify-content: space-between">
        <Link to={"/"} name={"Home"} component={"Home"} />
        <Link to={"/todos"} name={"To Tods"} component={"Todos"} />
        <Link to={"/about"} name={"About"} component={"About"} />
        <Link to={"/contact"} name={"Contact Us"} component={"Contact"} />
      </nav>
    </div>
  );
};

export default Header;
