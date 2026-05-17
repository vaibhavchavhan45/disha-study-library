import {
  Phone,
  Mail,
  CalendarDays,
  User,
  Armchair,
  Trash2,
  Eye,
  Pencil,
  AlertTriangle,
  Clock,
} from "lucide-react";

/* helpers */
const getDaysLeft = (expiry_date) => {
  if (!expiry_date) return null;
  return Math.ceil((new Date(expiry_date) - new Date()) / (1000 * 60 * 60 * 24));
};

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "—";

/* expiry badge */
const ExpiryBadge = ({ daysLeft }) => {
  if (daysLeft === null) return null;
  if (daysLeft <= 0)
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
        <AlertTriangle size={9} /> Expired
      </span>
    );
  if (daysLeft <= 7)
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
        <Clock size={9} /> {daysLeft}d left
      </span>
    );
  return null;
};

/* fee badge */
const FeeBadge = ({ fee_status, pending_amount }) => {
  const map = {
    PAID: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    PENDING: "bg-amber-50 text-amber-700 border border-amber-200",
    UNPAID: "bg-red-50 text-red-600 border border-red-200",
  };
  const label =
    fee_status === "PENDING"
      ? `₹${pending_amount || 0} pending`
      : fee_status || "UNPAID";

  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${map[fee_status] ?? map.UNPAID
        }`}
    >
      {label}
    </span>
  );
};

/* gender pill */
const GenderPill = ({ gender }) => (
  <span
    className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase ${gender === "GIRLS"
        ? "bg-pink-50 text-pink-600 border border-pink-200"
        : "bg-sky-50 text-sky-600 border border-sky-200"
      }`}
  >
    {gender}
  </span>
);

/* avatar */
const Avatar = ({ photo_url, name }) => (
  <div className="w-11 h-11 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden shrink-0">
    {photo_url ? (
      <img
        src={photo_url}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextSibling.style.display = "flex";
        }}
      />
    ) : null}
    <span
      className="w-full h-full flex items-center justify-center"
      style={{ display: photo_url ? "none" : "flex" }}
    >
      <User size={17} />
    </span>
  </div>
);

/* action row */
const ActionRow = ({ student, onView, onEdit, onAssign, onDelete }) => (
  <div className="flex items-center gap-2 pt-3 mt-3 border-t border-gray-100">
    <button
      onClick={() => onView(student)}
      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors"
    >
      <Eye size={13} /> View
    </button>
    <button
      onClick={() => onEdit(student)}
      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors"
    >
      <Pencil size={13} /> Edit
    </button>
    <button
      onClick={() => onAssign(student)}
      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-colors"
    >
      <Armchair size={13} /> Assign
    </button>
    <button
      onClick={() => onDelete(student)}
      className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-colors"
    >
      <Trash2 size={14} />
    </button>
  </div>
);

/* single card */
const WaitingCard = ({
  student: s,
  rowNumber,
  onView,
  onEdit,
  onAssign,
  onDelete,
}) => {
  const daysLeft = getDaysLeft(s.expiry_date);
  const isExpired = daysLeft !== null && daysLeft <= 0;

  return (
    <div
      className={`rounded-2xl bg-white border shadow-sm p-4 transition-shadow hover:shadow-md ${isExpired ? "border-red-200" : "border-gray-200"
        }`}
    >
      {/* top row */}
      <div className="flex items-start gap-3">
        <Avatar photo_url={s.photo_url} name={s.name} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {s.name}
            </p>
            <GenderPill gender={s.gender} />
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">
            #{rowNumber} · joined {fmt(s.created_at)}
          </p>
        </div>
      </div>

      {/* contact */}
      <div className="mt-3 space-y-1.5">
        {s.phone && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Phone size={12} className="text-gray-400 shrink-0" />
            {s.phone}
          </div>
        )}
        {s.email && (
          <div className="flex items-center gap-2 text-xs text-gray-600 min-w-0">
            <Mail size={12} className="text-gray-400 shrink-0" />
            <span className="truncate">{s.email}</span>
          </div>
        )}
      </div>

      {/* expiry + fee row */}
      <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <CalendarDays size={12} className="text-gray-400" />
          <span>{fmt(s.expiry_date)}</span>
          <ExpiryBadge daysLeft={daysLeft} />
        </div>
        <FeeBadge fee_status={s.fee_status} pending_amount={s.pending_amount} />
      </div>

      {/* actions */}
      <ActionRow
        student={s}
        onView={onView}
        onEdit={onEdit}
        onAssign={onAssign}
        onDelete={onDelete}
      />
    </div>
  );
};

/* list */
const WaitingCards = ({
  list,
  onView,
  onEdit,
  onAssign,
  onDelete,
  currentPage,
  itemsPerPage,
}) => {
  if (!list?.length)
    return (
      <div className="lg:hidden py-16 flex flex-col items-center gap-2 text-gray-400">
        <User size={32} className="opacity-30" />
        <p className="text-sm">No students on the waiting list</p>
      </div>
    );

  return (
    <div className="lg:hidden space-y-3 p-3">
      {list.map((s, i) => (
        <WaitingCard
          key={s.id}
          student={s}
          rowNumber={(currentPage - 1) * itemsPerPage + i + 1}
          onView={onView}
          onEdit={onEdit}
          onAssign={onAssign}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default WaitingCards;