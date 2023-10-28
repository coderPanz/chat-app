"use client"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { useEffect } from 'react'
import { Main } from '@/components'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if(!session?.user.email) {
      router.push('/login')
    }
  }, [session?.user.email])

  return (
    <div>
      {session && <Main />}
    </div>
  )
}
