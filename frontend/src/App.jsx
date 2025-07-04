/* eslint-disable react/react-in-jsx-scope */
import { LoginForm } from "./components/login-form.jsx";
import { SignupForm } from "./components/signup-form.jsx";
import naLogo from "./assets/na.png";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left: Login or Image */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="https://na.gov.pk"
            target="_blank"
            className="flex items-center gap-2 font-medium"
            rel="noopener noreferrer"
          >
            <div className="text-primary-foreground">
              <img src={naLogo} className="h-10 w-10 mr-3" />
            </div>
            National Assembly of Pakistan
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center justify-center w-full max-w-xs">
            {isSignup ? (
              <img
                src={naLogo}
                alt="NA Logo"
                className="h-1/2 w-1/2 object-center dark:brightness-[0.2] dark:grayscale"
              />
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </div>
      {/* Right: Signup or Image */}
      <div className="bg-muted relative hidden lg:flex items-center justify-center">
        <div className="flex items-center justify-center w-full max-w-xs">
          {isSignup ? (
            <SignupForm />
          ) : (
            <img
              src={naLogo}
              alt="NA Logo"
              className="h-1/2 w-1/2 object-contain dark:brightness-[0.2] dark:grayscale"
            />
            //{<p className="text-3xl font-"> Case Management System </p>}
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
