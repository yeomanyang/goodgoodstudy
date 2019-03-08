module.exports = function (content) {
    const res = content.replace('{{__date__}}', new Date().toString());
    this.callback(null, `module.exports = '${JSON.stringify(res)}'`);
};
