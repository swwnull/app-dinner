const plugins = []
if (process.env.NODE_ENV === 'production') {
  // 移除console.log
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [ ['@vue/app', {
    polyfills: [
      'es.promise',
      'es.object.assign'
    ]
  },
  ]
],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    // "transform-es2015-arrow-functions", //转译箭头函数
    // "transform-es2015-classes", //转译class语法
    // "transform-es2015-for-of", //转译for-of
    // "transform-object-assign"
  ]
}
