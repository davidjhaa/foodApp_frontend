import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/profile.css';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
 

function Profile() {
    const history = useHistory();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, emailSet] = useState("");
    const [name, nameSet] = useState("");

    const handleClick = async () => {
        try {
            const userId = localStorage.getItem("userId")
            if(password !== confirmPassword){
                alert('password and confirmPassword are not same')
                return;
            }
            const response = await axios.patch(`${apiUrl}/user/${userId}`, {
                email,
                name,
            });
            const newUser = response.data.updatedData;
            console.log(response.data);
            localStorage.setItem("user", newUser.name);
            setUser(newUser.name)
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const getProfile = async () => {
        try{
            const token = localStorage.getItem("token")
            const userId = localStorage.getItem("userId")
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get(`${apiUrl}/user/userProfile`, {
                headers: {
                    'userId': userId
                  }
            });
            nameSet(response.data.user.name)
            emailSet(response.data.user.email)
            console.log(response)
        } 
        catch (error) {
            console.log("error");
        }
    }

    useEffect( ()=>{
        getProfile()
    },[]);

    console.log(user);
    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>Profile</h1>
                    <div className="line"></div>
                    <div className="profileImage">
                        {/* {<img src={user.user.profileImage} /> } */}
                    </div>
                </div>
                <div className="loginBox">
                    <div className="entryBox">
                        <input type="file" />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Name</div>
                        <input className="password input" type="text" value={name} onChange={(e) => nameSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input" type="email" value={email} onChange={(e) => emailSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Confirm Password</div>
                        <input className="password input" type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleClick}>
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile
