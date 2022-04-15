import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaUser } from "react-icons/fa";
import { BiDownArrowAlt } from "react-icons/bi";
import { BiUpArrowAlt } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { BiCog } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import ProfitGoal from '../ProfitGoal/ProfitGoal';
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome size={"1.75rem"} />,
  },
  {
    path: "/incomes",
    name: "Incomes",
    icon: <BiDownArrowAlt size={"1.75rem"}/>,
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: <BiUpArrowAlt size={"1.75rem"}/>,
  },
  {
    path: "/Categories",
    name: "Categories",
    icon: <MdOutlineCategory size={"1.75rem"}/>,
  },
  

  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog size={"1.75rem"}/>,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: <FiLogOut size={"1.75rem"}/>,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="ouss">
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "auto" : "45px",
            transition: {
              duration: 0.5,
              type: "tween",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Spensify
                </motion.h1>
              )}
            </AnimatePresence>
              <FaBars className="burger" onClick={toggle} size="1.75rem"/>
          </div>
          
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}

            {isOpen&&(
          
            <ProfitGoal color="#2ADB91" background="#fff" margin="0 1rem" />
            )}

          </section>
        </motion.div>
        {/* <main>{children}</main> */}
      </div>
    </div>
  );
};

export default SideBar;
