import { Outlet } from "react-router-dom";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

function AppLayout() {
  return (
    <div className="flex h-screen flex-col md:grid md:grid-cols-[25%_75%]">
      <div className="hidden md:inline-block">
        <MainNav />
      </div>
      <main className="m-0 overflow-scroll pb-20">
        <Outlet></Outlet>
      </main>
      <div className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}

export default AppLayout;
