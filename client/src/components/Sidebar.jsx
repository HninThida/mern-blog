import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const DSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParems = new URLSearchParams(location.search);
    const tabfromUrl = urlParems.get("tab");
    console.log(tabfromUrl);
    if (tabfromUrl) {
      setTab(tabfromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              label="User"
              icon={HiUser}
              active={tab === "profile" ? true : false}
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            className="cursor-pointer"
            icon={HiArrowRight}
            labelColor="dark"
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DSidebar;
