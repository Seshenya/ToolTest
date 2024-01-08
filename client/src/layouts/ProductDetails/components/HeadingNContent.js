/* eslint-disable react/prop-types */
import MDTypography from 'components/MDTypography';
import React from 'react';

const HeadingNContent = ({ title, description, component }) => {
    return (
        <>
            <MDTypography
                sx={{
                    color: 'grey',
                    fontSize: 14,
                    fontWeight: '500',
                    textTransform: 'uppercase',
                }}
            >
                {title}
            </MDTypography>
            {description ? (
                <MDTypography
                    fontSize={15}
                    sx={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        width: '120px',
                    }}
                >
                    {description}
                </MDTypography>
            ) : (
                component
            )}
        </>
    );
};

export default HeadingNContent;
