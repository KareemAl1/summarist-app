'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { AiOutlineUser, AiOutlineCreditCard } from 'react-icons/ai';
import PageHeader from '@/components/PageHeader';

export default function SettingsPage() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

 if (loading) {
  return (
    <>
      <Sidebar />
      <PageHeader />
      <div className="settings page-with-sidebar page-content">
        <div className="settings__container">
          <div>Loading...</div>
        </div>
      </div>
    </>
  );
}

if (!user) {
  return (
    <>
      <Sidebar />
      <PageHeader />
      <div className="settings page-with-sidebar page-content">
        <div className="settings__container">
          <div className="settings__login-required">
              <img src="/assets/login.png" alt="login" />
              <h2>Log in to your account to see your details.</h2>
              <button className="btn" onClick={() => router.push('/')}>
                Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

return (
  <>
    <Sidebar />
    <PageHeader />
    <div className="settings page-with-sidebar page-content">
      <div className="settings__container">
          <h1 className="settings__title">Settings</h1>

          {/* Subscription Section */}
          <div className="settings__section">
            <div className="settings__section-header">
              <AiOutlineCreditCard size={24} />
              <h2>Your Subscription plan</h2>
            </div>
            <div className="settings__plan">
              <div className="settings__plan-name">Basic</div>
              <button 
                className="btn settings__upgrade-btn"
                onClick={() => router.push('/choose-plan')}
              >
                Upgrade to Premium
              </button>
            </div>
          </div>

          {/* Email Section */}
          <div className="settings__section">
            <div className="settings__section-header">
              <AiOutlineUser size={24} />
              <h2>Email</h2>
            </div>
            <div className="settings__email">
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}