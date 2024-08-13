import React from "react";
import AppBar from "./appBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body>
        <AppBar />
        <main>{children}</main>
        <footer>
          <p>© 2024 Nicholas Ledbetter</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
