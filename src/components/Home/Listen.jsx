import bgImage from "/src/assets/images/bg-image.png"

const Listen = () => {
    return (
        <>
            <div className='bg-black w-[75%] h-[60rem] mt-[20rem] relative flex flex-col justify-center items-center object-cover overflow-visible'>
                <img className='absolute z-10 w-[100rem] h-[50rem] object-focus' src={bgImage} alt="error" />
                <div className=' w-[45rem] h-[15rem] relative z-20 flex flex-col justify-around items-center align-center text-center rounded-[1rem]'>
                    <h1 className='text-[4rem] font-medium'>LISTEN TO ANYTHING</h1>

                    <button className="group relative inline-flex items-center overflow-hidden rounded-[1rem] border-2 border-transparent bg-white px-[2rem] py-[0.5rem] text-[1rem] font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 hover:px-[2rem] transition-all duration-300 ease-in-out">
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
            </div>
            <div className='w-[75%] h-[10rem] bg-black mt-[10rem] flex flex-row justify-between align-center items-center'>
                <div className='bg-black w-[30%] h-full justify-center align-center items-start text-start flex flex-col border-t-[0.1rem] border-t-gray-600'>
                    <h1 className='font-medium text-[2rem] text-white'>200+ human voices</h1>
                    <p className='text-white font-medium text-[1.2rem] mt-[1.5rem]'>Enjoy over 200 natural, lifelike voices across 60+ languages or clone your voice</p>
                </div>
                <div className='bg-black w-[30%] h-full justify-center align-center items-start text-start flex flex-col border-t-[0.1rem] border-t-gray-600'>
                    <h1 className='font-medium text-[2rem] text-white'>Read 4.5x Faster</h1>
                    <p className='text-white font-medium text-[1.2rem] mt-[1.5rem]'>Our users save up to 9hrs a week by using Speechify to speed read</p>
                </div>
                <div className='bg-black w-[30%] h-full justify-center align-center items-start text-start flex flex-col border-t-[0.1rem] border-t-gray-600'>
                    <h1 className='font-medium text-[2rem] text-white'>Instant AI Summaries</h1>
                    <p className='text-white font-medium text-[1.2rem] mt-[1.5rem]'>We summarize every reading so you get the takeaways right away</p>
                </div>

            </div>
            <div className='w-[75%] h-[30rem] bg-black mt-[4rem] flex flex-row justify-between align-center items-center'>
                <div className='bg-black w-[30%] h-full justify-center align-center items-start text-start flex flex-col border-t-[0.1rem] border-t-gray-600'>
                    <video autoPlay
                        loop
                        muted
                        playsInline
                        className='w-full h-full object-cover rounded-lg' src="https://website.cdn.speechify.com/human-voices-video.mp4"></video>
                </div>
                <div className='bg-black w-[30%] h-full justify-center align-center items-start text-start flex flex-col border-t-[0.1rem] border-t-gray-600'>
                    <video src="https://website.cdn.speechify.com/04-SPEED%20CARD.mp4"></video>
                </div>
                <div className='bg-black w-[30%] h-full justify-center align-center items-start text-start flex flex-col border-t-[0.1rem] border-t-gray-600'>
                    <video autoPlay
                        loop
                        muted
                        playsInline
                        className='w-full h-full object-cover rounded-lg' src="https://website.cdn.speechify.com/ai-summary-1.mp4"></video>
                </div>
            </div>
        </>
    )
}

export default Listen