import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const handleRegister = async () => {
        if (password != confirmPassword) {
            Swal.fire({
                title: "Mật khẩu không trùng khớp",
                icon: "error"
            })
            return
        }
        try {
            setIsDisabled(true)
            const res = await axios.post('http://127.0.0.1:5000/api/register', {
                firstName,
                lastName,
                email,
                password
            })
            if (res.status === 201) {
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setFirstName("")
                setLastName("")
                setIsDisabled(false)
                Swal.fire({
                    title: "Đăng ký thành công ",
                    icon: "success"
                })
            }
        } catch (error) {
            Swal.fire({
                title: error,
                icon: "error"
            })
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
                                <Link class="link-primary">Đã có tài khoản?</Link>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label class="form-label">First Name*</label>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label class="form-label">Last Name</label>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
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
                            <div class="form-group mb-3">
                                <label class="form-label">Xác nhận mật khẩu</label>
                                <input type="password"
                                    class="form-control"
                                    placeholder="Xác nhận mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <p class="mt-4 text-sm text-muted">By Signing up, you agree to our <a href="#" class="text-primary"> Terms of Service </a> and <a href="#" class="text-primary"> Privacy Policy</a></p>
                            <div class="d-grid mt-3">
                                <button type="button" onClick={handleRegister} class="btn btn-primary">
                                    {isDisabled ?
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        </> :
                                        "Đăng ký"
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
export default Register