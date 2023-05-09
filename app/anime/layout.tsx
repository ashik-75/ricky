import React from "react";

export const metadata = {
  title: "Anime's Page",
  description: "Show all the character",
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}

export default Layout;
