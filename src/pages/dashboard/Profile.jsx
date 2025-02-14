import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    // const [UserRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPic, setIsEditingPic] = useState(false);
    const [PatientACData, setPatientACData] = useState(null);
    const [DoctorACData, setDoctorACData] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
    });
    const [DoctorForm, setDoctorForm] = useState({
        BMDC_number: "",
        degrees: "",
        fee: "",
        hospital_name: "",
        experience: "",
        biography: "",
        meeting_link: ""
    });
    const [PatientForm, setPatientForm] = useState({
        age: "",
        gender: "",
        height_ft: "",
        height_in: "",
        weight_kg: ""
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const authToken = localStorage.getItem("authToken");
    const UserRole = localStorage.getItem("userRole");
    // setUserRole(role)
    console.log(authToken);
    const API_URL = "https://health-care-nine-indol.vercel.app/api/auth/user/";
    const patient_API = "https://health-care-nine-indol.vercel.app/api/account/patient-profile/";
    const doctor_API = "https://health-care-nine-indol.vercel.app/api/account/doctor-profile/";

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
    }, [authToken]);
    console.log(UserRole);

    useEffect(() => {
        const fetchRoleACData = async () => {
            try {
                const profileUrl = UserRole === "patient" ? patient_API : doctor_API;
                console.log(`Fetching data for role: ${UserRole}, API: ${profileUrl}`);

                const response = await axios.get(profileUrl, {
                    headers: { Authorization: `Token ${authToken}` },
                });
                console.log("Fetched Role-based Data:", response.data);
                if (UserRole === "patient") {

                    setPatientACData(response.data);
                    setPatientForm({
                        age: response.data.age,
                        gender: response.data.gender,
                        height_ft: response.data.height_ft,
                        height_in: response.data.height_in,
                        weight_kg: response.data.weight_kg,
                    });
                }
                else if (UserRole === "doctor") {
                    setDoctorACData(response.data);
                    setDoctorForm({
                        BMDC_number: response.data.BMDC_number,
                        degrees: response.data.degrees,
                        fee: response.data.fee,
                        hospital_name: response.data.hospital_name,
                        experience: response.data.experience,
                        biography: response.data.biography,
                        meeting_link: response.data.meeting_link
                    })
                }
            } catch (error) {
                console.error("Failed to fetch role-based info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoleACData();
    }, [authToken])

    // Handle text input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // patient form change
    const PatientChange = (e) => {
        setPatientForm({ ...PatientForm, [e.target.name]: e.target.value });
    };
    // doctor form change
    const DoctorChange = (e) => {
        setDoctorForm({ ...DoctorForm, [e.target.name]: e.target.value });
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
        const updatedPatientForm = new FormData(); // for patient update
        const updatedDoctorForm = new FormData();

        if (UserRole === "patient") {
            // for patient update
            updatedPatientForm.append("age", PatientForm.age);
            updatedPatientForm.append("gender", PatientForm.gender);
            updatedPatientForm.append("height_ft", PatientForm.height_ft);
            updatedPatientForm.append("height_in", PatientForm.height_in);
            updatedPatientForm.append("weight_kg", PatientForm.weight_kg);
        }
        else if (UserRole === "doctor") {
            updatedDoctorForm.append("specialization", DoctorACData.specialization);
            updatedDoctorForm.append("BMDC_number", DoctorForm.BMDC_number);
            updatedDoctorForm.append("degrees", DoctorForm.degrees);
            updatedDoctorForm.append("fee", DoctorForm.fee);
            updatedDoctorForm.append("hospital_name", DoctorForm.hospital_name);
            updatedDoctorForm.append("experience", DoctorForm.experience);
            updatedDoctorForm.append("biography", DoctorForm.biography);
            updatedDoctorForm.append("meeting_link", DoctorForm.meeting_link);
        }

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
            if (UserRole === "patient") {
                console.log(patient_API);
                const response2 = await axios.put(patient_API, updatedPatientForm, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
                setPatientACData(response2.data) // update state with new patient data
            }
            else if (UserRole === "doctor") {
                console.log(doctor_API);
                const response2 = await axios.put(doctor_API, updatedDoctorForm, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
                setDoctorACData(response2.data) // update state with new doctor data
            }

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
    // const handleDeleteAccount = async () => {
    //     if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    //         return;
    //     }
    //     try {
    //         await axios.delete(API_URL, {
    //             headers: {
    //                 Authorization: `Token ${authToken}`,
    //             },
    //         });
    //         localStorage.removeItem("authToken");
    //         localStorage.removeItem("userRole");
    //         alert("Account deleted successfully.");
    //         setUserData(null);
    //     } catch (err) {
    //         setError("Failed to delete account");
    //     }
    // };

    if (loading) {
        return <div className="flex justify-center items-center h-[50vh]">
            <span className="loading loading-spinner loading-md"></span>
        </div>;
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                        <h3 className="text-purple-700 font-semibold">Personal Information</h3>
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
                    {/* role based info start from here */}
                    <div>
                        {isEditing ? (
                            UserRole === "patient" ? (
                                <>
                                    <input
                                        type="text"
                                        name="age"
                                        value={PatientForm.age}
                                        onChange={PatientChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Age"
                                    />
                                    <select
                                        name="gender"
                                        value={PatientForm.gender}
                                        onChange={PatientChange}
                                        className="w-full p-2 border rounded mt-2"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <select
                                        name="height_ft"
                                        value={PatientForm.height_ft}
                                        onChange={PatientChange}
                                        className="w-full p-2 border rounded mt-2"
                                    >
                                        <option value="">Height(Feet only)</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                    </select>
                                    <select
                                        name="height_in"
                                        value={PatientForm.height_in}
                                        onChange={PatientChange}
                                        className="w-full p-2 border rounded mt-2"
                                    >
                                        <option value="">Height(Inch only)</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                    </select>
                                    <input
                                        type="text"
                                        name="weight_kg"
                                        value={PatientForm.weight_kg}
                                        onChange={PatientChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Weight(kg)"
                                    />
                                </>
                            ) : UserRole === "doctor" ? (
                                <>
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            name="BMDC_number"
                                            value={DoctorForm.BMDC_number}
                                            onChange={DoctorChange}
                                            className="w-full p-2 border rounded"
                                            placeholder="BMDC Number"
                                        />
                                        <input
                                            type="text"
                                            name="degrees"
                                            value={DoctorForm.degrees}
                                            onChange={DoctorChange}
                                            className="w-full p-2 border rounded"
                                            placeholder="Degrees"
                                        />
                                        <input
                                            type="number"
                                            name="fee"
                                            value={DoctorForm.fee}
                                            onChange={DoctorChange}
                                            className="w-full p-2 border rounded"
                                            placeholder="Fee"
                                        />
                                        <input
                                            type="text"
                                            name="hospital_name"
                                            value={DoctorForm.hospital_name}
                                            onChange={DoctorChange}
                                            className="w-full p-2 border rounded"
                                            placeholder="Hospital Name"
                                        />
                                        <input
                                            type="number"
                                            name="experience"
                                            value={DoctorForm.experience}
                                            onChange={DoctorChange}
                                            className="w-full p-2 border rounded"
                                            min="0" max="100"
                                            placeholder="Experience"
                                        />
                                        <input
                                            type="text"
                                            name="biography"
                                            value={DoctorForm.biography}
                                            onChange={DoctorChange}
                                            className="w-full p-2 border rounded"
                                            placeholder="Biography"
                                        />
                                        <input
                                            type="url"
                                            name="meeting_link"
                                            value={DoctorForm.meeting_link}
                                            pattern="https:\/\/(meet\.google\.com\/[a-zA-Z0-9-]+|us02web\.zoom\.us\/j\/[0-9]+)"
                                            placeholder="Enter Zoom or Google Meet link"
                                            onChange={(e) => setDoctorForm({ ...DoctorForm, meeting_link: e.target.value })}
                                            required
                                            title="Please enter a valid Google Meet or Zoom meeting link."
                                            className="w-full p-2 border rounded"
                                        /><br></br>
                                        <small>Only Google Meet or Zoom links are allowed.</small>
                                    </div>
                                </>
                            ) : null
                        ) : UserRole === "patient" ? (
                            <>
                                <div className="space-y-2">
                                    <h3 className="text-purple-700 font-semibold">{userData?.role.charAt(0).toUpperCase() + userData?.role.slice(1)} Information</h3>
                                    <p><span className="font-medium">Age:</span> {PatientACData?.age}</p>
                                    <p><span className="font-medium">Gender:</span> {PatientACData?.gender.charAt(0).toUpperCase() + PatientACData?.gender.slice(1)}</p>
                                    <p><span className="font-medium">Height:</span> {PatientACData?.height_ft} feet {PatientACData?.height_in} inch</p>
                                    <p><span className="font-medium">Weight:</span> {PatientACData?.weight_kg} kg</p>
                                </div>
                            </>
                        ) : UserRole === "doctor" ? (
                            <>
                                <div className="space-y-2">
                                    <h3 className="text-purple-700 font-semibold">{userData?.role.charAt(0).toUpperCase() + userData?.role.slice(1)} Information</h3>
                                    <p><span className="font-medium">BMDC Number:</span> {DoctorACData?.BMDC_number}</p>
                                    <p><span className="font-medium">Degrees:</span> {DoctorACData?.degrees}</p>
                                    <p><span className="font-medium">Fee:</span> {DoctorACData?.fee} tk</p>
                                    <p><span className="font-medium">Specialization:</span> {DoctorACData?.specialization_name}</p>
                                    <p><span className="font-medium">Hospital Name:</span> {DoctorACData?.hospital_name}</p>
                                    <p><span className="font-medium">Experience:</span> {DoctorACData?.experience}</p>
                                    <p><span className="font-medium">Meet link:</span> {DoctorACData?.meeting_link}</p>
                                </div>
                            </>
                        ) :
                            null
                        }
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
                    <Link
                        to="/password/change"
                        className="btn btn-primary"
                    >
                        Change Password
                    </Link>
                    {/* <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Delete Account
                    </button> */}
                </div>

            </div>
        </div>
    );
};

export default Profile;
