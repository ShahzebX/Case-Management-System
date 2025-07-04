/* eslint-disable react/react-in-jsx-scope */
import { LoginForm } from "./components/login-form.jsx";
import { SignupForm } from "./components/signup-form.jsx";
import naLogo from "./assets/na.png";
import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

function DarkModeToggle() {
  const [dark, setDark] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      aria-label="Toggle dark mode"
      className="absolute top-4 right-4 z-50 p-2 rounded-full border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      onClick={() => setDark((d) => !d)}
      type="button"
    >
      {dark ? (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17.75 15.5a7.25 7.25 0 0 1-9.25-9.25a.75.75 0 0 0-1.06-.82A9.25 9.25 0 1 0 19.57 18.81a.75.75 0 0 0-.82-1.06Z"
          />
        </svg>
      ) : (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2.75a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 12 2.75Zm0 16.5a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Zm8.25-7.25a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75Zm-16.5 0a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75Zm13.19 5.53a.75.75 0 0 1 1.06 0l.71.7a.75.75 0 1 1-1.06 1.07l-.7-.71a.75.75 0 0 1 0-1.06Zm-12.02 0a.75.75 0 0 1 0 1.06l-.7.71a.75.75 0 1 1-1.07-1.06l.71-.7a.75.75 0 0 1 1.06 0ZM17.66 6.34a.75.75 0 0 1 0-1.06l.7-.71a.75.75 0 1 1 1.07 1.06l-.71.7a.75.75 0 0 1-1.06 0Zm-11.32 0a.75.75 0 0 1-1.06 0l-.71-.7A.75.75 0 1 1 6.34 4.57l.7.71a.75.75 0 0 1 0 1.06ZM12 6.5A5.5 5.5 0 1 1 6.5 12A5.51 5.51 0 0 1 12 6.5Z"
          />
        </svg>
      )}
    </button>
  );
}

function App() {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <DarkModeToggle />
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
          <div className="flex items-center justify-center w-full max-w-xs mx-auto">
            {isSignup ? (
              // Show logo on left for signup on large screens, nothing on mobile
              <img
                src={naLogo}
                alt="NA Logo"
                className="h-1/2 w-1/2 object-center dark:brightness-[0.7]"
              />
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </div>
      {/* Right: Signup or Image */}
      <div className="bg-muted relative hidden lg:flex items-center justify-center">
        <div className="flex items-center justify-center w-full max-w-xs mx-auto">
          {isSignup ? (
            <SignupForm />
          ) : (
            <img
              src={naLogo}
              alt="NA Logo"
              className="h-1/2 w-1/2 object-contain dark:brightness-[0.7]"
            />
            //{<p className="text-3xl font-"> Case Management System </p>}
          )}
        </div>
      </div>
      {/* SignupForm on mobile (below the grid, only for signup route) */}
      {isSignup && (
        <div className="flex lg:hidden items-center justify-center w-full max-w-xs mx-auto py-8">
          <SignupForm />
        </div>
      )}
    </div>
  );
}

export default App;
