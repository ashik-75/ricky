import { Separator } from "@/components/ui/separator";
import { PropsWithChildren } from "react";
import Leftbar from "./Leftbar";

function Layout(props: PropsWithChildren) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-bold text-2xl">Settings</h1>

        <p>Manage your account settings and set e-mail preferences</p>

        <Separator className="my-5" />
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[220px]">
          <Leftbar />
        </div>

        <div className="flex-1">{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
