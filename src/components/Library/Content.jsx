import React, { useRef, useState } from 'react';
import doc from "../../assets/icons/doc.svg";
import pdf from "../../assets/icons/pdf.svg";
import text from "../../assets/icons/text.svg";
import epub from "../../assets/icons/epub.svg";
import drive from "../../assets/icons/drive.svg";
import dropbox from "../../assets/icons/dropbox.svg";
import cloud from "../../assets/icons/cloud.svg";
import logo from "../../assets/icons/Speechify-logo2.svg";
import { RxText } from "react-icons/rx";
import { IoIosLink } from "react-icons/io";
import { BsCamera } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { FaThLarge, FaList } from "react-icons/fa";
import ReaderComponent from './Reader-component';



const Content = ({ onTriggerCreateText, onTriggerPasteLink }) => {
    // Dummy user for demonstration
    const user = { firstName: "Speechify" }; // Replace with actual user context or localStorage retrieval
    const firstName = user?.firstName || "User";

    const fileInputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [dateSort, setDateSort] = useState("newest");
    const [folderModalOpen, setFolderModalOpen] = useState(false);

    // New state to manage which file is selected for reading
    const [selectedFileForReading, setSelectedFileForReading] = useState(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'text/plain', 'application/epub+zip'];

        const newFiles = files
            .filter((file) => allowedTypes.includes(file.type))
            .map((file) => ({
                name: file.name,
                time: new Date(),
                extension: file.name.split('.').pop(),
                listenedTime: Math.floor(Math.random() * 100), // simulate listened time
                // You might want to store actual file content or a URL here later
            }));

        if (newFiles.length > 0) {
            setFileUploaded(true);
            setUploadedFiles((prev) => [...prev, ...newFiles]);
            // Automatically select the first uploaded file to open the reader
            // For this example, we'll just open the reader without specific file content for now.
            // If you want to open the reader with the *first* newly uploaded file:
            // setSelectedFileForReading(newFiles[0]);
        } else {
            files.forEach((file) => {
                if (!allowedTypes.includes(file.type)) {
                    // Replaced alert with console log to adhere to guidelines
                    console.error(`${file.name} is not a supported file type.`);
                }
            });
        }
    };

    // Function to handle clicking on an uploaded file to open the reader
    const handleFileClick = (file) => {
        setSelectedFileForReading(file);
    };

    // Function to close the reader and go back to the file list
    const handleCloseReader = () => {
        setSelectedFileForReading(null);
    };

    const getMinutesAgo = (time) => {
        const now = new Date();
        const diff = Math.floor((now - new Date(time)) / 60000);
        return diff <= 0 ? "Just now" : `${diff} minute${diff > 1 ? 's' : ''} ago`;
    };

    const sortFiles = (files) => {
        switch (dateSort) {
            case "newest":
                return [...files].sort((a, b) => new Date(b.time) - new Date(a.time));
            case "oldest":
                return [...files].sort((a, b) => new Date(a.time) - new Date(b.time));
            case "listened":
                return [...files].sort((a, b) => b.listenedTime - a.listenedTime);
            case "alphabetical":
                return [...files].sort((a, b) => a.name.localeCompare(b.name));
            default:
                return files;
        }
    };

    const sortedFiles = sortFiles(uploadedFiles);

    // If a file is selected for reading, render the ReaderComponent
    if (selectedFileForReading) {
        return <ReaderComponent file={selectedFileForReading} onClose={handleCloseReader} />;
    }

    // Otherwise, render the file management UI
    return (
        <>
            {/* Scan Pages Modal */}
            {showModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50' onClick={() => setShowModal(false)}>
                    <div onClick={(e) => e.stopPropagation()} className='relative bg-white w-11/12 sm:w-[40rem] h-[32rem] rounded-2xl shadow-xl flex flex-col justify-between items-center p-6'>
                        <IoClose onClick={() => setShowModal(false)} className='absolute top-3 right-3 text-3xl text-gray-600 cursor-pointer hover:text-black' />
                        <img src={logo} alt="error" className='w-[10rem] sm:w-[15rem] mb-6 mt-[3rem]' />
                        <h1 className='font-medium text-xl sm:text-3xl text-black text-center'>Use Speechify mobile app to scan any book or document</h1>
                        <p className='text-sm text-gray-500 mt-4'>Please scan the QR code below to download the app.</p>
                        <div className='bg-gray-300 w-[12rem] h-[10rem] sm:w-[15rem] sm:h-[13rem] mt-4 flex justify-center items-center'>QR code</div>
                    </div>
                </div>
            )}

            {/* Create Folder Modal */}
            {folderModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center' onClick={() => setFolderModalOpen(false)}>
                    <div className='bg-white p-6 rounded-xl shadow-lg w-11/12 sm:w-[25rem]' onClick={(e) => e.stopPropagation()}>
                        <h2 className='text-lg font-semibold mb-4'>Create Folder</h2>
                        <input type="text" placeholder='Folder name' className='w-full border px-3 py-2 rounded-lg mb-4' />
                        <div className='flex justify-end gap-3'>
                            <button className='px-4 py-2 bg-gray-200 rounded-lg' onClick={() => setFolderModalOpen(false)}>Cancel</button>
                            <button className='px-4 py-2 bg-blue-600 text-white rounded-lg'>Create</button>
                        </div>
                    </div>
                </div>
            )}

            <input
                type="file"
                accept=".pdf,.doc,.txt,.epub"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                hidden
            />

            <div className='bg-white w-full max-w-4xl min-h-[50rem] relative top-[1rem] flex flex-col items-center px-4 sm:px-6 lg:px-8'>

                {!fileUploaded && (
                    <h1 className='text-black font-medium text-lg sm:text-xl md:text-[1.5rem] mb-4 text-center mt-4'>
                        Hello {firstName}, upload your first file
                    </h1>
                )}

                {/* Header2 */}
                {fileUploaded && (
                    <div className='w-full flex flex-col sm:flex-row justify-between items-center bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 rounded-xl mb-4 gap-2 sm:gap-4'>
                        <button onClick={handleClick} className='bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-blue-800'>
                            + Add File
                        </button>

                        <div className='flex flex-wrap justify-end items-center gap-2 sm:gap-3'>
                            <button className='bg-gray-200 text-xs sm:text-sm px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-300' onClick={() => setFolderModalOpen(true)}>
                                + Create Folder
                            </button>
                            <select value={dateSort} onChange={(e) => setDateSort(e.target.value)} className='bg-gray-200 text-xs sm:text-sm px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg'>
                                <option value="newest">Date Added (Newest)</option>
                                <option value="oldest">Date Added (Oldest)</option>
                                <option value="listened">Date Listened</option>
                                <option value="alphabetical">Alphabetical</option>
                            </select>
                            <div className='flex items-center gap-1.5 sm:gap-2 ml-2 sm:ml-4'>
                                <FaThLarge className={`cursor-pointer text-base sm:text-lg ${viewMode === 'grid' ? 'text-black' : 'text-gray-600'}`} onClick={() => setViewMode('grid')} />
                                <FaList className={`cursor-pointer text-base sm:text-lg ${viewMode === 'list' ? 'text-black' : 'text-gray-600'}`} onClick={() => setViewMode('list')} />
                            </div>
                        </div>
                    </div>
                )}

                {/* File List */}
                {fileUploaded && (
                    <div className={`w-full ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4' : 'flex flex-col gap-2 sm:gap-3'} p-2 sm:p-4`}>
                        {sortedFiles.map((file, idx) => (
                            <div
                                key={idx}
                                className='p-3 sm:p-4 border rounded-xl shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow'
                                onClick={() => handleFileClick(file)}
                            >
                                <h2 className='text-black font-medium text-base sm:text-[1rem] truncate'>{file.name}</h2>
                                <div className='text-sm text-gray-500 mt-1'>
                                    {getMinutesAgo(file.time)} • <span className='uppercase'>{file.extension}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Upload UI */}
                {!fileUploaded && (
                    <>
                        <div
                            onClick={handleClick}
                            onDrop={handleDrop}
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            className={`bg-white w-full max-w-md mx-auto h-[18rem] sm:h-[20rem] mt-4 gap-3 flex flex-col justify-center items-center border-dashed border-2 ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-500'}`}
                        >
                            <div className='w-full px-4 flex justify-around items-center'>
                                <img src={pdf} alt="pdf" className='h-10 sm:h-[3.5rem] opacity-40' />
                                <img src={doc} alt="doc" className='h-10 sm:h-[3.5rem] opacity-40' />
                                <img src={text} alt="text" className='h-10 sm:h-[3.5rem] opacity-40' />
                                <img src={epub} alt="epub" className='h-10 sm:h-[3.5rem] opacity-40' />
                            </div>
                            <p className='font-medium text-gray-500 text-sm sm:text-[1.1rem]'>Drop files here to upload, or</p>
                            <button type="button" onClick={handleClick} className='bg-blue-700 text-sm sm:text-[1.1rem] font-bold text-white p-3 px-6 rounded-lg hover:bg-blue-800 hover:scale-105 transition-transform'>
                                Select File
                            </button>
                        </div>

                        <div className='w-full max-w-md mx-auto h-[25rem] mt-8 flex flex-col'>
                            <h1 className='text-lg sm:text-[1.5rem] font-medium opacity-70'>Import from</h1>
                            <div className='flex flex-wrap gap-3 mt-4'>
                                {[{ src: drive, label: 'Google Drive' }, { src: dropbox, label: 'Dropbox' }, { src: cloud, label: 'OneDrive' }].map((item, i) => (
                                    <div key={i} className='cursor-pointer bg-gray-50 rounded-xl p-3 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] hover:bg-gray-100 hover:scale-[98%] transition'>
                                        <img src={item.src} alt={item.label} className='w-10 h-10' />
                                        <p className='text-base sm:text-[1.2rem] font-medium'>{item.label}</p>
                                    </div>
                                ))}
                            </div>

                            <h1 className='text-lg sm:text-[1.5rem] font-medium opacity-70 mt-8'>Create New</h1>
                            <div className='flex flex-wrap gap-3 mt-4'>
                                <div onClick={onTriggerCreateText} className='cursor-pointer bg-gray-50 rounded-xl p-3 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] hover:bg-gray-100 hover:scale-[98%] transition'>
                                    <RxText className='text-2xl sm:text-[2.5rem]' />
                                    <p className='text-base sm:text-[1.2rem] font-medium'>Create Text</p> {/* Corrected label */}
                                </div>
                                <div onClick={onTriggerPasteLink} className='cursor-pointer bg-gray-50 rounded-xl p-3 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] hover:bg-gray-100 hover:scale-[98%] transition'>
                                    <IoIosLink className='text-2xl sm:text-[2.5rem]' />
                                    <p className='text-base sm:text-[1.2rem] font-medium'>Paste Link</p> {/* Corrected label */}
                                </div>
                                <div onClick={() => setShowModal(true)} className='cursor-pointer bg-gray-50 rounded-xl p-3 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] hover:bg-gray-100 hover:scale-[98%] transition'>
                                    <BsCamera className='text-2xl sm:text-[2.5rem]' />
                                    <p className='text-base sm:text-[1.2rem] font-medium'>Scan Pages</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Content;
