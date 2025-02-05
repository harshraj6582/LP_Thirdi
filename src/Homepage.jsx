import React from "react";
import ThirdiLogo from "./assets/Thirdi_Logo.png";
import Content from "./assets/Content.png"; // Add the second image here
import { CiBarcode } from "react-icons/ci"; // Import the barcode icon

const Homepage = () => {
  return (
    <div
      className="flex justify-start items-start w-full h-[2359px] bg-white"
      style={{ position: "absolute", top: "0", left: "0" }}
    >
      {/* Sidebar */}
      <div
        className="w-[300px] h-[2359px] bg-[#D4C2FF33] border-r-2 border-[#BBA5F4] relative"
      >
        {/* Thirdi Logo */}
        <img
          src={ThirdiLogo}
          alt="Thirdi Logo"
          className="absolute"
          style={{ width: "150px", height: "40px", top: "50px", left: "75px" }}
        />

        {/* Placeholder Image */}
        <img
          src={Content}
          alt="Placeholder"
          className="absolute"
          style={{ width: "265px", height: "400px", top: "150px", left: "20px" }}
        />

        {/* Analysing Text */}
        <div
          className="absolute text-center font-semibold text-[#6C63FF]"
          style={{ 
            width: "200px",
            height: "74px", 
            top: "550px", 
            left: "50px",
            padding: "16px 0px", 
            gap: "12px", 
            fontFamily: "Satoshi", 
            fontSize: "20px",
            fontWeight: 700, 
            lineHeight: "28px",
            textAlign: "center", 
            textUnderlinePosition: "from-font", 
            textDecorationSkipInk: "none" 
          }}
        >
          <CiBarcode className="inline-block mr-2 text-4xl" /> {/* Updated icon size here */}
          Analysing.....
        </div>

        {/* New Details Div */}
        <div
          className="absolute"
          style={{
            width: "270px",
            height: "180px",
            top: "620px",
            left: "20px",
            gap: "0px",
            borderRadius: "12px 12px 12px 12px",
            
            background: "#D4C2FFB2",
            // border: "1px solid #6B35E8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* First Child Div */}
          <div
            style={{
              width: "200px",
              height: "50px",
              fontFamily: "Satoshi",
              fontSize: "17px",
              fontWeight: 700,
              lineHeight: "28px",
              textAlign: "center",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none"
            }}
          >
            Take control of your campaigns with <span style={{ color: "#6B35E8" }}> Thirdi</span>
          </div>

          <div className="h-[15px]"></div>
          <div
            style={{
              width: "220px",
              height: "40px",
              background: "#6B35E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              borderRadius: "10px",
            
            }}
          >
            Signup For Free
          </div>
        </div>
        
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        <div className="text-2xl font-bold text-[#6C63FF]">AI Ad Analyser</div>
        {/* Centered Message */}
        <div className="mt-4 text-lg text-gray-600" style={{ 
          fontFamily: "Satoshi", 
          fontSize: "26px", 
          fontWeight: 700, 
          lineHeight: "63px", 
          textAlign: "center", 
          textUnderlinePosition: "from-font", 
          textDecorationSkipInk: "none" 
        }}>
          Almost there! Finalizing your analysis—just a few more seconds.
        </div>
        <div className="w-30 h-30 mt-4 bg-gray-300 rounded-full mx-auto"></div>

        <div className="mt-6 p-4" style={{ background: "#D4C2FFB2", borderRadius: "0.5rem" }}>
          <div className="text-[#6C63FF] font-semibold" style={{ 
            fontFamily: "Satoshi", 
            fontSize: "32px", 
            fontWeight: 400, 
            lineHeight: "46.4px", 
            letterSpacing: "-0.01em", 
            textAlign: "center", 
            textUnderlinePosition: "from-font", 
            textDecorationSkipInk: "none" 
          }}>
            Did you know?
          </div>
          <div className="text-gray-700 text-center">
            Consistent brand presentation across platforms can increase revenue by up to 23%
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-xl">🎨</span>
              <p className="text-gray-800 font-semibold">Visual analysis</p>
            </div>
            <p className="text-gray-500">Generating...</p>
          </div>

          <div className="flex items-center justify-between p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-xl">✏️</span>
              <p className="text-gray-800 font-semibold">Textual analysis</p>
            </div>
            <p className="text-gray-500">Generating...</p>
          </div>

          <div className="flex items-center justify-between p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-xl">🔤</span>
              <p className="text-gray-800 font-semibold">Brand analysis</p>
            </div>
            <p className="text-gray-500">Generating...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
