import { SendHorizontal } from "lucide-react";
import facebook from "/facebook.png";
import instagram from "/instagram.png";
import whatsapp from "/whatsapp.png";
import location from "/location.png";
import call from "/call.png";
import mail from "/mail.png";

const ContactUs = () => {
  return (
    <div
      className="px-5 sm:px-8 lg:px-[100px]
"
    >
      <div className="sm:w-[745px] flex flex-col gap-[14px]">
        <h4 className="sm:text-[56px] text-[40px] font-black tracking-tighter leading-[120%] ">
          Get In Touch
        </h4>
        <p className="sm:text-[20px] text-[16px] font-medium sm:leading-[31px] text-[#8F8F8F] leading-[22px]">
          We are here to help you find your next great opportunity. Reach out to
          our team for support or inquiries
        </p>
      </div>

      <div className="flex lg:flex-row flex-col mt-[37px] lg:gap-5 gap-10">
        <form
          action=""
          className="lg:w-[696px] w-full py-[30px] sm:px-[35px] px-5 gap-[34px] flex flex-col border border-[#F3582C4D] rounded-[10px] "
        >
          <div className="flex sm:flex-row flex-col gap-[15.35px] items-center">
            <div className="w-full flex flex-col gap-[10.74px]">
              <label
                htmlFor="fullName"
                className="sm:text-[20px] text-[18px] font-bold "
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Said Money"
                className="sm:text-[16px] text-[14px]  font-medium border border-[#F3582C4D] rounded-[5.12px]  pl-[13.57px] h-[50px]"
              />
            </div>

            <div className=" w-full flex flex-col gap-[10.74px]">
              <label
                htmlFor="email"
                className="sm:text-[20px] text-[18px] font-bold "
              >
                Work Email
              </label>
              <input
                type="text"
                placeholder="Said@worknest.com"
                className="sm:text-[16px] text-[14px] font-medium  border border-[#F3582C4D] rounded-[5.12px]  pl-[13.57px] h-[50px]"
              />
            </div>
          </div>

          <div className=" flex flex-col gap-[10.74px]">
            <label htmlFor="email" className="sm:text-[20px] text-[18px] font-bold ">
              Subject
            </label>
            <input
              type="text"
              placeholder="Select Type"
              className="sm:text-[16px] text-[14px] font-medium  border border-[#F3582C4D] rounded-[5.12px]  pl-[13.57px] h-[50px] w-full"
            />
          </div>

          <div className=" flex flex-col gap-[10.74px]">
            <label htmlFor="email" className="sm:text-[20px] text-[18px] font-bold ">
              Message
            </label>

            <textarea
              name="message"
              id="message"
              placeholder=" Tell us more about your inquiry..."
              className="sm:text-[16px] text-[14px] font-medium  border border-[#F3582C4D] rounded-[5.12px]  pl-[10px] h-[149px] w-full resize-none"
            ></textarea>
          </div>

          <div className="flex bg-[#F3582C] py-[15px] px-[35px] gap-2.5 rounded-[10px] items-center self-start cursor-pointer">
            <button className="text-white sm:text-[20px] font-bold ">
              Send Message
            </button>
            <SendHorizontal className="text-[#FFFFFF] w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]" />
          </div>
        </form>


        <div className="py-[40px] sm:px-[35px] px-4 rounded-[10px] space-y-[34px] border-[#F5745066] border lg:w-[524px]">
          <h5 className="text-[24px] font-bold tracking-tight">
            Contact Information
          </h5>

          <div className="flex gap-4 items-start ">
            <div className="rounded-[10px]  bg-[#F3582C1A] shadow-xl flex justify-center items-center w-[45px] h-[45px]">
              <img src={location} alt="" className="w-[24px] h-[24px]" />
            </div>
            <div className="w-[249px] space-y-[3px]">
              <p className="sm:text-[20px] text-[18px] font-semibold">Office Address</p>
              <p className="sm:text-[18px] text-[16px] font-medium sm:leading-[26px] text-[#6B6B6B]">
                123 Tech Plaza, Suite 400 San Francisco, CA 94105
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start ">
            <div className="rounded-[10px]  bg-[#F3582C1A] shadow-xl flex justify-center items-center w-[45px] h-[45px]">
              <img src={mail} alt="" className="w-[24px] h-[24px]" />
            </div>
            <div className="w-[249px] space-y-[3px]">
              <p className="sm:text-[20px] text-[18px]  font-semibold">Support Email</p>
              <p className="sm:text-[18px] text-[16px] font-medium leading-[26px] text-[#6B6B6B]">
                Support@worknest.com
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start ">
            <div className="rounded-[10px]  bg-[#F3582C1A] shadow-xl flex justify-center items-center w-[45px] h-[45px]">
              <img src={call} alt="" className="w-[24px] h-[24px]" />
            </div>
            <div className="sm:w-[249px] space-y-[3px]">
              <p className="sm:text-[20px] text-[18px]  font-semibold">Phone Number </p>
              <p className="sm:text-[18px] text-[16px] font-medium leading-[26px] text-[#6B6B6B]">
                +234 (806)398-NEST
              </p>
            </div>
          </div>

          <hr className="w-full boder border-[#F3582C4D]" />
          <div className="space-y-[18px]">
            <h6 className="text-[20px] font-bold leading-[22px]">Follow Us</h6>
            <div className="flex  space-x-[18px]">
              <div className="rounded-[10px] border border-[#00000033] shadow-xl flex justify-center items-center w-[45px] h-[45px]">
                <img src={instagram} alt="" className="w-[26px] h-[26px]" />
              </div>

              <div className="rounded-[10px] border border-[#00000033] shadow-xl flex justify-center items-center w-[45px] h-[45px]">
                <img src={facebook} alt="" className="w-[26px] h-[26px]" />
              </div>

              <div className="rounded-[10px] border border-[#00000033] shadow-xl flex justify-center items-center w-[45px] h-[45px]">
                <img src={whatsapp} alt="" className="w-[26px] h-[26px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
