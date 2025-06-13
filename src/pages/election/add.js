import Header from "../../components/ui/header"
import NavBar from "../../components/ui/navBar"
import React, { useState } from 'react'
import { getContract } from '../../utils/contract'
import Swal from 'sweetalert2'

const AddElection = () => {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleCreateElection = async () => {
        try {
            const contract = await getContract();
            const start = Math.floor(new Date(startTime).getTime() / 1000);
            const end = Math.floor(new Date(endTime).getTime() / 1000);

            const tx = await contract.createElection(title, start, end);
            await tx.wait();
            Swal.fire({
                title: 'Đã tạo cuộc bầu cử mới!',
                icon: "success"
            })
        } catch (err) {
            console.error("Lỗi tạo cuộc bầu cử:", err);
            Swal.fire({
                title: "Lỗi tạo cuộc bầu cử",
                icon: "error"
            })
        }
    };
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
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Tạo cuộc bầu cử</h4>
                                <div class="form-group">
                                    <label htmlFor="exampleInputUsername1">Tên cuộc bầu cử</label>
                                    <input type="text"
                                        class="form-control"
                                        id="exampleInputUsername1"
                                        placeholder="Tên cuộc bầu cử"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="exampleInputEmail1">Thời gian bắt đầu</label>
                                    <input type="datetime-local"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        value={startTime}
                                        onChange={e => setStartTime(e.target.value)}
                                    />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="exampleInputPassword1">Thời gian kế thúc</label>
                                    <input type="datetime-local"
                                        class="form-control"
                                        id="exampleInputPassword1"
                                        value={endTime}
                                        onChange={e => setEndTime(e.target.value)}
                                    />
                                </div>
                                <button type="submit" class="btn btn-primary px-3" onClick={handleCreateElection}>Tạo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddElection