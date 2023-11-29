import React, {useEffect, useState} from 'react';


function Leaderboard(){
    const[leaderboard, setLeaderboard] = useState(null);
    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('https://crystal-run-prod-api-cgmyl.ondigitalocean.app/api/statistics/leaderboard?epochId=1&take=100')
            .then(response => response.json())
            .then(data => setLeaderboard(data.total));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    const DisplayLeaderboard = leaderboard.map(() => {
        if (leaderboard)
        return(
            <div>
                <h1>{leaderboard.rank}</h1>
            </div>
        );
        return (<div>Loading...</div>);
    });



    return(
        <div>
            <h1>Leaderboard</h1>
            <h2>{DisplayLeaderboard}</h2>
        </div>
    );

}

export default Leaderboard;