"use client"
import Image from "next/image"
import { signIn, useSession } from "next-auth/react"
import { AiFillGithub } from "react-icons/ai";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()
  // 一开始进入login页面, session为空, useEffect监控session.user.isNewUser的改变, 若登录成功回调后, session.user.isNewUser发生改变, 根据isNewUser就可以跳转到对应的页面了!

  // 这是一个错误示例: 导致闪屏
  // useEffect(() => {
  //   // 是新用户跳转到创建帐号路由, 不是新用户跳转到主页面
  //   if(session?.user.isNewUser) {
  //     router.push('/create-account')
  //   } else {
  //     router.push('/')
  //   }
  // }, [session?.user.isNewUser])

  // 必须要限制session?.user.isNewUser的类型强制等于boolean才进行路由跳转, 如果使用if-else语句的话会导致组件挂载时其中之一的跳转操作就会被会被执行, 这是错误的!
  useEffect(() => {
    if(session?.user.isNewUser === true) {
      router.push('/create-account')
    }
    else if(session?.user.isNewUser === false) {
      router.push('/')
    }
    
  }, [session?.user.isNewUser])
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
        <div onClick={() => signIn()} className="bg-green-600 px-7 py-2 flex justify-center items-center text-white rounded hover:bg-green-700 shadow-lg shadow-green-500/50 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 mt-5 cursor-pointer">
          <AiFillGithub className="bg-black rounded w-[25px] h-[25px]"/>
          <span className="ml-3">登录</span>
        </div>
      </div>
    </div>
  )
  }
export default Login