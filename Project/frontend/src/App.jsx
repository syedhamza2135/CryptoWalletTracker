import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import Layout from "./components/ui/Layout.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import { lazy, Suspense } from "react";

// Lazy load page components for code splitting
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const WalletSearchPage = lazy(() => import("./pages/WalletSearch"));
const History = lazy(() => import("./pages/History"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

// Loading component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <AuthProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Landing page */}
                <Route path="/" element={<Landing />} />

                {/* Public routes without layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes with layout */}
                <Route
                  path="/dashboard"
                  element={
                    <Layout>
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    </Layout>
                  }
                />

                <Route
                  path="/wallet-search"
                  element={
                    <Layout>
                      <ProtectedRoute>
                        <WalletSearchPage />
                      </ProtectedRoute>
                    </Layout>
                  }
                />

                <Route
                  path="/history"
                  element={
                    <Layout>
                      <ProtectedRoute>
                        <History />
                      </ProtectedRoute>
                    </Layout>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <Layout>
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    </Layout>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <Layout>
                      <ProtectedRoute adminOnly>
                        <AdminPanel />
                      </ProtectedRoute>
                    </Layout>
                  }
                />

                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}