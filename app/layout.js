import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "./../utils/fontawesome";

export const metadata = {
  title: "Task Management",
  description: "Create and Manage your tasks",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
