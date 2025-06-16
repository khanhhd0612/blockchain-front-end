import axios from "axios"
import { useState } from "react"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState('')
    const [successLogin, setSuccessLogin] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault()
        setIsDisabled(true)
        try {
            const response = await axios.post(`http://127.0.0.1:5000/api/login`, { email, password })
            if (response.data.message) {
                setEmail('')
                setPassword('')
                setErrorLogin('')
                Cookies.set('token', response.data.token, { expires: 7 })
                setSuccessLogin(response.data.message)
                window.location = "/"
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorLogin(error.response.data.message)
                setSuccessLogin("")
            }
        } finally {
            setIsDisabled(false)
        }
    }

    return (
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 d-none d-lg-block">
                        <img src="https://res.cloudinary.com/dsuera1v4/image/upload/v1750047343/exams/a1vfalolag2d0h4qff4p.png" alt="Image" className="w-100" />
                    </div>
                    <div className="col-md-6 contents">
                        <div className="p-5">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3>Đăng nhập </h3>
                                    </div>
                                    <form onSubmit={handleLogin}>
                                        {errorLogin && <p style={{ color: 'red' }}>{errorLogin}</p>}
                                        {successLogin && <p style={{ color: 'green' }}>{successLogin}</p>}
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu </label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"
                                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        </div>
                                        <button type="submit"
                                            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                            disabled={isDisabled}
                                        >
                                            {isDisabled ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                </>
                                            ) : (
                                                "Đăng nhập"
                                            )}
                                        </button>
                                    </form>

                                    <div className="d-flex mb-5 justify-content-between align-items-center mt-4">
                                        <span className="ml-auto"><Link to="/register" className="forgot-pass">Đăng ký </Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login