
// import { useState } from "react"
"use client"
import { useRouter } from 'next/navigation'
export default function Home() {

  const router = useRouter()
  const isLogin = false
  if(!isLogin) {
    router.push('/login')
  }
  return (
    <div>Hello React!</div>
  )
}
