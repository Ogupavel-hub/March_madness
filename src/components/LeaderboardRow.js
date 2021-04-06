import React from "react";


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const LeaderboardRow = ({ user, className }) => {
    const {
        "Place": place,
        "Instagram": instagram,
        "Summary Score": score
    } = user.fields;

    return (
        <div className={`leaderboard-row ${className}`}>
            <div className={place.toString().length > 2 ? "leaderboard-place leaderboard-place-big" : "leaderboard-place"}
                 data-place={numberWithCommas(place)} />

            <div className="leaderboard-instagram">
                <a target="_blank"
                   rel="noreferrer"
                   title={`@${instagram.toLowerCase()}`}
                   href={`https://www.instagram.com/${instagram.toLowerCase()}/`}>
                    {"@"}{instagram}
                </a>
            </div>

            <div className="leaderboard-score">
                {score.toFixed(1)}
            </div>
        </div>
    )
};
