module.exports = ({ file }) => {
    const designWidth = file.dirname.includes('node_modules/vant') ? 375 : 750 // windows 系统原因，nodejs路径只能使用 \\
        // const designWidth = file.dirname.includes('node_modules/vant') ? 375 : 750
        //   modules: true,
    return {
        plugins: {
            autoprefixer: {}
        }
    }
};