import React, { useState } from 'react';

const DailyGoalModal = ({ closeModal }) => {
    const [goal, setGoal] = useState(30); // Default 30 minutes

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md text-center transform transition-all">
                <h2 className="text-2xl font-bold mb-4">Set Your Daily Listening Goal</h2>
                <p className="text-5xl font-bold my-6 text-blue-600">{goal} <span className="text-2xl text-gray-600">minutes</span></p>
                <input
                    type="range"
                    min="10"
                    max="180"
                    step="5"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 px-1 mt-2">
                    <span>10 min</span>
                    <span>180 min</span>
                </div>
                <button onClick={closeModal} className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Set Goal</button>
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">&times;</button>
            </div>
        </div>
    );
};

export default DailyGoalModal;