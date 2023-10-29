import { GithubOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { aboutData } from '@gdsdt4/constants/AboutData';
import { useParams, Link } from 'react-router-dom';

const Developer = () => {
    const { developer = "John" } = useParams();

    const { name, role, description, resume, github, skills, contact } = aboutData[developer && aboutData[developer] ? developer : "John"];

    return (
        <div className="flex flex-col items-center about mt-12 md:mt-24">
            <Link to="/about" className="absolute top-4 left-4 text-indigo-600 text-sm"><ArrowLeftOutlined />Back</Link>

            {name && (
                <h1 className="text-4xl font-bold mb-6 md-4 text-primary">
                    Hello World!<br /> I am <span className="text-indigo-600">{name}.</span>
                </h1>)
            }

            {role && <h2 className="text-2xl font-semibold mt-4 text-gray-700 md:mt-2">{`A ${role}.`}</h2>}

            <p className="text-lg text-gray-800 font-normal max-w-screen-md md:mt-8 text-left">{description ? description : ''}</p>

            <div className="flex space-x-4 mt-8 md-12">
                {resume && (
                    <a href={resume} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">
                        Resume
                    </a>
                )}

                {github && (
                    <a href={github} aria-label="github" className="link--icon text-indigo-600 hover:text-indigo-800 text-4xl" target="_blank" rel="noopener noreferrer">
                        <GithubOutlined />
                    </a>)
                }
            </div>

            {/* Skills */}

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mt-4 text-gray-700 md:mt-2 mb-8">SKILLS</h2>
                <div className="flex space-x-4">
                    {skills.map((skill, index) => (
                        <button
                            key={index}
                            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full transition-transform transform hover:-translate-y-1 hover:scale-105"
                            disabled
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contact */}

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mt-4 text-gray-700 md:mt-2 mb-8">CONTACT</h2>
                <a href={`mailto:${contact.mail}`} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">
                    <MailOutlined style={{ fontSize: 12 }} /> Email me!
                </a>
            </div>
        </div>
    );
}

export default Developer;
