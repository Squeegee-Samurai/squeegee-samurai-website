import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-washi-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-aka-50">
            <ShieldX className="h-8 w-8 text-aka-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-sumi-800">Access Denied</h1>
          <div className="mx-auto mt-3 h-px w-12 bg-aka-600" />
          <p className="mt-4 text-sm text-sumi-500 leading-relaxed">
            {"You don't have permission to access this page."}
          </p>
        </div>

        <div className="bg-white border border-sumi-100 p-8">
          <p className="text-sm text-sumi-500 leading-relaxed mb-6">
            This page requires specific permissions that your account does not have.
            Please contact an administrator if you believe this is an error.
          </p>

          <div className="space-y-3">
            <Link
              to="/"
              className="w-full bg-sumi-800 text-washi-50 px-6 py-3 text-sm font-medium tracking-wide hover:bg-sumi-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Return to Home
            </Link>

            <Link
              to="/login"
              className="w-full border border-sumi-200 text-sumi-700 px-6 py-3 text-sm font-medium tracking-wide hover:bg-sumi-50 transition-colors inline-block"
            >
              Login with Different Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
