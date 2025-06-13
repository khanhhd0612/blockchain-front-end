import Header from "../../components/ui/header"
import NavBar from "../../components/ui/navBar"
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContract } from '../../utils/contract';
import { ethers } from "ethers"; // nếu chưa import

const Result = () => {
    const { id: electionId } = useParams();
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchWinner = async () => {
            try {
                const contract = await getContract();
                const provider = contract.runner?.provider || contract.provider;
                const latestBlock = await provider.getBlock("latest");
                const currentTime = latestBlock.timestamp;


                const [title, startTime, endTime] = await contract.getElection(electionId);

                if (currentTime <= Number(endTime)) {
                    alert("⏳ Cuộc bầu cử chưa kết thúc. Vui lòng quay lại sau.");
                    setLoading(false);
                    return;
                }

                const result = await contract.getWinner(Number(electionId));
                setWinner({ name: result[0], votes: Number(result[1]) });
            } catch (err) {
                console.error("Lỗi lấy người thắng:", err);
                alert("❌ Lỗi khi lấy kết quả cuộc bầu cử.");
            } finally {
                setLoading(false);
            }
        };

        fetchWinner();
    }, [electionId]);

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
                    <div className="card tbl-card">
                        <div className="card-body">
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-4">🏆 Kết quả cuộc bầu cử #{electionId}</h2>
                                {loading ? <p>Đang tải...</p> :
                                    winner ? (
                                        <p>
                                            Người thắng: <strong>{winner.name}</strong> với <strong>{winner.votes}</strong> phiếu.
                                        </p>
                                    ) : (
                                        <p>Không có dữ liệu.</p>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Result