import { Routes, Route } from "react-router";
import ThemeProvider from "./context/ThemeProvider";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
