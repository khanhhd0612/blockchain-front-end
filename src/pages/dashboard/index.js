import Header from "../../components/ui/header"
import NavBar from "../../components/ui/navBar"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContract } from '../../utils/contract';
import { format } from 'date-fns';

const Home = () => {
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const contract = await getContract();
                const count = await contract.getElectionCount();
                const list = [];

                for (let i = 0; i < count; i++) {
                    const e = await contract.getElection(i);
                    list.push({
                        id: i,
                        title: e.title,
                        startTime: Number(e.startTime),
                        endTime: Number(e.endTime),
                        candidateCount: Number(e.candidateCount)
                    });
                }

                setElections(list);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bầu cử:", error);
                setLoading(false);
            }
        };

        fetchElections();
    }, []);

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
                                                <th>Bắt đầu</th>
                                                <th>Kết thúc</th>
                                                <th>Số ứng viên</th>
                                                <th className="text-end">Xem</th>
                                            </tr>
                                        </thead>
                                        {loading ? (
                                            <p>Đang tải...</p>
                                        ) : elections.length === 0 ? (
                                            <p>Chưa có cuộc bầu cử nào.</p>
                                        ) : (
                                            <tbody>
                                                {elections.map((election) => (
                                                    <tr key={election.id}>
                                                        <td>{election.title}</td>
                                                        <td>{format(new Date(election.startTime * 1000), 'HH:mm dd/MM/yyyy')}</td>
                                                        <td>{format(new Date(election.endTime * 1000), 'HH:mm dd/MM/yyyy')}</td>
                                                        <td>{election.candidateCount}</td>
                                                        <td className="text-end"><Link
                                                            to={`/elections/${election.id}`}
                                                            className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                        >
                                                            Chi tiết
                                                        </Link></td>
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
export default Home