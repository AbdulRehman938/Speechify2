import React from 'react';

const StatisticsModal = ({ closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg transform transition-all">
                <h2 className="text-2xl font-bold mb-6">Your Listening Statistics</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <span className="font-semibold text-gray-700">Listening Time (This Week)</span>
                        <span className="font-bold text-lg text-blue-600">182 minutes</span>
                    </div>
                     <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <span className="font-semibold text-gray-700">Listening Time (All Time)</span>
                        <span className="font-bold text-lg text-blue-600">12,450 minutes</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <span className="font-semibold text-gray-700">Current Listening Streak</span>
                        <span className="font-bold text-lg text-blue-600">14 days</span>
                    </div>
                     <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                        <span className="font-semibold text-gray-700">Average Listening Speed</span>
                        <span className="font-bold text-lg text-blue-600">2.5x</span>
                    </div>
                </div>
                <button onClick={closeModal} className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Close</button>
            </div>
        </div>
    );
};

export default StatisticsModal;