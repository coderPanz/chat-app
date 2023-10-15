// import { useState } from "react"
"use client"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { useEffect } from 'react'
export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  // if(!session?.user.email) {
  //   router.push('/login')
  // }
  useEffect(() => {
    if(!session?.user.email) {
      router.push('/login')
    }
  }, [session?.user.email])

  return (
    <div>
      {
        session ? 
        <div>
          
        </div> :
        // 当没有登录时从主页跳转到登录界面过程中的显示画面
        <div>

        </div>
      }
    </div>
  )
}
