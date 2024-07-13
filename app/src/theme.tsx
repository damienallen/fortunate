import { createTheme, MantineThemeOverride, rem } from '@mantine/core';

export const theme: MantineThemeOverride = createTheme({
    focusRing: 'auto',

    primaryColor: 'default',
    colors: {
        default: [
            '#ffefe5',
            '#ffddce',
            '#ffb99c',
            '#fe9365',
            '#fe7338',
            '#fe5e1b',
            '#fe540c',
            '#e34400',
            '#ca3b00',
            '#b12f00',
        ],
    },

    shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    },

    headings: {
        fontFamily: 'Roboto, sans-serif',
        sizes: {
            h1: { fontSize: rem(36) },
        },
    },
});
