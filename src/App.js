import { Routes, Route, Outlet } from "react-router-dom";
import {
  BlogDetailsPage,
  CategoriesPage,
  HomePage,
  LoginPage,
  SignupPage,
  WriterPage,
} from "./pages";
import { Footer, Navbar } from "./components";
import { useStore } from "./store";

function App() {
  function Layout() {
    return (
      <div className="space-y-2">
        {/* Navbar */}
        <Navbar/>
        <Outlet />
        {/* Footer */}
        <Footer/>
      </div>
    );
  }
  // const theme = "dark";
  const {theme} = useStore();
  
  return (
    <main className={theme}>
      <div className="min-h-screen dark:bg-[#111729] bg-[#ffffff00] relative px-3">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="category" element={<CategoriesPage />} />
            <Route path="/:slug/:id" element={<BlogDetailsPage />} />
            <Route path="writer/:id" element={<WriterPage />} />
          </Route>
          <Route path="sign-in" element={<LoginPage />} />
          <Route path="sign-up" element={<SignupPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
