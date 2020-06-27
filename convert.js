const ffmpeg = require('fluent-ffmpeg');
const cliProgress = require('cli-progress');

module.exports = (input_path, output_dir, output_format) => {
    try {
        const file_name = input_path
            .split('/')
            .slice(-1)[0]
            .split('.')[0];

        const full_output_path = `${output_dir}/${file_name}.${output_format}`;

        const bar = new cliProgress.SingleBar(
            {},
            cliProgress.Presets.shades_classic
        );

        return new Promise((resolve, reject) => {
            ffmpeg(input_path)
                .audioCodec('ac3')
                .videoCodec('h264_nvenc')
                .on('progress', function(progress) {
                    bar.update(progress.percent);
                })
                .on('end', function() {
                    bar.stop();
                    console.log('Finished processing');
                    resolve(true);
                })
                .on('error', function(err, stdout, stderr) {
                    console.log('Cannot process video: ' + err.message);
                    reject(err.message);
                })
                .on('start', start => {
                    console.log(start);
                    bar.start(100, 0);
                })
                .save(full_output_path);
        });
    } catch (err) {
        console.log(err);
    }
};
