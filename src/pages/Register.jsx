import React, { useEffect, useState } from 'react'
import '../App.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "./Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


function Register() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);


    const onFinish = async (e) => {
        setLoading(true)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const date = new Date().getTime();
            const storageRef = ref(storage, `${name + date}`);

            await uploadBytesResumable(storageRef, image).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName: name,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: name,
                            email: email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/login");
                    } catch (err) {
                        console.log (err);
                        
                        setError(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };





    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleImage = (e) => {
        setImage(e.target.files[0])
        console.log(e.target.files[0])

    }
    return (
        <div className=' login_container'>
            <div className="formWrapper">
                <div className="formHeading">
                    <p>Chat App </p>
                    <p>Register</p>
                    {error && error}
                </div>
                <Form
                    layout='vertical'
                    name="basic"
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item

                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter Your Name' onChange={(e) => setName
                            (e.target.value)} />
                    </Form.Item>
                    <Form.Item

                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter Your Email' onChange={(e) => setEmail
                            (e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Enter Your Password' onChange={(e) => setPassword
                            (e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="User Image"
                        name="image"

                    >
                        <input type="file" onChange={handleImage} />
                    </Form.Item>


                    <p>If your are a already register user Click  <Link to='/login' className='signUp'>Login</Link> </p>
                    <hr />
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        <Button type="primary" disabled={loading} htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                    {loading && "Uploading and compressing the image please wait..."}
                    {error && <span style={{color:"red"}}>Something went wrong</span>}
                </Form>
            </div>
        </div>
    )
}

export default Register
