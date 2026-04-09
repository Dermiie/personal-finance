import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/app-layout";
import Dashboard from "./pages/dashboard";
import Pots from "./pages/pots";
import Transaction from "./pages/transaction";
import RecurringBills from "./pages/recurring-bills";
import PageNotFound from "./pages/page-not-found";
import Budgets from "./pages/budget";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout></AppLayout>}>
          <Route
            index
            element={<Navigate replace to={"dashboard"}></Navigate>}
          />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pots" element={<Pots />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="recurring-bills" element={<RecurringBills />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
