
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Bell, Lock, User, ImagePlus } from "lucide-react";
import { Label } from "../components/ui/Label";

const Settings = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image (JPEG, PNG, or GIF)');
        return;
      }

      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const settingsSections = [
    {
      title: "Profile Settings",
      icon: <User className="w-5 h-5" />,
      description: "Update your personal information and profile details",
      fields: [
        {
          label: "Profile Image",
          type: "file",
          value: "",
        },
        { label: "Full Name", type: "text", value: "John Doe" },
        { label: "Email", type: "email", value: "john.doe@example.com" },
        { label: "Phone", type: "tel", value: "+1 (555) 123-4567" },
      ],
    },
    {
      title: "Security Settings",
      icon: <Lock className="w-5 h-5" />,
      description: "Manage your account security and authentication methods",
      fields: [
        {
          label: "Current Password",
          type: passwordVisibility.currentPassword ? "text" : "password",
          value: "",
          name: "currentPassword",
        },
        {
          label: "New Password",
          type: passwordVisibility.newPassword ? "text" : "password",
          value: "",
          name: "newPassword",
        },
        {
          label: "Confirm Password",
          type: passwordVisibility.confirmPassword ? "text" : "password",
          value: "",
          name: "confirmPassword",
        },
      ],
    },
    {
      title: "Notification Settings",
      icon: <Bell className="w-5 h-5" />,
      description: "Configure how you receive notifications and alerts",
      options: [
        { label: "Email Notifications", checked: false },
        { label: "Push Notifications", checked: false },
        { label: "SMS Notifications", checked: false },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <button className="px-4 py-2 bg-[#d66161] text-white rounded-lg hover:bg-[#c26276] transition-colors">
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-[#d66161]/10 flex items-center justify-center">
                {section.icon}
              </div>
              <div>
                <CardTitle>{section.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {section.description}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              {section.fields && (
                <div className="space-y-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="space-y-2 relative">
                      <Label className="text-sm font-medium text-gray-700">
                        {field.label}
                      </Label>

                      {field.type === "file" ? (
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
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            type={field.type}
                            defaultValue={field.value}
                            className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
                          />
                          {"name" in field && (
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility(
                                  field.name as keyof typeof passwordVisibility
                                )
                              }
                              className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                            >
                              {passwordVisibility[
                                field.name as keyof typeof passwordVisibility
                              ]
                                ? "Hide"
                                : "Show"}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {section.options && (
                <div className="space-y-4">
                  {section.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="w-4 h-4 bg-gray-300 border-[#d66161] rounded focus:ring-[#d66161] checked:bg-[#d66161] checked:border-[#d66161]"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;
