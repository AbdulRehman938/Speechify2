import React from 'react';

const SpeechifyModels = ({ handleOpenAction }) => {
    return (
        <div className='h-full w-full flex flex-col text-white'>
            <h1 className='text-[2rem] font-bold relative inset-y-[0rem] text-black'>Speechify-Models</h1>
            {/* Add Model */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[5rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('addModel', 'Add New Model', [
                    { name: 'modelType', placeholder: "Model Type" },
                    { name: 'modelName', placeholder: "Model Name" },
                    { name: 'displayName', placeholder: "Display Name" },
                ])}
            >
                <span className='font-bold text-2xl'>Add Model</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can add different TTS Models for Speechify
                </p>
            </div>
            {/* View all Models */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('getAllModels', 'View All Models', [
                    { name: 'searchQuery', placeholder: "Search by Model Name (Optional)" },
                ])}
            >
                <span className='font-bold text-2xl'>View all Models</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can view all the different TTS Models of Speechify
                </p>
            </div>
            {/* View a Model */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('getModel', 'View a Specific Model', [
                    { name: 'modelName', placeholder: "Enter Model Name" },
                ])}
            >
                <span className='font-bold text-2xl'>View a Model</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can view TTS Models for Speechify at once at a time
                </p>
            </div>
            {/* Delete Model */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('deleteModel', 'Delete Model', [
                    { name: 'modelName', placeholder: "Enter Model Name to Delete" },
                ])}
            >
                <span className='font-bold text-2xl'>Delete Model</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can delete any TTS Models of Speechify
                </p>
            </div>
            {/* Update Model */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('updateModel', 'Update Model', [
                    { name: 'modelName', placeholder: "Model Name to Update" },
                    { name: 'newModelName', placeholder: "New Model Name (Optional)" },
                    { name: 'newDisplayName', placeholder: "New Display Name (Optional)" },
                ])}
            >
                <span className='font-bold text-2xl'>Update Model</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can update different TTS Models for Speechify
                </p>
            </div>
        </div>
    );
};

export default SpeechifyModels;