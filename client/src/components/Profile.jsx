import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto  p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser?.photourl}
            alt="user"
            className=" rounded-full w-full h-full object-cover border-8 border-gray-50  "
          />
        </div>{" "}
        <TextInput type="text" placeholder="Username" id="username" />
        <TextInput type="email" placeholder="name@company.com" id="email" />
        <TextInput type="password" placeholder="Password" id="password" />
        <Button gradientDuoTone="purpleToPink" type="submit">
          Update
        </Button>
        <div className=" text-red-600 flex justify-between mt-4">
          <span className="cursor-pointer">Delete account</span>
          <span className="cursor-pointer">Singn Out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
