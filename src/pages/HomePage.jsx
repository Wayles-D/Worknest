import React from "react";
import hero from "../../public/faa45cca433fba8069bed652372bc00b9b9ec941.jpg";

const HomePage = () => {
  return (
    <div className="mt-30 px-[]">
      <div className="grid grid-cols-2 items-center justify-between">
        <div className="w-[549px] ">
          <div className="flex flex-col items-start gap-[42px]">
            <p className="bg-[#FEEEEA] text-[14px] py-2.5 px-5 w-[227px] rounded-[15px] text-[#000000] ">
              OVER 5,O00+ ACTIVE JOBS
            </p>
            <h1 className="text-[65px] font-extrabold leading-[70px]  text-[#000000]">
              Unlock your next{" "}
              <span className="text-[#F86021]">career milestone</span>{" "}
            </h1>
            <p>
              Skip the noise. Every listing on WorkNest is hand-picked,
              verified, and posted directly by our platform administrators to
              ensure high-quality career matches.
            </p>

            <div className=" flex border border-[#00000036] rounded-[20px] p-5 gap-2.5">
              <div >
                <img src="" alt="" />
                <p>Search roles or skills...</p>
              </div>
                <div className="border border-[#000000]"></div>
              <div>
                <img src="" alt="" />
                <p>City or remote</p>
              </div>
            </div>
          </div>

          <button>Search Job</button>
        </div>
        <div className="">
          <img src={hero} alt="" />{" "}
        </div>
      </div>
      {/*  */}

      <div>
        <h4>How it works for job seekers</h4>
        <p>The journey to a better career starts here</p>

        <div>
          <div>
            <p> 1. Search</p>
            <h6>Filter by role, salary, and tech stack to find your fit.</h6>
          </div>

          <div>
            <p> 2. Apply</p>
            <h6>Filter by role, salary, and tech stack to find your fit.</h6>
          </div>

          <div>
            <p> 3. Track</p>
            <h6>Filter by role, salary, and tech stack to find your fit.</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
