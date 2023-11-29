import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';


function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('https://crystal-run-prod-api-cgmyl.ondigitalocean.app/api/statistics/leaderboard?epochId=1&take=100');

            if (!response.ok) {
                console.log("No response");
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Leaderboard data successfully fetched");
            console.log(data.data);
            setLeaderboardData(data.data);
            
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch initially

        const interval = setInterval(fetchData, 10000);

        return () => clearInterval(interval);
    }, []);


    if (!leaderboardData) {
        return (
            <div>
                <h1>Leaderboard</h1>
                <div>Loading...</div>
            </div>
        );
    }

    function concatTwitterHandle(item) {
        return "https://www.twitter.com/"+item.user.twitterHandle;
    }

    const DisplayLeaderboard = leaderboardData.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.rank}</td>
                <td> <img src={item.user.twitterImage}/></td>
                <td><a href={concatTwitterHandle(item)} target="_blank">{item.user.twitterHandle}</a></td>
                <td>{item.currentLevel}</td>
                <td>{item.points}</td>
            </tr>
        );
    });

    return (
        <div>
            <h1>Leaderboard</h1>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th></th>
                            <th>Twitter Handle</th>
                            <th>Level</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayLeaderboard}
                    </tbody>
                </Table>

            </div>
        </div>
    );
    // return (
    //     <div>
    //         <h1>Leaderboard</h1>
    //         <div>
    //             {leaderboard.map((item, index) => (
    //                 <div key={index}>
    //                     <Table striped bordered hover>
    //
    //
    //                     </Table>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
}

export default Leaderboard;