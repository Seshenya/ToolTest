import { AutorenewRounded, UploadFileRounded } from '@mui/icons-material';
import { Box, IconButton, Popover, Slider, Tooltip } from '@mui/material';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';
import { useState } from 'react';
import { reader } from '../config/helpers';
import { threeTeeState } from '../store';
import { useSnapshot } from 'valtio';

const decalMapper = {
    logo: { title: 'Logo', scale: 0.13 },
    org: { title: 'Org. logo', scale: 0.13 },
    full: { title: 'Texture', scale: 0.25 },
};

const FileUploadComponent = ({ type }) => {
    const snap = useSnapshot(threeTeeState);
    const [file, setFile] = useState('');

    const handleDecals = (type, result) => {
        threeTeeState[type] = result;
    };

    const readFile = (file, type) => {
        reader(file).then((result) => {
            handleDecals(type, result);
        });
    };
    const handleReset = () => {
        setFile('');
        threeTeeState[`${type}Decal`] = './Logo-Hochschule-Fulda-Square.png';
        threeTeeState[`${type}Scale`] = decalMapper[type].scale;
    };

    const handleScaleChange = (e, v) => {
        console.log(`${type}Scale`);
        threeTeeState[`${type}Scale`] = v;
    };
    return (
        <Box sx={{ padding: 1.5 }}>
            <MDTypography
                variant={'h6'}
                sx={{
                    marginBottom: 1,
                }}
            >
                {decalMapper[type].title}
            </MDTypography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <MDButton
                    variant="contained"
                    component="label"
                    color={'primary'}
                >
                    Upload File
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            readFile(e.target.files[0], type + 'Decal');
                        }}
                    />
                </MDButton>
                <Tooltip title="reset">
                    <IconButton color={'warning'} onClick={handleReset}>
                        <AutorenewRounded />
                    </IconButton>
                </Tooltip>
            </Box>
            <MDTypography fontSize={12} marginY={2} sx={{ color: 'grey' }}>
                {file === '' ? 'No file selected' : file.name}
            </MDTypography>
            {snap[`${type}Decal`] !== './Logo-Hochschule-Fulda-Square.png' && (
                <Slider
                    aria-label="Volume"
                    value={snap[`${type}Scale`]}
                    onChange={handleScaleChange}
                    max={1}
                    min={0}
                    step={0.01}
                />
            )}
            {/* <Box sx={{ display: 'flex', gap: 1 }}>
                <MDButton
                    variant="outlined"
                    title="Logo"
                    color={'info'}
                    onClick={() => readFile('logo')}
                    disabled={!file}
                >
                    Logo
                </MDButton>
                <MDButton
                    variant="contained"
                    color={'info'}
                    title="Full"
                    onClick={() => readFile('full')}
                    disabled={!file}
                >
                    Full
                </MDButton>
            </Box> */}
        </Box>
    );
};

const TTFilePicker = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Tooltip title="File picker">
                <UploadFileRounded
                    fontSize={'large'}
                    onClick={handleClick}
                    color={'info'}
                />
            </Tooltip>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        padding: 0,
                        maxWidth: '200px',
                        bgcolor: 'white !important',
                        borderRadius: 1.5,
                    },
                }}
            >
                {['logo', 'org', 'full'].map((type, idx) => (
                    <FileUploadComponent key={idx} type={type} />
                ))}
            </Popover>
        </>
    );
};

export default TTFilePicker;
