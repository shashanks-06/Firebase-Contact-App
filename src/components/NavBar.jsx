import firebaseLogo from "../../public/firebase.svg";

const NavBar = () => {
  return (
    <div className="my-4 flex h-[60px] items-center justify-center gap-2 rounded-lg bg-white text-xl font-medium">
      <img src={firebaseLogo} />
      <h1>Firebase Contact App</h1>
    </div>
  );
};

export default NavBar;
