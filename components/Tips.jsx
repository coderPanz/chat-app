const Tips = ({ isSuccess }) => {
  return (
    <>
    {isSuccess ? <button id="tip" className="bg-green-700 h-[36px] w-28 rounded py-1 scale-0 transform duration-700 ml-8 text-lg">注册成功!</button> : <button id="tip" className="bg-red-700 h-[36px] w-28 rounded py-1 scale-0 transform duration-700 ml-8 text-lg">注册异常!</button>}
      
    </>
    
  )
}
export default Tips