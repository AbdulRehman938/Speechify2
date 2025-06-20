import React from 'react'

const Studio2 = () => {
    return (
        <>
            <div className='bg-black w-[75%] h-[60rem] relative bottom-[10rem] flex flex-col justify-start items-start laign-start'>
                <h1 className='font-normal text-[8rem] text-white'>Introducing Studio</h1>
                <div className='w-full h-[50rem] bg-green-400 flex flex-row justify-center align-center align-center border-t-[0.1rem] border-t-gray-300'>
                    <div className='h-full bg-black w-[40%] flex flex-col justify-start align-start-items-start'>
                        <p className='font-normal mt-[1rem] text-[2rem] text-white'>Introducing Speechify Studio, a new suite of tools for creators and businesses to create voice overs, clones, and dubs for social media videos, ads, corporate training, podcasts, and any other voice needs. Choose from 1,000+ voices, 100+ languages & accents, 13+ emotions, and much more.</p>
                        <button className="group relative inline-flex items-center overflow-hidden rounded-[1rem] w-[30%] mt-[2rem] border-2 border-transparent bg-white px-[2.5rem] py-[1rem] text-[1rem] font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 hover:px-[2rem] transition-all duration-300 ease-in-out">
                            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-[#2f43fa] opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                            <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-[-1rem]">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                            <span className="relative transform duration-700 group-hover:-translate-x-1">
                                Try for Free
                            </span>
                        </button>
                    </div>
                    <div id='speech' className='h-full bg-blue-800 w-[60%] flex flex-col justify-between align-center items-center'>
                        <div className='w-fullk h-[49%] flex flex-row justify-between'>
                            <div className='bg-yellow-200 w-full h-full'></div>
                            <div className='bg-yellow-400 w-full h-full'></div>
                        </div>
                        <div className='w-fullk h-[49%] flex flex-row  justify-between'>
                            <div className='bg-yellow-200 w-full h-full'></div>
                            <div className='bg-yellow-400 w-full h-full'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Studio2