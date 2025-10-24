import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/ui/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import WalletSearchPage from "./pages/WalletSearch";
import History from "./pages/History";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import ErrorBoundary from "./components/ui/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <AuthProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Layout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/wallet-search"
                  element={
                    <ProtectedRoute>
                      <WalletSearchPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <History />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}
