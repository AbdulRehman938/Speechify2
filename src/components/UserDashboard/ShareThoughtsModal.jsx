import React from 'react';

const ShareThoughtsModal = ({ closeModal }) => {
    const handleSubmit = () => {
        alert("Thank you for your feedback!");
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg transform transition-all">
                <h2 className="text-2xl font-bold mb-4">Share Your Thoughts</h2>
                <p className="text-gray-600 mb-6">Have an idea for a new feature or an improvement? We'd love to hear it!</p>
                <textarea
                    className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type your feedback here..."
                ></textarea>
                <button onClick={handleSubmit} className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Submit Feedback</button>
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">&times;</button>
            </div>
        </div>
    );
};

export default ShareThoughtsModal;