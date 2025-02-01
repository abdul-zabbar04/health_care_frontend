import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPic, setIsEditingPic] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const authToken = localStorage.getItem("authToken"); // Replace with actual token
    const API_URL = "https://health-care-nine-indol.vercel.app/api/auth/user/";

    // ImgBB API URL and key
    const IMGBB_API_URL = "https://api.imgbb.com/1/upload?key=6e856a08d1a2dc102e60c57e964312e5";

    // Fetch user data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
                setUserData(response.data);
                setFormData({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                });
                setPreviewImage(response.data.profile_image || "https://via.placeholder.com/96");
            } catch (err) {
                setError("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Handle text input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle profile picture change and upload to ImgBB
    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));

            // Create FormData to upload the image to ImgBB
            const formDataImgBB = new FormData();
            formDataImgBB.append("image", file);

            try {
                const response = await axios.post(IMGBB_API_URL, formDataImgBB);
                const imageUrl = response.data.data.url; // Get the uploaded image URL from ImgBB

                // Set the profile image URL to be sent to the backend
                setProfileImage(imageUrl);
            } catch (err) {
                console.error("Error uploading image to ImgBB:", err);
                alert("Failed to upload image.");
            }
        }
    };

    // Handle profile update (PUT request using FormData)
    const handleUpdateProfile = async () => {
        const updatedFormData = new FormData();

        // Ensure required fields are included
        updatedFormData.append("username", userData.username);
        updatedFormData.append("email", userData.email);
        updatedFormData.append("role", userData.role); // Just in case

        // Allow updates only for first_name, last_name, and profile_image
        updatedFormData.append("first_name", formData.first_name);
        updatedFormData.append("last_name", formData.last_name);

        if (profileImage) {
            updatedFormData.append("profile_image", profileImage); // Now it's the ImgBB URL
        }

        try {
            const response = await axios.put(API_URL, updatedFormData, {
                headers: {
                    Authorization: `Token ${authToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setUserData(response.data); // Update state with new data
            setIsEditing(false);
            setIsEditingPic(false);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Profile update error:", err.response ? err.response.data : err);
            alert("Failed to update profile. Check console for details.");
        }
    };

    // Handle account deletion (DELETE request)
    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            return;
        }
        try {
            await axios.delete(API_URL, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            localStorage.removeItem("authToken");
            alert("Account deleted successfully.");
            setUserData(null);
        } catch (err) {
            setError("Failed to delete account");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="bg-white shadow-lg rounded-xl p-6 w-full mt-10 border">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                        <img
                            src={previewImage}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    </div>

                    {isEditingPic ? (
                        <div className="mt-2 flex flex-col items-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="mt-2"
                            />
                            <div className="mt-2 flex space-x-2">
                                <button
                                    onClick={handleUpdateProfile}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditingPic(false);
                                        setPreviewImage(userData?.profile_image || "https://via.placeholder.com/96");
                                    }}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditingPic(true)}
                            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Edit Picture
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <h3 className="text-purple-700 font-semibold">Personal Profile</h3>
                        <p><span className="font-medium">Username:</span> {userData?.username}</p>
                        <p><span className="font-medium">Email:</span> {userData?.email}</p>
                        <p><span className="font-medium">Role:</span> {userData?.role}</p>

                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded mt-2"
                                    placeholder="Last Name"
                                />
                            </>
                        ) : (
                            <>
                                <p><span className="font-medium">First Name:</span> {userData?.first_name}</p>
                                <p><span className="font-medium">Last Name:</span> {userData?.last_name}</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex space-x-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleUpdateProfile}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Edit Profile
                        </button>
                    )}

                    <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
