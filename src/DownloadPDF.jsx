import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// PDF Styles remain the same
const pdfStyles = StyleSheet.create({
  page: { 
    padding: 30,
    backgroundColor: '#ffffff'
  },
  section: { 
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fafc'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1f2937'
  },
  subHeader: {
    fontSize: 20,
    marginBottom: 15,
    color: '#374151',
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 5
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4b5563'
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  score: {
    fontSize: 16,
    color: '#2563eb'
  },
  explanation: {
    fontSize: 12,
    marginBottom: 10,
    color: '#4b5563',
    lineHeight: 1.5
  },
  suggestion: {
    fontSize: 12,
    marginBottom: 15,
    color: '#1e40af',
    backgroundColor: '#eff6ff',
    padding: 10
  },
  totalScore: {
    fontSize: 20,
    textAlign: 'right',
    marginTop: 20,
    color: '#2563eb'
  }
});

// PDF Document Component
const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.header}>Visual & Textual Analysis Report</Text>
      
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.subHeader}>Visual Analysis</Text>
        {Object.entries(data.visual_analysis.Visuals).map(([key, value]) => (
          <View key={key}>
            <View style={pdfStyles.scoreContainer}>
              <Text style={pdfStyles.itemTitle}>{key}</Text>
              <Text style={pdfStyles.score}>{value.Score}/20</Text>
            </View>
            <Text style={pdfStyles.explanation}>{value.Explanation}</Text>
            <Text style={pdfStyles.suggestion}>💡 Suggestion: {value.Suggestions}</Text>
          </View>
        ))}
      </View>
      
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.subHeader}>Textual Analysis</Text>
        {Object.entries(data.textual_analysis.TextualAnalysis).map(([key, value]) => (
          <View key={key}>
            <View style={pdfStyles.scoreContainer}>
              <Text style={pdfStyles.itemTitle}>{key}</Text>
              <Text style={pdfStyles.score}>{value.Score}/20</Text>
            </View>
            <Text style={pdfStyles.explanation}>{value.Explanation}</Text>
            <Text style={pdfStyles.suggestion}>💡 Suggestion: {value.Suggestions}</Text>
          </View>
        ))}
      </View>
      
      <Text style={pdfStyles.totalScore}>Total Score: {data.total_score}</Text>
    </Page>
  </Document>
);

const DownloadPDF = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisData } = location.state || {};

  // If no data is present, show error and redirect option
  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Analysis Data Found</h2>
          <p className="text-gray-600 mb-6">Please generate a new analysis to view the report.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const Section = ({ title, data }) => (
    <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">{title}</h2>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-6 last:mb-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-700">{key}</h3>
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                value.Score >= 15 ? 'bg-green-100' :
                value.Score >= 10 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <span className={`text-lg font-bold ${
                  value.Score >= 15 ? 'text-green-700' :
                  value.Score >= 10 ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {value.Score}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-4 border-l-4 border-gray-200 pl-4">
            <p className="text-gray-600 mb-4 leading-relaxed">
              {value.Explanation}
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-blue-800 font-medium">
                💡 Suggestion:
              </p>
              <p className="text-blue-700 mt-1">
                {value.Suggestions}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Visual & Textual Analysis Report
        </h1>
        {analysisData.description && (
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            {analysisData.description}
          </p>
        )}
        <p className="text-gray-600 mb-4">
          Analysis for: {analysisData.landing_page_url}
        </p>
        <div className="inline-block">
          <PDFDownloadLink 
            document={<PDFDocument data={analysisData} />} 
            fileName="analysis_report.pdf"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
          >
            {({ loading }) => (
              loading ? 
              "Generating PDF..." : 
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF Report
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="space-y-6">
        <Section 
          title="Visual Analysis" 
          data={analysisData.visual_analysis.Visuals} 
        />
        
        <Section 
          title="Textual Analysis" 
          data={analysisData.textual_analysis.TextualAnalysis} 
        />
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Total Score</h2>
            <div className="bg-blue-100 px-6 py-3 rounded-full">
              <span className="text-3xl font-bold text-blue-700">
                {analysisData.total_score}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPDF;