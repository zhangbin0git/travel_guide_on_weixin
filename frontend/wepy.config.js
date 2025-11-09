const path = require('path');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('dist', 'index.html'),
      jsOutput: path.join('dist', 'index.js')
    },
    weapp: {
      output: path.join('dist', 'weapp'),
      wxssOutput: path.join('dist', 'weapp', 'app.wxss'),
      wxssCompileMode: 'combined',
      resourcePrefix: 'static/',
      staticOutput: path.join('dist', 'weapp', 'static'),
      es6: true,
      es5Modules: true,
      disableExtractStyle: false,
      postcss: true
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    modules: ['node_modules']
  },
  compilers: {
    sass: {
      outputStyle: 'expanded',
      implementation: require('sass'),
      sassOptions: {
        includePaths: [path.join(__dirname, 'node_modules')],
        fiber: require('fibers')
      },
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    },
    typescript: {
      compilerOptions: {
        target: 'es2017',
        module: 'esnext',
        moduleResolution: 'node',
        strict: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true
      }
    }
  },
  plugins: [],
  appConfig: {
    noPromiseAPI: false,
    request: {
      origin: 'https://api.example.com'
    }
  }
};