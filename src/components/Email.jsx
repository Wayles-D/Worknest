import React from 'react'

export default function Email() {
  return (
    <div>
        <form>
          <input type="email" name="email"
           placeholder='Enter your email' required className='mt-5 w-full rounded-[13px] border border-[#727171] p-3
           placeholder:text-[18px] text-[#6B7280] font-semibold'/>
           <button type='submit' className='mt-3 w-full rounded-[13px] bg-[#F85E1E] p-3 text-[#000000]'>
            <p className='text-[18px] font-semibold'>Subscribe</p>
           </button>
        </form>
    </div>
  )
}
