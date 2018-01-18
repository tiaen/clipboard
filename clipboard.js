(function () {
    'use strict';

    init();
    /**
     * 初始化
     */
    function init() {
        var elCopyBox = document.getElementsByClassName('copy-box');
        if (elCopyBox.length > 0) {
            for (var i = 0; i < elCopyBox.length; i++) {
                var elBox = elCopyBox[i];
                var elCopyContent = elBox.getElementsByClassName('copy-content')[0];
                var elCopyBtn = elBox.getElementsByClassName('copy-btn')[0];
                // 判断页面上是否存在复制按钮和要复制的内容，以及是否IE浏览器
                if (elCopyContent && elCopyBtn && window.clipboardData) {
                    var ie = 'ie';
                    elCopyEvent(elCopyContent, elCopyBtn, ie);
                } else if (elCopyContent && elCopyBtn) {
                    elCopyEvent(elCopyContent, elCopyBtn);
                }
            }
        }
    }

    /**
     * IE浏览器，非IE浏览器各不相同的复制方法
     * 
     * @param {HTMLElement} elCopyContent 要复制的内容
     * @param {HTMLButtonElement} elCopyBtn 复制按钮
     * @param {String} ie 如果存在，说明是IE浏览器
     * @returns 
     */
    function elCopyEvent(elCopyContent, elCopyBtn, ie) {
        if (ie) {
            ieBrowser(elCopyContent, elCopyBtn)
            return;
        }
        // 非IE浏览器Input Textarea复制方法
        if (elCopyContent.value !== undefined) {
            elCopyBtn.onclick = function () {
                elCopyContent.focus();
                elCopyContent.select();
                document.execCommand('copy');
                copySuccess(elCopyBtn)
            }
        }
        // 非IE浏览器 非Input 非Textarea复制方法
        else {
            elCopyBtn.onclick = function () {
                // 创建辅助Input元素
                var elAssistInput = getElAssistInput();
                elAssistInput.style.display = 'block';
                elAssistInput.value = elCopyContent.innerText;
                elAssistInput.focus();
                elAssistInput.select();
                document.execCommand('copy');
                // 复制后display改为none，可以防止在手机端弹出输入法
                elAssistInput.style.display = 'none';
                copySuccess(elCopyBtn)
            }
        }

    }

    /**
     * IE浏览器复制方法
     * 
     * @param {HTMLElement} elCopyContent 要复制的内容
     * @param {HTMLButtonElement} elCopyBtn 复制按钮
     */
    function ieBrowser(elCopyContent, elCopyBtn) {
        // input，textarea复制方法
        if (elCopyContent.value !== undefined) {
            elCopyBtn.onclick = function () {
                window.clipboardData.setData("Text", elCopyContent.value);
                copySuccess(elCopyBtn)
                return;
            }
        } else {
            //其他类型元素复制方法
            elCopyBtn.onclick = function () {
                window.clipboardData.setData("Text", elCopyContent.innerText);
                copySuccess(elCopyBtn)
                return;
            }
        }
    }

    /**
     * 非IE浏览器下，对于非input标签元素，创建辅助input标签
     * 
     * @returns {HTMLInputElement} elAssistInput 辅助input标签
     */
    function getElAssistInput() {
        // 默认先查找有没有辅助input标签，如果没有辅助input标签，创建一个
        var elAssistInput = document.getElementById('assist-input');
        if (!elAssistInput) {
            elAssistInput = document.createElement('input');
            elAssistInput.id = 'assist-input';
            elAssistInput.style.position = 'fixed';
            elAssistInput.style.width = '20px';
            elAssistInput.style.right = '-20px';
            elAssistInput.style.bottom = '100px';
            elAssistInput.style.zIndex = 1999999;
            elAssistInput.style.overflow = 'hidden';
            document.body.appendChild(elAssistInput);
        }
        return elAssistInput;
    }

    /**
     * 复制成功后，复制按钮变成 'Copied!'
     * 
     * @param {HTMLButtonElement} elCopyBtn 复制按钮
     */
    function copySuccess(elCopyBtn) {
        if (elCopyBtn.classList.contains('copy-btn-success')) {
            var text = elCopyBtn.innerText;
            elCopyBtn.innerText = 'Copied!';
            setTimeout(function () {
                elCopyBtn.innerText = text
            }, 1000);
        }
    }
})();