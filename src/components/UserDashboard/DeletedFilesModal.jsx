import React from 'react';

const DeletedFilesModal = ({ closeModal }) => {
    const deletedFiles = [
        { id: 1, name: "Meeting Notes - Q2 Strategy.pdf" },
        { id: 2, name: "Research Paper on AI.docx" },
        { id: 3, name: "Project Proposal Draft.pdf" },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-xl transform transition-all">
                <h2 className="text-2xl font-bold mb-6">Deleted Files</h2>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                    {deletedFiles.length > 0 ? (
                        deletedFiles.map(file => (
                            <div key={file.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                                <span className="text-gray-800">{file.name}</span>
                                <button className="text-sm font-semibold text-blue-600 hover:underline">Restore</button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No deleted files.</p>
                    )}
                </div>
                <button onClick={closeModal} className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Close</button>
            </div>
        </div>
    );
};

export default DeletedFilesModal;