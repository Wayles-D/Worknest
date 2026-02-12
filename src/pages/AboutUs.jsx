import commit from "/commitment.png";
import { Link } from "react-router";
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
    <div className="container">
      <div className="about rounded-[10px] mb-24">
        <div className="flex flex-col gap-4  text-center mx-auto text-white pt-20 pb-14">
          <h1 className="text-[40px] md:text-[65px] font-extrabold md:leading-17 leading-[120%]">
            Bridging the Gap Between Talent and Opportunity{" "}
          </h1>
          <p className="text-[18px] md:text-[24px] font-normal leading-[100%] ">
            Work Nest is a human-centric platform designed to make your job
            search seamless, meaningful, and ultimately successful.
          </p>
        </div>

        <div className="flex justify-center gap-[18px] pb-[77px]">
          <Link to={"/jobs"}>
            <button className="text-[22px] font-semibold bg-[#F85E1E] py-[15px] px-[34px] text-white rounded-[10px] cursor-pointer">
              Browse Jobs
            </button>
          </Link>
          <button className="text-[22px] font-semibold border border-[#F85E1E] py-[15px] px-[34px] text-[#F85E1E] rounded-[10px]">
            Contact us{" "}
          </button>
        </div>
      </div>

      <div className=" space-y-13 mb-27">
        <div className="space-y-2.5">
          <h4 className="text-[36px] font-semibold leading-[100%] ">
            Numbers at a Glance
          </h4>
          <p className="text-[22px] leading-[100%] font-normal ">
            The scale of our impact across the global job market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-13">
          <div className="border border-[#F85E1E] rounded-[10px]  pl-6 py-10 space-y-7">
            <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-20 h-20">
              <img src={suit} alt="" className="w-12 h-12" />
            </div>
            <div className="">
              <p className="text-[24px]  ">Jobs Posted</p>
              <p className="text-[48px] font-extrabold text-[#F85E1E]">500K+</p>
            </div>
          </div>

          <div className="border border-[#F85E1E] rounded-[10px]  pl-6 py-10 space-y-7">
            <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-20 h-20">
              <img src={users} alt="" className="w-12 h-12" />
            </div>
            <div className="">
              <p className="text-[24px]  ">Users Hired</p>
              <p className="text-[48px] font-extrabold text-[#F85E1E]">1.2M</p>
            </div>
          </div>

          <div className="border border-[#F85E1E] rounded-[10px]  pl-6 py-10 space-y-7 ">
            <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-20 h-20">
              <img src={office} alt="" className="w-12 h-12 " />
            </div>
            <div className="">
              <p className="text-[24px]  ">Partner Companies </p>
              <p className="text-[48px] font-extrabold text-[#F85E1E]">15K+</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F0F2F4] border h-82 border-[#CCCCCC] mb-20 ">
        <div className="text-center flex flex-col justify-center gap-5 px-9 py-10 md:py-20">
          <h4 className="text-[36px] font-semibold leading-[120%] ">
            Our Mission
          </h4>
          <p className="text-[20px] md:text-[24px] leading-[120%] font-normal text-center">
            At Work Nest our work is to redefine the recruitment landscape by
            creating a seamless, transparent, and efficient ecosystem where
            every professional finds their purpose and every employer finds
            their next innovator.
          </p>
        </div>
      </div>

      <div className=" space-y-13 mb-13">
        <div className="space-y-2.5">
          <h4 className="text-[36px] font-semibold leading-[100%] ">
            Tailored Solutions
          </h4>
          <p className="text-[22px] leading-[100%] font-normal ">
            Whether you are looking to take the next step in your career or
            building a high-performing team{" "}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-[#F0F2F4] border border-[#CCCCCC] pl-6 py-10 space-y-7 rounded-[10px]">
            <div className=" py-10 px-4 space-y-7 ">
              <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-20 h-20">
                <img src={user} alt="" className="w-12 h-12" />
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

          <div className="pl-6 py-10 space-y-7 rounded-[10px] bg-[#F0F2F4] border border-[#CCCCCC]">
            <div className=" py-10 px-4 space-y-7">
              <div className="rounded-[10px]  bg-[#FFE9E3] flex justify-center items-center w-20 h-20">
                <img src={suit} alt="" className="w-12 h-12" />
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

      <div className="bg-[#F0F2F4] border  border-[#CCCCCC]  ">
        <div className="h-82 text-center flex flex-col justify-center gap-10 px-9">
          <h4 className="text-[36px] font-semibold leading-[120%] ">
            Our Values
          </h4>
          <p className="text-[24px] leading-[120%] font-normal text-center">
            The core principies that drive our decision-making and platform
            development every single day
          </p>
        </div>
      </div>

      <div className=" my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-7 rounded-[10px] bg-[#F0F2F4] border border-[#CCCCCC]">
            <div className="gap-5 md:gap-7 flex flex-col items-center justify-center md:pt-10 p-4 ">
              <img src={idea} alt="" />
              <div className="space-y-1 text-center">
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

          <div className="space-y-7 rounded-[10px] bg-[#F0F2F4] border border-[#CCCCCC]">
            <div className="gap-5 md:gap-7 flex flex-col items-center justify-center pt-10 p-4">
              <img src={profit} alt="" />
              <div className="space-y-1 text-center">
                <p className="text-[24px] font-bold leading-[120%]  ">
                  Integrity
                </p>
                <p className="text-[20px] px-10 leading-[120%] text-[#7A7A7A]">
                  Transparency and honesty are at the heart of every interaction
                  on our platform
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-7 rounded-[10px] bg-[#F0F2F4] border border-[#CCCCCC]">
            <div className="gap-7 flex flex-col items-center justify-center pt-10 p-4">
              <img src={plane} alt="" />
              <div className="space-y-1 text-center">
                <p className="text-[24px] font-bold leading-[120%]  ">
                  Scalability
                </p>
                <p className="text-[20px] px-5 text-center leading-[120%] text-[#7A7A7A]">
                  Our tools are built to grow alongside your ambition. whether
                  you are start up or an enterprise
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-start">
        <img src={commit} alt="" />
        <div className="space-y-9">
          <div className="space-y-5">
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
            <div className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-4">
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

      <div className="bg-[#000000] text-white mt-13 px-4 py-7 flex flex-col gap-4 items-center justify-center">
        <h4 className="text-[36px] font-semibold leading-[120%] ">
          Ready to find your next nest?
        </h4>
        <p className="text-[25px] leading-[120%] font-normal ">
          Join thousands of companies and professionals growing with us.
        </p>
        <Link to={"/jobs"}>
          <button className="text-[22px] font-semibold bg-[#F85E1E] py-[15px] px-[34px] text-white rounded-[10px] cursor-pointer">
            Browse Jobs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
