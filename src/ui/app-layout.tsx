import { Outlet } from "react-router-dom";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

function AppLayout() {
  return (
    <div className="flex h-screen flex-col md:grid md:grid-cols-[20%_80%]">
      <div className="hidden md:inline-block">
        <MainNav />
      </div>
      <main className="font-public text-grey-800 m-0 overflow-scroll px-4 pt-4 pb-20 md:px-6 md:py-6 md:pb-0">
        <Outlet></Outlet>
      </main>
      <div className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}

export default AppLayout;
