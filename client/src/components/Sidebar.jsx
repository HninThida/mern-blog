import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { postRequest } from "../utils/api";
import { SignOutSuccess } from "../redux/user/userSllce";
import { useDispatch, useSelector } from "react-redux";

const DSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParems = new URLSearchParams(location.search);
    const tabfromUrl = urlParems.get("tab");
    if (tabfromUrl) {
      setTab(tabfromUrl);
    }
  }, [location.search]);

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
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {currentUser?.isAdmin && (
            <Link to={"/dashboard?tab=dashboard"}>
              <Sidebar.Item
                icon={HiAnnotation}
                active={tab === "dashboard" ? true : false}
                labelColor="dark"
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              label="User"
              icon={HiUser}
              active={tab === "profile" ? true : false}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser?.isAdmin && (
            <Link to={"/dashboard?tab=posts"}>
              <Sidebar.Item
                icon={HiDocumentText}
                active={tab === "posts" ? true : false}
                labelColor="dark"
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser?.isAdmin && (
            <Link to={"/dashboard?tab=comments"}>
              <Sidebar.Item
                icon={HiAnnotation}
                active={tab === "comments" ? true : false}
                labelColor="dark"
                as="div"
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
          {currentUser?.isAdmin && (
            <Link to={"/dashboard?tab=users"}>
              <Sidebar.Item
                icon={HiOutlineUserGroup}
                active={tab === "users" ? true : false}
                labelColor="dark"
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            className="cursor-pointer"
            icon={HiArrowRight}
            labelColor="dark"
            as="div"
            onClick={handleSignOut}
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DSidebar;
