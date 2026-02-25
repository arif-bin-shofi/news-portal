import { Routes, Route, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import axios from "axios";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateNewsPage from "./pages/CreateNewsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";

//axios.defaults.baseURL = "https://news-portal-rosy-one.vercel.app/api";
axios.defaults.baseURL = "http://localhost:5000/api";

function App() {
  const { token, loadUser } = useAuthStore();
  const location = useLocation();

  const hideHeaderFooter = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    if (token) {
      loadUser();
    }
  }, [token, loadUser]);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}
      <main className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-news" element={<CreateNewsPage />} />
          <Route path="/edit-news/:id" element={<CreateNewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
