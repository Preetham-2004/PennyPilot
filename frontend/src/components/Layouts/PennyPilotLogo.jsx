import React from "react";

const PennyPilotLogo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      {/* Logo Text with Matching Gradient */}
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all group-hover:scale-105">
        PennyPilot
      </h1>
    </div>
  );
};

export default PennyPilotLogo;
