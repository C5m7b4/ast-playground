import encours from "../index";

// const Link = () => {
//   //const { to, name, component } = props;
//   //const isActive = path === to;
//   //const className = isActive ? "active" : "";
//   // const handleClick = (e) => {
//   //   e.preventDefault();
//   //   encours.router.go(to);
//   // };

//   return (
//     <div>
//       <h2>{name}</h2>
//     </div>
//     // <div router-link={to} component={component}>
//     //   {name}
//     // </div>
//   );
// };

export const Link = ({ props }) => {
  const { to, name, component } = props;
  return (
    <a href={to} router-link={component}>
      {name}
    </a>
  );
};
