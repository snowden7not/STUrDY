import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch}) => {

  return (
    <div className='w-[70%] flex items-center sm:px-4 max-sm:px-[3px]  bg-slate-100 rounded-md bg-white mx-auto my-[30px]'>
        <input type='text'  placeholder='Search Courses'  className='w-full text-xs bg-transparent py-[11px] outline-none' value={value} onChange={onChange} />
        {   value && 
            <IoMdClose className='text-xl text-slate-500  cursor-pointer hover:text-black mr-3' onClick={onClearSearch} />
        }
        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />
    </div>
  )
}

export default SearchBar