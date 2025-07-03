import DummyLayout from "layouts/dummy";
import Template from "layouts/template";
import { Routes, Route, Navigate } from "react-router-dom";

function AppRouter() {
  return (
    <Routes>
      <Route path="/*" element={<Template />}>
        <Route index element={<DummyLayout title="Ini home page" />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="projects" element={<DummyLayout title="Ini projects page" />} />
        <Route path="about" element={<DummyLayout title="Ini about page" />} />
      </Route>
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRouter;
