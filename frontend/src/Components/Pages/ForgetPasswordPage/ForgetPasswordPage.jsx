import React from "react";
import "./ForgetPasswordPage.css";

import Button from "../../Layout/Button";

export default function ForgetPasswordPage() {
  return (
    <div className='ForgetPasswordPage-section text-white flex flex-col items-center justify-center py-[6rem]'>
      <div className='ForgetPasswordPage-section-form w-[30%] flex flex-col gap-[1rem]'>
        <h2 className='text-[35px]'>Forgot Password</h2>
        <form className='flex flex-col gap-[1rem]'>
          <div className='flex flex-col gap-[6px]'>
            <label>Email</label>
            <input
              type='text'
              className='outline-none rounded-[2px] bg-[#A55769] p-[6px]'
              placeholder='Enter your registered email'
            />
          </div>
        </form>

        <Button onClick={""} text={"Submit"} />
      </div>
    </div>
  );
}
