import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const fallbacks = 'system-ui, -apple-system, "Segoe UI", sans-serif';

// Colours, radius and type come from the web's app/src/styles.css; dark values are a proposal.
export const brandTheme = defineTheme({
  name: 'gs10',
  extends: neutralTheme,
  typography: {
    scale: {base: 14, ratio: 1.2},
    body: {family: 'Be Vietnam Pro', fallbacks},
    heading: {family: 'Be Vietnam Pro', fallbacks},
  },
  tokens: {
    '--color-accent': ['#852f36', '#e8969c'],
    '--color-on-accent': ['#fffdfa', '#2a0d10'],
    '--color-text-accent': ['#852f36', '#e8969c'],
    '--color-icon-accent': ['#852f36', '#e8969c'],
    '--color-accent-muted': ['#f6e1e1', '#4a2428'],
    '--color-background-body': ['#faf8f3', '#161512'],
    '--color-background-surface': ['#fffefa', '#1f1e1a'],
    '--color-background-card': ['#fffefa', '#1f1e1a'],
    '--color-background-popover': ['#fffefa', '#24231f'],
    '--color-background-muted': ['#f0ede5', '#292823'],
    '--color-text-primary': ['#282820', '#efece3'],
    '--color-text-secondary': ['#63605a', '#aaa69b'],
    '--color-icon-primary': ['#282820', '#efece3'],
    '--color-icon-secondary': ['#63605a', '#aaa69b'],
    '--color-border': ['#dfdbd1', '#3a3831'],
    '--color-border-emphasized': ['#c9c4b8', '#545148'],
    '--color-success': ['#32614c', '#7fbf9e'],
    '--color-success-muted': ['#e4eee6', '#1f3a2d'],
    '--color-warning-muted': ['#f5ebd5', '#3d3016'],
    '--color-error': ['#a42a30', '#ff8a80'],
    '--radius-element': '10px',
    '--radius-container': '14px',
  },
});
