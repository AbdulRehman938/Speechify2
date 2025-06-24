import React from 'react';

const InviteFriendsModal = ({ closeModal }) => {
    const referralLink = "https://speechify.com/referral?code=FRIEND123";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        alert("Referral link copied to clipboard!");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg text-center transform transition-all">
                <h2 className="text-2xl font-bold mb-4">Give $60, Get $60</h2>
                <p className="mb-6 text-gray-600">Share your referral link with friends. When they sign up for Premium, you both get a $60 credit!</p>
                <div className="flex items-center">
                    <input type="text" readOnly value={referralLink} className="w-full p-3 border-gray-300 border rounded-l-lg bg-gray-100" />
                    <button onClick={copyToClipboard} className="px-6 py-3 bg-blue-600 text-white rounded-r-lg font-semibold hover:bg-blue-700">Copy</button>
                </div>
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">&times;</button>
            </div>
        </div>
    );
};

export default InviteFriendsModal;