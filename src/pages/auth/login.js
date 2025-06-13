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
    const handleLogin = async () => {
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
        <div class="auth-main">
            <div class="auth-wrapper v3">
                <div class="auth-form">
                    <div class="card my-5">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-end mb-4">
                                <h3 class="mb-0"><b>Sign up</b></h3>
                                <Link to="/register" class="link-primary">Chưa có tài khoản?</Link>
                            </div>
                            {errorLogin && <p style={{ color: 'red' }}>{errorLogin}</p>}
                            {successLogin && <p style={{ color: 'green' }}>{successLogin}</p>}
                            <div class="form-group mb-3">
                                <label class="form-label">Email</label>
                                <input type="email"
                                    class="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Mật khẩu</label>
                                <input type="password"
                                    class="form-control"
                                    placeholder="Mật khẩu"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div class="d-grid mt-3">
                                <button type="button" onClick={handleLogin} class="btn btn-primary">{isDisabled ?
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    </>
                                    :
                                    "Đăng nhập"
                                }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login