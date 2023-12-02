import product4 from "assets/images/trending/product4.png";
import product5 from "assets/images/trending/product5.png";
import product2 from "assets/images/trending/product2.png";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";

export const competitions = [
    {
        image: product4,
        title: "Competition 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, vehicula placerat tincidunt vitae, porttitor eget lectus. ",
        creator: {
            image: team1,
            name: "Creator 1"
        },
        status: "Approved",
        date: "12.02.2022"
    },
    {
        image: product5,
        title: "Competition 2",
        description: "Aenean ut ante sit amet eros faucibus euismod vel non ante. Nullam dignissim elementum laoreet, porttitor eget lectus. ",
        creator: {
            image: team2,
            name: "Creator 2"
        },
        status: "Pending",
        date: "08.02.2022"
    },
    {
        image: product2,
        title: "Competition 3",
        description: "Aenean ut ante sit amet eros faucibus euismod vel non ante. Nullam dignissim elementum laoreet, porttitor eget lectus. ",
        creator: {
            image: team2,
            name: "Creator 2"
        },
        status: "Pending",
        date: "08.02.2022"
    }
]

export const statusColors = {
    Approved: "success",
    Pending: "warning",
    Rejected: "error",
    "Modifications Required": "info"
}