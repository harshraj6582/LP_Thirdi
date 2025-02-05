import React, { useState } from "react";
import Thirdi_Logo from "./assets/Thirdi_Logo.png";
import ContentImage from "./assets/Content.png";
import { GaugeComponent } from "react-gauge-component";
import { FaRedo, FaShareAlt } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

// Function to calculate total scores for Visual and Textual Analysis
const calculateTotalScores = (analysisData) => {
  const visualScores = Object.values(analysisData.visual_analysis.Visuals).map(item => item.Score || 0);
  const textualScores = Object.values(analysisData.textual_analysis.TextualAnalysis).map(item => item.Score || 0);

  const visualTotal = visualScores.reduce((acc, score) => acc + score, 0);
  const textualTotal = textualScores.reduce((acc, score) => acc + score, 0);

  return { visualTotal, textualTotal };
};

const AdAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisData } = location.state || {}; // Access the analysisData

  // Add state for managing interactions
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Calculate total scores
  const { visualTotal, textualTotal } = calculateTotalScores(analysisData);

  // Extract scores for Brand Analysis
  const brandConsistency = analysisData.visual_analysis.Visuals.BrandConsistency;
  const logoPlacement = analysisData.visual_analysis.Visuals.LogoPlacement;
  const uniqueSellingProposition = analysisData.textual_analysis.TextualAnalysis.UniqueSellingProposition;

  // Handler for Try Another Ad button
  const handleTryAnotherAd = () => {
    navigate('/');
  };

  // Handler for Share button
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ad Analysis Report',
          text: 'Check out my ad analysis report from Thirdi!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        setShowShareOptions(true);
      }
    } else {
      setShowShareOptions(true);
    }
  };

  // Handler for Sign up button
  const handleSignUp = () => {
    console.log("Navigating to signup page");
  };

  // Handler for Talk to Expert button
  const handleTalkToExpert = () => {
    console.log("Opening expert consultation form");
  };

  // Use total_score from the response and divide by 2 for the gauge
  const totalScore = analysisData.total_score; // Assuming analysisData is available
  const gaugeValue = totalScore / 2; // Divide total_score by 2

  // Calculate average score for main gauge
  const averageScore = (visualTotal + textualTotal) / 2; // Average of visual and textual totals

  // Convert average to percentage
  const averagePercentage = (averageScore / 200) * 100; // Assuming max is 200 (100 for each)

  // Debugging: Log the total scores
  console.log("Visual Total:", visualTotal, "Textual Total:", textualTotal);

  return (
    <div className="relative h-screen bg-white">
      <div className="flex">
        <div className="w-1/4 h-full bg-[#D4C2FF33]">
          <img
            src={Thirdi_Logo}
            alt="Thirdi Logo"
            className="w-[220px] h-[56px] mt-[50px] mx-auto"
          />

          <div className="flex justify-around mt-[50px]">
            {[
              visualTotal, // Total score of Visual Analysis
              textualTotal, // Total score of Textual Analysis
              (visualTotal + textualTotal) / 2 // Average of Visual and Textual Analysis for Brand Analysis
            ].map((value, index) => (
              <div className="flex flex-col items-center" key={index}>
                <GaugeComponent
                  value={value}
                  style={{ width: "8vw", height: "100px" }}
                />
                <div className="w-[114px] h-[68.14px] bg-[#D4C2FF33] flex items-center justify-center rounded text-[#6B35EB] font-satoshi text-[20px] font-bold mt-2">
                  {value.toFixed(2)}/100
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[100px] flex justify-center">
            <img
              src={ContentImage}
              alt="Content"
              className="w-[452px] h-[625px] rounded-tl-[12px]"
            />
          </div>

          <div className="w-[454px] h-[94px] mx-auto mt-8 bg-white border border-[#E6E6E6] rounded-tl-[12px] flex items-center justify-center">
            <p className="text-center text-sm font-medium">Display Text Here</p>
          </div>

          <div className="flex justify-between w-[454px] mx-auto mt-8">
            <button 
              className="w-[252px] h-[50px] bg-white border border-[#6B35E8] rounded text-[#6B35E8] text-lg font-medium flex items-center justify-center hover:bg-[#6B35E8] hover:text-white transition-colors"
              onClick={handleTryAnotherAd}
            >
              <FaRedo className="mr-2" />
              Try another Ad
            </button>
            <button 
              className="w-[144px] h-[50px] bg-white border border-[#6B35E8] rounded text-[#6B35E8] text-lg font-medium flex items-center justify-center hover:bg-[#6B35E8] hover:text-white transition-colors"
              onClick={handleShare}
            >
              <FaShareAlt className="mr-2" />
              Download PDF
            </button>
          </div>

          <div className="w-[460px] mx-auto mt-8 bg-[#D4C2FFB2] border border-[#6B35E8] rounded p-4">
            <div className="text-center font-satoshi text-xl font-bold">
              Take control of your campaigns with{" "}
              <span className="text-[#6B35E8]">Thirdi</span>
            </div>
            <button 
              className="mt-4 w-full h-[60px] bg-[#6B35E8] rounded text-white text-lg font-medium flex items-center justify-center hover:bg-[#5b2ed6] transition-colors"
              onClick={handleSignUp}
            >
              Signup For Free
            </button>
          </div>
        </div>
        
        <div className="h-full w-3/4">
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-6xl font-semibold text-purple-700">
              AI Ad Analyser
            </h1>

            <div>
              <h2 className="text-center text-lg font-bold text-yellow-600">
                Great Progress —{" "}
                <span className="text-gray-900">
                  Optimize for Peak Performance
                </span>
              </h2>

              <div className="flex flex-col items-center justify-center">
                <GaugeComponent
                  value={gaugeValue}
                  style={{ width: "30vw", height: "30vh" }}
                  className=""
                />
                <div className="m-8">
                  <article className="text-center text-2xl text-wrap text-gray-700">
                    Your ad's nearly there—you're on the right track! Let us
                    guide you with our Ad Analyzer insights and suggestions to
                    fine-tune your performance. Keep optimizing, and you'll hit
                    that sweet spot in no time!
                  </article>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Analysis Section */}
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Visual Analysis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {Object.entries(analysisData.visual_analysis.Visuals).map(([metric, details]) => (
                <div key={metric} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold text-purple-700">{metric}</h3>
                  <p className="text-4xl font-bold text-yellow-500">{details.Score || 0}</p>
                  <p className="text-sm text-gray-600">{details.Explanation}</p>
                  <p className="text-sm text-gray-600">{details.Suggestions}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Textual Analysis Section */}
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Textual Analysis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {Object.entries(analysisData.textual_analysis.TextualAnalysis).map(([metric, details]) => (
                <div key={metric} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold text-purple-700">{metric}</h3>
                  <p className="text-4xl font-bold text-yellow-500">{details.Score || 0}</p>
                  <p className="text-sm text-gray-600">{details.Explanation}</p>
                  <p className="text-sm text-gray-600">{details.Suggestions}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Analysis Section */}
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-1">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">Brand Analysis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              <div className="bg-white shadow-lg rounded-lg p-2 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-purple-700">Brand Consistency</h3>
                <p className="text-4xl font-bold text-yellow-500">{brandConsistency.Score}</p>
                <p className="text-sm text-gray-600">{brandConsistency.Explanation}</p>
                <p className="text-sm text-gray-600">{brandConsistency.Suggestions}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-2 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-purple-700">Logo Placement</h3>
                <p className="text-4xl font-bold text-yellow-500">{logoPlacement.Score}</p>
                <p className="text-sm text-gray-600">{logoPlacement.Explanation}</p>
                <p className="text-sm text-gray-600">{logoPlacement.Suggestions}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-2 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-purple-700">Unique Selling Proposition</h3>
                <p className="text-4xl font-bold text-yellow-500">{uniqueSellingProposition.Score}</p>
                <p className="text-sm text-gray-600">{uniqueSellingProposition.Explanation}</p>
                <p className="text-sm text-gray-600">{uniqueSellingProposition.Suggestions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdAnalysis;