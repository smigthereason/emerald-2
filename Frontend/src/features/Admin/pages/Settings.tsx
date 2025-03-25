// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/Card";
// import { Bell, Lock, User } from "lucide-react";

// const Settings = () => {
//   const settingsSections = [
//     {
//       title: "Profile Settings",
//       icon: <User className="w-5 h-5" />,
//       description: "Update your personal information and profile details",
//       fields: [
//         { label: "Full Name", type: "text", value: "John Doe" },
//         { label: "Email", type: "email", value: "john.doe@example.com" },
//         { label: "Phone", type: "tel", value: "+1 (555) 123-4567" },
//       ],
//     },
//     {
//       title: "Security Settings",
//       icon: <Lock className="w-5 h-5" />,
//       description: "Manage your account security and authentication methods",
//       fields: [
//         { label: "Current Password", type: "password", value: "" },
//         { label: "New Password", type: "password", value: "" },
//         { label: "Confirm Password", type: "password", value: "" },
//       ],
//     },
//     {
//       title: "Notification Settings",
//       icon: <Bell className="w-5 h-5" />,
//       description: "Configure how you receive notifications and alerts",
//       options: [
//         { label: "Email Notifications", checked: true },
//         { label: "Push Notifications", checked: false },
//         { label: "SMS Notifications", checked: true },
//       ],
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
//         <button className="px-4 py-2 bg-[#d66161] text-white rounded-lg hover:bg-[#c26276] transition-colors">
//           Save Changes
//         </button>
//       </div>

//       <div className="space-y-6">
//         {settingsSections.map((section, index) => (
//           <Card key={index}>
//             <CardHeader className="flex flex-row items-center space-x-4">
//               <div className="w-8 h-8 rounded-lg bg-[#d66161] flex items-center justify-center">
//                 {section.icon}
//               </div>
//               <div>
//                 <CardTitle>{section.title}</CardTitle>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {section.description}
//                 </p>
//               </div>
//             </CardHeader>
//             <CardContent>
//               {section.fields && (
//                 <div className="space-y-4">
//                   {section.fields.map((field, fieldIndex) => (
//                     <div key={fieldIndex} className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         {field.label}
//                       </label>
//                       <input
//                         type={field.type}
//                         defaultValue={field.value}
//                         className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {section.options && (
//                 <div className="space-y-4">
//                   {section.options.map((option, optionIndex) => (
//                     <div key={optionIndex} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         defaultChecked={option.checked}
//                         className="w-4 h-4 text-[#d66161] border-gray-300 rounded focus:ring-[#d66161]"
//                       />
//                       <label className="ml-2 text-sm text-gray-700">
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Settings;

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Bell, Lock, User } from "lucide-react";

const Settings = () => {
  // State for tracking password visibility
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Function to toggle password visibility
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
                      <label className="text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          defaultValue={field.value}
                          className="w-full px-3 py-2 border bg-gray-300/50 text-gray-900 rounded-lg focus:ring-2 focus:ring-[#d66161] focus:border-[#d66161] outline-none transition-colors"
                        />
                        {/* Toggle Password Button */}
                        {"name" in field && (
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(field.name as keyof typeof passwordVisibility)}
                            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                          >
                            {passwordVisibility[field.name as keyof typeof passwordVisibility] ? "Hide" : "Show"}
                          </button>
                        )}
                      </div>
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
