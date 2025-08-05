import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

// Assume these icons are imported from an icon library
import { ChevronDownIcon, HorizontaLDots, PieChartIcon } from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import { ChevronLeft, GraduationCap, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const othersItems = [
  // {
  //   icon: <PieChartIcon />,
  //   name: "Charts",
  //   subItems: [
  //     { name: "Line Chart", path: "/line-chart", pro: false },
  //     { name: "Bar Chart", path: "/bar-chart", pro: false },
  //   ],
  // },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  console.log(location);

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});
  const { user } = useAuth();
  const isStudent = user?.roles?.[0]?.authority === "ROLE_STD";

  const navItems = [
    {
      icon: <GraduationCap />,
      name: "이클래스",
      subItems: [
        { name: "사이버 강의실", path: "/eclass", pro: false },
        {
          name: "학습마당",
          path: `/eclass/lecture/${user?.username}`,
          pro: false,
        },
        {
          name: "과제",
          path: `/eclass/assignmentList/${user?.username}`,
          pro: false,
        },
        ...(isStudent
          ? [
              {
                name: "통계",
                path: `/eclass/statistics`,
                pro: false,
              },
            ]
          : []),
      ],
    },
  ];

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-slate-700 text-slate-200"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-slate-200"
              } ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-slate-200"
                    : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="ml-3 text-sm font-medium">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 group ${
                  isActive(nav.path)
                    ? "bg-slate-700 text-slate-200"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-slate-200"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-5 h-5 ${
                    isActive(nav.path)
                      ? "text-slate-200"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="ml-3 text-sm font-medium">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-8">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        isActive(subItem.path)
                          ? "bg-slate-600/70 text-slate-100"
                          : "text-slate-400 hover:bg-slate-700/30 hover:text-slate-200"
                      }`}
                    >
                      <span>{subItem.name}</span>
                      <span className="flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              isActive(subItem.path)
                                ? "bg-slate-500 text-slate-100"
                                : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              isActive(subItem.path)
                                ? "bg-slate-500 text-slate-100"
                                : "bg-amber-500/20 text-amber-300"
                            }`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-slate-800 dark:bg-slate-900 border-slate-700 text-white h-screen transition-all duration-300 ease-in-out z-50 border-r 
        ${
          isExpanded || isMobileOpen
            ? "w-[265px]"
            : isHovered
            ? "w-[265px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 로고 영역 */}
      <div
        className={`py-3.5 flex items-center ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link
          to="http://localhost/"
          className="flex items-center justify-center"
        >
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center justify-center ">
              <img
                src="/images/logo/부엉대사이드바로고하얀색.png"
                alt="부엉대 로고"
                className="object-contain"
                width={140}
                height={40}
              />
            </div>
          ) : (
            <div className="w-10 h-10  rounded-lg flex items-center justify-center flex-shrink-0">
              <Home />
            </div>
          )}
        </Link>
      </div>

      {/* 메뉴 영역 */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-6">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-slate-400 font-medium tracking-wide ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "메인 메뉴"
                ) : (
                  <HorizontaLDots className="size-5" />
                )}
              </h2>
              <div className="space-y-2">
                {renderMenuItems(navItems, "main")}
              </div>
            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-slate-400 font-medium tracking-wide ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  ""
                ) : (
                  <HorizontaLDots className="size-5" />
                )}
              </h2>
              <div className="space-y-2">
                {renderMenuItems(othersItems, "others")}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
