import TeamMatching from "../../components/TeamMatching/TeamMatching";

function TeamMatchings() {
    const teamMatchingData = [
        {
            team1: "Team Alpha",
            team1src: "/imgs/1.jpg",
            team2: "Team Bravo",
            team2src: "/imgs/team.jpg",
            date: "2024-11-25",
            location: "수원 HK 풋살파크",
            gender: "Mixed",
            level: "Intermediate",
            views: "120",
        },
        {
            team1: "Red Dragons",
            team1src: "/imgs/1.jpg",
            team2: "Blue Phoenix",
            team2src: "/imgs/team.jpg",
            date: "2024-12-01",
            location: "Busan, South Korea",
            gender: "Male",
            level: "Advanced",
            views: "200",
        },
        {
            team1: "Golden Tigers",
            team1src: "/imgs/1.jpg",
            team2: null, // 팀이 아직 미정
            team2src: null,
            date: "2024-12-05",
            location: "가산디지털운동장",
            gender: "Female",
            level: "Beginner",
            views: "85",
        },
        {
            team1: "Silver Wolves",
            team1src: "/imgs/1.jpg",
            team2: "Black Panthers",
            team2src: "/imgs/team.jpg",
            date: "2024-12-10",
            location: "Daegu, South Korea",
            gender: "Mixed",
            level: "Advanced",
            views: "310",
        },
        {
            team1: "Green Arrows",
            team1src: "/imgs/1.jpg",
            team2: null,
            team2src: null,
            date: "2024-12-15",
            location: "Jeju, South Korea",
            gender: "Male",
            level: "Intermediate",
            views: "50",
        },
    ];

    return (
        <div>
            {teamMatchingData.map((content, index) => (
                <TeamMatching
                    key={index}
                    content={content} />
            ))}

        </div>
    );
}

export default TeamMatchings;