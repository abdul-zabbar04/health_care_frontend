import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { FiMoon, FiSun } from 'react-icons/fi';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default theme is "light"
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Apply the theme to the document's root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsAuthenticated(true); // Set authenticated state if the token exists
    } else {
      setIsAuthenticated(false); // Set unauthenticated state if no token is found
    }
  }, []);

  // Toggle Mobile Menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle Profile Dropdown
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Toggle DaisyUI Themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Mock authentication status and user data

  // const userProfile = {
  //   profilePicture: profile,
  // };

  return (
    <div className="fixed top-0 left-0 w-full  h-18 z-50 bg-base-100 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-sm sm:text-lg md:text-2xl font-bold italic text-primary whitespace-nowrap">
          Health Care
        </Link>




        {/* Middle Navigation */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <Link to="/guide" className="hover:text-primary">
            Guide
          </Link>
          <Link to="/find-doctor" className="hover:text-primary">
            Find
          </Link>
          <Link to="/about-us" className="hover:text-primary">
            About
          </Link>
          <Link to="/contact-us" className="hover:text-primary">
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1">
          <button onClick={toggleTheme} className="block font-medium w-full text-left">
            {theme === "light" ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
          </button>

          {/* Authenticated User */}
          {isAuthenticated ? (
            <div className="relative">
              {/* <img
                src={userProfile.profilePicture}
                alt="User Profile"
                className="h-10 w-14 rounded-full cursor-pointer"
                onClick={toggleProfile}
              /> */}
              <span className="btn btn-primary px-1" onClick={toggleProfile}>Profile</span>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-md py-2">
                  <Link
                    to="/view-profile"
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            // Unauthenticated User
            <>
              <Link to="/login" className="px-3 py-0 btn btn btn-primary btn-sm">Login</Link>
              <Link to="/signup" className="px-3 py-0 btn btn-secondary btn-sm">Sign Up</Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 shadow-lg">
          <div className="flex flex-col items-center py-4 space-y-4 text-lg font-medium">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <Link to="/guide" className="hover:text-primary">
              Guide
            </Link>
            <Link to="/find-doctor" className="hover:text-primary">
              Find
            </Link>
            <Link to="/about-us" className="hover:text-primary">
              About
            </Link>
            <Link to="/contact-us" className="hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
