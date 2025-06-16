import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import "../../assets/css/auth.css"

const Register = () => {
    const [email, setEmail] = useState("")
    const [nationalId, setNationalId] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const [errors, setErrors] = useState({})
    const [error, setError] = useState('')
    const [agree, setAgree] = useState(false)
    const handleRegister = async (e) => {
        e.preventDefault()
        if (!agree) {
            Swal.fire({
                title: "Bạn phải đồng ý với điều khoản sử dụng !",
                icon: "error",
                draggable: true
            });
            setIsDisabled(false)
            return
        }
        if (password != confirmPassword) {
            setError('Mật khẩu không trùng khớp!')
            return
        } else {
            setError('')
        }
        if (nationalId && !/^\d{12}$/.test(nationalId)) {
            setError('Số căn cước không đúng định dạng')
            return
        } else {
            setError('')
        }
        try {
            setIsDisabled(true)
            const res = await axios.post('http://127.0.0.1:5000/api/register', {
                firstName,
                lastName,
                email,
                nationalId,
                password
            })
            if (res.status === 201) {
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setFirstName("")
                setLastName("")
                setNationalId("")
                setErrors('')
                setIsDisabled(false)
                Swal.fire({
                    title: "Đăng ký thành công ",
                    icon: "success"
                })
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
            }
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
                                        <h3>Đăng ký </h3>
                                    </div>
                                    <form onSubmit={handleRegister}>
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName[0]}</p>}
                                        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName[0]}</p>}
                                        {errors.email && <p style={{ color: 'red' }}>{errors.email[0]}</p>}
                                        {errors.nationalId && <p style={{ color: 'red' }}>{errors.nationalId[0]}</p>}
                                        {errors.password && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
                                        <div className="mb-3 d-flex justify-content-between">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Tên</label>
                                                <input type="text" className="form-control" id="firstName"
                                                    value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="form-label">Họ</label>
                                                <input type="text" className="form-control" id="lastName"
                                                    value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cccd" className="form-label">Căn cước công dân</label>
                                            <input type="number" className="form-control" id="cccd"
                                                value={nationalId} onChange={(e) => setNationalId(e.target.value)} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Mật khẩu </label>
                                            <input type="password" className="form-control" id="password"
                                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPass" className="form-label">Xác nhận mật khẩu </label>
                                            <input type="password" className="form-control" id="confirmPass"
                                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                className="form-check-input mx-1"
                                                type="checkbox"
                                                id="autoNextCheckbox"
                                                checked={agree}
                                                onChange={() => setAgree(!agree)}
                                            />
                                            <label className="form-check-label text-muted" htmlFor="autoNextCheckbox">
                                                Tôi đồng ý với điều khoản sử dụng
                                            </label>
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
                                                "Đăng ký"
                                            )}
                                        </button>
                                    </form>
                                    <div className="text-center mt-4 font-weight-light">Đã có tài khoản ? <Link to="/login" className="text-primary">Đăng nhập</Link>
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
export default Register