import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqItems = [
    {
        question: 'What is text to speech (TTS)?',
        answer: 'Text to speech, sometimes called TTS, read aloud, or speech synthesis, is the term for using AI voices to turn any input text into speech.',
        button: 'Try Speechify For Free',
    },
    {
        question: 'What is an AI Voice?',
        answer: 'An AI voice refers to the synthesized or generated speech produced by artificial intelligence systems, enabling machines to communicate with human-like speech.',
        button: 'Try Speechify For Free',
    },
    {
        question: 'How can I use Speechify?',
        answer: 'Speechify is available via its iOS or Android mobile apps, its web app on Windows or Mac, or its extensions for Chrome and Microsoft Edge.',
        button: 'Try Speechify For Free',
    },
    {
        question: 'Who is text to speech software for?',
        answer: 'Speechify is for everyone, including seniors, students, professionals, and anyone who benefits from listening to written content.',
        button: 'Try Speechify For Free',
    },
    {
        question: 'Do Speechify voices sounds neutral?',
        answer: 'Yes. Speechify’s text to speech has the most natural, human-sounding voice overs available on the market. The voices are now indistinguishable from human voices and available in several different languages including Spanish, Portuguese, German, French, and more.',
        button: 'Try Speechify For Free',
    },
    {
        question: 'What is Voice Cloning? Does Speechify have it?',
        answer: 'Voice cloning allows you to upload or record a few seconds of any speaker, with the speaker’s permission, and generate a clone of the voice. This allows you to listen to any email, PDF, or website in the new cloned voice.',
        button: 'Try Speechify For Free',
    },
    {
        question: 'Does Speecify have an AI voice API or TTS API?',
        answer: 'Yes, we do! Please create an account to get started. You can also review our extensive documentation. This is the same API that currently powers all of our products, providing the highest quality AI speech on the market to tens of millions of users. This API includes instant voice cloning, language support, streaming, SSML and emotional controllability, speech marks, and much more.',
        button: 'Try Speechify For Free',
    },
    {
        question: 'Are there special plans available for Schools or Teams?',
        answer: 'Yes! If you would like to purchase text to speech plans in bulk, please contact our sales team for schools or teams. We work with large school districts and governments around the world to provide students with access to Speechify at scale. Speechify helps make education more accessible and improves student outcomes.',
        button: 'Try Speechify For Free',
    },
];

const FAQ = () => {
    const [openStates, setOpenStates] = useState(Array(faqItems.length).fill(false));

    const toggleOpen = (index) => {
        const updatedStates = [...openStates];
        updatedStates[index] = !updatedStates[index];
        setOpenStates(updatedStates);
    };

    return (
        <div className="bg-black w-[75%] min-h-screen mt-[20rem] mx-auto p-8">
            <h1 className="text-[5rem] font-medium text-white mb-12 text-center">FAQ</h1>

            <div className="flex flex-col gap-0">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-black text-white rounded-md overflow-hidden transition-all duration-1000 ease-in-out border-b-[0.1rem] border-b-gray-400"
                    >
                        {/* Header */}
                        <div
                            onClick={() => toggleOpen(index)}
                            className="flex justify-between items-center h-[6rem] px-6 py-4 cursor-pointer transition-colors duration-300 bg-black group-hover:bg-black-400"
                        >
                            <h2 className="text-3xl font-semibold text-white group-hover:text-gray-400 group-hover:scale-105 transition-all ease-in-out">
                                {item.question}
                            </h2>
                            <span className="transition-all duration-300">
                                {openStates[index] ? <FaMinus className='text-2xl' /> : <FaPlus className='text-2xl' />}
                            </span>
                        </div>

                        {/* Content */}
                        <div
                            className={`transition-all duration-1000 ease-in-out overflow-hidden px-6 text-white ${openStates[index] ? 'py-6 max-h-[300px]' : 'py-0 max-h-0'
                                }`}
                        >
                            <p className="text-white text-xl w-[80%]">{item.answer}</p>
                            <button className="mt-16 bg-white text-black px-6 py-4 rounded-2xl text-lg font-medium hover:bg-opacity-[80%] transition">
                                {item.button}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
