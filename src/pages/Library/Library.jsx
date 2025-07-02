import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdOutlineFileDownload, MdOutlineTipsAndUpdates } from 'react-icons/md';
import { IoMdPlay, IoMdPause } from 'react-icons/io';
import Header from '../../components/Library/Header';
import { toast, ToastContainer } from 'react-toastify';
import { UserAPI, ModelAPI, LanguageAPI, DatasetAPI } from '../../libs/api/apiEndPoints.js';


const Library = () => {
  // Dropdown for Speed
  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState('1X');
  const speedOptions = ['0.3X', '0.5X', '0.75X', '1X', '1.25X', '1.5X', '1.75X', '2X'];

  // State for Dynamic TTS Data
  const [allModels, setAllModels] = useState([]); // Stores all models from ModelAPI.getAllModels()
  const [allLanguages, setAllLanguages] = useState([]); // Stores all languages from LanguageAPI.getAllLanguages()
  const [allDatasets, setAllDatasets] = useState([]);   // Stores all datasets from DatasetAPI.viewDatasets()

  // Derived states for dropdowns (filtered/formatted for UI)
  const [availableSpeakers, setAvailableSpeakers] = useState([]);
  const [availableLanguagesForDropdown, setAvailableLanguagesForDropdown] = useState([]);

  // Currently selected TTS parameters for synthesis
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null); // { languageCode: 'en', languageName: 'English', accent: 'Standard', country: 'US' }
  const [selectedModel, setSelectedModel] = useState(null); // The full model object from allModels
  const [selectedDataset, setSelectedDataset] = useState(null); // The full dataset object from allDatasets

  // Text input and character count
  const [text, setText] = useState('Create voice overs for Youtube videos, ads, corporate training, audiobooks, dubbing, or any use case you need.');
  const [characterCount, setCharacterCount] = useState(text.length);

  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioElementRef = useRef(null);
  const pollingTimeoutRef = useRef(null);

  // Fetch initial TTS data on component mount
  useEffect(() => {
    const fetchTTSOptions = async () => {
      try {
        // Fetch all models
        const modelsResponse = await ModelAPI.getAllModels();
        if (modelsResponse.data && Array.isArray(modelsResponse.data)) {
          setAllModels(modelsResponse.data);

          // Derive speakers from models
          const speakersMap = new Map(); // Use a Map to ensure unique speakers and store their full data
          modelsResponse.data.forEach(model => {
            if (model.speaker_name && !speakersMap.has(model.speaker_name)) {
              speakersMap.set(model.speaker_name, {
                name: model.speaker_name,
                gender: model.speaker_gender || 'N/A',
                image: model.speaker_image_url || 'https://placehold.co/40x40/cccccc/ffffff?text=SPK' // Placeholder
              });
            }
          });
          const derivedSpeakers = Array.from(speakersMap.values());
          setAvailableSpeakers(derivedSpeakers);

          // Set initial speaker if available
          if (derivedSpeakers.length > 0) {
            setSelectedSpeaker(derivedSpeakers[0]);
          }
        } else {
          toast.error('Failed to load models data.');
        }

        // Fetch all languages
        const languagesResponse = await LanguageAPI.getAllLanguages();
        if (languagesResponse.data && Array.isArray(languagesResponse.data)) {
          setAllLanguages(languagesResponse.data);
          // Format languages for dropdown if needed, assuming languageName, languageCode, accent, country are available
          const formattedLanguages = languagesResponse.data.map(lang => ({
            languageCode: lang.languageCode,
            languageName: lang.languageName,
            accent: lang.accent || 'Standard', // Assuming 'accent' might be part of language data
            country: lang.country || lang.languageCode.toUpperCase(), // Assuming 'country' might be part of language data
          }));
          setAvailableLanguagesForDropdown(formattedLanguages);

          // Set initial language if available
          if (formattedLanguages.length > 0) {
            setSelectedLang(formattedLanguages[0]);
          }
        } else {
          toast.error('Failed to load languages data.');
        }

        // Fetch all datasets
        const datasetsResponse = await DatasetAPI.viewDatasets();
        if (datasetsResponse.data && Array.isArray(datasetsResponse.data)) {
          setAllDatasets(datasetsResponse.data);
          // Set initial dataset if available
          if (datasetsResponse.data.length > 0) {
            setSelectedDataset(datasetsResponse.data[0]);
          }
        } else {
          toast.error('Failed to load datasets data.');
        }

        toast.success('TTS options loaded successfully!');
      } catch (error) {
        console.error('Failed to fetch TTS options:', error);
        toast.error('Failed to load TTS options. Please check API endpoints and network.');
      }
    };

    fetchTTSOptions();
  }, []); // Empty dependency array means this runs once on mount

  // Effect to update selectedModel when selectedSpeaker, selectedLang, or allModels change
  useEffect(() => {
    if (selectedSpeaker && selectedLang && allModels.length > 0 && allDatasets.length > 0) {
      // Find a model that matches the selected speaker, language, and dataset (if applicable)
      const foundModel = allModels.find(model =>
        model.speaker_name === selectedSpeaker.name &&
        model.language_code === selectedLang.languageCode &&
        model.dataset_code === selectedDataset?.datasetCode // Use optional chaining for selectedDataset
      );

      if (foundModel) {
        setSelectedModel(foundModel);
        console.log("Selected model updated:", foundModel);
      } else {
        setSelectedModel(null);
        console.warn("No matching model found for selected speaker, language, and dataset.");
        // Optionally, disable play button or show a message
      }
    }
  }, [selectedSpeaker, selectedLang, selectedDataset, allModels, allDatasets]);


  const handleTextChange = (e) => {
    const input = e.target.value;
    if (input.length <= 500) {
      setText(input);
      setCharacterCount(input.length);
    }
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

  const handlePlay = async () => {
    if (isPlaying || loading) {
      stopAudioAndPolling();
      return;
    }

    if (!text.trim()) {
      toast.error('Please enter some text to synthesize.');
      return;
    }
    if (!selectedModel || !selectedSpeaker || !selectedLang || !selectedDataset) {
      toast.error('Please ensure a speaker, language, and dataset are selected, and a suitable TTS model is found.');
      return;
    }

    setLoading(true);
    stopAudioAndPolling();

    try {
      const synthesisPayload = {
        text: text,
        modelType: 'tts_models', // Assuming this is constant for your TTS API
        languageCode: selectedLang.languageCode, // Dynamically from selectedLang
        datasetCode: selectedDataset.datasetCode,     // Dynamically from selectedDataset
        modelName: selectedModel.model_name,   // Dynamically from selectedModel
        speaker: selectedSpeaker.name,         // Dynamically from selectedSpeaker
        // speed: parseFloat(selectedSpeed.replace('X', '')), // Convert "1X" to 1.0, "1.5X" to 1.5 etc.
      };

      console.log("Sending synthesis request with payload:", synthesisPayload);
      const synthesisResponse = await UserAPI.synthesizeText(synthesisPayload);
      console.log("Synthesis initial response:", synthesisResponse);

      const taskId = synthesisResponse.data?.taskId;

      if (!taskId) {
        throw new Error('No taskId returned from synthesis API. Response:' + JSON.stringify(synthesisResponse));
      }

      const pollStatus = async (currentTaskId) => {
        try {
          console.log(`Polling status for taskId: ${currentTaskId}`);
          const statusRes = await UserAPI.getSpeechStatus(currentTaskId);
          console.log("Synthesis status response:", statusRes);

          if (statusRes?.data?.status === 'completed' && statusRes.data?.file) {
            const audioBaseUrl = 'https://1ab7-203-128-20-20.ngrok-free.app/audio/'; // Replace with your actual audio base URL
            const audioUrl = `${audioBaseUrl}${statusRes.data.file}`;

            const audio = new Audio(audioUrl);
            audioElementRef.current = audio;

            audio.play()
              .then(() => {
                setLoading(false);
                setIsPlaying(true);
                toast.success('Audio playback started!');
                if (pollingTimeoutRef.current) {
                  clearTimeout(pollingTimeoutRef.current);
                  pollingTimeoutRef.current = null;
                }
              })
              .catch((playError) => {
                console.error("Error playing audio:", playError);
                toast.error("Failed to play audio. Check browser autoplay policies or network.");
                stopAudioAndPolling();
              });

            audio.onended = () => {
              console.log("Audio ended.");
              setIsPlaying(false);
              audioElementRef.current = null;
            };

            audio.onerror = (e) => {
              console.error("Audio element error:", e);
              toast.error("An error occurred during audio playback.");
              stopAudioAndPolling();
            };

          } else if (statusRes?.data?.status === 'failed' || statusRes?.data?.status === 'error') {
            throw new Error(`Speech synthesis failed: ${statusRes.data.message || 'Unknown error'}`);
          } else {
            console.log("Synthesis still in progress, re-polling...");
            if (pollingTimeoutRef.current) {
              clearTimeout(pollingTimeoutRef.current);
            }
            pollingTimeoutRef.current = setTimeout(() => pollStatus(currentTaskId), 2000);
          }
        } catch (pollErr) {
          console.error("Polling error for taskId:", currentTaskId, pollErr);
          setLoading(false);
          setIsPlaying(false);
          toast.error(`Failed to retrieve audio: ${pollErr.message}`);
          if (pollingTimeoutRef.current) {
            clearTimeout(pollingTimeoutRef.current);
            pollingTimeoutRef.current = null;
          }
        }
      };

      pollStatus(taskId);

    } catch (err) {
      console.error('Synthesis request initiation error:', err);
      setLoading(false);
      setIsPlaying(false);
      toast.error(`Failed to initiate speech synthesis: ${err.message}`);
      stopAudioAndPolling();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-white px-4">
      <ToastContainer />
      <div className="w-full max-w-[120rem] flex flex-col items-center gap-6">
        <Header />

        {/* Background Blurs */}
        <div className='w-[40rem] h-[40rem] bg-gradient-to-b from-[#fb923c] to-[#2f43fa] rounded-full absolute z-[0] left-[5rem] top-[5rem] blur-[5rem] opacity-[80%]'></div>
        <div className='w-[40rem] h-[40rem] bg-gradient-to-b from-[#fb923c] to-[#2f43fa] rounded-full absolute z-[0] right-[14rem] top-[16rem] blur-[5rem] opacity-[80%]'></div>

        <h1 className='text-[3rem] text-black font-medium mt-36 text-center relative z-30'>Enter text to create Magic with Speechify AI Models</h1>
        <span className='font-medium text-black text-xl flex justify-center items-center gap-[0.5rem] text-center relative z-30'>
          <MdOutlineTipsAndUpdates className='text-yellow-700 text-2xl relative z-30' />
          Pro tip: Try using “Podcast” mode with 1.5x speed for best narration quality.
        </span>

        <div className='bg-white w-[55%] h-[35rem] relative top-[4rem] rounded-[2rem] flex flex-col align-center justify-start items-center p-[1rem] shadow-lg shadow-black '>
          {/* Top Controls */}
          <div className='w-full h-[3rem] bg-white over-hidden flex flex-row justify-between align-center items-center'>
            <div className='w-[40%] h-full flex flex-row justify-start gap-[1rem] align-center items-center'>
              {/* Speaker Button */}
              <div className='relative h-full bg-white w-[11rem] border-gray-300 border-[0.13rem] flex flex-row justify-between align-center items-center px-2 py-1 rounded-[1rem] cursor-pointer hover:bg-gray-100' onClick={() => setShowSpeedDropdown(!showSpeedDropdown)}>
                {selectedSpeaker ? (
                  <>
                    <img src={selectedSpeaker.image} alt="speaker" className="w-8 h-8 rounded-full object-cover" />
                    <div className="ml-2 text-sm flex flex-row gap-[.3rem]">
                      <span className="font-normal text-black text-xl">{selectedSpeaker.name}</span>
                      <span className="text-xl font-medium text-black">({selectedSpeaker.gender})</span>
                    </div>
                  </>
                ) : (
                  <span className="font-normal text-black text-xl">Select Speaker</span>
                )}
                <div className="ml-auto px-1 text-black">
                  {showSpeedDropdown ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                </div>
                {/* Speaker Dropdown */}
                {showSpeedDropdown && (
                  <ul className="absolute top-[110%] left-0 w-[11rem] bg-white border-gray-300 border-[0.13rem] rounded-[1rem] z-10 shadow-lg max-h-48 overflow-y-auto">
                    {availableSpeakers.map((speaker, idx) => (
                      <li key={idx} className="flex flex-row items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-[1rem]" onClick={() => { setSelectedSpeaker(speaker); setShowSpeedDropdown(false); }}>
                        <img src={speaker.image} alt={speaker.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex flex-row text-sm gap-[0.3rem]">
                          <span className="font-normal text-black text-xl">{speaker.name}</span>
                          <span className="text-xl font-medium text-black">({speaker.gender})</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Speed Button (Original position, but now for speed) */}
              <div className='relative h-full bg-white w-[9rem] border-gray-300 border-[0.13rem] flex flex-row justify-between align-center items-center px-2 py-1 rounded-[1rem] cursor-pointer hover:bg-gray-100' onClick={() => setShowSpeedDropdown(!showSpeedDropdown)}>
                <div className="ml-2 text-sm flex flex-row gap-[.3rem]">
                  <span className="font-normal text-black text-xl">Speed:</span>
                  <span className="font-medium text-black text-xl">{selectedSpeed}</span>
                </div>
                <div className="ml-auto px-1 text-black">
                  {showSpeedDropdown ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                </div>
                {showSpeedDropdown && (
                  <ul className="absolute top-[110%] left-0 w-[11rem] bg-white border-gray-300 border-[0.13rem] rounded-[1rem] z-10 shadow-lg max-h-48 overflow-y-auto">
                    {speedOptions.map((speed, idx) => (
                      <li key={idx} className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-[1rem] text-black text-sm text-left" onClick={() => { setSelectedSpeed(speed); setShowSpeedDropdown(false); }}>{speed}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Download & Play Buttons */}
            <div className='w-[40%] h-full flex flex-row justify-end gap-[1rem] align-center items-center'>
              <div className='h-full w-[10rem] gap-[0.4rem] bg-white text-black border-gray-300 border-[0.1rem] rounded-[1rem] p-[1rem] flex justify-center align-center items-center hover:bg-gray-200 cursor-pointer'>
                <MdOutlineFileDownload className='text-3xl' />
                <span className='font-medium'>Download</span>
              </div>
              <div id='play' onClick={handlePlay} className='h-full gap-[0.5rem] w-[10rem] bg-[#2f43fa] text-white rounded-[1rem] p-[1rem] flex justify-center align-center items-center hover:bg-[#1524ad] cursor-pointer'>
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

          {/* Text Area */}
          <div className='w-full h-[23rem] bg-white mt-[2rem]'>
            <textarea name="input" id="speech" value={text} onChange={handleTextChange} className='text-2xl font-normal text-black w-full h-full resize-none overflow-y-auto outline-none border-none focus:outline-none focus:ring-0' />
          </div>

          {/* Bottom Controls */}
          <div className='w-full h-[3rem] bg-white mt-[2rem] flex flex-row justify-between align-center items-center text-center'>
            <div className='h-full w-[30rem] bg-white flex flex-row justify-start align-center items-center gap-[0.5rem]'>
              <div className='relative h-full'>
                <div className='h-full w-[9rem] bg-gray-300 text-black rounded-[1rem] border-gray-200 flex flex-row justify-around items-center align-center border-[0.1rem] hover:bg-gray-400 cursor-pointer' onClick={() => setShowSpeedDropdown(!showSpeedDropdown)}> {/* Reused showSpeedDropdown state, adjust if you need separate state for language dropdown */}
                  {selectedLang ? (
                    <>
                      <span className='font-xs text-black'>{selectedLang.country}</span>
                      <span className='text-xl text-black'>{selectedLang.languageName}</span> {/* Use languageName */}
                    </>
                  ) : (
                    <span className='text-xl text-black'>Select Lang</span>
                  )}
                  <FaChevronDown className="w-3 h-3" />
                </div>
                {/* Language Dropdown */}
                {showSpeedDropdown && ( // Reused showSpeedDropdown state, adjust if you need separate state for language dropdown
                  <ul className="absolute bottom-[110%] left-0 w-[17rem] bg-white border border-gray-300 rounded-[1rem] shadow-md z-50 max-h-48 overflow-y-auto">
                    {availableLanguagesForDropdown.map((lang, idx) => (
                      <li key={idx} className="px-3 py-2 text-black text-sm hover:bg-gray-100 cursor-pointer rounded-[1rem]" onClick={() => { setSelectedLang(lang); setShowSpeedDropdown(false); }}> {/* Reused showSpeedDropdown state, adjust if you need separate state for language dropdown */}
                        {lang.country} - {lang.languageName} ({lang.accent})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div onClick={() => handleSetTemplate('Podcast')} className='h-full w-[7rem] bg-gray-300 text-black rounded-[1rem] border-gray-200 flex justify-center items-center border-[0.1rem] hover:bg-gray-400 cursor-pointer'>Podcast</div>
              <div onClick={() => handleSetTemplate('Youtube')} className='h-full w-[7rem] bg-gray-300 text-black rounded-[1rem] border-gray-200 flex justify-center items-center border-[0.1rem] hover:bg-gray-400 cursor-pointer'>Youtube</div>
              <div onClick={() => handleSetTemplate('Training')} className='h-full w-[7rem] bg-gray-300 text-black rounded-[1rem] border-gray-200 flex justify-center items-center border-[0.1rem] hover:bg-gray-400 cursor-pointer'>Training</div>
            </div>
            <div className='h-full w-[10rem] bg-white text-black flex justify-center items-center text-lg'>
              {characterCount}/500 characters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
