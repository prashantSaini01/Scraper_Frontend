import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoutesConfig from "./Routes";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main content area */}
        <main className="flex-grow container mx-auto p-4 mt-20">
          <RoutesConfig />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;