"use client"
import { useRouter } from "next/navigation"

const LoginForm = ({ userName, handleBioChange, handleUserNameChange, bio, email, photo }) => {
  const router = useRouter()
  // 获取到输入框的值并更新数据库
  const handleCreateUser = async (e) => {
      try {
        const res = await fetch('api/create-account', {
          method: 'POST',
          body: JSON.stringify({
            username: userName,
            bio: bio,
            email: email,
            image: photo
          })
        })
        const userInfos = await res.json() // 需要转换为json数据才是我们需要的
        if(res.ok) {
          router.push('/')
        } else {
          // 弹出警告
          alert('创建失败!')
        }
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div id="LoginForm" className="text-center mt-[75px] scale-0 transform duration-700 origin-[0%_-45%] absolute ml-[23px]">
      <div>
        <input value={userName} onChange={handleUserNameChange} className="bg-input-background h-10 pl-3 rounded text-gray-400" type="text" placeholder="username" />
      </div>
      <div className="mt-5">
        <input value={bio} onChange={handleBioChange} className="bg-input-background h-10 pl-3 rounded text-gray-400" type="text" placeholder="个性签名"/>
      </div>
      <button onClick={handleCreateUser} className="bg-green-600 hover:bg-green-700 shadow-lg transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 mt-5 px-3 py-1 rounded w-[226.5px]">创建</button>
    </div>
  )
}
export default LoginForm