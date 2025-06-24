import React, { useState } from 'react';

const SubscriptionModal = ({ closeModal }) => {
    const [billingCycle, setBillingCycle] = useState('yearly');

    const plans = {
        free: { name: "Free", price: "$0", features: ["10 standard voices", "Listen at 1x speed", "Sync across devices", "Basic support"] },
        premium: {
            name: "Premium",
            monthlyPrice: "$19/mo",
            yearlyPrice: "$139/yr",
            features: ["All Free features, plus:", "200+ high-quality AI voices", "Listen at up to 5x speed", "Download files for offline listening", "Priority support"]
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl transform transition-all">
                <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
                <p className="text-center text-gray-600 mb-6">Unlock powerful features with Premium.</p>
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-200 rounded-full p-1 flex">
                        <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2 rounded-full text-sm font-semibold ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-gray-700'}`}>Monthly</button>
                        <button onClick={() => setBillingCycle('yearly')} className={`px-6 py-2 rounded-full text-sm font-semibold ${billingCycle === 'yearly' ? 'bg-blue-600 text-white shadow' : 'text-gray-700'}`}>Yearly (Save 40%)</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Free Plan */}
                    <div className="border p-6 rounded-lg bg-gray-50">
                        <h3 className="text-xl font-bold text-gray-800">{plans.free.name}</h3>
                        <p className="text-4xl font-bold my-4">{plans.free.price}</p>
                        <button className="w-full mt-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold">Your Current Plan</button>
                        <ul className="space-y-2 mt-6 text-gray-600">
                            {plans.free.features.map(f => <li key={f}>✓ {f}</li>)}
                        </ul>
                    </div>

                    {/* Premium Plan */}
                    <div className="border-2 border-blue-600 p-6 rounded-lg relative">
                         <span className="absolute top-0 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 text-sm rounded-full font-semibold">Most Popular</span>
                        <h3 className="text-xl font-bold text-blue-600">{plans.premium.name}</h3>
                        <p className="text-4xl font-bold my-4">{billingCycle === 'monthly' ? plans.premium.monthlyPrice : plans.premium.yearlyPrice}</p>
                         <button className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Upgrade to Premium</button>
                        <ul className="space-y-2 mt-6 text-gray-600">
                           {plans.premium.features.map(f => <li key={f}>✓ {f}</li>)}
                        </ul>
                    </div>
                </div>
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">&times;</button>
            </div>
        </div>
    );
};

export default SubscriptionModal;