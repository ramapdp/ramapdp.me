import { useScrollEffect } from "hooks/useScrollEffect";
import Navbar from "layouts/navbar";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Template: React.FC = () => {
  useScrollEffect();

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Outlet />
        <footer id="main-footer" className="text-muted-foreground mt-8 text-center text-sm">
          <p>
            Made with <span className="text-red-500">❤</span> by{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Ramapdp
            </a>
          </p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </footer>
      </div>
    </Fragment>
  );
};

export default Template;