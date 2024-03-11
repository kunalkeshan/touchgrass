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
import { useConvexAuth } from "convex/react";
import useStoreUserEffect from "../../hooks/useStoreUserEffect";

const App = () => {
  const navigation = useNavigation();
  const { isAuthenticated, isLoading } = useConvexAuth();
  // const userId = useStoreUserEffect();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // if (userId === null) {
  //   return <div>Storing user...</div>;
  // }

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