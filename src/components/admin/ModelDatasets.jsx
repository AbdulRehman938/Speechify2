import React from 'react';

const ModelDatasets = ({ handleOpenAction }) => {
    return (
        <div className='h-full w-full flex flex-col text-white'>
            <h1 className='text-[2rem] font-bold relative inset-y-[0rem] text-black'>Model Datasets</h1>
            {/* Add Dataset */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[5rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('addDataset', 'Add New Dataset', [
                    { name: 'datasetName', placeholder: "Enter Dataset Name" },
                ])}
            >
                <span className='font-bold text-2xl'>Add Dataset</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can add different TTS Datasets for Speechify
                </p>
            </div>
            {/* View all Datasets */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('viewDatasets', 'View All Datasets', [
                    { name: 'searchQuery', placeholder: "Search by Dataset Name (Optional)" },
                ])}
            >
                <span className='font-bold text-2xl'>View all Datasets</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can view all the different TTS Datasets of Speechify
                </p>
            </div>
            {/* View a Dataset */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('viewDatasetByName', 'View a Specific Dataset', [
                    { name: 'datasetName', placeholder: "Enter Dataset Name" },
                ])}
            >
                <span className='font-bold text-2xl'>View a Dataset</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can view TTS Datasets for Speechify at once at a time
                </p>
            </div>
            {/* Delete Dataset */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('deleteDataset', 'Delete Dataset', [
                    { name: 'datasetName', placeholder: "Enter Dataset Name to Delete" },
                ])}
            >
                <span className='font-bold text-2xl'>Delete Dataset</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can delete any TTS Datasets of Speechify
                </p>
            </div>
            {/* Update Dataset */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('updateDataset', 'Update Dataset', [
                    { name: 'datasetName', placeholder: "Dataset Name to Update" },
                    { name: 'newDatasetName', placeholder: "New Dataset Name (Optional)" },
                ])}
            >
                <span className='font-bold text-2xl'>Update Dataset</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can update different TTS Datasets for Speechify
                </p>
            </div>
        </div>
    );
};

export default ModelDatasets;