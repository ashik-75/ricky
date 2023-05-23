import { PropsWithChildren } from "react";
import AddStatus from "./components/AddStatus";
import Category from "./components/Category";
import SearchBar from "./components/SearchBar";

function Layout(props: PropsWithChildren) {
  return (
    <div className="space-y-5">
      <SearchBar />

      <main className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6">
        <div className="sm:grid-cols-1 lg:col-span-2">
          <Category />

          <div>
            <AddStatus />
          </div>
        </div>

        <div className="sm:grid-cols-3 lg:col-span-4">{props.children}</div>
      </main>
    </div>
  );
}

export default Layout;
