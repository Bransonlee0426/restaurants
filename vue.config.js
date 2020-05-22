module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
            @import "/src/assets/style/cssreset.scss";
          `,
      },
    },
  },
  devServer: {
    before: (app) => {
      app.set('etag', 'strong');
      app.use((req, res, next) => {
        res.set('Cache-Control', 'must-revalidate');
        next();
      });
    },
  },
};
