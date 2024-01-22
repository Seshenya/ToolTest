import { TextureRounded } from '@mui/icons-material';
// import { swatch, fileIcon, ai, logoShirt, stylishShirt } from '../assets';
import { Box } from '@mui/material';
import hfIcon from '../assets/HS-Fulda-Icon.png';
import shirtIcon from '../assets/t-shirt.png';
import TTColorPicker from '../components/TTColorPicker';
import TTFilePicker from '../components/TTFilePicker';

export const EditorTabs = [
    {
        name: 'colorpicker',
        component: <TTColorPicker />,
    },
    {
        name: 'filepicker',
        component: <TTFilePicker />,
    },
    // {
    //   name: "aipicker",
    //   icon: ai,
    // },
];

export const FilterTabs = [
    {
        name: 'logoDecal',
        icon: (
            <Box
                component={'img'}
                src={hfIcon}
                sx={{ width: '30px', height: '30px' }}
            />
        ),
    },
    {
        name: 'orgDecal',
        icon: (
            <Box
                component={'img'}
                src={shirtIcon}
                sx={{ width: '30px', height: '30px' }}
            />
        ),
    },
    {
        name: 'fullDecal',
        icon: <TextureRounded fontSize={'large'} color={'info'} />,
    },
];
