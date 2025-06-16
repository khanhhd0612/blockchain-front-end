import Header from "../../components/ui/header"
import NavBar from "../../components/ui/navBar"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getContract } from '../../utils/contract';
import Swal from "sweetalert2";

const AddCandidate = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id: electionId } = useParams();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users');
                console.log(res)
                setUsers(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    async function handleAddCandidate(name) {
        try {
            const contract = await getContract();
            const tx = await contract.addCandidate(Number(electionId), name);
            await tx.wait();
            Swal.fire({
                title:"Thành công !",
                text :`Đã thêm ứng viên ${name} vào cuộc bầu cử #${electionId}`,
                icon :"success"
            })
        } catch (err) {
            console.error("Lỗi thêm ứng viên:", err);
            Swal.fire({
                title:"Lỗi thêm ứng viên",
                icon :"error"
            })
        }
    }
    return (
        <div>
            <NavBar></NavBar>
            <Header></Header>
            <div className="pc-container">
                <div className="pc-content">
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="page-header-title">
                                        <h5 className="m-b-10">Home</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="../dashboard/index.html">Home</a></li>
                                        <li className="breadcrumb-item"><a href="javascript: void(0)">Dashboard</a></li>
                                        <li className="breadcrumb-item" aria-current="page">Home</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="col-md-12 col-xl-12">
                        <h5 className="mb-3">Danh sách cuộc bầu cử</h5>
                        <div className="card tbl-card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover table-borderless mb-0">
                                        <thead>
                                            <tr>
                                                <th>Tên cuộc bầu cử</th>
                                                <th>Thêm vào cuộc bầu cử</th>
                                            </tr>
                                        </thead>
                                        {loading ? (
                                            <p>Đang tải...</p>
                                        ) : users.length === 0 ? (
                                            <p>Chưa có cuộc bầu cử nào.</p>
                                        ) : (
                                            <tbody>
                                                {users.map((user) => (
                                                    <tr key={user._id}>
                                                        <td>{user.firstName + " " + user.lastName}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() => handleAddCandidate(`${user.firstName} ${user.lastName}`)}
                                                            >
                                                                Thêm vào bầu cử
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddCandidate