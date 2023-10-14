"use client"
import Image from "next/image"
import { useState } from "react"

const Avatar = ({ imageUrl }) => {
  const photoOptions = [
    { name: '照相', callback: () => {} },
    { name: '从本地选择', callback: () => {} },
    { name: '上传照片', callback: () => {} },
    { name: '删除照片', callback: () => {
      setPhoto('/default_avatar.png')
    } },

  ]
  // 头像url
  const [ photo, setPhoto ] = useState(imageUrl.toString())
  // 记录是否弹出窗口的状态
  const [ isPhotoOption, setIsPhotoOption ] = useState(false)
  
  // 点击弹出头像操作窗口
  const handleShowMenu = () => {
    const photoMenuEl = document.getElementById('photoMenu')
    setIsPhotoOption(preState => !preState)
    if(!isPhotoOption) {
      photoMenuEl.classList.remove('scale-0')
      photoMenuEl.classList.add('scale-100')
    } else {
      photoMenuEl.classList.remove('scale-100')
      photoMenuEl.classList.add('scale-0')
    }
  }

  // 照片的变更操作
  const handlePhotoOperate = (index) => {
    switch (index) {
      case 0:
        console.log('照相')
        break;

      case 1:
        console.log('从本地选择')
        break;

      case 2:
        
        console.log('上传照片')
        break;

      case 3:
        setPhoto('/default_avatar.png')
        console.log('删除')
        break;

      default:
        console.log('无此选项!')
        break;
    }
  }

  // 暂存本地文件
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div id="avatar" className="ml-[24px] mt-3 absolute scale-0 transform duration-700 origin-[0%_0%] cursor-pointer">
      <Image 
        src={photo}
        height={50}
        width={50}
        alt="userImage"
        className="rounded"
      />
       <div onClick={handleShowMenu} className="flex justify-center items-center absolute inset-0 bg-gray-800 opacity-0 hover:opacity-80 transition-opacity duration-300">
        <Image 
          src='/相机图标.png'
          height={30}
          width={30}
          alt="相机"
        />
       </div>

       <div id="photoMenu" className="bg-input-background  rounded absolute top-[-0px] left-[-112px] scale-0 translate duration-700 origin-[115%_2%]">
        {photoOptions.map((item, index) => (
          <p onClick={() =>handlePhotoOperate(index)} className="hover:bg-dropdown-background-hover py-2 px-2" key={item.name}>{item.name}</p>
        ))}
       </div>
       {/*  */}
       <div className="absolute mt-40">
        <input type="file" onChange={handleFileChange} />
      </div>
    </div>
  )
}
export default Avatar