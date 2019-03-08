const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
// let path = '';

class MyPlugin {
    constructor(options) {
        this.options = options;
        this.assets = {};
        this.xhtml = false;
    }

    apply(compiler) {
        // 指定要追加的事件钩子函数
        compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
            console.log('The compiler is starting a new compilation...')

            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
                'MyPlugin',
                (data, cb) => {
                    const template = fs.readFileSync(path.resolve(__dirname, '../index.ftl'), 'utf8');
                    debugger;
                    const ret = this.injectAssetsIntoHtml(template, this.assets, data);
                    cb(null, data)
                }
            )

            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
                'MyPlugin',
                (data, cb) => {
                    this.assets = data.assets;
                    cb(null, data)
                }
            )

        })
    };

    createHtmlTag(tagDefinition) {
        const attributes = Object.keys(tagDefinition.attributes || {})
            .filter(attributeName => tagDefinition.attributes[attributeName] !== false)
            .map(attributeName => {
                if (tagDefinition.attributes[attributeName] === true) {
                    return attributeName;
                }
                return attributeName + '="' + tagDefinition.attributes[attributeName] + '"';
            });
        // Backport of 3.x void tag definition
        const voidTag = tagDefinition.voidTag !== undefined ? tagDefinition.voidTag : !tagDefinition.closeTag;
        const selfClosingTag = tagDefinition.voidTag !== undefined ? tagDefinition.voidTag && this.options.xhtml : tagDefinition.selfClosingTag;
        return '<' + [tagDefinition.tagName].concat(attributes).join(' ') + (selfClosingTag ? '/' : '') + '>' +
            (tagDefinition.innerHTML || '') +
            (voidTag ? '' : '</' + tagDefinition.tagName + '>');
    }

    injectAssetsIntoHtml(html, assets, assetTags) {
        debugger;
        const htmlRegExp = /(<html[^>]*>)/i;
        const headRegExp = /(<\/head\s*>)/i;
        const bodyRegExp = /(<\/body\s*>)/i;
        const body = assetTags.body.map(this.createHtmlTag.bind(this));
        const head = assetTags.head.map(this.createHtmlTag.bind(this));

        if (body.length) {
            if (bodyRegExp.test(html)) {
                // Append assets to body element
                html = html.replace(bodyRegExp, match => body.join('') + match);
            } else {
                // Append scripts to the end of the file if no <body> element exists:
                html += body.join('');
            }
        }

        if (head.length) {
            // Create a head tag if none exists
            if (!headRegExp.test(html)) {
                if (!htmlRegExp.test(html)) {
                    html = '<head></head>' + html;
                } else {
                    html = html.replace(htmlRegExp, match => match + '<head></head>');
                }
            }

            // Append assets to head element
            html = html.replace(headRegExp, match => head.join('') + match);
        }

        // Inject manifest into the opening html tag
        if (assets.manifest) {
            html = html.replace(/(<html[^>]*)(>)/i, (match, start, end) => {
                // Append the manifest only if no manifest was specified
                if (/\smanifest\s*=/.test(match)) {
                    return match;
                }
                return start + ' manifest="' + assets.manifest + '"' + end;
            });
        }
        return html;
    }
}

module.exports = MyPlugin
