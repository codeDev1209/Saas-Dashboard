import { useState } from 'react'
import { Settings, Lock, Bell, CreditCard } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function SettingsPage({ toggles, onToggle, darkMode }) {
  const { addToast } = useApp()
  const [activeSection, setActiveSection] = useState('general')
  const [generalSettings, setGeneralSettings] = useState({
    name: 'Bugbie',
    email: 'bugbie@demo.com',
    company: 'Tech Corp',
    timezone: 'UTC+5:30 (India)'
  })

  const sections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ]

  const handleSaveGeneral = () => {
    addToast('General settings saved successfully!', 'success')
  }

  const handleSaveSecurity = () => {
    addToast('Security settings updated!', 'success')
  }

  const handleSaveNotifications = () => {
    addToast('Notification preferences saved!', 'success')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 p-4 h-fit">
        {sections.map(section => (
          <div
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 font-medium ${
              activeSection === section.id 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <section.icon size={18} />
            {section.label}
          </div>
        ))}
      </div>

      <div className="lg:col-span-3 bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700">
        {activeSection === 'general' && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">General Settings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage your general account settings</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={generalSettings.name}
                  onChange={(e) => setGeneralSettings({...generalSettings, name: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={generalSettings.email}
                  onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                <input 
                  type="text" 
                  value={generalSettings.company}
                  onChange={(e) => setGeneralSettings({...generalSettings, company: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                <select 
                  value={generalSettings.timezone}
                  onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                >
                  <option>UTC+5:30 (India)</option>
                  <option>UTC+0 (London)</option>
                  <option>UTC-5 (New York)</option>
                </select>
              </div>
            </div>
            
            <button onClick={handleSaveGeneral} className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all">Save Changes</button>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Security Settings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage your security preferences</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <button 
                  onClick={() => onToggle('twoFactor')}
                  className={`w-12 h-6.5 rounded-full relative transition-all duration-300 ${toggles.twoFactor ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 shadow-md ${toggles.twoFactor ? 'left-6' : 'left-0.5'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Login Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified of new login attempts</p>
                </div>
                <button 
                  onClick={() => onToggle('loginNotifications')}
                  className={`w-12 h-6.5 rounded-full relative transition-all duration-300 ${toggles.loginNotifications ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 shadow-md ${toggles.loginNotifications ? 'left-6' : 'left-0.5'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Session Timeout</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatically log out after 30 minutes of inactivity</p>
                </div>
                <button 
                  onClick={() => onToggle('sessionTimeout')}
                  className={`w-12 h-6.5 rounded-full relative transition-all duration-300 ${toggles.sessionTimeout ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 shadow-md ${toggles.sessionTimeout ? 'left-6' : 'left-0.5'}`}></div>
                </button>
              </div>
            </div>
            
            <button onClick={handleSaveSecurity} className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl mt-6 hover:shadow-lg hover:shadow-purple-500/30 transition-all">Update Security</button>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Notification Preferences</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Control how you receive notifications</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about your account</p>
                </div>
                <button 
                  onClick={() => onToggle('emailNotifications')}
                  className={`w-12 h-6.5 rounded-full relative transition-all duration-300 ${toggles.emailNotifications ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 shadow-md ${toggles.emailNotifications ? 'left-6' : 'left-0.5'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications on your device</p>
                </div>
                <button 
                  onClick={() => onToggle('pushNotifications')}
                  className={`w-12 h-6.5 rounded-full relative transition-all duration-300 ${toggles.pushNotifications ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 shadow-md ${toggles.pushNotifications ? 'left-6' : 'left-0.5'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Weekly Reports</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get weekly summary of your activity</p>
                </div>
                <button 
                  onClick={() => onToggle('weeklyReports')}
                  className={`w-12 h-6.5 rounded-full relative transition-all duration-300 ${toggles.weeklyReports ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 shadow-md ${toggles.weeklyReports ? 'left-6' : 'left-0.5'}`}></div>
                </button>
              </div>
            </div>
            
            <button onClick={handleSaveNotifications} className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl mt-6 hover:shadow-lg hover:shadow-purple-500/30 transition-all">Save Preferences</button>
          </div>
        )}

        {activeSection === 'billing' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Billing & Plans</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage your subscription and billing information</p>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">Current Plan</p>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">Pro Analytics</h4>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full text-sm font-medium">Active</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">$49/month • Renews on Feb 15, 2024</p>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">Upgrade Plan</button>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h4>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">Edit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
