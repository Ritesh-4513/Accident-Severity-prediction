import React from 'react';
import { Shield, Brain, LineChart, Users } from 'lucide-react';
import Card from '../components/UI/Card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About AccidentPredictAI</h1>
            <p className="text-xl text-gray-600">
              Leveraging advanced AI to predict and prevent road accidents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-500" />}
              title="Advanced AI Model"
              description="Our system uses state-of-the-art machine learning algorithms to analyze multiple factors and predict accident severity."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-green-500" />}
              title="Preventive Measures"
              description="Get actionable insights and recommendations to prevent accidents before they happen."
            />
            <FeatureCard
              icon={<LineChart className="w-8 h-8 text-purple-500" />}
              title="Real-time Analysis"
              description="Process and analyze data in real-time to provide immediate predictions and alerts."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-red-500" />}
              title="Community Impact"
              description="Help create safer roads for everyone by contributing to our growing database of predictions."
            />
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                At AccidentPredictAI, we're committed to making roads safer for everyone. 
                By combining advanced artificial intelligence with real-world data, we help 
                predict potential accidents and their severity, enabling proactive measures 
                to prevent them.
              </p>
              <p className="mt-4">
                Our system analyzes various factors including weather conditions, traffic 
                patterns, road conditions, and historical data to provide accurate predictions 
                and actionable insights. This helps transportation authorities, emergency 
                services, and individual drivers make informed decisions and take preventive 
                measures.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <ol className="space-y-6">
                <Step
                  number={1}
                  title="Data Input"
                  description="Enter current conditions including weather, location, traffic density, and more."
                />
                <Step
                  number={2}
                  title="AI Analysis"
                  description="Our advanced AI model processes the data using machine learning algorithms."
                />
                <Step
                  number={3}
                  title="Risk Assessment"
                  description="Receive detailed predictions about potential accident severity and risk factors."
                />
                <Step
                  number={4}
                  title="Preventive Actions"
                  description="Get recommendations for actions to reduce accident risk and ensure safety."
                />
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="p-6">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </Card>
);

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => (
  <li className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </li>
);

export default About;