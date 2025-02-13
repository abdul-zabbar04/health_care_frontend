import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "https://health-care-nine-indol.vercel.app/api/auth/password/change/",
        {
          old_password: oldPassword,
          new_password1: newPassword,
          new_password2: confirmPassword,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`, // Ensure token is stored in localStorage
          },
        }
      );

      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Change Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="input input-bordered w-full mb-3"
        />

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

        <button className="btn btn-primary w-full" onClick={handlePasswordChange}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default PasswordChange;
