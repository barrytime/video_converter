const convert = require('./convert');
const { list_files } = require('./utils');

const input_folder = './input';
const output_folder = './output';
const DIR_TO_CONVERT = list_files(input_folder);
const input_format = 'mkv';
const output_format = 'avi';

console.log('Preparing to convert videos\n\n');
console.log(`Input folder: ${input_folder}`);
console.log(`Output folder: ${output_folder}`);
console.log(`Input format: ${input_format}`);
console.log(`Output format: ${output_format}`);

if (DIR_TO_CONVERT && DIR_TO_CONVERT.length > 0) {
    const to_convert = DIR_TO_CONVERT.filter(
        file =>
            file
                .toLowerCase()
                .split('.')
                .slice(-1) == input_format
    );

    (async () => {
        for (const file of to_convert) {
            await convert(
                `${input_folder}/${file}`,
                output_folder,
                output_format
            );
        }
    })().then(() => console.log('Completed'));
} else {
    console.log('input folder does not exist or input folder is empty');
}
