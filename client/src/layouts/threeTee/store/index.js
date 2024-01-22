const { proxy } = require('valtio');

const threeTeeState = proxy({
    intro: true,
    color: '#efbd48',
    rotate: false,
    isLogoTexture: true,
    isFullTexture: false,
    isOrgTexture: false,
    logoDecal: './Logo-Hochschule-Fulda-Square.png',
    fullDecal: './Logo-Hochschule-Fulda-Square.png',
    orgDecal: './Logo-Hochschule-Fulda-Square.png',
    logoScale: 0.13,
    fullScale: 1,
    orgScale: 0.25,
});

export { threeTeeState };
