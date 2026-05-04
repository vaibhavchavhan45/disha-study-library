import PasswordInput from "../profile/PasswordInput";


function ChangePasswordForm({
  currentPassword, setCurrentPassword,
  newPassword, setNewPassword,
  confirmPassword, setConfirmPassword,
  status, error,
  attemptsLeft,
}) {
  return (
    <div className="space-y-4">
      <PasswordInput
        label="Current Password"
        placeholder="Enter current password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <PasswordInput
        label="New Password"
        placeholder="Min 8 chars, uppercase, number, special"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Re-enter new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {status === "error" && attemptsLeft <= 2 && (
        <p className="text-amber-500 text-sm">
          {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} left before lockout.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}

export default ChangePasswordForm;