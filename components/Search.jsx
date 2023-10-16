import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
const Search = () => {
  return (
    <div className="flex justify-center items-center px-3 mt-4 ">
      <input type="text" className="w-full bg-dropdown-background-hover rounded-l-md h-[32px] px-3 py-1 focus:outline-none"/>
      <AiOutlineSearch className="bg-dropdown-background-hover h-[32px] rounded-r-md w-[32px] px-1 text-gray-600 cursor-pointer"/>
      <AiFillCaretDown className="text-gray-600 w-6 h-6 ml-2 cursor-pointer"/> 
    </div>
  )
}
export default Search