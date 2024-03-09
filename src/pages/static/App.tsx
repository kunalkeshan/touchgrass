import Navbar from "../../components/layouts/Navbar";
import Header from "../../components/layouts/Header";
import Loader from "../../components/layouts/Loader";
import { Outlet, useNavigation } from "react-router-dom";

const App = () => {
  const navigation = useNavigation();
  return (
    <div className="dark">
      <Header />
      {navigation.state === "loading" ? <Loader /> : <Outlet />}
      <Navbar />
    </div>
  );
};

export default App;
