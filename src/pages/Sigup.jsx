import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../data/data';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/userSlice';


function Sigup() {
    const [username,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phonenumber,setPhoneNumber] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
   


    

    const handlesubmit = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phonenumber', phonenumber);
        if (selectedFile) {
            formData.append('profilePicture', selectedFile); // Use 'profilePicture' as the field name
        }

        
        const response = await fetch(`${API_URL}user/register`,{
            method: 'POST',
            body: formData // No need for 'Content-Type' header when using FormData
        });
            const data = await response.json();
            if(response.ok){
                alert("registation successfull");
                console.log(data);
                if (data.user.profilePicture) {
                    localStorage.setItem('profilePicture', `${API_URL}${data.user.profilePicture}`);
                }
                navigate('/Sigin')
            }
            else if(email){
                alert("email already taken");
                setUserName("");
                setEmail("");
                setPassword("");
              }
              else {
                setUserName("");
                setEmail("");
                setPassword("");
              }
              setLoading(false);
              setError(false);

        } catch (error) {
            console.error(error);
            alert('registation faled');
            setLoading(false);
            setError(true);

        }
    }
    return (
        <div>



            <form class="max-w-sm mx-auto" onSubmit={handlesubmit}>
            <div class="mb-5">

                
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                    <input type="text" name='username' value={username} onChange={(e)=>setUserName(e.target.value)}   class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="username" required />
                </div>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}   class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}   class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="your password"  required />
                </div>
                <div class="mb-5">
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phonenumber</label>
                    <input type="phone" name='phonenumber' value={phonenumber} onChange={(e)=>setPhoneNumber(e.target.value)}   class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="970*******" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                    <input type="file" name="profilePicture" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])}  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                </div>
                
                
                
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{ loading? 'Loading...':'Sigup' }</button>

                <div className='flex'>
                    <p> have an account?</p>
                    <Link to="/Sigin" >
                    <span className='text-blue-600'>Sigin</span>
                    </Link>
                </div>

            </form>

        </div>
    )
}

export default Sigup;