import React from 'react';
import { useSnapshot } from 'valtio';
import { threeTeeState } from '../store';
import MDBox from 'components/MDBox';

const textureMapper = {
    logoDecal: 'isLogoTexture',
    orgDecal: 'isOrgTexture',
    fullDecal: 'isFullTexture',
};

const FilterTabItem = ({ tab: { name, icon } }) => {
    const snap = useSnapshot(threeTeeState);

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case 'logoDecal':
                threeTeeState.isLogoTexture = !threeTeeState.isLogoTexture;
                break;
            case 'orgDecal':
                threeTeeState.isOrgTexture = !threeTeeState.isOrgTexture;
                break;
            case 'fullDecal':
                threeTeeState.isFullTexture = !threeTeeState.isFullTexture;
                break;
            default:
                threeTeeState.isLogoTexture = true;
                threeTeeState.isOrgTexture = false;
                threeTeeState.isFullTexture = false;
                break;
        }
    };
    return (
        <MDBox
            sx={{
                cursor: 'pointer',
                bgcolor: snap[textureMapper[name]] ? 'white !important' : '',
                padding: 1,
                borderRadius: '50%',
                height: 50,
                width: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={() => handleActiveFilterTab(name)}
        >
            {icon}
        </MDBox>
    );
};

export default FilterTabItem;
