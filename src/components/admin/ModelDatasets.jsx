import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { DatasetAPI } from '../../libs/api/apiEndPoints.js';


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


const ModelDatasets = () => {
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
    // This now accepts `...args` to handle API functions that take multiple arguments
    const handleApiCall = async (apiFunction, args, successMessage, errorMessage) => {
        setIsLoading(true);
        setError(null);
        setOutputData(null);
        setShowInputModal(false); // Close input modal immediately
        setShowOutputModal(true); // Open output modal to show loading state

        try {
            const response = await apiFunction(...args); // Use spread operator for args
            
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
    const handleAddDatasetSubmit = async (formData) => {
        await handleApiCall(
            DatasetAPI.addDataset,
            [{ // Wrap payload in an array for `...args`
                datasetName: formData.datasetName,
                datasetCode: formData.datasetCode
            }],
            'Dataset added successfully!',
            'Failed to add dataset.'
        );
    };

    const handleViewDatasets = async () => {
        // No input modal needed for 'View all Datasets', so directly call API and open output modal
        setShowOutputModal(true); 
        setIsLoading(true); // Set loading true for the API call
        setError(null);
        setOutputData(null);
        
        await handleApiCall(
            DatasetAPI.viewDatasets,
            [], // No payload, pass an empty array for `...args`
            'All datasets retrieved successfully!',
            'Failed to retrieve all datasets.'
        );
    };

    const handleViewDatasetByNameSubmit = async (formData) => {
        await handleApiCall(
            DatasetAPI.viewDatasetByName,
            [formData.datasetName], // Pass name directly as an array element for `...args`
            'Dataset retrieved successfully!',
            'Failed to retrieve dataset.'
        );
    };

    const handleDeleteDatasetSubmit = async (formData) => {
        await handleApiCall(
            DatasetAPI.deleteDataset,
            [formData.datasetName], // Pass name directly as an array element for `...args`
            'Dataset deleted successfully!',
            'Failed to delete dataset.'
        );
    };

    const handleUpdateDatasetSubmit = async (formData) => {
        const updatePayload = {
            datasetName: formData.datasetName, // For identification in the body if needed by API
            ...(formData.newDatasetName && { newDatasetName: formData.newDatasetName }),
        };
        // DatasetAPI.updateDataset expects (name, body)
        await handleApiCall(
            DatasetAPI.updateDataset,
            [formData.datasetName, updatePayload], // Pass name and body as separate arguments in the array
            'Dataset updated successfully!',
            'Failed to update dataset.'
        );
    };

    const handleSubmitForCurrentAction = (formData) => {
        switch (currentAction) {
            case 'addDataset':
                handleAddDatasetSubmit(formData);
                break;
            case 'viewDatasetByName':
                handleViewDatasetByNameSubmit(formData);
                break;
            case 'deleteDataset':
                handleDeleteDatasetSubmit(formData);
                break;
            case 'updateDataset':
                handleUpdateDatasetSubmit(formData);
                break;
            // 'viewDatasets' is handled directly by its onClick, no input modal needed
            default:
                break;
        }
    };


    return (
        <div className='h-full w-full flex flex-col text-white p-4'>
            <ToastContainer />
            <h1 className='text-[2rem] font-bold text-black mb-6'>Model Datasets</h1>

            {/* Add Dataset */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('addDataset', 'Add New Dataset', [
                    { name: 'datasetName', placeholder: "Enter Dataset Name", required: true },
                    { name: 'datasetCode', placeholder: "Enter Dataset Code", required: true }
                ])}
            >
                <span className='font-bold text-2xl'>Add Dataset</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can add different TTS Datasets for Speechify
                </p>
            </div>

            {/* View all Datasets */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={handleViewDatasets} // Directly call API handler, no input modal
            >
                <span className='font-bold text-2xl'>View all Datasets</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can view all the different TTS Datasets of Speechify
                </p>
            </div>

            {/* View a Dataset */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('viewDatasetByName', 'View a Specific Dataset', [
                    { name: 'datasetName', placeholder: "Enter Dataset Name", required: true },
                ])}
            >
                <span className='font-bold text-2xl'>View a Dataset</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can view TTS Datasets for Speechify one at a time
                </p>
            </div>

            {/* Delete Dataset */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('deleteDataset', 'Delete Dataset', [
                    { name: 'datasetName', placeholder: "Enter Dataset Name to Delete", required: true },
                ])}
            >
                <span className='font-bold text-2xl'>Delete Dataset</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can delete any TTS Datasets of Speechify
                </p>
            </div>

            {/* Update Dataset */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-4 ml-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]'
                style={{ background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%)' }}
                onClick={() => handleOpenInputModal('updateDataset', 'Update Dataset', [
                    { name: 'datasetName', placeholder: "Dataset Name to Update", required: true },
                    { name: 'newDatasetName', placeholder: "New Dataset Name (Optional)", required: false },
                ])}
            >
                <span className='font-bold text-2xl'>Update Dataset</span>
                <p className='font-medium text-xl mt-2'>
                    Here you can update different TTS Datasets for Speechify
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

export default ModelDatasets;
