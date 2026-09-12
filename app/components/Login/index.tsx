import { useUserContext } from "@/app/Context/userContext";
import { userData } from "@/app/data/user";
import { UserContextType } from "@/app/types/types";
import { SetStateAction, useState } from "react";

const Login = () => {
  const { setUser } = useUserContext() as UserContextType;
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFailed, setIsFailed] = useState<boolean>();

  const handleUserName = (e: { target: { value: SetStateAction<string> } }) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const loggedInUser = userData.find(
      (item) => item.userName === username && item.password === password,
    );
    if (loggedInUser) {
      (setUser(loggedInUser), setIsFailed(true));
    } else {
      setIsFailed(false);
    }
  };

  return (
    <form className="flex flex-col w-100 border rounded-md border-gray-300 p-5 bg-white text-gray-800">
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold">User Login</h2>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label>User Name</label>
          <input
            id="username"
            placeholder="Name"
            onChange={handleUserName}
            value={username}
            className="field border rounded-sm border-gray-300 h-8 p-2"
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            id="username"
            placeholder="Password"
            onChange={handlePassword}
            value={password}
            className="field border rounded-sm border-gray-300 h-8 p-2"
          ></input>
        </div>
      </div>
      <div className="py-8">
        <button
          onClick={handleLogin}
          className="bg-red-600 text-white p-2 rounded-sm w-full hover:bg-red-700"
        >
          Log in
        </button>
        {isFailed === false && (
          <p className="text-red-600 pt-2">
            Invalid username or password. Please try again.
          </p>
        )}
      </div>
    </form>
  );
};
export default Login;
