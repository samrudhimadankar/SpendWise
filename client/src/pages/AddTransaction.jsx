import ExpenseForm from "../components/ExpenseForm";

const AddTransaction = () => {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Add Transaction</h1>
        <p className="text-sm text-slate-500">Add income or expense data that will reflect in your charts and reports.</p>
      </div>
      <ExpenseForm />
    </main>
  );
};

export default AddTransaction;
