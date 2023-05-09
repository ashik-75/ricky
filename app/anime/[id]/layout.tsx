import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h1>Page Details</h1>
      <div>{children}</div>
    </section>
  );
}

export default layout;
