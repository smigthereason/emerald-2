import React, { useState } from "react";
import contactIcon from "/src/assets/icons/contact.png";

const Contact: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleFeedbackClick = () => {
    setIsRightPanelActive(true);
  };

  const handleEnquiryClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative -top-20">
      <div
        className={`
          relative overflow-hidden w-[1280px] max-w-full min-h-[480px] 
          bg-white rounded-2xl shadow-2xl 
          transition-all duration-1000 ease-in-out
          ${isRightPanelActive ? "right-panel-active" : ""}
        `}
      >
        {/* Enquiry Form */}
        <div
          className={`
            absolute top-0 h-full w-1/2 transition-all duration-1000 ease-in-out z-1
            ${
              isRightPanelActive
                ? "translate-x-full opacity-100 z-5 animate-show"
                : "opacity-0 z-1"
            }
          `}
        >
          <form className="panel bg-white flex flex-col items-center justify-center h-full text-center px-12">
            <h1 className="font-bold text-2xl mb-2">Make an Enquiry</h1>
            <div className="social-container flex my-5">
              <img src={contactIcon} alt="contact" className="w-10 h-10" />
            </div>
            <span className="text-xs">Fill in the details below</span>
            <input
              type="text"
              placeholder="Your Name"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
            />
            <textarea
              placeholder="Your Message"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md h-24"
            ></textarea>
            <button
              className="
               bg-[#D8798F] text-white rounded-full border border-[#B25671] 
                text-xs font-bold uppercase px-12 py-3 
                tracking-wider mt-4 
                transition-transform duration-200 
                hover:opacity-90 active:scale-95
              "
            >
              Submit Enquiry
            </button>
          </form>
        </div>

        {/* Feedback Form */}
        <div
          className={`
            absolute top-0 h-full w-1/2 z-2 transition-all duration-1000 ease-in-out
            ${isRightPanelActive ? "-translate-x-full" : ""}
          `}
        >
          <form className="panel bg-white flex flex-col items-center justify-center h-full text-center px-12">
            <h1 className="font-bold text-2xl mb-2">Give Feedback</h1>
            <div className="social-container flex my-5">
              <img src={contactIcon} alt="feedback" className="w-16 h-16" />
            </div>
            <span className="text-xs">We value your feedback</span>
            <input
              type="text"
              placeholder="Your Name"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md"
            />
            <textarea
              placeholder="Your Feedback"
              className="bg-gray-100 border-none p-3 my-2 w-full rounded-md h-24"
            ></textarea>
            <button
              className="
                bg-[#D8798F] text-white rounded-full border border-[#B25671] 
                text-xs font-bold uppercase px-12 py-3 
                tracking-wider mt-4 
                transition-transform duration-200 
                hover:opacity-90 active:scale-95
              "
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Overlay */}
        <div
          className={`
            absolute top-0 left-1/2 w-1/2 h-full overflow-hidden 
            transition-transform duration-1000 ease-in-out z-100
            ${isRightPanelActive ? "-translate-x-full" : ""}
          `}
        >
          <div
            className={`
              panel bg-gradient-to-t from-[#d88598ab] to-[#e47a93] 
              text-white relative left-[-100%] h-full w-[200%]
              transition-transform duration-1000 ease-in-out
              ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"}
            `}
          >
            {/* Left Overlay Panel */}
            <div className="absolute flex flex-col items-center justify-center text-center w-1/2 h-full px-10">
              <h1 className="text-3xl font-bold mb-4">Have a Question?</h1>
              <p className="text-sm leading-5 tracking-wider mb-5">
                Reach out to us for any enquiries.
              </p>
              <button
                onClick={handleEnquiryClick}
                className="ghost bg-transparent border border-white text-white rounded-full text-xs font-bold uppercase px-12 py-3 tracking-wider transition-transform duration-200 hover:bg-white hover:text-[#D8798F]"
              >
                Enquiry Form
              </button>
            </div>

            {/* Right Overlay Panel */}
            <div className="absolute right-0 flex flex-col items-center justify-center text-center w-1/2 h-full px-10">
              <h1 className="text-3xl font-bold mb-4">Share Your Thoughts!</h1>
              <p className="text-sm leading-5 tracking-wider mb-5">
                Let us know how we can improve.
              </p>
              <button
                onClick={handleFeedbackClick}
                className="ghost bg-transparent border border-white text-white rounded-full text-xs font-bold uppercase px-12 py-3 tracking-wider transition-transform duration-200 hover:bg-white hover:text-[#D8798F]"
              >
                Feedback Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
