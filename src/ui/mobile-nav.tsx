import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoHome, IoReceipt } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function MobileNav() {
  const base =
    "group flex flex-col items-center justify-center px-3 py-2 text-xs rounded-t-md transition duration-300";
  const active = "bg-beige-200 text-grey-900 border-b-4 border-green-500";
  const inactive = "text-grey-300";

  const getClass = ({ isActive }: { isActive: boolean }) =>
    `${base} ${isActive ? active : inactive}`;

  return (
    <nav className="bg-grey-900 px-3 pt-2">
      <ul className="flex justify-between">
        <li>
          <NavLink to="/dashboard" className={getClass}>
            <IoHome size={18} />
            <p className="hidden sm:inline">Overview</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/transactions" className={getClass}>
            <LuArrowDownUp size={18} />
            <p className="hidden sm:inline">Transactions</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/budgets" className={getClass}>
            <BiSolidPieChartAlt2 size={18} />
            <p className="hidden sm:inline">Budgets</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/pots" className={getClass}>
            <FaFileInvoiceDollar size={18} />
            <p className="hidden sm:inline">Pots</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/recurring-bills" className={getClass}>
            <IoReceipt size={18} />
            <p className="hidden sm:inline">Recurring bills</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
