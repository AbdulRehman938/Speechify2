import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdOutlineFileDownload, MdOutlineTipsAndUpdates } from 'react-icons/md';
import { IoMdPlay, IoMdPause } from 'react-icons/io';
import Header from '../../components/Library/Header';
import { toast, ToastContainer } from 'react-toastify';
import { LanguageAPI, UserAPI } from '../../libs/api/apiEndPoints.js';
import axios from 'axios';

const Library = () => {

  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false);
  const [showSpeakerDropdown, setShowSpeakerDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState('1X');
  const speedOptions = ['0.3X', '0.5X', '0.75X', '1X', '1.25X', '1.5X', '1.75X', '2X'];

  const noResponseTimeoutRef = useRef(null);

  const [availableSpeakers, setAvailableSpeakers] = useState([]);
  const [availableLanguagesForDropdown, setAvailableLanguagesForDropdown] = useState([]);


  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null);

  const [text, setText] = useState('Create voice overs for Youtube videos, ads, corporate training, audiobooks, dubbing, or any use case you need.');
  const [characterCount, setCharacterCount] = useState(text.length);

  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioElementRef = useRef(null);
  const pollingTimeoutRef = useRef(null);
  const editableRef = useRef(null);

  const toggleLangDropdown = () => {
    setShowLangDropdown(!showLangDropdown);
    setShowSpeakerDropdown(false);
    setShowSpeedDropdown(false);
  };

  const toggleSpeakerDropdown = () => {
    setShowSpeakerDropdown(!showSpeakerDropdown);
    setShowLangDropdown(false);
    setShowSpeedDropdown(false);
  };

  const toggleSpeedDropdown = () => {
    setShowSpeedDropdown(!showSpeedDropdown);
    setShowLangDropdown(false);
    setShowSpeakerDropdown(false);
  };

  const handleSetTemplate = (template) => {
    let content = '';
    if (template === 'Podcast') {
      content = 'Welcome to our podcast. In today’s episode, we’ll explore emerging trends and discuss their impact.';
    } else if (template === 'Youtube') {
      content = 'Hey everyone! Welcome back to the channel. Don’t forget to like and subscribe for more videos like this!';
    } else if (template === 'Training') {
      content = 'This training session is designed to guide you through the basics and ensure you gain essential skills.';
    }
    setText(content);
    setCharacterCount(content.length);
    if (editableRef.current) {
      editableRef.current.innerHTML = getSpannedText(content);
    }
  };

  const stopAudioAndPolling = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      audioElementRef.current = null;
    }
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
    setIsPlaying(false);
    setLoading(false);
  }, []);

  const getSpannedText = (text) => {
    return text
      .split(/\s+/)
      .map((word, idx) => `<span data-word-index="${idx}">${word}</span>`)
      .join(' ');
  };
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        console.log("Calling getAllLanguages API...");
        const response = await LanguageAPI.getAllLanguages();
        console.log("Language API response:", response);

        const langs = response?.data?.data || [];
        setAvailableLanguagesForDropdown(langs);

        const englishLang = langs.find(lang =>
          lang.languageName?.toLowerCase() === 'english'
        );
        if (englishLang) {
          setSelectedLang(englishLang);
        } else if (langs.length > 0) {
          setSelectedLang(langs[0]);
        }
      } catch (error) {
        console.error("Failed to fetch languages:", error);
        toast.error("Unable to load languages.");
      }
    };

    fetchLanguages();
  }, []);


  useEffect(() => {
    if (editableRef.current && document.activeElement !== editableRef.current) {
      editableRef.current.innerText = text;
    }
  }, [text]);

  const handleTextInput = (e) => {
    if (isPlaying || loading) return;
    const plainText = e.currentTarget.innerText.slice(0, 1000);
    setText(plainText);
    setCharacterCount(plainText.length);
  };

  const handlePlay = async () => {
    if (isPlaying || loading) {
      stopAudioAndPolling();
      return;
    }
    if (characterCount >= 1000) {
      toast.error("Character limit exceeded. Max 1000 characters allowed.");
      return;
    }


    if (!text.trim()) {
      toast.error('Please enter some text to synthesize.');
      return;
    }

    stopAudioAndPolling();
    setLoading(true);

    try {
      const synthesisPayload = {
        text,
        modelType: "tts_models",
        languageCode: "uk",
        datasetCode: "mai",
        modelName: "glow-tts",
        // speaker: "p225",
        speakerWav: "",
        language: "uk"
      };

      const synthesisResponse = await UserAPI.synthesizeText(synthesisPayload);
      const status = synthesisResponse?.data?.status;
      const taskId = synthesisResponse?.data?.taskId;

      if (status === "queued" && taskId) {
        const pollStatus = async (currentTaskId) => {
          try {
            const statusRes = await UserAPI.getSpeechStatus(currentTaskId);
            lastResponseTimeRef.current = Date.now(); // Update on each response

            // Start/reset 10-minute no-response timeout
            if (noResponseTimeoutRef.current) clearTimeout(noResponseTimeoutRef.current);
            noResponseTimeoutRef.current = setTimeout(() => {
              setLoading(false);
              stopAudioAndPolling();
              toast.error('No response received in 10 minutes. Process failed.');
            }, 10 * 60 * 1000);

            if (statusRes?.data?.status === 'done' && statusRes?.data?.fileUrl) {
              const { fileUrl } = statusRes.data;
              const audioResponse = await axios.get(fileUrl, {
                responseType: 'blob',
                headers: { "ngrok-skip-browser-warning": "true" },
              });

              const audioBlob = new Blob([audioResponse.data], { type: 'audio/wav' });
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              audio.playbackRate = parseFloat(selectedSpeed.replace('X', '')) || 1.0;
              audioElementRef.current = audio;

              const highlightWords = () => {
                const wordSpans = editableRef.current?.querySelectorAll('span[data-word-index]');
                const totalWords = wordSpans.length;
                const duration = audio.duration;
                const wordTimes = Array.from({ length: totalWords }, (_, i) => (i + 1) * (duration / totalWords));

                const highlight = () => {
                  const currentTime = audio.currentTime;
                  wordSpans.forEach((span, idx) => {
                    span.style.backgroundColor =
                      currentTime >= wordTimes[idx] - duration / totalWords && currentTime < wordTimes[idx]
                        ? '#a5b4fc'
                        : 'transparent';
                  });
                  if (!audio.paused && !audio.ended) requestAnimationFrame(highlight);
                };

                requestAnimationFrame(highlight);
              };

              audio.onended = () => {
                setIsPlaying(false);
                audioElementRef.current = null;
                URL.revokeObjectURL(audioUrl);
              };

              audio.onerror = () => {
                toast.error("Error during audio playback.");
                stopAudioAndPolling();
                URL.revokeObjectURL(audioUrl);
              };

              await audio.play();
              highlightWords();

              setLoading(false);
              setIsPlaying(true);
              toast.success('Audio playback started!');

              clearTimeout(noResponseTimeoutRef.current);
              noResponseTimeoutRef.current = null;
            } else if (statusRes?.data?.status === 'failed' || statusRes?.data?.status === 'error') {
              clearTimeout(noResponseTimeoutRef.current);
              noResponseTimeoutRef.current = null;
              throw new Error('Speech synthesis failed');
            } else {
              pollingTimeoutRef.current = setTimeout(() => pollStatus(currentTaskId), 30000);
            }
          } catch (err) {
            setLoading(false);
            setIsPlaying(false);
            toast.error("Failed to retrieve audio.");
          }
        };

        pollStatus(taskId);
      } else {
        throw new Error('Unexpected response or missing taskId');
      }
    } catch {
      setLoading(false);
      setIsPlaying(false);
      toast.error("Synthesis request failed.");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-white px-4">
      <ToastContainer />
      <div className="w-full max-w-[120rem] flex flex-col items-center gap-6">
        <Header />
        {/* Blurs */}
        <div className='w-[40rem] h-[40rem] bg-gradient-to-b from-[#fb923c] to-[#2f43fa] rounded-full absolute z-[0] left-[5rem] top-[5rem] blur-[5rem] opacity-[80%]'></div>
        <div className='w-[40rem] h-[40rem] bg-gradient-to-b from-[#fb923c] to-[#2f43fa] rounded-full absolute z-[0] right-[14rem] top-[16rem] blur-[5rem] opacity-[80%]'></div>

        <h1 className='text-[3rem] text-black font-medium mt-36 text-center relative z-30'>Enter text to create Magic with Speechify AI Models</h1>
        <span className='font-medium text-black text-xl flex justify-center items-center gap-[0.5rem] text-center relative z-30'>
          <MdOutlineTipsAndUpdates className='text-yellow-700 text-2xl relative z-30' />
          Pro tip: Try using “Podcast” mode with 1.5x speed for best narration quality.
        </span>

        {/* Main Box */}
        <div className='bg-white w-[55%] h-[35rem] relative top-[4rem] rounded-[2rem] flex flex-col align-center justify-start items-center p-[1rem] shadow-lg shadow-black'>
          {/* Dropdown Buttons */}
          <div className='w-full h-[3rem] bg-white flex flex-row justify-between items-center'>
            <div className='w-[40%] h-full flex flex-row gap-[1rem] items-center'>
              {/* Language */}
              <div className="relative h-full">
                <div
                  onClick={toggleLangDropdown}
                  className="h-full w-[9rem] bg-white text-black rounded-[1rem] border-gray-300 flex justify-between px-3 items-center border-[0.1rem] hover:bg-gray-200 cursor-pointer"
                >
                  {selectedLang ? (
                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-medium text-black leading-tight">{selectedLang.country}</span>
                      <span className="text-[1rem] text-black font-semibold">{selectedLang.languageName}</span>
                    </div>
                  ) : (
                    <span className="text-[1rem] text-black font-semibold">Select Lang</span>
                  )}
                  <FaChevronDown className="w-3 h-3 ml-2 text-black" />
                </div>

                {showLangDropdown && (
                  <ul className="absolute top-[110%] left-0 w-[12rem] bg-white border border-gray-300 rounded-[1rem] shadow z-10 max-h-48 overflow-y-auto">
                    {availableLanguagesForDropdown.map((lang, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-[1rem] text-black"
                        onClick={() => {
                          setSelectedLang(lang);
                          setShowLangDropdown(false);
                        }}
                      >
                        {lang.languageName} ({lang.country})
                      </li>
                    ))}
                  </ul>
                )}
              </div>


              {/* Speaker */}
              <div className='relative h-full'>
                <div
                  onClick={() => {
                    if (selectedLang) toggleSpeakerDropdown();
                  }}
                  className={`h-full w-[11rem] border rounded-[1rem] flex items-center px-2 py-1 ${selectedLang ? 'bg-white border-gray-300 cursor-pointer hover:bg-gray-100' : 'bg-gray-300 border-gray-200 cursor-not-allowed opacity-60'}`}
                >
                  {selectedSpeaker ? (
                    <>
                      <img src={selectedSpeaker.image} alt="speaker" className="w-8 h-8 rounded-full object-cover" />
                      <div className="ml-2 text-sm flex flex-row gap-[.3rem]">
                        <span className="text-black text-xl">{selectedSpeaker.name}</span>
                        <span className="text-black font-medium text-xl">({selectedSpeaker.gender})</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-black text-xl">Select Speaker</span>
                  )}
                  <div className="ml-auto px-1 text-black">
                    {showSpeakerDropdown ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                {showSpeakerDropdown && selectedLang && (
                  <ul className="absolute top-[110%] left-0 w-[11rem] bg-white border border-gray-300 rounded-[1rem] z-10 shadow-lg max-h-48 overflow-y-auto">
                    {availableSpeakers.map((speaker, idx) => (
                      <li key={idx} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-[1rem]" onClick={() => { setSelectedSpeaker(speaker); setShowSpeakerDropdown(false); }}>
                        <img src={speaker.image} alt={speaker.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="text-black text-xl">{speaker.name}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Download & Play */}
            <div className='w-[40%] h-full flex flex-row justify-end gap-[1rem] items-center'>
              <div
                onClick={() => {
                  if (characterCount >= 1000) return;
                  const base64Audio = localStorage.getItem('tts_audio_base64');
                  if (base64Audio) {
                    const link = document.createElement('a');
                    link.href = base64Audio;
                    link.download = 'tts_audio.wav';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } else {
                    toast.error("No audio available to download.");
                  }
                }}
                className={`h-full w-[10rem] gap-[0.4rem] p-[1rem] flex justify-center items-center rounded-[1rem] border-[0.1rem]
    ${characterCount >= 1000 ? 'bg-gray-300 text-gray-500 border-gray-200 cursor-not-allowed opacity-60' : 'bg-white text-black border-gray-300 hover:bg-gray-200 cursor-pointer'}`}
              >

                <MdOutlineFileDownload className='text-3xl' />
                <span className='font-medium'>Download</span>
              </div>

              <div
                id='play'
                onClick={() => {
                  if (characterCount >= 1000) return;
                  handlePlay();
                }}
                className={`h-full gap-[0.5rem] w-[10rem] rounded-[1rem] p-[1rem] flex justify-center items-center 
    ${characterCount >= 1000
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                    : 'bg-[#2f43fa] text-white hover:bg-[#1524ad] cursor-pointer'
                  }`}
              >

                {loading ? (
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                ) : isPlaying ? (
                  <IoMdPause className='text-2xl' />
                ) : (
                  <IoMdPlay className='text-2xl' />
                )}
                <span className='font-medium text-2xl'>{loading ? 'Loading' : isPlaying ? 'Pause' : 'Play'}</span>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div
            ref={editableRef}
            className="mt-8 text-[1.3rem] text-black w-full h-[23rem] resize-none border-none border-transparent focus:outline-none active:outline-none focus:ring-0 overflow-y-auto relative"
            contentEditable={!(isPlaying || loading)}
            suppressContentEditableWarning={true}
            onBeforeInput={(e) => {
              const plainText = e.currentTarget.innerText;
              if (plainText.length >= 1000) {
                e.preventDefault();
              }
            }}
            onInput={handleTextInput}
            style={{ pointerEvents: isPlaying || loading ? 'none' : 'auto' }}
          />

          {/* Footer */}
          <div className='mt-4 flex w-full justify-between items-center'>
            <div className='flex gap-3 items-center align-center text-center'>
              <div className='relative mr-[5rem]'>
                <div
                  onClick={() => {
                    if (!(isPlaying || loading)) toggleSpeedDropdown();
                  }}
                  className={`flex items-center justify-between h-[3rem] px-3 py-1 w-[9rem] border rounded-[1rem] ${isPlaying || loading
                    ? 'bg-gray-300 border-gray-200 cursor-not-allowed opacity-60'
                    : 'bg-white border-gray-300 cursor-pointer hover:bg-gray-100'
                    }`}
                >

                  <span className='text-black text-[1rem]'>Speed: {selectedSpeed}</span>
                  {showSpeedDropdown ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {!isPlaying && showSpeedDropdown && (
                  <ul className="absolute bottom-[110%] left-0 w-[11rem] bg-white border border-gray-300 rounded-[1rem] shadow z-10 max-h-48 overflow-y-auto scroll-hidden">
                    {speedOptions.map((speed, idx) => (
                      <li key={idx} className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-[1rem] text-black text-sm" onClick={() => { setSelectedSpeed(speed); setShowSpeedDropdown(false); }}>{speed}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div onClick={() => {
                if (!(isPlaying || loading)) handleSetTemplate('Podcast');
              }} className='px-4 py-1 bg-gray-300 h-[3rem] rounded-[1rem] text-[1.3rem] pt-[0.5rem] hover:bg-gray-400 cursor-pointer'>Podcast</div>
              <div onClick={() => {
                if (!(isPlaying || loading)) handleSetTemplate('Youtube');
              }} className='px-4 py-1 bg-gray-300 h-[3rem] rounded-[1rem] text-[1.3rem] pt-[0.5rem] hover:bg-gray-400 cursor-pointer'>Youtube</div>
              <div onClick={() => {
                if (!(isPlaying || loading)) handleSetTemplate('Training');
              }} className='px-4 py-1 bg-gray-300 h-[3rem] rounded-[1rem] text-[1.3rem] pt-[0.5rem] hover:bg-gray-400 cursor-pointer'>Training</div>
            </div>
            <div className={`${characterCount >= 1000 ? 'text-red-600' : 'text-black'} text-lg`}>
              {characterCount}/1000 characters
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
