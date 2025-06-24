import React from 'react';

const DiscoverAppsModal = ({ closeModal }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-2xl text-center transform transition-all">
            <h2 className="text-2xl font-bold mb-6">Listen Anywhere</h2>
            <p className="text-gray-600 mb-8">Get Speechify on all your devices to sync your library and listen seamlessly.</p>
            <div className="flex justify-around items-center">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="text-center hover:scale-105 transition-transform">
                    <img src="src/assets/images/Apple-udash.svg" alt="iOS App" className="h-16 mx-auto mb-2"/>
                    <p className="font-semibold">iPhone & iPad</p>
                </a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="text-center hover:scale-105 transition-transform">
                    <img src="src/assets/images/android-udash.svg" alt="Android App" className="h-16 mx-auto mb-2"/>
                    <p className="font-semibold">Android</p>
                </a>
                <a href="https://chrome.google.com" target="_blank" rel="noopener noreferrer" className="text-center hover:scale-105 transition-transform">
                    <img src="src/assets/images/chrome-udash.svg" alt="Chrome Extension" className="h-16 mx-auto mb-2"/>
                    <p className="font-semibold">Chrome</p>
                </a>
                 <a href="https://microsoftedge.microsoft.com/addons" target="_blank" rel="noopener noreferrer" className="text-center hover:scale-105 transition-transform">
                    <img src="src/assets/images/edge-udash.svg" alt="Edge Add-on" className="h-16 mx-auto mb-2"/>
                    <p className="font-semibold">Edge</p>
                </a>
            </div>
             <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">&times;</button>
        </div>
    </div>
);

export default DiscoverAppsModal;