import React from 'react';

const ModelLanguages = ({ handleOpenAction }) => {
    return (
        <div className='h-full w-full flex flex-col text-white'>
            <h1 className='text-[2rem] font-bold relative inset-y-[0rem] text-black'>Model Languages</h1>
            {/* Add Language */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[5rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('addLanguage', 'Add New Language', [
                    { name: 'languageName', placeholder: "Enter Language Name" },
                    { name: 'languageCode', placeholder: "Enter Language code" }
                ])}
            >
                <span className='font-bold text-2xl'>Add Language</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can add different TTS Languages for Speechify
                </p>
            </div>
            {/* View all Languages */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('getAllLanguages', 'View All Languages', [
                    { name: 'searchQuery', placeholder: "Search by Language Name (Optional)" },
                ])}
            >
                <span className='font-bold text-2xl'>View all Languages</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can view all the different TTS Languages of Speechify
                </p>
            </div>
            {/* View a Language */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('getLanguageByName', 'View a Specific Language', [
                    { name: 'languageName', placeholder: "Enter Language Name" },
                ])}
            >
                <span className='font-bold text-2xl'>View a Language</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can view TTS Languages for Speechify at once at a time
                </p>
            </div>
            {/* Delete Language */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('deleteLanguage', 'Delete Language', [
                    { name: 'languageName', placeholder: "Enter Language Name to Delete" },
                ])}
            >
                <span className='font-bold text-2xl'>Delete Language</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can delete any TTS Languages of Speechify
                </p>
            </div>
            {/* Update Language */}
            <div
                className='w-[90%] h-auto bg-gray-200 mt-[2rem] ml-[4rem] justify-center align-left text-left pt-[1rem] pl-[2rem] pb-[1rem] rounded-[2rem] cursor-pointer transition transition-all transition-[1s]-ease hover:scale-[105%]'
                style={{
                    background: 'radial-gradient(circle at left, #2f45fa 0%, #3bbefa 100%'
                }}
                onClick={() => handleOpenAction('updateLanguage', 'Update Language', [
                    { name: 'languageName', placeholder: "Language Name to Update" },
                    { name: 'newLanguageName', placeholder: "New Language Name (Optional)" },
                ])}
            >
                <span className='font-bold text-2xl'>Update Language</span>
                <p className='font-medium text-xl relative inset-y-[0.5rem]'>
                    Here you can update different TTS Languages for Speechify
                </p>
            </div>
        </div>
    );
};

export default ModelLanguages;