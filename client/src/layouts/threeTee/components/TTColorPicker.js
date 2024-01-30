import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import { threeTeeState } from '../store';
import { ColorLensRounded } from '@mui/icons-material';
import { Popover, Tooltip } from '@mui/material';

const TTColorPicker = () => {
    const snap = useSnapshot(threeTeeState);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Tooltip title="Color picker">
                <ColorLensRounded
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
            >
                <SketchPicker
                    color={snap.color}
                    disableAlpha
                    onChange={(color) => (threeTeeState.color = color.hex)}
                />
            </Popover>
        </>
    );
};

export default TTColorPicker;
