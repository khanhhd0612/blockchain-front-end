import Header from "../../components/ui/header"
import NavBar from "../../components/ui/navBar"

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContract } from '../../utils/contract';
import Swal from "sweetalert2";

const Vote = () => {
    const { id: electionId } = useParams();
    const [electionInfo, setElectionInfo] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [cccd, setCCCD] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchElection = async () => {
            try {
                const contract = await getContract();
                const info = await contract.getElection(Number(electionId));
                setElectionInfo({
                    title: info[0],
                    start: new Date(Number(info[1]) * 1000),
                    end: new Date(Number(info[2]) * 1000),
                    candidateCount: Number(info[3]),
                });

                const [names, votes] = await contract.getCandidates(Number(electionId));
                const candidateList = names.map((name, index) => ({
                    id: index,
                    name,
                    voteCount: Number(votes[index]),
                }));
                setCandidates(candidateList);
            } catch (err) {
                console.error("Lỗi tải dữ liệu:", err);
                alert("Không thể tải thông tin cuộc bầu cử");
            } finally {
                setLoading(false);
            }
        };

        fetchElection();
    }, [electionId]);

    const handleVote = async () => {
        if (!cccd || selectedId === null) {
            return Swal.fire({
                text: "Vui lòng nhập CCCD và chọn ứng viên!",
                icon: "error"
            })
        }

        try {
            const contract = await getContract();
            const tx = await contract.vote(Number(electionId), selectedId, cccd);
            await tx.wait();
            Swal.fire({
                text: "Bầu cử thành công!",
                icon: "success"
            });
        } catch (err) {
            console.error("Lỗi bỏ phiếu:", err);
            Swal.fire({
                text: "Bạn đã bầu rồi hoặc bầu cử chưa diễn ra!",
                icon: "error"
            });
        }
    };
    const vote = ()=>{
        Swal.fire({
            title: "Bạn chắc chắn ?",
            text: "Sẽ không thể thay đổi phiếu bầu!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đúng!"
        }).then((result) => {
            if (result.isConfirmed) {
               handleVote()
            }
        });
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
                    <div className="row">
                        <label className="block mb-2 font-semibold">Nhập CCCD:</label>
                        <input
                            type="text"
                            className="border w-full mb-4 p-2"
                            value={cccd}
                            onChange={(e) => setCCCD(e.target.value)}
                            placeholder="CCCD của bạn"
                        />
                    </div>
                    <div className="col-md-12 col-xl-12">
                        <h5 className="mb-3">Danh sách cuộc bầu cử</h5>
                        <div className="card tbl-card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover table-borderless mb-0">
                                        <thead>
                                            <tr>
                                                <th>Tên ứng viên</th>
                                                <th>Chọn</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {candidates.map((c) => (
                                                <tr key={c.id}>
                                                    <td>{c.name}</td>
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            name="candidate"
                                                            value={c.id}
                                                            checked={selectedId === c.id}
                                                            onChange={() => setSelectedId(c.id)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded" onClick={vote}>
                                                Gửi phiếu bầu
                                            </button>
                                        </tbody>
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
export default Vote