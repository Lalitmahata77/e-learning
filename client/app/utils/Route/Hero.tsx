import React,{FC} from "react";
import { BiSearch } from "react-icons/bi";



type Props = {}

const Hero:FC<Props> = (props) => {
  return (
    // <div className="w-full 1000px:flex items-center">
    //     <div className=" absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation">
    //         <div className=" 1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
                
    //             <img
    //             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC4_RubuZRDpU_7MisbZLsjKuaTtnmJQxzSA&s"
    //              alt="" 
    //              className=" object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
    //              />
    //         </div>
    //         <div>

    //         </div>
    //     </div>
    // </div>
    
  <>
 <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl dark:text-white">
                Best Online Education with
                <div className="relative inline-flex">
                  <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
                  <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl dark:text-white">
                    InfyEduTech.
                  </h1>
                </div>
              </h1>
              <p className="mt-8 text-base text-black sm:text-xl dark:text-white">
                Your Gateway to Knowledge and Growth. Discover a world of
                comprehensive learning resources, expert guidance, and
                innovative tools designed to empower students and professionals
                alike on their educational journey.
              </p>
              <div className="mt-10 flex items-center gap-5 md:gap-0 sm:flex sm:items-center sm:space-x-8">
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600"
                  role="button"
                >
                  Get Started
                </a>
                {/* <a
                  href="#"
                  title=""
                  className="inline-flex items-center mt-6 text-base font-semibold transition-all duration-200 sm:mt-0 hover:opacity-80"
                >
                  <svg
                    className="w-10 h-10 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      fill="#F97316"
                      stroke="#F97316"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Watch video
                </a> */}
            <div className=" dark:text-white  text-black border-2 rounded-md ">
        <input type="search" placeholder="search courses.." className="py-1 outline-none max-w-[156px] sm:max-w-none placeholder:text-xs sm:placeholder:text-sm font-bold text-lg px-2"/>
            </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                className="w-[70%]"
                src="https://freepngimg.com/thumb/girl/168680-woman-young-free-clipart-hd.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

  </>
  )
}

export default Hero