import { Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { Spinner } from '@/components/ui/spinner';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const Materials = lazy(() => import('./pages/Materials'));
const TopologyBuilder = lazy(() => import('./pages/TopologyBuilder'));
const CLIGenerator = lazy(() => import('./pages/CLIGenerator'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const SubnetCalculator = lazy(() => import('./pages/SubnetCalculator'));
const Settings = lazy(() => import('./pages/Settings'));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Spinner className="w-8 h-8 text-[#e6ff00]" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/topology" element={<TopologyBuilder />} />
        <Route path="/cli-generator" element={<CLIGenerator />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/subnet-calculator" element={<SubnetCalculator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Suspense>
  );
}
