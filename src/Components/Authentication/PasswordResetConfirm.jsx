import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";

const PasswordResetConfirm = () => {
  const { uid, token } = useParams(); // Extract uid and token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `https://health-care-nine-indol.vercel.app/api/auth/password/reset/confirm/${uid}/${token}/`,
        {
          new_password1: newPassword,
          new_password2: confirmPassword,
          uid: uid,
          token: token
        }
      );

      toast.success("Password reset successful!");
      setNewPassword("");
      setConfirmPassword("");
      navigate('/login')
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="card bg-white shadow-lg p-6 w-full max-w-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input input-bordered w-full mb-3"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input input-bordered w-full mb-3"
        />

        <button
          className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
