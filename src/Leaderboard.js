import React, {useEffect, useState} from 'react';


function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://crystal-run-prod-api-cgmyl.ondigitalocean.app/api/statistics/leaderboard?epochId=1&take=100');
                if (!response.ok) {
                    console.log("No response")
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Leaderboard data successfully fetched");
                console.log(data.data);
                setLeaderboard(data.data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    
        fetchData();
    }, []);

    console.log("leaderboardddddd");
    console.log(leaderboard);

    if (!leaderboard) {
        return (
            <div>
                <h1>Leaderboard</h1>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <h1>Leaderboard</h1>
            <div>
                {leaderboard.map((item, index) => (
                    <div key={index}>
                        <h1>{item.rank}</h1>
                        <h2>{item.user.twitterHandle}</h2>
                        <h3>{item.points}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;