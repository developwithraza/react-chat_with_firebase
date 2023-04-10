import React, { useState } from 'react'
import '../App.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

function Login() {

    const navigate = useNavigate()
    const [err,setErr]=useState("")
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onFinish =async () => {
        try {
            await signInWithEmailAndPassword(auth ,email,password)
            navigate("/home")

        } catch (err) {
            setErr(err.message);
            setError(true)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className=' login_container'>
            <div className="formWrapper">
                <div className="formHeading">
                    <p>Chat App </p>
                    <p>Login</p>
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
                        <Input.Password placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <p>If your a new user now Click  <Link to='/register' className='signUp'>Signup</Link> </p>
                    <hr />

                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                    
                    {error && <span style={{color:"red"}}>{err}</span>}
                </Form>
            </div>
        </div>
    )
}


export default Login