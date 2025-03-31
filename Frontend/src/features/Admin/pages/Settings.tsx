import axios from "axios";
import { Bell, ImagePlus, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from '../../../lib/cloudinaryUtils'; // Adjust path as needed
import { useAuth } from "../../../Shared/hooks/AuthContext"; // Adjust path as needed
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Label } from "../components/ui/Label";

const Settings = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    name: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    email: false,
    push: false,
    sms: false,
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        username: user.username || "",
        email: user.email || "",
        name: user.name || "",
        phone: user.phone || "",
      });
      setProfileImage(user.image || null);
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setMessage({ type: "error", text: "Please upload a valid image (JPEG, PNG, or GIF)" });
      return;
    }

    if (file.size > maxSize) {
      setMessage({ type: "error", text: "Image size should be less than 5MB" });
      return;
    }

    try {
      setLoading(true);
      // Show preview immediately
      setProfileImage(URL.createObjectURL(file));

      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(file);

      // Update profile image in backend
      await axios.post(
        "http://127.0.0.1:5000/admin/profile/image",
        { image_url: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({ type: "success", text: "Profile image updated successfully" });
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage({ type: "error", text: "Failed to upload image" });
      // Revert to previous image if available
      setProfileImage(user?.image || null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      await axios.put(
        "http://127.0.0.1:5000/admin/profile",
        profileForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        "http://127.0.0.1:5000/admin/password",
        {
          current_password: passwordForm.currentPassword,
          new_password: passwordForm.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage({ type: "success", text: "Password updated successfully" });
      // Clear password fields
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage({ type: "error", text: "Failed to update password" });
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    await updateProfile();
    // Update notifications if needed
    // await updateNotifications();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <button
          className="px-4 py-2 bg-[#d66161] text-white rounded-lg hover:bg-[#c26276] transition-colors"
          onClick={saveChanges}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message.text && (
        <div className={`p-3 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="w-8 h-8 rounded-lg bg-[#d66161]/10 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Update your personal information and profile details
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Profile Image */}
              <div className="space-y-2 relative">
                <Label className="text-sm font-medium text-gray-700">
                  Profile Image
                </Label>
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center mt-2">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImagePlus className="w-12 h-12 mx-auto mb-2" />
                        <p>Upload Image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Username
                </Label>
                <input
                  type="text"
                  name="username"
                  value={profileForm.username}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
                  disabled={loading}
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
                  disabled={loading}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Phone
                </Label>
                <input
                  type="tel"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="w-8 h-8 rounded-lg bg-[#d66161]/10 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Security Settings</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Manage your account security and authentication methods
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Current Password */}
              <div className="space-y-2 relative">
                <Label className="text-sm font-medium text-gray-700">
                  Current Password
                </Label>
                <div className="relative">
                  <input
                    type={passwordVisibility.currentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("currentPassword")}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                  >
                    {passwordVisibility.currentPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2 relative">
                <Label className="text-sm font-medium text-gray-700">
                  New Password
                </Label>
                <div className="relative">
                  <input
                    type={passwordVisibility.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                  >
                    {passwordVisibility.newPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 relative">
                <Label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <input
                    type={passwordVisibility.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                  >
                    {passwordVisibility.confirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                onClick={updatePassword}
                className="mt-2 px-4 py-2 bg-[#d66161] text-white rounded-lg hover:bg-[#c26276] transition-colors"
                disabled={loading}
              >
                Update Password
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="w-8 h-8 rounded-lg bg-[#d66161]/10 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Notification Settings</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Configure how you receive notifications and alerts
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-notifications"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 bg-gray-300 border-[#d66161] rounded focus:ring-[#d66161] checked:bg-[#d66161] checked:border-[#d66161]"
                  disabled={loading}
                />
                <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="push-notifications"
                  name="push"
                  checked={notifications.push}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 bg-gray-300 border-[#d66161] rounded focus:ring-[#d66161] checked:bg-[#d66161] checked:border-[#d66161]"
                  disabled={loading}
                />
                <label htmlFor="push-notifications" className="ml-2 text-sm text-gray-700">
                  Push Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sms-notifications"
                  name="sms"
                  checked={notifications.sms}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 bg-gray-300 border-[#d66161] rounded focus:ring-[#d66161] checked:bg-[#d66161] checked:border-[#d66161]"
                  disabled={loading}
                />
                <label htmlFor="sms-notifications" className="ml-2 text-sm text-gray-700">
                  SMS Notifications
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

