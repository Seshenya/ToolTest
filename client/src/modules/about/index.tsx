import { aboutData } from '@gdsdt4/constants/AboutData';
import type { DeveloperData } from '@gdsdt4/types/About';
import { Avatar, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

type Props = {
    developer: DeveloperData;
    member: string;
};

const TeamMember = (props: Props) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 rounded-lg p-4 m-4 w-100 transition transform hover:scale-105 hover:shadow-lg cursor-pointer" onClick={() => navigate(`/about/${props.member}`)}>
            <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    {props.developer.image ? <Avatar size={64} src={<img src={props.developer.image} alt={`${props.developer.name.charAt(0)}`} className="w-full h-full object-cover filter brightness-85" />} /> : <Avatar>{props.developer.name.charAt(0)}</Avatar>}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-indigo-700 mt-2">{props.developer.name}</h2>
                    <p className="text-gray-600 mt-2">{props.developer.role}</p>
                </div>
            </div>
        </div>
    );
}

const Team = () => {

    return (
        <div className="min-h-screen flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold text-indigo-800">GDSD Winter 2023</h1>
            <h1 className="text-3xl font-bold text-indigo-800">Meet Our Team</h1>
            <h3 className="text-xl font-bold text-indigo-800">(Team 4)</h3>
            <Divider />
            <div className="flex flex-wrap justify-center mb-8 ">
                {Object.keys(aboutData).map((member, index) => (
                    member !== "John" ? (
                        <TeamMember key={index} developer={aboutData[member]} member={member} />
                    ) : null
                ))}
            </div>
        </div>
    );
}

export default Team;
