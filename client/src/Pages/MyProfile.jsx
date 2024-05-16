import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useAxios from '../Custom-hooks/useAxios'
import useAuthCalls from '../Custom-hooks/useAuthCalls'


const MyProfile = () => {

  const {axiosWithToken}=useAxios()
  const {updatedUser}=useAuthCalls()
  const {user} = useSelector(state=>state.auth)
  const [userInfo, setUserInfo] = useState({
    username:`${user?.username}`,
    firstName:`${user?.firstName}`,
    lastName:`${user?.lastName}`,
    email:`${user?.email}`,
    image:"",
    // password:`${user?.password}`,
    biography:`${user?.biography}`,
  })
  const [userModal, setUserModal] = useState(false)

  const handleChange = (e)=>{
    const {name,value}= e.target 
    console.log(name,value)
    setUserInfo({
      ...userInfo,[name]:value
    })
  }
console.log(user)
  const handleSubmit = (e)=> {
    e.preventDefault()
    const userId= user?.id
    updatedUser(userId,userInfo)
    

  }
  return (
    <main>
      <section>
        <section className="profile-header">
          <img src={user?.image[0] || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} alt="user photo" />
        <h2>{user?.username}</h2>
        </section>
        <section className='profile-body'>
          <p>{user?.bio || "biography"}</p>
        </section>
        <button onClick={()=>setUserModal(!userModal)}>Edit Profile</button>
        <button>my blogs</button>
      </section>
      {userModal &&
        <div>
          <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                
              />

              

              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
              />

              

              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
                
              />

              

            
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />

              

              {/* <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
              /> */}

              

              
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                onChange={handleChange}
              />

              

              <label htmlFor="biography">Biography</label>
              <textarea
                id="biography"
                name="biography"
                value={userInfo.bio}
                rows="4"
                cols="50"
                onChange={handleChange}
              />

              

              <button>Submit</button>
          </form>
        </div>
      }
    </main>
  )
}

export default MyProfile