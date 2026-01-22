import React from "react";

const HomePage = () => {
  return (
    <div className="px-[]">
      <div className="grid grid-cols-2 pl-[100px] pr-[99px]">
        <div>
          <div>
            <p className="bg-[#FEEEEA]">OVER 5,O00+ ACTIVE JOBS</p>
            <h1 className="text-[65px]">Unlock your next career milestone </h1>
            <p>
              Skip the noise. Every listing on WorkNest is hand-picked,
              verified, and posted directly by our platform administrators to
              ensure high-quality career matches.
            </p>

            <div>
              <div>
                <img src="" alt="" />
                <p>Search roles or skills...</p>
              </div>
              <div>
                <img src="" alt="" />
                <p>City or remote</p>
              </div>
            </div>
          </div>

          <button>Search Job</button>
        </div>
        <div className="bg-cover h-[300px] bg-[url('/faa45cca433fba8069bed652372bc00b9b9ec941.jpg')] bg-center">
          <input type="text" />
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
