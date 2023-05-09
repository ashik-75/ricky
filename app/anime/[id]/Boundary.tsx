"use client";

import { ErrorBoundary } from "react-error-boundary";

import React from "react";

function Boundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<div className="text-rose-600">Something went wrong</div>}
    >
      {children}
    </ErrorBoundary>
  );
}

export default Boundary;
