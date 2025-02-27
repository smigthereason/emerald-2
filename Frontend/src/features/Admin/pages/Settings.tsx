import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Bell, Lock, User } from 'lucide-react';

const Settings = () => {
  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: <User className="w-5 h-5" />,
      description: 'Update your personal information and profile details',
      fields: [
        { label: 'Full Name', type: 'text', value: 'John Doe'},
        { label: 'Email', type: 'email', value: 'john.doe@example.com' },
        { label: 'Phone', type: 'tel', value: '+1 (555) 123-4567' }
      ]
    },
    {
      title: 'Security Settings',
      icon: <Lock className="w-5 h-5" />,
      description: 'Manage your account security and authentication methods',
      fields: [
        { label: 'Current Password', type: 'password', value: '' },
        { label: 'New Password', type: 'password', value: '' },
        { label: 'Confirm Password', type: 'password', value: '' }
      ]
    },
    {
      title: 'Notification Settings',
      icon: <Bell className="w-5 h-5" />,
      description: 'Configure how you receive notifications and alerts',
      options: [
        { label: 'Email Notifications', checked: true },
        { label: 'Push Notifications', checked: false },
        { label: 'SMS Notifications', checked: true }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <button className="px-4 py-2 bg-[#D8798F] text-white rounded-lg hover:bg-[#c26276] transition-colors">
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-[#D8798F]/10 flex items-center justify-center">
                {section.icon}
              </div>
              <div>
                <CardTitle>{section.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">{section.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              {section.fields && (
                <div className="space-y-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        defaultValue={field.value}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#D8798F] focus:border-[#D8798F] outline-none transition-colors"
                      />
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
                        className="w-4 h-4 text-[#D8798F]  border-gray-300 rounded focus:ring-[#D8798F]"
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