import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ModelAPI } from '../../libs/api/apiEndPoints.js'; 

// A simple Modal component for input (you might have a more sophisticated one)
const InputModal = ({ title, fields, isOpen, onClose, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({}); // Initialize formData state

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


const SpeechifyModels = () => {
    const [showInputModal, setShowInputModal] = useState(false); 
    const [showOutputModal, setShowOutputModal] = useState(false); // New state for output modal
    const [modalTitle, setModalTitle] = useState('');
    const [modalFields, setModalFields] = useState([]);
    const [currentAction, setCurrentAction] = useState(null); // Stores which API action to perform
    const [isLoading, setIsLoading] = useState(false);
    const [outputData, setOutputData] = useState(null);
    const [error, setError] = useState(null);

    const notifySuccess = (message) => toast.success(message, { position: 'top-right', autoClose: 2000, theme: 'colored' });
    const notifyError = (message) => toast.error(message, { position: 'top-right', autoClose: 2000, theme: 'colored' });

    const handleOpenInputModal = (action, title, fields) => {
        setCurrentAction(action);
        setModalTitle(title);
        setModalFields(fields);
        setShowInputModal(true); // Open input modal
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
        setOutputData(null); // Clear data when closing output modal
        setError(null); // Clear error when closing output modal
    };

    // Generic handler for API calls
    const handleApiCall = async (apiFunction, payload, successMessage, errorMessage) => {
        setIsLoading(true);
        setError(null); // Clear error before new call
        setOutputData(null); // Clear output data before new call
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
    const handleAddOrUpdateModelSubmit = async (formData) => {
        if (currentAction === 'addModel') {
            await handleApiCall(
                ModelAPI.addModel,
                {
                    modelType: formData.modelType,
                    modelName: formData.modelName,
                    displayName: formData.displayName,
                    isMultiSpeaker: formData.isMultiSpeaker === 'true' // Convert string to boolean
                },
                'Model added successfully!',
                'Failed to add model.'
            );
        } else if (currentAction === 'updateModel') {
            const updatePayload = {
                modelName: formData.modelName,
                ...(formData.newModelName && { newModelName: formData.newModelName }),
                ...(formData.newDisplayName && { newDisplayName: formData.newDisplayName }),
                ...(formData.isMultiSpeaker !== undefined && { isMultiSpeaker: formData.isMultiSpeaker === 'true' }),
            };
            await handleApiCall(
                ModelAPI.updateModel,
                updatePayload,
                'Model updated successfully!',
                'Failed to update model.'
            );
        }
    };

    const handleGetModelSubmit = async (formData) => {
        await handleApiCall(
            ModelAPI.getModel,
            formData.modelName,
            'Model retrieved successfully!',
            'Failed to retrieve model.'
        );
    };

    const handleDeleteModelSubmit = async (formData) => {
        await handleApiCall(
            ModelAPI.deleteModel,
            formData.modelName,
            'Model deleted successfully!',
            'Failed to delete model.'
        );
    };

    const handleGetAllModels = async () => {
        // No input modal needed for 'Get All Models', so directly call API and open output modal
        setShowOutputModal(true); // Open output modal to show loading state
        setIsLoading(true);
        setError(null);
        setOutputData(null);
        await handleApiCall(
            ModelAPI.getAllModels,
            undefined,
            'All models retrieved successfully!',
            'Failed to retrieve all models.'
        );
    };


    return (
        <div className='h-full w-full flex flex-col text-white p-4'>
            <ToastContainer />
            <h1 className='text-[2rem] font-bold text-black mb-6'>Speechify-Models</h1>

            {/* Add Model */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('addModel', 'Add New Model', [
                    { name: 'modelType', placeholder: "Model Type", required: true },
                    { name: 'modelName', placeholder: "Model Name", required: true },
                    { name: 'displayName', placeholder: "Display Name", required: true },
                    { name: 'isMultiSpeaker', placeholder: "Multi-Speaker (true or false)", required: true, type: 'text' },
                ])}
            >
                <span className='font-bold text-2xl'>Add Model</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can add different TTS Models for Speechify
                </p>
            </div>

            {/* View all Models */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={handleGetAllModels}
            >
                <span className='font-bold text-2xl'>View all Models</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can view all the different TTS Models of Speechify
                </p>
            </div>

            {/* View a Model */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('getModel', 'View a Specific Model', [
                    { name: 'modelName', placeholder: "Enter Model Name", required: true },
                ])}
            >
                <span className='font-bold text-2xl'>View a Model</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can view TTS Models for Speechify one at a time
                </p>
            </div>

            {/* Delete Model */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('deleteModel', 'Delete Model', [
                    { name: 'modelName', placeholder: "Enter Model Name to Delete", required: true },
                ])}
            >
                <span className='font-bold text-2xl'>Delete Model</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can delete any TTS Models of Speechify
                </p>
            </div>

            {/* Update Model */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('updateModel', 'Update Model', [
                    { name: 'modelName', placeholder: "Model Name to Update", required: true },
                    { name: 'newModelName', placeholder: "New Model Name (Optional)", required: false },
                    { name: 'newDisplayName', placeholder: "New Display Name (Optional)", required: false },
                    { name: 'isMultiSpeaker', placeholder: "Multi-Speaker (true or false, Optional)", required: false, type: 'text' },
                ])}
            >
                <span className='font-bold text-2xl'>Update Model</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can update different TTS Models for Speechify
                </p>
            </div>

            {/* Input Modal */}
            <InputModal
                isOpen={showInputModal}
                onClose={handleCloseInputModal}
                title={modalTitle}
                fields={modalFields}
                onSubmit={(formData) => {
                    if (currentAction === 'addModel' || currentAction === 'updateModel') {
                        handleAddOrUpdateModelSubmit(formData);
                    } else if (currentAction === 'getModel') {
                        handleGetModelSubmit(formData);
                    } else if (currentAction === 'deleteModel') {
                        handleDeleteModelSubmit(formData);
                    }
                }}
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

export default SpeechifyModels;
