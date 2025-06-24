import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '/src/components/Library/Header';
import Content from '../../components/Library/Content';
import doc from "../../assets/icons/doc.svg";
import pdf from "../../assets/icons/pdf.svg";
import text from "../../assets/icons/text.svg";
import epub from "../../assets/icons/epub.svg";
import drive from "../../assets/icons/drive.svg";
import dropbox from "../../assets/icons/dropbox.svg";
import cloud from "../../assets/icons/cloud.svg";
import { RxText, RxCross2 } from "react-icons/rx";
import { IoIosLink } from "react-icons/io";
import { BsCamera } from "react-icons/bs";
import { MdCreateNewFolder, MdOutlineFileUpload } from "react-icons/md";
import { TbWorld } from "react-icons/tb";


const Library = () => {
  const navigate = useNavigate();
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showCreateTextModal, setShowCreateTextModal] = useState(false);
  const [showPasteLinkModal, setShowPasteLinkModal] = useState(false);

  const [folderName, setFolderName] = useState('');
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [link, setLink] = useState('');

  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const isValidURL = (url) =>
    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(url);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowNewFolderModal(false);
        setShowUploadFileModal(false);
        setShowCreateTextModal(false);
        setShowPasteLinkModal(false);
        setFolderName('');
        setTextTitle('');
        setTextContent('');
        setLink('');
      }
    };
    if (showNewFolderModal || showUploadFileModal || showCreateTextModal || showPasteLinkModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNewFolderModal, showUploadFileModal, showCreateTextModal, showPasteLinkModal]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setContextMenuVisible(true);
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
    files.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        console.log("Accepted file:", file.name);
      } else {
        alert(`${file.name} is not a supported file type.`);
      }
    });
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-white"
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenuVisible(false)}
    >
      <Header navigate={navigate} />
      <Content
        onTriggerCreateText={() => setShowCreateTextModal(true)}
        onTriggerPasteLink={() => setShowPasteLinkModal(true)}
      />


      {/* Right Click Context Menu */}
      {contextMenuVisible && (
        <ul
          className="absolute w-[12rem] bg-white text-black rounded-md shadow-2xl z-50 py-2 rounded-[2rem]"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <li className="px-4 py-2 hover:bg-gray-200 rounded-[0.5rem] cursor-pointer border-b-[0.1rem] border-gray-300 flex justify-start align-center items-center gap-[0.5rem]" onClick={() => { setShowNewFolderModal(true); setContextMenuVisible(false); }}>
            <MdCreateNewFolder className='text-[1.3rem]' />
            New folder
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 rounded-[0.5rem] cursor-pointer flex justify-start align-center items-center gap-[0.5rem]" onClick={() => { setShowUploadFileModal(true); setContextMenuVisible(false); }}>
            <MdOutlineFileUpload className='text-[1.3rem]' />
            Upload file
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 rounded-[0.5rem] cursor-pointer flex justify-start align-center items-center gap-[0.5rem]" onClick={() => { setShowCreateTextModal(true); setContextMenuVisible(false); }}>
            <RxText className='text-[1.3rem]' />
            Create text
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 rounded-[0.5rem] cursor-pointer flex justify-start align-center items-center gap-[0.5rem]" onClick={() => { setShowPasteLinkModal(true); setContextMenuVisible(false); }}>
            <TbWorld className='text-[1.3rem]' />
            Paste link
          </li>
        </ul>
      )}

      {/* --- Modals Below --- */}

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div ref={modalRef} className="bg-white rounded-lg p-6 w-[35rem] h-[15rem] shadow-lg relative">
            <button className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-black" onClick={() => setShowNewFolderModal(false)}>
              ×
            </button>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-[1rem]">Create New Folder</h2>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowNewFolderModal(false)} className="px-4 py-2 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400">
                Cancel
              </button>
              <button
                disabled={folderName.trim().length < 1}
                onClick={() => {
                  console.log("Folder Created:", folderName);
                  setShowNewFolderModal(false);
                  setFolderName('');
                }}
                className={`px-4 py-2 rounded-md text-white font-semibold ${folderName.trim().length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-100 cursor-not-allowed'
                  }`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload File Modal */}
      {showUploadFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white w-[45rem] h-[48rem] rounded-[1rem] p-[2rem] relative" onClick={(e) => e.stopPropagation()}>
            <RxCross2 className="absolute top-4 right-4 text-[1.5rem] cursor-pointer text-gray-600 hover:text-red-500" onClick={() => setShowUploadFileModal(false)} />

            {/* File Drop Area */}
            <div
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              className={`w-full h-[15rem] flex flex-col justify-center items-center border-dashed border-[0.2rem] mt-[1rem] rounded-[1rem] ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-500'
                }`}
            >
              <input type="file" accept=".pdf,.doc,.txt,.epub" ref={fileInputRef} onChange={handleFileChange} multiple hidden />
              <div className="w-[20rem] h-[3.5rem] flex justify-around items-center">
                <img src={pdf} alt="pdf" className="h-full opacity-40" />
                <img src={doc} alt="doc" className="h-full opacity-40" />
                <img src={text} alt="text" className="h-full opacity-40" />
                <img src={epub} alt="epub" className="h-full opacity-40" />
              </div>
              <p className="font-medium text-gray-500">Drop files here to upload, or</p>
              <button className="bg-blue-700 text-white font-bold p-[1rem] px-[2rem] rounded-[1rem] hover:bg-blue-800 hover:scale-[105%]">
                Select File
              </button>
            </div>

            {/* Import From */}
            <div className="mt-8">
              <h1 className="text-xl font-medium text-gray-700">Import from</h1>
              <div className="flex gap-4 mt-4">
                {[{ img: drive, label: 'Google Drive' }, { img: dropbox, label: 'Dropbox' }, { img: cloud, label: 'OneDrive' }].map(({ img, label }) => (
                  <div key={label} className="w-[14rem] h-[6rem] bg-[#f5f5fa] rounded-[1rem] flex flex-col items-start p-[0.5rem] gap-[0.3rem] cursor-pointer hover:bg-[#f6f6f6] hover:scale-[95%] transition-all">
                    <img src={img} alt={label} className="w-[2.5rem] h-[2.5rem]" />
                    <p className="text-[1.1rem] font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Create New */}
            <div className="mt-10">
              <h1 className="text-xl font-medium text-gray-700">Create New</h1>
              <div className="flex gap-4 mt-4">
                <div
                  className="w-[14rem] h-[6rem] bg-[#f5f5fa] rounded-[1rem] flex flex-col items-start p-[0.5rem] gap-[0.3rem] cursor-pointer hover:bg-[#f6f6f6] hover:scale-[95%] transition-all"
                  onClick={() => {
                    setShowUploadFileModal(false);
                    setShowCreateTextModal(true);
                  }}
                >
                  <div className="text-[2rem]"><RxText /></div>
                  <p className="text-[1.1rem] font-medium">Text Note</p>
                </div>
                <div
                  className="w-[14rem] h-[6rem] bg-[#f5f5fa] rounded-[1rem] flex flex-col items-start p-[0.5rem] gap-[0.3rem] cursor-pointer hover:bg-[#f6f6f6] hover:scale-[95%] transition-all"
                  onClick={() => {
                    setShowUploadFileModal(false);
                    setShowPasteLinkModal(true);
                  }}
                >
                  <div className="text-[2rem]"><IoIosLink /></div>
                  <p className="text-[1.1rem] font-medium">Paste Link</p>
                </div>
                <div className="w-[14rem] h-[6rem] bg-[#f5f5fa] rounded-[1rem] flex flex-col items-start p-[0.5rem] gap-[0.3rem] cursor-pointer hover:bg-[#f6f6f6] hover:scale-[95%] transition-all">
                  <div className="text-[2rem]"><BsCamera /></div>
                  <p className="text-[1.1rem] font-medium">Use Camera</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Create Text Modal */}
      {showCreateTextModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div ref={modalRef} className="bg-white rounded-lg p-6 w-[40rem] shadow-lg relative">
            <button className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-black" onClick={() => setShowCreateTextModal(false)}>
              ×
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Text</h2>
            <input
              type="text"
              value={textTitle}
              onChange={(e) => setTextTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Write your text here..."
              className="w-full h-[25rem] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowCreateTextModal(false)} className="px-4 py-2 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400">
                Cancel
              </button>
              <button
                disabled={textTitle.trim() === '' || textContent.trim() === ''}
                onClick={() => {
                  console.log("Text Created:", { title: textTitle, content: textContent });
                  setShowCreateTextModal(false);
                  setTextTitle('');
                  setTextContent('');
                }}
                className={`px-4 py-2 rounded-md text-white font-semibold ${textTitle && textContent ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-100 cursor-not-allowed'
                  }`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paste Link Modal */}
      {showPasteLinkModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div ref={modalRef} className="bg-white rounded-lg p-6 w-[40rem] h-[20rem] shadow-lg relative">
            <button className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-black" onClick={() => setShowPasteLinkModal(false)}>
              ×
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mt-[2rem] mb-[2rem]">Paste Web Link</h2>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste a valid URL"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowPasteLinkModal(false)} className="px-4 py-2 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400">
                Cancel
              </button>
              <button
                disabled={!isValidURL(link.trim())}
                onClick={() => {
                  console.log("Link Submitted:", link);
                  setShowPasteLinkModal(false);
                  setLink('');
                }}
                className={`px-4 py-2 rounded-md text-white font-semibold ${isValidURL(link.trim()) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-100 cursor-not-allowed'
                  }`}
              >
                Submit
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Library;
