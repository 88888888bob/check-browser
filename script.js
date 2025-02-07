document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.querySelector('.countdown');
    const progressElement = document.querySelector('.circle-progress');
    const browserInfoElement = document.querySelector('.browser-info');
    const statusElement = document.createElement('div');
    browserInfoElement.parentNode.insertBefore(statusElement, browserInfoElement.nextSibling);
    const tipElement = document.createElement('div');
    statusElement.parentNode.insertBefore(tipElement, statusElement.nextSibling);

    let timeLeft = 3;
    let progress = 0;
    const totalTime = 3;
    let progressInterval;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const checkBrowser = () => {
        const userAgent = navigator.userAgent;
        let browser = {
            name: '其他',
            version: '未知'
        };

        if (userAgent.includes('Chrome')) {
            browser.name = 'Chrome';
            browser.version = userAgent.match(/Chrome\/([\d.]+)/)[1];
        } else if (userAgent.includes('Firefox')) {
            browser.name = 'Firefox';
            browser.version = userAgent.match(/Firefox\/([\d.]+)/)[1];
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            browser.name = 'Safari';
            browser.version = userAgent.match(/Version\/([\d.]+)/)[1];
        }
        return browser;
    };

    // 在页面加载时显示浏览器信息
    const browserInfo = checkBrowser();
    let deviceType = isMobile ? '手机' : '电脑';
    browserInfoElement.textContent = `设备类型：${deviceType}，您的浏览器：${browserInfo.name} ${browserInfo.version}`;

    const updateCountdown = () => {
        countdownElement.textContent = timeLeft;
        statusElement.textContent = '即将跳转';

        let browserStatus = '无法使用';
        let redirectUrl = 'https://www.example.com/unsupported';  // 默认页面（无法使用）
        let manualLinkUrl = 'https://www.example.com/unsupported';

        if (browserInfo.name === 'Chrome') {
            if (parseFloat(browserInfo.version) >= 80) {
                browserStatus = '高版本';
                 redirectUrl = isMobile ? 'https://main.xn--9kqt24afnh7sw.cn/mobile' : 'https://main.xn--9kqt24afnh7sw.cn';
                manualLinkUrl = redirectUrl;
            } else {
                 browserStatus = '低版本';
                 redirectUrl = isMobile ? 'https://xn--9kqt24afnh7sw.cn/mobile' : 'https://xn--9kqt24afnh7sw.cn';
                manualLinkUrl = redirectUrl;
            }
        } else if (browserInfo.name === 'Firefox') {
            if (parseFloat(browserInfo.version) >= 70) {
                browserStatus = '高版本';
                redirectUrl = isMobile ? 'https://main.xn--9kqt24afnh7sw.cn/mobile' : 'https://main.xn--9kqt24afnh7sw.cn';
                manualLinkUrl = redirectUrl;
            } else {
                browserStatus = '低版本';
                 redirectUrl = isMobile ? 'https://xn--9kqt24afnh7sw.cn/mobile' : 'https://xn--9kqt24afnh7sw.cn';
                manualLinkUrl = redirectUrl;
            }
        } else if (browserInfo.name === 'Safari') {
            if (parseFloat(browserInfo.version) >= 13) {
                browserStatus = '高版本';
                redirectUrl = isMobile ? 'https://main.xn--9kqt24afnh7sw.cn/mobile' : 'https://main.xn--9kqt24afnh7sw.cn';
                manualLinkUrl = redirectUrl;
            } else {
                browserStatus = '低版本';
                 redirectUrl = isMobile ? 'https://xn--9kqt24afnh7sw.cn/mobile' : 'https://xn--9kqt24afnh7sw.cn';
                manualLinkUrl = redirectUrl;
            }
        } else {
            browserStatus = '无法使用';
            redirectUrl = 'https://www.example.com/unsupported';
            manualLinkUrl = 'https://www.example.com/unsupported';
        }


        switch (browserStatus) {
            case '高版本':
                tipElement.textContent = `推荐使用，即将跳转到高版本页面`;
                break;
            case '低版本':
                tipElement.textContent = `浏览器版本过低，即将跳转到旧版页面`;
                break;
            default:
                tipElement.textContent = `无法使用，请更换其他浏览器`;
        }



        if (timeLeft === 0) {
            clearInterval(countdownInterval);
            clearInterval(progressInterval)
            progressElement.style.setProperty('--progress-angle', '360deg');
            statusElement.textContent = '跳转！';
            tipElement.textContent = '';
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1000);

            setTimeout(() => {
                const manualLink = document.createElement('a');
                manualLink.href = manualLinkUrl;
                manualLink.textContent = '没有跳转？点我手动跳转';
                statusElement.textContent = '';
                statusElement.appendChild(manualLink);
            }, 2000);
            return;
        }

        timeLeft--;
    };

    const updateProgress = () => {
        progress += 360 / totalTime / 10;
        if (progress >= 360) {
            progress = 360;
        }

        progressElement.style.setProperty('--progress-angle', `${progress}deg`);
    };

    // 启动倒计时
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // 启动进度条动画
    progressInterval = setInterval(updateProgress, 100);
});