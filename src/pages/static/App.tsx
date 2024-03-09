import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import Loader from "../../components/layouts/Loader";
import { Outlet, useNavigation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const App = () => {
  const navigation = useNavigation();
  return (
    <div>
      <Navbar />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      {navigation.state === "loading" ? <Loader /> : <Outlet />}

      <Footer />
    </div>
  );
};

export default App;
