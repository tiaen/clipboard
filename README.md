# clipboard.js
目前已经测试：支持IE11，Edge41，Chrome63，Android6.0 浏览器，其他的浏览器没有安装，所以没有测试

GitHub: [https://github.com/tiaen/clipboard](https://github.com/tiaen/clipboard)
## 使用方法：
1. `body`结束标签前引入clipboard.js或clipboard.mini.js
2. 创建带有 `copy-box` 类的标签
3. 给要复制的内容添加 `copy-content` 类
4. 给复制按钮添加 `copy-btn` 类
5. 复制按钮添加 `copy-btn-success` 类，复制后按钮文本会改变。可以不添加，具体效果自己搞定
6. 具体如下：
    ```html
    <div class="copy-box">
        <span class="copy-content">复制内容,复制后按钮文本改变</span>
        <button class="copy-btn copy-btn-success">复制</button>
    </div>
    ```
7. demo: [https://www.tiaen.com/demo/clipboard/](https://www.tiaen.com/demo/clipboard/)