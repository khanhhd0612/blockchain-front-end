import Header from "../../components/ui/header"
import NavBar from "../../components/ui/navBar"
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getContract } from '../../utils/contract';
import { format } from 'date-fns';

const Details = () => {
    const { id } = useParams();
    const [election, setElection] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchElection = async () => {
            try {
                const contract = await getContract();
                const info = await contract.getElection(id);

                const candidateNames = await contract.getCandidates(id);
                const names = candidateNames[0]; // mảng tên
                const votes = candidateNames[1]; // mảng số phiếu

                const candidatesData = names.map((name, idx) => ({
                    name,
                    voteCount: Number(votes[idx])
                }));

                setElection({
                    title: info.title,
                    startTime: Number(info.startTime),
                    endTime: Number(info.endTime),
                    candidateCount: Number(info.candidateCount)
                });

                setCandidates(candidatesData);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin bầu cử:", error);
                setLoading(false);
            }
        };

        fetchElection();
    }, [id]);

    if (loading) return <p className="p-4">Đang tải thông tin cuộc bầu cử...</p>;
    if (!election) return <p className="p-4">Không tìm thấy cuộc bầu cử.</p>;

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
                    <div className="row">
                        <div className="col-md-12 col-xl-12">
                            <div className="card tbl-card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-3">Chi tiết cuộc bầu cử</h5>
                                        <div className="d-flex">
                                            <div className="btn btn-primary d-flex align-item-center p-2 mx-2">
                                                <i className="ti ti-square-plus px-1"></i>
                                                <Link className="text-white" to={`/elections/${id}/add/candidate`}>Thêm ứng viên</Link>
                                            </div>
                                            <div className="btn btn-primary d-flex align-item-center p-2 mx-2">
                                                <i className="ti ti-location px-1"></i>
                                                <Link className="text-white" to={`/elections/${id}/vote`}>Bầu cử</Link>
                                            </div>
                                            <div className="btn btn-primary d-flex align-item-center p-2">
                                                <i className="ti ti-eye px-1"></i>
                                                <Link className="text-white" to={`/elections/${id}/result`}>Xem kết quả</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <p><strong>Tiêu đề:</strong> {election.title}</p>
                                        <p><strong>Thời gian bắt đầu:</strong> {format(new Date(election.startTime * 1000), 'HH:mm dd/MM/yyyy')}</p>
                                        <p><strong>Thời gian kết thúc:</strong> {format(new Date(election.endTime * 1000), 'HH:mm dd/MM/yyyy')}</p>
                                        <p><strong>Số ứng viên:</strong> {election.candidateCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-xl-12">

                            <div className="card tbl-card">
                                <div className="card-body">
                                    <h5 className="mb-3">Danh sách ứng viên</h5>
                                    <div className="table-responsive">
                                        <table className="table table-hover table-borderless mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Tên ứng viên</th>
                                                    <th>Số phiếu bầu</th>
                                                </tr>
                                            </thead>
                                            {loading ? (
                                                <p>Đang tải...</p>
                                            ) : candidates.length === 0 ? (
                                                <p>Chưa có ứng viên nào.</p>
                                            ) : (
                                                <tbody>
                                                    {candidates.map((c, index) => (
                                                        <tr key={index}>
                                                            <td>{c.name}</td>
                                                            <td>{c.voteCount}</td>
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
        </div>
    )
}
export default Details