module.exports = {
    devServer: {
        host: 'localhost'
    },
    transpileDependencies: ['vuetify', 'pdfjs-dist'],
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "~@/styles/classes/variables.scss"`
            }
        }
    },

    chainWebpack: config => {
        ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(match => {
            config.module
                .rule('scss')
                .oneOf(match)
                .use('sass-loader')
                .tap(opt =>
                    Object.assign(opt, {
                        additionalData: `@import '~@/styles/classes/variables.scss';`
                    })
                );
        });
        // config.module
        //     .rule('bable-loader')
        //     .test(/\.js$/)

        //     .use('babel-loader')
        //     .loader('babel-loader')
        //     .end();

        // config.module.rule('js').use('babel-loader');

        config.resolve.extensions
            .clear()
            .add('.vue')
            .add('.tsx')
            .add('.ts')
            .add('.mjs')
            .add('.js')
            .add('.jsx')
            .add('.json')
            .add('.wasm');
    }
};
