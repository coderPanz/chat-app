"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { LoginForm, Tips, Avatar } from "@/components"
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
  const { data: session } = useSession()
  // 记录表单是否弹出
  const [ isShowForm, setIsShowForm ] = useState(false)
  // 记录登录和注册是否成功
  const [ isSuccess, setIsSuccess ] = useState(false)

  const [ userName, setUserName ] = useState('')
  const [ email, setEmail ] = useState('')

  // 初始化username,email
  useEffect(() => {
    setUserName(session?.user.name || '')
    setEmail(session?.user.email || '')
  }, [session])

  // 监听表单输入
  const handleUserNameChange = (e) => {
    setUserName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  // 点击弹出表单
  const handleCreate = () => {
    const loginFormEl = document.getElementById('LoginForm')
    const avatarEl = document.getElementById('avatar')
    setIsShowForm(preState => !preState)
    if(!isShowForm) {
      loginFormEl.classList.remove('scale-0')
      loginFormEl.classList.add('scale-100')
      avatarEl.classList.remove('scale-0')
      avatarEl.classList.add('scale-100')
    } else {
      loginFormEl.classList.add('scale-0')
      loginFormEl.classList.remove('scale-100')
      avatarEl.classList.add('scale-0')
      avatarEl.classList.remove('scale-100')
    }
  }

  return (
    <div className="bg-panel-header-background h-screen w-screen flex justify-center items-center">
      <Image 
        src='/whatsapp.gif'
        width={300}
        height={300}
        alt="whatsapp.gif"
        priority // 高优先级并 预加载
      />
      <div className="text-white ml-10 text-center">
        <p className="text-7xl text-white italic font-semibold">
          畅聊
        </p>
        {/* <div className="mt-7 ml-3">
          <button id="login-in" onClick={handleRegister} className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/50 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 py-1 px-2 rounded text-lg ">登录</button>
          <button id="login-up" onClick={handleRegister} className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 py-1 px-3 rounded text-lg ml-8">注册</button>
          <Tips isSuccess={isSuccess}/>
        </div>
        <div className="">
          <LoginForm
          userName={userName}
          handleUserName={handleUserName}
          passWord={passWord}
          handlePassWord={handlePassWord}
          />
        </div> */}
        {session ? 
        <div className="relative">
          <button onClick={handleCreate} className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/50 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 px-4 py-1 rounded mt-5 text-gray-200">
            创建用户
          </button>
          <Avatar imageUrl={session.user.image}/>
          <LoginForm 
            userName={userName} 
            email={email}
            handleEmailChange={handleEmailChange}
            handleUserNameChange={handleUserNameChange}
          />
        </div>
         : 
        <div onClick={() => signIn()} className="bg-green-600 px-7 py-2 flex justify-center items-center text-white rounded hover:bg-green-700 shadow-lg shadow-green-500/50 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 mt-5">
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            data-view-component="true"
            className="octicon octicon-mark-github v-align-middle color-fg-default"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          <span className="ml-3">登录</span>
        </div>}
      </div>
      
    </div>
  )
}
export default Login