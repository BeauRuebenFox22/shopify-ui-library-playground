const { series, watch } = require("gulp");

const gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  babel = require("gulp-babel"),
  webpack = require("webpack-stream"),
  terser = require("gulp-terser"),
  svgstore = require("gulp-svgstore"),
  rename = require("gulp-rename"),
  purgecss = require("gulp-purgecss"),
  named = require("vinyl-named"),
  mode = require("gulp-mode")(),
  postcss = require('gulp-postcss');

const input_files = {
  css_theme: "./_build/styles/herd-theme.scss",
  css_components: "./_build/styles/components/**/*.scss",
  css_sections: "./_build/styles/sections/**/*.scss",
  css_snippets: "./_build/styles/snippets/**/*.scss",
  css_apps: "./_build/styles/apps/**/*.scss",
  js_theme: "./_build/scripts/theme/theme.js",
  js_sections: "./_build/scripts/sections/**/*.js",
  js_components: "./_build/scripts/components/**/*.js",
  js_snippets: "./_build/scripts/snippets/**/*.js",
  svg_graphics: "./_build/svg/**/*.svg",
};

const input_file_patterns = {
  css: "./_build/styles/**/*.scss",
  js: "./_build/scripts/**/*.js",
  svg: "./_build/svg/*.svg",
};

const output_folder = {
  css: "assets",
  js: "assets",
  svg: "snippets",
};

const purge_source_files = {
  css: `${output_folder.css}/theme.css`,
};

// CSS

function css_files(css_path, file_prefix) {
  return gulp
    .src(css_path)
    .pipe(
      sass({
        includePaths: ["node_modules"],
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(rename({ prefix: file_prefix }))
    .pipe(postcss())
    .pipe(gulp.dest(output_folder.css));
}

// Theme CSS
async function css_theme(run_css) {
  css_files((css_path = input_files.css_theme), (file_prefix = ""));
  run_css();
}

// Components CSS
async function css_components(run_css) {
  css_files((css_path = input_files.css_components), (file_prefix = "component-"));
  run_css();
}

// Section CSS
async function css_sections(run_css) {
  css_files((css_path = input_files.css_sections), (file_prefix = "section-"));
  run_css();
}

// Snippet CSS
async function css_snippets(run_css) {
  css_files((css_path = input_files.css_snippets), (file_prefix = "snippet-"));
  run_css();
}

// Packages CSS
async function css_apps(run_css) {
  css_files((css_path = input_files.css_apps), (file_prefix = "app-"));
  run_css();
}

// Javascript
function js_files(js_path, file_prefix) {
  return gulp
    .src(js_path)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(named())
    .pipe(
      webpack({
        devtool: false,
        mode: mode.development() ? "development" : "production",
        output: {
          filename: file_prefix + "[name].js",
        },
      })
    )
    .pipe(
      mode.production(
        terser({
          compress: {
            drop_console: false,
          },
          format: {
            comments: false,
          },
        })
      )
    )
    .pipe(gulp.dest(output_folder.js));
}

// Theme JS
async function js_theme(run_js) {
  js_files((js_path = input_files.js_theme), (file_prefix = ""));
  run_js();
}

// Section JS
async function js_sections(run_js) {
  js_files((js_path = input_files.js_sections), (file_prefix = "section-"));
  run_js();
}

// Components JS
async function js_components(run_js) {
  js_files((js_path = input_files.js_components), (file_prefix = "component-"));
  run_js();
}

// Snippet JS
async function js_snippets(run_js) {
  js_files((js_path = input_files.js_snippets), (file_prefix = "snippet-"));
  run_js();
}

// Theme SVG Spritemap
function svg_theme() {
  return gulp
    .src(input_files.svg_graphics)
    .pipe(rename({ prefix: "sprite-" }))
    .pipe(svgstore())
    .pipe(
      rename(function (path) {
        path.basename += "-spritesheet";
        path.extname = ".svg.liquid";
      })
    )
    .pipe(gulp.dest(output_folder.svg));
}

// Theme Purge CSS
function css_purge() {
  return gulp
    .src(purge_source_files.css)
    .pipe(
      mode.production(
        purgecss({
          content: ["./**/*.liquid", "./_build/scripts/**/*.js"],
          safelist: {
            deep: [/is-active/, /is-visible/, /is-disabled/, /swiper/, /shopify-challenge__container/],
          },
        })
      )
    )
    .pipe(gulp.dest(output_folder.css));
}

// Run the following as individual gulp tasks - e.g. gulp css_global
exports.css_theme = css_theme;
exports.css_components = css_components;
exports.css_sections = css_sections;
exports.css_snippets = css_snippets;
exports.css_apps = css_apps;
exports.js_theme = js_theme;
exports.js_components = js_components;
exports.js_sections = js_sections;
exports.js_snippets = js_snippets;
exports.svg_theme = svg_theme;
exports.css_purge = css_purge;

// Default gulp task - just run gulp in the terminal
exports.default = series(css_theme, css_components, css_sections, css_snippets, css_apps, js_theme, js_components, js_sections, js_snippets, svg_theme, css_purge);

// Watch tasks
exports.watch = function () {
  watch(input_file_patterns.css, { ignoreInitial: false }, series(css_theme, css_components, css_sections, css_snippets, css_apps));
  watch(input_file_patterns.js, { ignoreInitial: false }, series(js_theme, js_components, js_sections, js_snippets));
  watch(input_file_patterns.svg, { ignoreInitial: false }, svg_theme);
};