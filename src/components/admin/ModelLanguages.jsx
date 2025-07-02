import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { LanguageAPI } from '../../libs/api/apiEndPoints.js';


// A simple Modal component for input
const InputModal = ({ title, fields, isOpen, onClose, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-black">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <div key={index} className="mb-4">
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                                {field.placeholder}
                            </label>
                            <input
                                type={field.type || 'text'}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required={field.required !== false}
                            />
                        </div>
                    ))}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// New Modal component for displaying API output
const OutputModal = ({ isOpen, onClose, data, error, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-black">
                <h2 className="text-2xl font-bold mb-4">API Response</h2>
                <div className="bg-gray-800 text-white p-4 rounded-lg overflow-auto max-h-80 mb-4">
                    {isLoading && <p className="text-yellow-400">Loading...</p>}
                    {error && <p className="text-red-400">Error: {error}</p>}
                    {data && (
                        <pre className="whitespace-pre-wrap break-words text-sm">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    )}
                    {!isLoading && !error && !data && (
                        <p className="text-gray-400">No output yet.</p>
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const ModelLanguages = () => {
    const [showInputModal, setShowInputModal] = useState(false);
    const [showOutputModal, setShowOutputModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalFields, setModalFields] = useState([]);
    const [currentAction, setCurrentAction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [outputData, setOutputData] = useState(null);
    const [error, setError] = useState(null);

    const notifySuccess = (message) => toast.success(message, { position: 'top-right', autoClose: 2000, theme: 'colored' });
    const notifyError = (message) => toast.error(message, { position: 'top-right', autoClose: 2000, theme: 'colored' });

    const handleOpenInputModal = (action, title, fields) => {
        setCurrentAction(action);
        setModalTitle(title);
        setModalFields(fields);
        setShowInputModal(true);
        // Clear previous output/error when opening a new input modal
        setOutputData(null);
        setError(null);
    };

    const handleCloseInputModal = () => {
        setShowInputModal(false);
        setCurrentAction(null);
        setModalTitle('');
        setModalFields([]);
    };

    const handleCloseOutputModal = () => {
        setShowOutputModal(false);
        setOutputData(null);
        setError(null);
    };

    // Generic handler for API calls
    const handleApiCall = async (apiFunction, payload, successMessage, errorMessage) => {
        setIsLoading(true);
        setError(null);
        setOutputData(null);
        setShowInputModal(false); // Close input modal immediately
        setShowOutputModal(true); // Open output modal to show loading state

        try {
            const response = await apiFunction(payload);
            
            if (response.status >= 200 && response.status < 300) {
                setOutputData(response.data);
                notifySuccess(successMessage || 'Operation successful!');
            } else {
                const msg = response.data?.message || response.statusMessage || errorMessage || 'An unexpected error occurred.';
                setError(msg);
                notifyError(msg);
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || errorMessage || 'An API error occurred.';
            setError(msg);
            notifyError(msg);
        } finally {
            setIsLoading(false);
            // Output modal remains open to show results until explicitly closed by user
        }
    };

    // Specific handlers for each action
    const handleAddLanguageSubmit = async (formData) => {
        await handleApiCall(
            LanguageAPI.addLanguage,
            {
                languageName: formData.languageName,
                languageCode: formData.languageCode
            },
            'Language added successfully!',
            'Failed to add language.'
        );
    };

    const handleGetAllLanguages = async (formData) => {
        // The API endpoint `getAllLanguages` doesn't take a parameter.
        // If 'searchQuery' was for client-side filtering or a different endpoint,
        // you'll need to handle that logic here or define a new API endpoint.
        // For now, it will simply call getAllLanguages.
        
        // Open output modal to show loading state immediately
        setShowOutputModal(true); 
        setIsLoading(true); // Set loading true for the API call
        setError(null);
        setOutputData(null);
        
        await handleApiCall(
            LanguageAPI.getAllLanguages,
            undefined, // No payload
            'All languages retrieved successfully!',
            'Failed to retrieve all languages.'
        );
    };

    const handleGetLanguageByNameSubmit = async (formData) => {
        await handleApiCall(
            LanguageAPI.getLanguageByName,
            formData.languageName, // getLanguageByName expects name directly
            'Language retrieved successfully!',
            'Failed to retrieve language.'
        );
    };

    const handleDeleteLanguageSubmit = async (formData) => {
        await handleApiCall(
            LanguageAPI.deleteLanguage,
            formData.languageName, // deleteLanguage expects name directly
            'Language deleted successfully!',
            'Failed to delete language.'
        );
    };

    const handleUpdateLanguageSubmit = async (formData) => {
        const updatePayload = {
            languageName: formData.languageName, // Required for identification
            ...(formData.newLanguageName && { newLanguageName: formData.newLanguageName }), // Only include if provided
        };
        await handleApiCall(
            LanguageAPI.updateLanguage,
            updatePayload,
            'Language updated successfully!',
            'Failed to update language.'
        );
    };

    const handleSubmitForCurrentAction = (formData) => {
        switch (currentAction) {
            case 'addLanguage':
                handleAddLanguageSubmit(formData);
                break;
            case 'getLanguageByName':
                handleGetLanguageByNameSubmit(formData);
                break;
            case 'deleteLanguage':
                handleDeleteLanguageSubmit(formData);
                break;
            case 'updateLanguage':
                handleUpdateLanguageSubmit(formData);
                break;
            // 'getAllLanguages' is handled directly by its onClick, no input modal needed
            default:
                break;
        }
    };


    return (
        <div className='h-full w-full flex flex-col text-white p-4'> {/* Added p-4 for consistent padding */}
            <ToastContainer />
            <h1 className='text-[2rem] font-bold text-black mb-6'>Model Languages</h1> {/* Adjusted margin for consistency */}

            {/* Add Language */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('addLanguage', 'Add New Language', [
                    { name: 'languageName', placeholder: "Enter Language Name", required: true },
                    { name: 'languageCode', placeholder: "Enter Language Code", required: true }
                ])}
            >
                <span className='font-bold text-2xl'>Add Language</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can add different TTS Languages for Speechify
                </p>
            </div>

            {/* View all Languages */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={handleGetAllLanguages} // Directly call API handler, no input modal
            >
                <span className='font-bold text-2xl'>View all Languages</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can view all the different TTS Languages of Speechify
                </p>
            </div>

            {/* View a Language */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('getLanguageByName', 'View a Specific Language', [
                    { name: 'languageName', placeholder: "Enter Language Name", required: true },
                ])}
            >
                <span className='font-bold text-2xl'>View a Language</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can view TTS Languages for Speechify one at a time
                </p>
            </div>

            {/* Delete Language */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('deleteLanguage', 'Delete Language', [
                    { name: 'languageName', placeholder: "Enter Language Name to Delete", required: true },
                ])}
            >
                <span className='font-bold text-2xl'>Delete Language</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can delete any TTS Languages of Speechify
                </p>
            </div>

            {/* Update Language */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('updateLanguage', 'Update Language', [
                    { name: 'languageName', placeholder: "Language Name to Update", required: true },
                    { name: 'newLanguageName', placeholder: "New Language Name (Optional)", required: false },
                ])}
            >
                <span className='font-bold text-2xl'>Update Language</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can update different TTS Languages for Speechify
                </p>
            </div>

            {/* Input Modal */}
            <InputModal
                isOpen={showInputModal}
                onClose={handleCloseInputModal}
                title={modalTitle}
                fields={modalFields}
                onSubmit={handleSubmitForCurrentAction}
                isLoading={isLoading}
            />

            {/* Output Modal */}
            <OutputModal
                isOpen={showOutputModal}
                onClose={handleCloseOutputModal}
                data={outputData}
                error={error}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ModelLanguages;
