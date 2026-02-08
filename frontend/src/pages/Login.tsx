import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { setCurrentUser } from '../utils/auth';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8080';

type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!credentials.email) {
      newErrors.email = 'Email is required';
    } else if (!credentials.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setErrors({ general: msg || 'Login failed' });
        return;
      }

      const user = await res.json();
      setCurrentUser(user);

      switch (user.role) {
        case 'ADMIN':
          navigate('/dashboard');
          break;
        case 'EMPLOYEE':
          navigate('/jobs');
          break;
        default:
          navigate('/free-estimate');
      }
    } catch {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-washi-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-sumi-800">
            <Lock className="h-5 w-5 text-washi-50" />
          </div>
          <h2 className="font-display text-2xl font-bold text-sumi-800">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-sumi-500">
            Access the Squeegee Samurai portal
          </p>
        </div>

        <div className="bg-white border border-sumi-100 p-8">
          {errors.general && (
            <div className="mb-4 border border-aka-200 bg-aka-50 text-aka-700 px-4 py-3 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-sumi-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-sumi-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2.5 border text-sm focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-colors ${
                    errors.email ? 'border-aka-400' : 'border-sumi-200'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-aka-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-sumi-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-sumi-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-2.5 border text-sm focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-colors ${
                    errors.password ? 'border-aka-400' : 'border-sumi-200'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-sumi-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-sumi-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-aka-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sumi-800 text-washi-50 py-2.5 px-4 text-sm font-medium tracking-wide hover:bg-sumi-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-sumi-500">
              {"Don't have an account? "}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-700">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
