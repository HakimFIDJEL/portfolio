import fg from 'fast-glob';

// Génère les entrées dynamiquement
const inputFiles = fg.sync([
    'resources/js/**/*.jsx',
    'resources/js/**/*.tsx',
    'resources/css/*.css',
    'resources/scss/*.scss',
]);

export default inputFiles;
