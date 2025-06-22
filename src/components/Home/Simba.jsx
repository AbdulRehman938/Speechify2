import React from 'react'
import simba from "/src/assets/images/simba.png"

const Simba = () => {
    return (
        <>
            <div className='w-[75%] h-[25rem] bg-black flex flex-row justify-between align-center items-center mt-[8rem] border-t-[0.1rem] border-t-gray-700'>
                <div className='h-full w-[45%] bg-black mt-[5rem]'>
                    <h1 className='font-medium text-[4rem] leading-[4rem] text-white'>Introducing Our <br /> Text To Speech API</h1>
                    <p className='text-white text-[1.5rem] mt-[1rem]'>We're sharing an AI Voice API that delivers <br /> Speechify's most natural and beloved AI voices <br /> directly with developers</p>
                    <div className=' w-[50%] h-[3.5rem] mt-[2rem] flex flex-row justify-between align-center items-center'>
                        <div className="flex items-center gap-4">
                            <button className="group relative inline-flex items-center overflow-hidden rounded-[1rem] border-2 border-transparent bg-white px-[1rem] py-[1rem] text-[1rem] font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 hover:px-[1.2rem] transition-all duration-300 ease-in-out">
                                <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-[#2f43fa] opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                                <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-[-1rem]">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </span>
                                <span className="relative transform duration-700 group-hover:-translate-x-1">
                                    Get API Access
                                </span>
                            </button>
                        </div>
                        <span className='text-gray-600 cursor-pointer hover:text-white text-[1.3rem]'>Contact Sales</span>
                    </div>
                </div>
                <div className='h-[130%] w-[50rem] mt-[14rem]'>
                    <img className='object-cover' src={simba} alt="error" />
                </div>
            </div>
        </>
    )
}

export default Simba