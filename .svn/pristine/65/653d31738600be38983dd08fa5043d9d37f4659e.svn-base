import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useLocation } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const location = useLocation();
  console.log("location.path : ", location.path);
  const pathname = location.pathname;
  console.log("pathname: ", pathname);
  const pathnameArray = pathname.split("/");
  console.log(pathnameArray);

  return (
    <div className="min-h-screen xl:flex">
      <div>
        {pathname.includes("jobs") || pathname.includes("staff") || pathname.includes("professorData") ? "" : <AppSidebar />}
        <Backdrop />
      </div>
      <div
        className={
          pathname.includes("jobs") || pathname.includes("staff") || pathname.includes("professorData")
            ? "flex-1 transition-all duration-300 ease-in-out "
            : `flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[265px]" : "lg:ml-[90px]"
            } ${isMobileOpen ? "ml-0" : ""}`
        }
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
