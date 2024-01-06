import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Chip, Grid, Box } from '@mui/material';
import { ArrowLeft, GitHub, Mail } from '@mui/icons-material';
import { aboutData } from 'constants/AboutData';

const Developer = () => {
    const { developer = 'John' } = useParams();

    const { name, role, description, resume, github, skills, contact } =
        aboutData[developer && aboutData[developer] ? developer : 'John'];

    return (
        <Grid container justifyContent="center" spacing={4} mt={8}>
            <Grid item xs={12} md={6} lg={4}>
                <Box py={4} px={2}>
                    <Link to="/about-us" className="text-indigo-600 text-sm">
                        <ArrowLeft /> Back
                    </Link>

                    {name && (
                        <Typography variant="h4" className="text-primary mt-4">
                            Hello World!<br /> I am <span className="text-indigo-600">{name}.</span>
                        </Typography>
                    )}

                    {role && (
                        <Typography variant="h6" className="text-gray-700 mt-2">
                            {`A ${role}.`}
                        </Typography>
                    )}

                    <Typography variant="body1" className="text-gray-800 font-normal max-w-screen-md mt-4">
                        {description ? description : ''}
                    </Typography>

                    <Box mt={4} display="flex" justifyContent="space-between">
                        {resume && (
                            <Button
                                variant="contained"
                                color="primary"
                                href={resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: 'white',
                                }}
                            >
                                Resume
                            </Button>
                        )}

                        {github && (
                            <a href={github} aria-label="github" className="link--icon text-indigo-600 hover:text-indigo-800 text-4xl" target="_blank" rel="noopener noreferrer">
                                <GitHub />
                            </a>
                        )}
                    </Box>

                    {/* Skills */}
                    <Box mt={4}>
                        <Typography variant="h6" className="text-gray-700 mb-2">SKILLS</Typography>
                        <Box display="flex" gap={2}>
                            {skills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    variant="outlined"
                                    color='primary'
                                    disabled
                                    style={{
                                        color: 'black',
                                        borderColor: 'black',
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Contact */}
                    <Box mt={4}>
                        <Typography variant="h6" className="text-gray-700 mb-2">CONTACT</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            href={`mailto:${contact.mail}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<Mail style={{ fontSize: 16 }} />}
                            style={{
                                color: 'white',
                            }}
                        >
                            Email me!
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Developer;
