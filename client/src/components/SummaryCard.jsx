const SummaryCard = ({ title, value, helper }) => {
  return (
    <div className="card">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
      {helper && <p className="mt-2 text-xs text-slate-500">{helper}</p>}
    </div>
  );
};

export default SummaryCard;
