import React from "react";

const Footer = () => (
  <footer class="flex justify-center">
    <div class="flex max-w-[960px] flex-1 flex-col">
      <footer class="flex flex-col gap-6 px-5 py-10 text-center @container">
        <div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
          <a
            class="text-[#94b0c7] text-base font-normal leading-normal min-w-40"
            href="#"
          >
            API Documentation
          </a>
          <a
            class="text-[#94b0c7] text-base font-normal leading-normal min-w-40"
            href="#"
          >
            Support
          </a>
          <a
            class="text-[#94b0c7] text-base font-normal leading-normal min-w-40"
            href="#"
          >
            Terms of Service
          </a>
          <a
            class="text-[#94b0c7] text-base font-normal leading-normal min-w-40"
            href="#"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  </footer>
);

export default Footer;
