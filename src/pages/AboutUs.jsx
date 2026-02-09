import commit from "/commitment.png";
import check from "/check.png";
import suit from "/suitcase.png";
import users from "/user-check.png";
import user from "/user-search.png";
import office from "/free_office.png";
import idea from "/idea.png";
import plane from "/airplane.png";
import profit from "/non-profit.png";

const AboutUs = () => {
  return (
    <div className=" pt-[100px]">
      <div className="about rounded-[10px] mb-[97px] mx-5 sm:mx-8 lg:mx-[100px]">
        <div className="flex flex-col gap-4 sm:w-[923px]   text-center mx-auto text-white pt-[79px] pb-[55px]">
          <h1 className="text-[65px] font-extrabold leading-[70px] ">
            Bridging the Gap Between Talent and Opportunity{" "}
          </h1>
          <p className="text-[24px] font-normal leading-[100%] ">
            Work Nest is a human-centric platform designed to make your job
            search seamless, meaningful, and ultimately successful.
          </p>
        </div>

        <div className="flex justify-center gap-[18px] pb-[77px]">
          <button className="text-[22px] font-semibold bg-[#F85E1E] py-[15px] px-[34px] text-white rounded-[10px]">
            Browse Jobs
          </button>
          <button className="text-[22px] font-semibold border border-[#F85E1E] py-[15px] px-[34px] text-[#F85E1E] rounded-[10px]">
            Contact us{" "}
          </button>
        </div>
      </div>

      <div className="px-5 sm:px-8 lg:px-[100px] space-y-[50px] mb-[106px]">
        <div className="space-y-2.5">
          <h4 className="text-[36px] font-semibold leading-[100%] ">
            Numbers at a Glance
          </h4>
          <p className="text-[22px] leading-[100%] font-normal ">
            The scale of our impact across the global job market.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-[51px]">
          <div className="border border-[#F85E1E] rounded-[10px]  pl-[23px] py-10 space-y-[29px]">
            <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-[80px] h-[80px]">
              <img src={suit} alt="" className="w-[47px] h-[47px]" />
            </div>
            <div className="">
              <p className="text-[24px]  ">Jobs Posted</p>
              <p className="text-[48px] font-extrabold text-[#F85E1E]">500K+</p>
            </div>
          </div>

          <div className="border border-[#F85E1E] rounded-[10px]  pl-[23px] py-10 space-y-[29px]">
            <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-[80px] h-[80px]">
              <img src={users} alt="" className="w-[47px] h-[47px]" />
            </div>
            <div className="">
              <p className="text-[24px]  ">Users Hired</p>
              <p className="text-[48px] font-extrabold text-[#F85E1E]">1.2M</p>
            </div>
          </div>

          <div className="border border-[#F85E1E] rounded-[10px]  pl-[23px] py-10 space-y-[29px] ">
            <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-[80px] h-[80px]">
              <img src={office} alt="" className="w-[47px] h-[47px] " />
            </div>
            <div className="">
              <p className="text-[24px]  ">Partner Companies </p>
              <p className="text-[48px] font-extrabold text-[#F85E1E]">15K+</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F0F2F4] border px-[100px] border-[#CCCCCC] mb-[78px] ">
        <div className="h-[327px] text-center flex flex-col justify-center gap-10 px-[35px]">
          <h4 className="text-[36px] font-semibold leading-[120%] ">
            Our Mission
          </h4>
          <p className="text-[24px] leading-[120%] font-normal text-center">
            At Work Nest our work is to redefine the recruitment landscape by
            creating a seamless, transparent, and efficient ecosystem where
            every professional finds their purpose and every employer finds
            their next innovator.
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-8 lg:px-[100px] space-y-[50px] mb-[50px]">
        <div className="space-y-2.5">
          <h4 className="text-[36px] font-semibold leading-[100%] ">
            Tailored Solutions
          </h4>
          <p className="text-[22px] leading-[100%] font-normal ">
            Whether you are looking to take the next step in your career or
            building a high-performing team{" "}
          </p>
        </div>

        <div className="flex justify-between">
          <div className="bg-[#F0F2F4] border border-[#CCCCCC] rounded-[10px]  pl-[23px] py-10 space-y-[29px] rounded-[10px]">
            <div className=" py-10 px-[17px] w-[525px] space-y-[29px] ">
              <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-[80px] h-[80px]">
                <img src={user} alt="" className="w-[47px] h-[47px]" />
              </div>
              <div className="space-y-2.5">
                <p className="text-[24px] font-bold leading-[100%]  ">
                  For Job Seekers{" "}
                </p>
                <p className="text-[20px] leading-[120%] text-[#7A7A7A]">
                  Access a curated list of opportunities personalized career
                  recommendations and a simplified application process to help
                  you land your dream role . Our platform provides insights into
                  company culture and growth paths.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="#F0F2F4 rounded-[10px]  pl-[23px] py-10 space-y-[29px] rounded-[10px] bg-[#F0F2F4] border border-[#CCCCCC]">
            <div className=" py-10 px-[17px] w-[525px] space-y-[29px] ">
              <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-[80px] h-[80px]">
                <img src={suit} alt="" className="w-[47px] h-[47px]" />
              </div>
              <div className="space-y-2.5">
                <p className="text-[24px] font-bold leading-[100%]  ">
                  For Employers
                </p>
                <p className="text-[20px] leading-[120%] text-[#7A7A7A]">
                  Gain access to a global pool of qualified candidates advance
                  screening tools, and a streamlined hiring workflow to scale
                  your business. We help you build teams that matter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F0F2F4] border px-[100px] border-[#CCCCCC]  ">
        <div className="h-[327px] text-center flex flex-col justify-center gap-10 px-[35px]">
          <h4 className="text-[36px] font-semibold leading-[120%] ">
            Our Values
          </h4>
          <p className="text-[24px] leading-[120%] font-normal text-center">
            The core principies that drive our decision-making and platform
            development every single day
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-8 lg:px-[100px] my-[50px]">
        <div className="grid grid-cols-3 gap-[51px] h-[280px]">
          <div className="#F0F2F4 rounded-[10px]   space-y-[29px] rounded-[10px] bg-[#F0F2F4] border border-[#CCCCCC]">
            <div className="w-[379px]  gap-[29px] flex flex-col items-center justify-center pt-10 mx-auto">
              <img src={idea} alt="" />
              <div className="space-y-[3px] text-center">
                <p className="text-[24px] font-bold leading-[120%]  ">
                  Innovation
                </p>
                <p className="text-[20px] leading-[120%] text-[#7A7A7A]">
                  We continuously push the boundaries of what’s possible in
                  recruitment to serve you better+
                </p>
              </div>
            </div>
          </div>

          <div className="#F0F2F4 rounded-[10px]   space-y-[29px] rounded-[10px] bg-[#F0F2F4] border border-[#CCCCCC]">
            <div className="w-[379px]  gap-[29px] flex flex-col items-center justify-center pt-10 mx-auto">
              <img src={profit} alt="" />
              <div className="space-y-[3px] text-center">
                <p className="text-[24px] font-bold leading-[120%]  ">
                  Integrity
                </p>
                <p className="text-[20px] px-[39px] leading-[120%] text-[#7A7A7A]">
                  Transparency and honesty are at the heart of every interaction
                  on our platform
                </p>
              </div>
            </div>
          </div>

          <div className="#F0F2F4 rounded-[10px]   space-y-[29px] rounded-[10px] bg-[#F0F2F4] border border-[#CCCCCC]">
            <div className="w-[379px]  gap-[29px] flex flex-col items-center justify-center pt-10 mx-auto">
              <img src={plane} alt="" />
              <div className="space-y-[3px] text-center">
                <p className="text-[24px] font-bold leading-[120%]  ">
                  Scalability
                </p>
                <p className="text-[20px] px-[20px] text-center leading-[120%] text-[#7A7A7A]">
                  Our tools are built to grow alongside your ambition. whether
                  you are start up or an enterprise
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-8 lg:px-[100px] flex gap-[60px] items-start">
        <img src={commit} alt="" />
        <div className="w-[513px] space-y-[30px]">
          <div className="space-y-[14px]">
            <h4 className="text-[36px] font-bold leading-[120%]">
              Our Commitment
            </h4>
            <p className="text-[20px] leading-[120%] text-[#7F7F7F] font-normal ">
              We committed to more than just listing jobs, we are committed to
              building careers. Our teamwork's tirelessly to ensure that our
              algorithms prioritize quality over quantity, matching candidates
              based on skills, potentials and cultural fits.
            </p>
          </div>

          <div className="flex gap-5 items-start">
            <img src={check} alt="" />
            <div className="flex flex-col gap-[14px]">
              <h5 className="text-[24px] leading-[100%] font-normal ">
                Human- Centric Design
              </h5>
              <p className="text-[20px] leading-[100%] font-normal ">
                User experience is at the core of everything we build
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <img src={check} alt="" />
            <div className="flex flex-col gap-[14px]">
              <h5 className="text-[24px] leading-[100%] font-normal ">
                Global Reach
              </h5>
              <p className="text-[20px] leading-[100%] font-normal ">
                Connecting talent across borders and tameness seam lessy
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#000000] text-white mt-[50px] py-[30px] flex flex-col gap-[15px] items-center justify-center">
        <h4 className="text-[36px] font-semibold leading-[120%] ">
          Ready to find your next nest?
        </h4>
        <p className="text-[25px] leading-[120%] font-normal ">
          Join thousands of companies and professionals growing with us.
        </p>
        <button className="text-[22px] font-semibold bg-[#F85E1E] py-[15px] px-[34px] text-white rounded-[10px]">
          Browse Jobs
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
