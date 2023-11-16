"use client"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
const Main = dynamic(() => import('../components/HomeUI/Main'))


export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  // const [ loginState, setLoginState ] = useState(false)
  // localStorage将数据存储为字符串, 若没有数据得到的是字符串undefined而不是undefined本身
  // 使用React.lazy()Suspense 时，客户端组件将默认进行预渲染（SSR）, 使用浏览器api时会出现报错, 这时候需要进行'延迟加载跳过ssr渲染'进行优化
  // localStorage.setItem('loginInfos', session?.user)
  // const isLogin = localStorage.getItem('loginInfos')
  useEffect(() => {
    if(!session?.user) {
      router.push('/login')
    }
  }, [session?.user])

  return (
    <div>
      {session?.user && <Main />}
    </div>
  )
}
