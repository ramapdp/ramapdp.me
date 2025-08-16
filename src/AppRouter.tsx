import DummyLayout from "layouts/dummy";
import HomePage from "layouts/homepage";
import Template from "layouts/template";
import { Routes, Route, Navigate } from "react-router-dom";

function AppRouter() {
  return (
    <Routes>
      <Route path="/*" element={<Template />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="projects" element={<DummyLayout title="Ini projects page" />} />
        <Route path="about" element={<DummyLayout title="Ini about page" />} />
        <Route path="contact" element={<DummyLayout title="Ini contact page" />} />
      </Route>
      <Route
        path="*"
        element={
          <div className="flex h-screen items-center justify-center">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRouter;
