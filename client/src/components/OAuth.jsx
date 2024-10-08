import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { postRequest } from "../utils/api";
import { singInSuccess } from "../redux/user/userSllce";
import { useDispatch } from "react-redux";

export const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
      const data = await postRequest("auth/google", {
        name: resultFromGoogle.user?.displayName,
        email: resultFromGoogle.user?.email,
        googlePhotoUrl: resultFromGoogle.user?.photoURL,
      });
      if (data.sucess) {
        dispatch(singInSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToPurple"
      outline
      onClick={handleGoogleClick}
    >
      {" "}
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};
