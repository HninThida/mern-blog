import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/theemslice";
import { postRequest } from "../utils/api";
import { SignOutSuccess } from "../redux/user/userSllce";
import { useEffect, useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const path = useLocation().pathname;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSignOut = async () => {
    try {
      const data = await postRequest("user/sign-out");
      if (data.success) {
        dispatch(SignOutSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlParems = new URLSearchParams(location.search);
    const search = urlParems.get("searchTerm");
    if (search) {
      setSearchTerm(search);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Hnin&apos;s
        </span>
        Blog
      </Link>
      <form onClick={handleSubmit}>
        <TextInput
          type="text"
          value={searchTerm}
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          className="w-12 h-10 lg:hidden"
          type="onSubmit"
          color="gray"
          pill
        >
          <AiOutlineSearch />
        </Button>
      </form>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                className="object-cover"
                alt="user"
                img={currentUser?.photourl}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser?.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser?.email}
              </span>
              <Link to={"/dashboard?tab=profile"}>
                {" "}
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Header>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/search"} as={"div"}>
          <Link to="/search">Blogs</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
