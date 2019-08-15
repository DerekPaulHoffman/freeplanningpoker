const gulp = require('gulp');
const del = require('del');
const awspublish = require('gulp-awspublish');
const rename = require('gulp-rename');
const clc = require('cli-color');
const path = require('path');
const bump = require('gulp-bump');
const git = require('gulp-git');
const prompt = require('gulp-prompt');
const { exec } = require('child_process');
const gulpif = require('gulp-if');
const packageJson = require('./package.json');

// TODO: This needs to be updated depending on where you keep your secrets file.
const AWS_SECRET = require('../_config/planningpoker.json');

// TODO: Change this based on the URL you want for the site.
// * Example -> mybonuscenter/bizrateapp
const PATH = 'mdc-magazinediscountcenter/testsites';

const S3 = awspublish.create(AWS_SECRET);
const APP = path.join(__dirname, '/app/build/*');
const gitPath = path.join(__dirname, '.');

gulp.task('bump', () => {
	gulp.src('./package.json')
		.pipe(gulpif(!process.env.BUMP,
			prompt.prompt({
				type: 'checkbox',
				name: 'bump',
				message: 'What type of bump would you like to do?\n',
				choices: ['none', 'patch', 'minor', 'major'],
			}, (res) => {
				const val = res.bump[0];
				if (val === 'none') {
					return;
				}

				return (
					gulp.src('./package.json')
						.pipe(bump({ type: val }))
						.pipe(gulp.dest('./'))
				);
			}),
			bump({ type: process.env.BUMP })))
		.pipe(gulpif((typeof (process.env.BUMP) === 'string'), gulp.dest('./')));
});


gulp.task('publish', () => {
	return (
		gulp.src(APP)
			// This line sets the upload path for AWS S3.
			.pipe(
				rename((upPath) => {
					upPath.dirname = PATH;
				}),
			)
			.pipe(
				S3.publish('', {
					force: true,
				}),
			)
			.pipe(S3.cache())
			.pipe(awspublish.reporter())
			.on('end', () => {
				console.log(clc.red(`Published to: ${PATH}`));
			})
	);
});

gulp.task('git', () => {
	git.status({ args: '--porcelain' }, (err, stdout) => {
		if (err === null && stdout !== '') {
			git.revParse({ args: '--abbrev-ref HEAD' }, (branchErr, branch) => {
				if (branchErr) throw branchErr;

				gulp.src(gitPath)
					.pipe(git.add())
					.pipe(
						gulpif(!process.env.COMMIT,
							prompt.prompt({
								type: 'input',
								name: 'message',
								message: 'Please input a commit message\n',
							}, (res) => {
								const commitMessage = (res.message === '') ? 'CAUGHT YOU TRYNA LEAVE' : res.message;
								gulp.src(gitPath)
									.pipe(git.commit(`[${branch}] v${packageJson.version}: ${commitMessage}`));
							}),
							git.commit(`[${branch}] v${packageJson.version}: ${process.env.COMMIT}`)),
					)
					.on('end', () => {
						git.push('origin', (pushErr) => {
							if (pushErr) throw pushErr;
							else console.log('Pushed Successfully');
						});
					});
			});
		} else {
			console.log('Nothing to commit');
		}
	});
});

gulp.task('sync', (cb) => {
	exec(`bash ../../_config/swatprod_sync.sh ${PATH}`, (err, stdout) => {
		console.log(stdout);
		cb(err);
	});
});

gulp.task('clean', () => {
	return del([APP]);
});
