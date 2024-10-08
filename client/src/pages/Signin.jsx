import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRequest } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  singInFail,
  singInSuccess,
} from "../redux/user/userSllce";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(singInFail("Add all required fields"));
    } else {
      try {
        dispatch(signInStart);
        const data = await postRequest("auth/signin", formData);
        if (data.success === false) {
          dispatch(singInFail(data.message));
        } else {
          dispatch(singInSuccess(data?.data));
          navigate("/");
        }
      } catch (error) {
        dispatch(singInFail(error.message));
      }
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl  flex-1 flex-col md:flex-row mx-auto md:items-center gap-5">
        <div>
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Hnin&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 mb-3">
            This is a blog page . You can sign in with your email and passowrd
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="******"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm"></Spinner>
                  <span>Loading ...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Don&apos;t have an account ?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SignIn;
