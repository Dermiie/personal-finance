import { IoHome, IoReceipt } from "react-icons/io5";
import Logo from "./logo";
import { LuArrowDownUp } from "react-icons/lu";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function MainNav() {
  return (
    <div className="bg-grey-900 text-grey-100 flex h-full flex-col gap-12 py-10">
      <Logo></Logo>
      <ul className="flex w-[80%] flex-col gap-6">
        <NavLink to={"/dashboard"}>
          <li className="group hover:bg-beige-200 hover:text-grey-900 flex items-center gap-4 rounded-r-md px-6 py-3 font-medium">
            <span className="group-hover:text-green-600">
              <IoHome size={18} />
            </span>
            Overview
          </li>
        </NavLink>
        <NavLink to={"/transactions"}>
          <li className="group hover:bg-beige-200 hover:text-grey-900 flex items-center gap-4 rounded-r-md px-6 py-3 font-medium">
            <span className="group-hover:text-green-600">
              <LuArrowDownUp size={18} />
            </span>
            Transactions
          </li>
        </NavLink>
        <NavLink to={"/budgets"}>
          <li className="group hover:bg-beige-200 hover:text-grey-900 flex items-center gap-4 rounded-r-md px-6 py-3 font-medium">
            <span className="group-hover:text-green-600">
              <BiSolidPieChartAlt2 size={18} />
            </span>
            Budgets
          </li>
        </NavLink>
        <NavLink to={"/pots"}>
          <li className="group hover:bg-beige-200 hover:text-grey-900 flex items-center gap-4 rounded-r-md px-6 py-3 font-medium">
            <span className="group-hover:text-green-600">
              <FaFileInvoiceDollar size={18} />
            </span>
            Pots
          </li>
        </NavLink>
        <NavLink to={"/recurring-bills"}>
          <li className="group hover:bg-beige-200 hover:text-grey-900 flex items-center gap-4 rounded-r-md px-6 py-3 font-medium">
            <span className="group-hover:text-green-600">
              <IoReceipt size={18} />
            </span>
            Recurring Bills
          </li>
        </NavLink>
      </ul>
    </div>
  );
}
