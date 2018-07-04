const gulp = require('gulp');
const sequence = require('run-sequence');
const bump = require('gulp-bump');
const shell = require('shelljs');
const chalk = require('chalk');

gulp.task('build:ngc', () => {
    shell.echo('Clean dist folder');
    shell.rm('-rf', './dist');

    shell.echo(`Start building library with ng-packagr...`);

    shell.exec('ng-packagr -p package.json');

    shell.echo(chalk.green(`ng-packager completed`));
});

gulp.task('increase:patch', () => {
    return gulp.src(['./package.json'])
        .pipe(bump({ type: 'patch' }))
        .pipe(gulp.dest('./'));
});
gulp.task('increase:minor', () => {
    return gulp.src(['./package.json'])
        .pipe(bump({ type: 'minor' }))
        .pipe(gulp.dest('./'));
});
gulp.task('increase:major', () => {
    return gulp.src(['./package.json'])
        .pipe(bump({ type: 'minor' }))
        .pipe(gulp.dest('./'));
});

gulp.task('publish:patch', () => {
    return sequence('increase:patch', 'build:ngc', 'publish:dist');
});
gulp.task('publish:minor', () => {
    return sequence('increase:minor', 'build:ngc', 'publish:dist');
});
gulp.task('publish:major', () => {
    return sequence('increase:major', 'build:ngc', 'publish:dist');
});