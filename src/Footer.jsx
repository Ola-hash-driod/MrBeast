import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center p-6 pb-40">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src="/images/beast5.png"
          alt="MrBeast Logo"
          className="w-50"
        />
      </div>

      {/* Resources Section */}
      <div className="text-lg font-bold">
        <span className="text-gray-300">RESOURCES</span>{" "}
        <span className="text-white">Beast Games from MrBeast®</span>
      </div>


      <div className="mt-2">
        <a href="#" className="text-blue-400 hover:underline mx-2">
          Data Protection Policy
        </a>
        <a href="#" className="text-blue-400 hover:underline mx-2">
          Private Policy
        </a>
        <a href="#" className="text-blue-400 hover:underline mx-2">
          Cookie Policy
        </a>
        <a href="#" className="text-white font-bold hover:underline mx-2">
          MrBeast Privacy Policy
        </a>
      </div>

      <div className="text-gray-400 text-sm mt-4">
        <p>© 2024</p>
        <p className="mt-2">
          By using this website, you agree to our use of cookies. We use cookies
          to provide you with a great experience and to help our website run
          effectively.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
