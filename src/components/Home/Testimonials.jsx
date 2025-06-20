const Testimonials = () => {
  return (
    <>
             <div className='bg-black w-[75%] h-[30rem] mt-[10rem] flex flex-row justify-between align-center items-center'>
          <div className='bg-black w-[30%] flex flex-col justify-end align-start items-start'>
            <h1 className='text-white font-meium text-[1.5rem]'>Scan & Listen</h1>
            <p className='text-white font-medium text-[2.2rem] mt-[1rem]'>Use the app to snap a pic of any page and have Speechify read to you</p>
            <button className="group relative inline-flex items-center mt-[1rem] overflow-hidden rounded-[1rem] border-2 border-transparent bg-white px-[2rem] py-[0.5rem] text-[1rem] font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 hover:px-[2rem] transition-all duration-300 ease-in-out">
              <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-[#2f43fa] opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
              <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-[-1rem]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
                  </path>
                </svg>
              </span>
              <span className="relative transform duration-700 group-hover:-translate-x-1">
                Try for Free
              </span>
            </button>
          </div>
          <div className='bg-black h-full w-[60%]'>
            <video autoPlay
              loop
              muted
              playsInline
              className='w-full h-full object-cover rounded-[2rem]' src="https://website.cdn.speechify.com/video-phone-scan.webm"></video>
          </div>
        </div>
        <div className='bg-black w-[75%] h-[15rem] mt-[5rem] flex flex-col justify-center items-center align-center'>
          <h1 className='text-white text-[4rem] font-medium'>OUR LISTENERS LOVE US</h1>
          <p className='font-medium text-[1.2rem]'>Over 500k people have given Speechify 5 stars</p>
          <div className='font-normal text-gray-400 flex flex-row justify-center items-center align-center gap-2 cursor-pointer hover:text-white'>
            Read more reviews
            <GoArrowUpRight />
          </div>
        </div>
        <div className='bg-black mt-[5rem] w-[75%] h-[90rem] flex flex-row relative z-10 justify-between align-center items-center overflow-hidden'>
          <div className='bg-black flex flex-col gap-3 w-[24%] h-full'>
            <div className='w-full h-[30rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <img className='w-[8rem] h-[8rem]' src="src\assets\images\Richard-img.png" alt="error" />
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>Speechify is absolutely brilliant. Growing up with dyslexia this would have made a big difference. I’m so glad to have it today.</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>Sir Richard Branson, Business Magnate</p>
            </div>

            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>This is the only review I’ve ever written. I downloaded this app to help me read books about the stock market and finance while I do my day job. It brough me to the brink of tears at my desk. Love the app.</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>LEAHLIZ1989</p>
            </div>

            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>I absolutely love that this app has been invented. I read a ton of pdf documents as a lawyer and researcher and I will now be able to get through them faster and with much better comprehension than before!</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>MGOETS9941</p>
            </div>
          </div>
          <div className='bg-black w-[24%] h-full flex flex-col gap-3'>
            <div className='w-full h-[28rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <img className='w-[8rem] h-[8rem] bg-white rounded-full object-cover' src="src\assets\images\Gwyneth-img.png" alt="error" />
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>Speechify makes it easy to learn at 2x or even 3x the speed you read with your eyes.</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>Gwyneth Paltrow, Actress and Businesswoman</p>
            </div>


            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>I used to hate school because I'd spend hours just trying to read the assignments. Listening has been totally life changing. This app saved my education.</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>Ana</p>
            </div>


            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>This made my job 10x easier. I read scripts, conversations, and other text files all day, and this made it a lot easier to retain and wayyyyy faster. Thanks y’all! </p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>SERRIANKING82</p>
            </div>

            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>Miracle reader. Been looking for a program like this to proof read my work. Allows me to develop a personalized style of reading. Love it!</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>VACA-YOGI</p>
            </div>
          </div>
          <div className='bg-black w-[24%] h-full flex flex-col gap-5'>
            <div className='w-full h-[40rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <img className='w-[8rem] h-[8rem] bg-gray-700 rounded-full' src="src\assets\images\Ali_Abdaal-img.png" alt="error" />
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>If there’s one hill I’m going to die on, it’s that speed listening is the best way forward. Speechify is a game-changer for me.</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>Ali Abdaal, most followed Productivity Expert in the world.</p>
            </div>


            <div className='w-full h-[30rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>Mighty be one of the GOAT apps This is probably top 5 of greatest apps ever, you can literally read alone an entire book in a day. Easily worth the cost of the app.</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>TJV 34</p>
            </div>


            <div className='w-full h-[30rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>Excellent for comprehending medical textbooks more quickly and thoroughly!! This is awesome for keeping up with latest surgical techniques and technology.</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>Dr.K</p>
            </div>

            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>Miracle reader. Been looking for a program like this to proof read my work. Allows me to develop a personalized style of reading. Love it!</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>VACA-YOGI</p>
            </div>
          </div>
          <div className='bg-black w-[24%] h-full flex flex-col gap-4'>
            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>Amazing I have ADHD and I love to read but have piles of book that I have never touched. I downloaded this app and it has helped me read more and obtain information better for school! Love this app, I recommend it to everyone!</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>Jenemariee</p>
            </div>


            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>I am a resident and this app saves me a ton of time. I listen to PDF’s while walking to clinic, running, making coffee in the morning. </p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>THEODOTA</p>
            </div>


            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>Miracle reader. Been looking for a program like this to proof read my work. Allows me to develop a personalized style of reading. Love it!</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>VACA-YOGI</p>
            </div>

            <div className='w-full h-[25rem] bg-[#171717] rounded-[3rem] flex flex-col justify-start align-start items-start pl-[2rem] pr-[1.5rem] pt-[1rem]'>
              <div className='w-[40%] h-[3rem] flex relative top-[2rem] justify-between align-center items-center'>
                <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' /> <FaStar className='text-[1.2rem]' />
              </div>
              <p className='relative top-[2rem] font-medium text-white text-[1.2rem]'>Miracle reader. Been looking for a program like this to proof read my work. Allows me to develop a personalized style of reading. Love it!</p>
              <p className='relative top-[4rem] font-medium text-[1.2rem] opacity-[40%]'>VACA-YOGI</p>
            </div>

          </div>
        </div>
        <div className='bg-gradient-to-t from-black to-transparent w-[75%] h-[25rem] relative z-20 bottom-[20rem]'></div>
        <div id='div' className='flex bg-black w-[20rem] h-[3rem] relative z-40 bottom-[22rem] flex justify-between align-center items-center'>
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
          <div className='text-[1.2rem] cursor-pointer hover:text-white font-medium text-gray-400 relative left-[1rem] flex justify-around align-center items-center h-[2rem] w-[10rem]'>
            <p>Read Reviews</p>
            <GoArrowUpRight />
          </div>
        </div>
    </>
  )
}

export default Testimonials