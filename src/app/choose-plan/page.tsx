'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

export default function ChoosePlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

  return (
    <div className="plan">
      <div className="plan__header-wrapper">
        <div className="plan__header">
          <div className="plan__title">
            Get unlimited access to many amazing books to read
          </div>
          <div className="plan__subtitle">
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className="plan__img--mask">
            <img src="/assets/pricing-top.png" alt="pricing" />
          </figure>
        </div>
      </div>

      <div className="plan__container">
        {/* Features */}
        <div className="plan__features">
          <div className="plan__feature">
            <AiOutlineCheck className="plan__feature--icon" />
            <span>Key ideas in few minutes with many books to read</span>
          </div>
          <div className="plan__feature">
            <AiOutlineCheck className="plan__feature--icon" />
            <span>3 million people growing with Summarist everyday</span>
          </div>
          <div className="plan__feature">
            <AiOutlineCheck className="plan__feature--icon" />
            <span>Precise recommendations collections curated by experts</span>
          </div>
        </div>

        {/* Plans */}
        <div className="plan__cards">
          {/* Yearly Plan */}
          <div
            className={`plan__card ${selectedPlan === 'yearly' ? 'plan__card--active' : ''}`}
            onClick={() => setSelectedPlan('yearly')}
          >
            <div className="plan__card-top">
              <div className="plan__card-indicator">
                <div className={`plan__card-dot ${selectedPlan === 'yearly' ? 'plan__card-dot--active' : ''}`} />
              </div>
              <div className="plan__card-content">
                <div className="plan__card-title">Premium Plus Yearly</div>
                <div className="plan__card-price">$99.99/year</div>
              </div>
            </div>
            <div className="plan__card-trial">
              7-day free trial included
            </div>
          </div>

          <div className="plan__or">or</div>

          {/* Monthly Plan */}
          <div
            className={`plan__card ${selectedPlan === 'monthly' ? 'plan__card--active' : ''}`}
            onClick={() => setSelectedPlan('monthly')}
          >
            <div className="plan__card-top">
              <div className="plan__card-indicator">
                <div className={`plan__card-dot ${selectedPlan === 'monthly' ? 'plan__card-dot--active' : ''}`} />
              </div>
              <div className="plan__card-content">
                <div className="plan__card-title">Premium Monthly</div>
                <div className="plan__card-price">$9.99/month</div>
              </div>
            </div>
            <div className="plan__card-trial">
              No trial included
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="plan__cta">
          <button className="btn plan__btn">
            {selectedPlan === 'yearly' ? 'Start your free 7-day trial' : 'Get started'}
          </button>
          <div className="plan__disclaimer">
            {selectedPlan === 'yearly'
              ? 'Cancel your trial at any time before it ends, and you won\'t be charged.'
              : 'By continuing, you agree to the Terms & Conditions and Privacy Policy.'}
          </div>
        </div>
      </div>
    </div>
  );
}