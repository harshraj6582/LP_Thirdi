import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/Thirdi_Logo.png";
import Homepage from './Homepage';

const Uploading = () => {
  const [adLink, setAdLink] = useState("");
  const [landingPageUrl, setLandingPageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartTrial = () => {
    // Add your trial signup logic here
    console.log("Starting 14-day trial");
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      // Validate file size (200MB = 200 * 1024 * 1024 bytes)
      if (uploadedFile.size > 200 * 1024 * 1024) {
        alert("File size exceeds 200MB limit");
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
      if (!validTypes.includes(uploadedFile.type)) {
        alert("Please upload a JPEG, PNG, or MP4 file");
        return;
      }

      setFile(uploadedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      // Reuse the same validation logic
      if (droppedFile.size > 200 * 1024 * 1024) {
        alert("File size exceeds 200MB limit");
        return;
      }
      
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
      if (!validTypes.includes(droppedFile.type)) {
        alert("Please upload a JPEG, PNG, or MP4 file");
        return;
      }

      setFile(droppedFile);
    }
  };

  const handleGetReport = async () => {
    // Validate required fields
    if (!adLink && !file) {
      alert("Please provide either an ad link or upload an ad file");
      return;
    }
    if (!landingPageUrl) {
      alert("Please provide a landing page URL");
      return;
    }
    
    setLoading(true);

    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("adLink", adLink);
      formData.append("landingPageUrl", landingPageUrl);

      const response = await fetch("http://127.0.0.1:8000/auth/image-processing/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Navigate to AdAnalysis page and pass the data
      navigate("/ad-analysis", { state: { analysisData: data } });
      
      // Pass the data to /download-pdf without navigating
      await fetch("http://127.0.0.1:8000/download-pdf/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error fetching report:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewSample = (event) => {
    event.preventDefault();
    // Add your sample report viewing logic here
    console.log("Viewing sample report");
  };

  const handleSignup = async () => {
    const signupData = {
      username,
      email,
      password,
      mobile_number: mobileNumber,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      setUserId(data.user_id);
      alert("Signup successful! Please verify your OTP.");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    const otpData = { email_otp: otp };

    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/verify-otp/${userId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpData),
      });

      if (!response.ok) {
        throw new Error("OTP verification failed");
      }

      const data = await response.json();
      alert("OTP verified successfully! You can now log in.");
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("OTP verification failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setToken(data.token);
      alert("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col flex-1 p-8 space-y-6">
        {/* Header */}
        <img src={logo} alt="Thirdi Logo" className="w-32" />
        <h1 className="text-2xl font-bold text-[#6C63FF]">AI Ad Analyser</h1>

        <div className="flex flex-row">
          <div className="text-gray-800 space-y-4">
            <div
              style={{
                width: "600px",
                height: "114px",
                position: "absolute",
                top: "150px",
                left: "30px",
              }}
            >
              <h2
                className="text-xl font-semibold"
                style={{
                  fontFamily: "Satoshi",
                  fontSize: "32px",
                  fontWeight: 500,
                  lineHeight: "38.4px",
                  textAlign: "left",
                  textUnderlinePosition: "from-font",
                  textDecorationSkipInk: "none",
                }}
              >
                <span className="text-[#FF6584]">🎯</span>The ultimate{" "}
                <span className="text-[#6C63FF]">All-in-One</span> AI tool for
                analysing visuals, text, and brand with one click! 😊
              </h2>
            </div>
            <div className="h-[130px] "></div>
            <p
              className="w-[600px]"
              style={{
                fontFamily: "Satoshi",
                fontSize: "20px",
                fontWeight: 300,
                lineHeight: "30.4px",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
              }}
            >
              Simply upload your video or static ad and get a clear,
              easy-to-follow report with tips to boost your ad's performance!
            </p>
            <div className="w-[600px]">
              <p className="font-bold text-[#6C63FF]">
                Take charge of your campaigns and boost performance across all
                platforms, effortlessly!
              </p>
            </div>

            <button 
              onClick={handleStartTrial}
              className="px-6 py-3 bg-[#6C63FF] text-white font-semibold rounded-md z-20 hover:bg-[#5b54d6] transition-colors"
            >
              Start my 14 days free trial
            </button>
          </div>
          <div
            className="w-[550px] h-[500px] bg-[#D9D9D9]"
            style={{ position: "relative", left: "40px" }}
          ></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-none w-full md:w-1/3 bg-[#EFE4FF] p-8 space-y-6">
        {loading ? (
          <Homepage />
        ) : (
          <>
            <h2 className="text-lg font-semibold">Ad link *</h2>
            <input
              type="text"
              value={adLink}
              onChange={(e) => setAdLink(e.target.value)}
              placeholder="Enter single Ad link"
              className="p-3 border border-gray-300 rounded-md w-full bg-white"
            />

            <div className="flex flex-col space-y-3">
              <h2 className="text-lg font-semibold">Upload Ad *</h2>
              <div 
                className="border-2 border-dashed border-gray-400 rounded-md p-4 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <p>{file ? `Selected file: ${file.name}` : "Drag and drop your ad here"}</p>
                <p>or</p>
                <input
                  type="file"
                  id="fileUpload"
                  accept=".jpeg,.jpg,.png,.mp4"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="fileUpload"
                  className="px-4 py-2 bg-[#6C63FF] text-white rounded-md cursor-pointer inline-block hover:bg-[#5b54d6] transition-colors"
                >
                  Upload Ad
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  Formats supported: JPEG, PNG, MP4 <br /> Video Ad duration: 60 sec{" "}
                  <br /> Maximum size: 200 MB
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Landing page URL *</h2>
              <input
                type="url"
                value={landingPageUrl}
                onChange={(e) => setLandingPageUrl(e.target.value)}
                placeholder="https://www.brand.com"
                className="p-3 border border-gray-300 rounded-md w-full bg-white"
              />
            </div>

            <button 
              onClick={handleGetReport}
              className="px-6 py-3 bg-[#6C63FF] text-white font-semibold rounded-md w-full hover:bg-[#5b54d6] transition-colors"
            >
              Get report
            </button>
            <p className="text-center text-sm text-gray-500">
              No ads to try?{" "}
              <a href="#" onClick={handleViewSample} className="text-[#6C63FF] underline hover:text-[#5b54d6]">
                View Sample Report
              </a>
            </p>

            {/* Moved Signup Form */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Sign Up</h2>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="p-3 border border-gray-300 rounded-md w-full bg-white"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md w-full bg-white"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-3 border border-gray-300 rounded-md w-full bg-white"
              />
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Mobile Number"
                className="p-3 border border-gray-300 rounded-md w-full bg-white"
              />
              <button 
                onClick={handleSignup}
                className="px-6 py-3 bg-[#6C63FF] text-white font-semibold rounded-md hover:bg-[#5b54d6] transition-colors"
              >
                Sign Up
              </button>
            </div>

            {/* Moved OTP Verification Form */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Verify OTP</h2>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="p-3 border border-gray-300 rounded-md w-full bg-white"
              />
              <button 
                onClick={handleVerifyOtp}
                className="px-6 py-3 bg-[#6C63FF] text-white font-semibold rounded-md hover:bg-[#5b54d6] transition-colors"
              >
                Verify OTP
              </button>
            </div>

            {/* Moved Login Form */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Login</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md w-full bg-white"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-3 border border-gray-300 rounded-md w-full bg-white"
              />
              <button 
                onClick={handleLogin}
                className="px-6 py-3 bg-[#6C63FF] text-white font-semibold rounded-md hover:bg-[#5b54d6] transition-colors"
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>

  );
};

export default Uploading;