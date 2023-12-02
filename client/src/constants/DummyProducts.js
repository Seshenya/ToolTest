import product1 from "assets/images/trending/product1.png";
import product2 from "assets/images/trending/product2.png";
import product3 from "assets/images/trending/product3.png";
import product4 from "assets/images/trending/product4.png";
import product5 from "assets/images/trending/product5.png";
import product6 from "assets/images/trending/product6.png";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";

export const products = [
    {
        image: product4,
        title: "Product 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, vehicula placerat tincidunt vitae, porttitor eget lectus. ",
        creator: {
            image: team1,
            name: "Creator 1"
        },
        status: "Approved",
        date: "12.02.2022",
        collaborate: false

    },
    {
        image: product5,
        title: "Product 2",
        description: "Aenean ut ante sit amet eros faucibus euismod vel non ante. Nullam dignissim elementum laoreet, porttitor eget lectus. ",
        creator: {
            image: team2,
            name: "Creator 2"
        },
        status: "Pending",
        date: "08.02.2022",
        collaborate: true
    },
    {
        image: product6,
        title: "Product 3",
        description: "Curabitur convallis eros lectus, in lobortis dui mattis non. Nulla mi lacus, luctus id dui ac, ullamcorper accumsan nisl. ",
        creator: {
            image: team3,
            name: "Creator 3"
        },
        status: "Rejected",
        date: "06.02.2022",
        collaborate: false


    },
    {
        image: product3,
        title: "Product 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, vehicula placerat tincidunt vitae, porttitor eget lectus. ",
        creator: {
            image: team2,
            name: "Creator 2"
        },
        status: "Modifications Required",
        date: "04.02.2022",
        collaborate: true

    },
    {
        image: product1,
        title: "Product 5",
        description: "Aenean ut ante sit amet eros faucibus euismod vel non ante. Nullam dignissim elementum laoreet, porttitor eget lectus. ",
        creator: {
            image: team3,
            name: "Creator 3"
        },
        status: "Approved",
        date: "04.02.2022",
        collaborate: false

    },
    {
        image: product2,
        title: "Product 6",
        description: "Curabitur convallis eros lectus, in lobortis dui mattis non. Nulla mi lacus, luctus id dui ac, ullamcorper accumsan nisl. ",
        creator: {
            image: team1,
            name: "Creator 1"
        },
        status: "Rejected",
        date: "02.02.2022",
        collaborate: true

    }
]

export const statusColors = {
    Approved: "success",
    Pending: "warning",
    Rejected: "error",
    "Modifications Required": "info"
}