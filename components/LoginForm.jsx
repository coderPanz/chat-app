"use client"
const LoginForm = ({ userName, email, handleEmailChange, handleUserNameChange }) => {

  return (
    <div id="LoginForm" className="text-center mt-[75px] scale-0 transform duration-700 origin-[0%_-70%] absolute ml-[23px]">
      <div>
        <input value={userName} onChange={handleUserNameChange} className="bg-input-background h-10 pl-3 rounded text-gray-400" type="text" placeholder="username" />
      </div>
      <div className="mt-5">
        <input value={email} onChange={handleEmailChange} className="bg-input-background h-10 pl-3 rounded text-gray-400" type="text" placeholder="password"/>
      </div>
    </div>
  )
}
export default LoginForm