import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PredictionResult } from './types';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import PredictionForm from './components/PredictionForm';
import PredictionResultComponent from './components/PredictionResult';
import HistoryTable from './components/HistoryTable';
import SignInForm from './components/Auth/SignInForm';
import SignUpForm from './components/Auth/SignUpForm';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import { accidentConditions } from './data/mockData';
import { predictAccidentSeverity, getPredictionHistory, savePrediction } from './services/api';
import { AlertCircle } from 'lucide-react';
import { supabase } from './services/supabase';

function App() {
  const [predictionHistory, setPredictionHistory] = useState<PredictionResult[]>([]);
  const [currentPrediction, setCurrentPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load prediction history on component mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getPredictionHistory();
        setPredictionHistory(history);
      } catch (err) {
        setError('Failed to load prediction history');
        console.error(err);
      } finally {
        setInitialLoad(false);
      }
    };
    
    loadHistory();
  }, []);

  const handleSubmitForm = async (formData: Record<string, string | number>) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await predictAccidentSeverity(formData);
      setCurrentPrediction(result);
      
      // Save prediction to history
      await savePrediction(result);
      
      // Update prediction history
      setPredictionHistory((prev) => [result, ...prev]);
      
      // Scroll to result
      setTimeout(() => {
        document.getElementById('prediction-result')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    } catch (err) {
      setError('Failed to generate prediction. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (prediction: PredictionResult) => {
    setCurrentPrediction(prediction);
    
    // Scroll to result
    setTimeout(() => {
      document.getElementById('prediction-result')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const MainContent = () => (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Accident Severity Prediction</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter accident conditions to predict potential severity levels and take preventive measures.
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-3xl mx-auto">
              <div className="flex items-center text-red-700">
                <AlertCircle size={20} className="mr-2" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}
          
          <PredictionForm 
            conditions={accidentConditions} 
            onSubmit={handleSubmitForm}
            isLoading={isLoading}
          />
        </section>
        
        <section id="prediction-result" className="mb-12">
          <PredictionResultComponent prediction={currentPrediction} />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Prediction History</h2>
          
          {initialLoad ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading prediction history...</p>
            </div>
          ) : (
            <HistoryTable 
              history={predictionHistory} 
              onSelectPrediction={handleSelectHistoryItem} 
            />
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/about" element={<About />} />
        <Route 
          path="/dashboard" 
          element={
            session ? <AdminDashboard /> : <Navigate to="/signin" />
          } 
        />
        <Route path="/" element={<MainContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;