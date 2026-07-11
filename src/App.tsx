import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import VerifyPage from '@/pages/VerifyPage.tsx';
import ProtectedRoute from '@/routes/ProtectedRoute.tsx';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/dashboard/*"
                        element={
                            <ProtectedRoute>
                                <Index />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/verify/*" element={<VerifyPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
