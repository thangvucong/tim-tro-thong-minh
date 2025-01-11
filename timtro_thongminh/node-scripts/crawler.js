const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');
const { waitForDebugger } = require('inspector');
const { link } = require('fs');
const { time } = require('console');
const fs = require('fs').promises;

const stealth = StealthPlugin();
stealth.enabledEvasions.delete('user-agent-override');
puppeteer.use(stealth);

(async () => {
    const pLimit = (await import('p-limit')).default;

    const cookiesFilePath = 'cookies.json';
    let cookiesExist = false;

    // Kiểm tra tệp cookies trước khi chạy
    try {
        await fs.access(cookiesFilePath);
        cookiesExist = true;
        console.log('Cookies file found.');
    } catch (err) {
        console.log('Cookies file not found. Logging in...');
    }

    const urlLogin = 'https://id.chotot.com/?continue=https%3A%2F%2Fwww.nhatot.com%2Fthue-phong-tro';
    const url = 'https://www.nhatot.com/thue-phong-tro';
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-site-isolation-trials',
            '--disable-blink-features=AutomationControlled',
            '--disable-automation',
            '--disable-dev-shm-usage'
        ],
        defaultViewport: null,
        userDataDir: './tmp'
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');

    // Tự động từ chối các yêu cầu thông báo
    page.on('dialog', async dialog => {
        console.log('Dialog detected:', dialog.message());
        await dialog.dismiss();
    });

    // Chặn các tài nguyên không cần thiết
    const setupRequestInterception = async (page) => {
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });
    };

    await setupRequestInterception(page);

    // Check cookies
    if (!cookiesExist) {
        await page.goto(urlLogin, { waitUntil: 'networkidle2' });

        await page.waitForSelector('.g15384yj button', { timeout: 10000 });
        const btnLoginWithGG = await page.$('.g15384yj button');
        await btnLoginWithGG.click();

        await new Promise(resolve => setTimeout(resolve, 2000));

        const pages = await browser.pages();
        const popupPage = pages.find(p => p.url().includes('accounts.google.com'));
        if (!popupPage) {
            console.error('Google login popup not found!');
            return;
        }
        await popupPage.bringToFront();

        await popupPage.waitForSelector('input[type="email"]', { timeout: 10000 });
        await popupPage.type('input[type="email"]', 'accvthang1');
        await popupPage.click('#identifierNext'); ``

        await popupPage.waitForNavigation({ waitUntil: 'load' });
        await popupPage.waitForSelector('input[type="password"]', { visible: true, hidden: false, });
        await popupPage.type('input[type="password"]', 'Vucongthang1@');
        await popupPage.click('#passwordNext');

        console.log('Google login successful.');

        let newTab;
        while (!newTab) {
            const allPages = await browser.pages();
            newTab = allPages.find(page => page.url().includes('nhatot.com/thue-phong-tro'));
            if (!newTab) {
                console.log('Waiting for redirect to main page...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        await newTab.bringToFront();
        console.log('Navigated to:', newTab.url());

        const cookies = await newTab.cookies();
        cookies.forEach(cookie => {
            if (!cookie.expires) {
                cookie.expires = Math.floor(Date.now() / 1000) + 3600;
            }
        });
        await fs.writeFile('cookies.json', JSON.stringify(cookies, null, 2));
        console.log('Cookies:', cookies);
        console.log('Cookies saved to cookies.json');
    }

    const scrollToBottom = async (page) => {
        await page.evaluate(async () => {
            const distance = 100;
            let totalHeight = 0;
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

            while (totalHeight < document.body.scrollHeight) {
                window.scrollBy(0, distance);
                totalHeight += distance;
                await delay(200);
            }
        });
    };

    const crawlPageLinks = async (browser, pageUrl) => {
        const page = await browser.newPage();
        try {
            console.log(`Fetching links from: ${pageUrl}`);
            await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 60000 });
            const links = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div.ListAds_ListAds__rEu_9 > ul  div > li > a')).map(a => a.href)
            );

            console.log("Số lượng link: ", links.length);
            await page.close();
            return links;
        } catch (error) {
            console.error(`Error fetching page ${pageUrl}:`, error);
            await page.close();
            throw error;
        }
    };

    const processLink = async (browser, link) => {
        const page = await browser.newPage();
        try {
            await page.goto(link, { waitUntil: 'networkidle2' });

            // Click vào nút hiển thị số điện thoại và lấy số điện thoại nếu có
            const phoneButtonSelector = '.InlineShowPhoneButton_wrapper__0HZm7 button[type="button"]';
            const seeMoreButtonSelector = 'button.styles_button__SVZnw';
            let phoneText = null;

            if (await page.$(phoneButtonSelector)) {
                await page.click(phoneButtonSelector);
                await new Promise(resolve => setTimeout(resolve, 3000));
                await page.waitForSelector('input[id="phoneNumberInput"]', { timeout: 5000 });
                phoneText = await page.evaluate(() => {
                    const phoneDiv = document.querySelector('.InlineShowPhoneButton_phoneShow___B97q');
                    if (phoneDiv) {
                        const strongTag = phoneDiv.querySelector('strong');
                        if (strongTag) {
                            strongTag.textContent = '';
                        }
                    }
                    const phone = phoneDiv ? phoneDiv.textContent.trim() : null;
                    return phone;
                });
            }

            // Click vào nút xem thêm nếu có
            if (await page.$(seeMoreButtonSelector)) {
                await page.click(seeMoreButtonSelector);
            }

            // Lấy thông tin bài đăng
            console.log("Đang lấy thông tin bài đăng: ", link);
            const data = await page.evaluate(() => {
                const role_user = document.querySelector('.d4deiyo b')?.textContent || null;
                const images = Array.from(document.querySelectorAll('.slick-track img'))
                    .map(img => img.src)
                    .filter(src =>
                        src.startsWith('https://') &&
                        !src.includes('data:image/gif;base64') &&
                        !src.includes('svg') &&
                        src.includes('cdn.chotot.com')
                    );
                const title = document.querySelector('.cd9gm5n h1')?.textContent || null;
                const priceString = document.querySelector('b.pyhk1dv')?.textContent || null;
                let price = null;
                if (priceString) {
                    const matches = priceString.match(/[\d.,]+/);
                    if (matches) {
                        price = parseFloat(matches[0].replace(',', '.'));
                    }
                }

                let furniture = null;
                let acreage = null;
                let location = null;
                let timed = null;

                const fn_ = document.querySelectorAll('.cd9gm5n .r9vw5if span');
                if (fn_.length > 4) {
                    furniture = fn_[0]?.textContent || null;
                    acreage = fn_[2]?.textContent || null;
                    location = fn_[3]?.textContent || null;
                    timed = fn_[4]?.textContent || null;
                } else {
                    acreage = fn_[1]?.textContent || null;
                    location = fn_[2]?.textContent || null;
                    timed = fn_[3]?.textContent || null;
                }
                const type = document.querySelector('.AdParam_adParamValuePty__3uTmt[itemprop="ad_type"]')?.textContent || null;
                const depositString = document.querySelector('.AdParam_adParamValuePty__3uTmt[itemprop="deposit"]')?.textContent || null;
                let deposit = null;
                if (depositString) {
                    const matches = priceString.match(/[\d.,]+/);
                    if (matches) {
                        deposit = parseFloat(matches[0].replace(',', '.'));
                    }
                }
                const description = document.querySelector('p[itemprop="description"]')?.textContent || null;
                const formattedDescription = description
                    .replace(/['+]/g, '')
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0)
                    .join('\n');
                const img_map = document.querySelector('.a10elgev img')?.src || null;
                return { role_user, images, title, furniture, price, acreage, location, timed, type, deposit, formattedDescription, img_map };
            });
            console.log("Thông tin bài đăng: ", data);

            // Lấy link người dùng
            const userLink = await page.evaluate(() => {
                const userElement = document.querySelector('div.SellerInfo_sellerWrapper__r4S9i div[role="presentation"] a');
                return userElement ? userElement.href : null;
            });

            let userData = null;
            let reviews = null;
            let dataUserReviews = null;
            if (userLink) {
                try {
                    await page.goto(userLink, { waitUntil: 'networkidle2' });

                    // Kiểm tra format trang người dùng
                    const hasUserInfo = await page.evaluate(() => {
                        return !!document.querySelector('img[alt="Avatar"]') &&
                            !!document.querySelector('.wi59mti h1') &&
                            (!!document.querySelector('.r7qf9fq .rating b') || !!document.querySelector('.not-rating'))
                    });

                    if (!hasUserInfo) {
                        console.log('Thông tin người dùng không đầy đủ, bỏ qua bài đăng này');
                        return;
                    }

                    console.log("Đang lấy thông tin người dùng: ", userLink);
                    // Lấy thông tin người dùng
                    userData = await page.evaluate(() => {
                        const avatar = document.querySelector('img[alt="Avatar"]')?.src || null;
                        const name = document.querySelector('.wi59mti h1')?.textContent || null;
                        let rating = document.querySelector('.r7qf9fq .rating b')?.textContent || document.querySelector('.r7qf9fq .not-rating')?.textContent || '0.0';
                        if (rating === 'Chưa có đánh giá') {
                            rating = '0.0';
                        }
                        const ratingCountText = document.querySelector('.r7qf9fq .rating a')?.textContent || '';
                        const ratingCount = parseInt(ratingCountText.replace(/[^0-9]/g, '')) || null;
                        const linkReview = document.querySelector('.r7qf9fq .rating a')?.href || null;
                        const followers = (document.querySelectorAll('.f1i1yvux b'))[0].textContent || null;
                        const following = (document.querySelectorAll('.f1i1yvux b'))[1].textContent || null;
                        const rpAndLocation = document.querySelectorAll('.wgz8swh span');
                        const responseChat = rpAndLocation[0].textContent || null;
                        const joinDate = rpAndLocation[1].textContent || null;
                        const location = rpAndLocation[2].textContent || null;
                        return { avatar, name, rating, ratingCount, followers, following, responseChat, joinDate, location, linkReview };
                    });

                    console.log("Thông tin người dùng: ", userData);

                    // Lấy đánh giá của người dùng
                    console.log("Đang lấy đánh giá của người dùng: ", userLink);
                    if (userData.linkReview) {
                        await page.goto(userData.linkReview, { waitUntil: 'networkidle2' });
                        await page.waitForSelector('.mocked-styled-26.n10xz8o4', { timeout: 5000 });
                        reviews = await page.evaluate(() => {
                            const reviews = Array.from(document.querySelectorAll('.r1t8r295')).map(review => {
                                const reviewName = review.querySelector('.mocked-styled-26.n10xz8o4')?.textContent || null;
                                const reviewAvatar = review.querySelector('img[alt="avatar"]')?.src || null;
                                const reviewContent = review.querySelector('.mocked-styled-25.r1czgyd6')?.textContent || null;
                                const activeStars = review.querySelectorAll('.star .ratingStar img[src*="pf_rating_active_icon.svg"]').length;
                                const reviewRating = activeStars;
                                const reviewDate = review.querySelector('.date.hasLine')?.textContent || null;
                                const namePost = review.querySelector('.mocked-styled-21.tsh16f7')?.textContent || null;
                                return { reviewName, reviewAvatar, reviewContent, reviewRating, reviewDate, namePost };
                            });
                            return reviews;
                        });
                        console.log("Đánh giá của người dùng: ", reviews);

                        // Lấy thông tin các user đánh giá
                        console.log("Đang lấy thông tin user đánh giá");
                        const reviewDivSelector = '.r1t8r295 .r1ysvnks';
                        dataUserReviews = await processAllReviewDivs(page, browser, reviewDivSelector);

                        console.log('Thông tin user đánh giá:', dataUserReviews);
                    } else {
                        console.log('Không có link đánh giá');
                    }
                } catch (error) {
                    console.error(`Error fetching user data from ${userLink}:`, error);
                }
            }
            page.close();
            data.phone = phoneText;
            return { postInfo: data, userInfo: userData, reviews, dataUserReviews: dataUserReviews };
        } catch (error) {
            console.error(`Error processing link ${link}:`, error);
            await page.close();
            return null;
        }
    };

    const processLinksConcurrently = async (browser, links, concurrency = 5) => {
        const results = [];
        for (let i = 0; i < links.length; i += concurrency) {
            const batch = links.slice(i, i + concurrency);
            const batchResults = await Promise.all(batch.map(link => processLink(browser, link)));
            results.push(...batchResults.filter(Boolean));
        }
        return results;
    };

    const fetchAllLinks = async (browser, url, totalPages, concurrency = 5) => {
        const allLinks = [];
        const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
        const limit = pLimit(concurrency);

        const linkFetchPromises = pageNumbers.map(pageNum =>
            limit(async () => {
                const pageUrl = `${url}?page=${pageNum}`;
                try {
                    return await crawlPageLinks(browser, pageUrl);
                } catch {
                    console.log(`Retrying for page: ${pageUrl}`);
                    return await crawlPageLinks(browser, pageUrl);
                }
            })
        );

        const results = await Promise.all(linkFetchPromises);
        results.forEach(pageLinks => {
            allLinks.push(...pageLinks);
        });

        return allLinks;
    };

    const fetchUserReviewDetails = async (browser, page, reviewDiv) => {
        try {
            console.log("Clicking review div to open new tab...");

            const newPagePromise = new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error("Timeout waiting for new page"));
                }, 5000); // Thời gian chờ tối đa 5 giây

                browser.once('targetcreated', async (target) => {
                    if (target.type() === 'page') {
                        const newPage = await target.page();
                        clearTimeout(timeout);
                        resolve(newPage);
                    }
                });
            });

            await reviewDiv.click();
            await new Promise(resolve => setTimeout(resolve, 3000));

            const newPage = await newPagePromise;

            await newPage.waitForSelector('img[alt="Avatar"]', { timeout: 5000 });

            const userDetails = await newPage.evaluate(() => {
                const avatar = document.querySelector('img[alt="Avatar"]')?.src || null;
                const name = document.querySelector('.wi59mti h1')?.textContent || null;
                let rating = document.querySelector('.r7qf9fq .rating b')?.textContent || document.querySelector('.r7qf9fq .not-rating')?.textContent || '0.0';
                if (rating === 'Chưa có đánh giá') {
                    rating = '0.0';
                }
                const ratingCountText = document.querySelector('.r7qf9fq .rating a')?.textContent || '';
                const ratingCount = parseInt(ratingCountText.replace(/[^0-9]/g, '')) || null;
                const linkReview = document.querySelector('.r7qf9fq .rating a')?.href || null;
                const followers = (document.querySelectorAll('.f1i1yvux b'))[0].textContent || null;
                const following = (document.querySelectorAll('.f1i1yvux b'))[1].textContent || null;
                const rpAndLocation = document.querySelectorAll('.wgz8swh span');
                const responseChat = rpAndLocation[0].textContent || null;
                const joinDate = rpAndLocation[1].textContent || null;
                const location = rpAndLocation[2].textContent || null;
                return { avatar, name, rating, ratingCount, followers, following, responseChat, joinDate, location, linkReview };
            });

            console.log("Thông tin user đánh giá:", userDetails);

            await newPage.close();
            return userDetails;
        } catch (error) {
            console.error("Lỗi khi lấy thông tin từ tab mới:", error);
            return null;
        }
    };



    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const processAllReviewDivs = async (page, browser, divSelector, maxDivs = 5) => {
        const reviewDivs = await page.$$(divSelector);
        const userDetailsList = [];

        for (let i = 0; i < reviewDivs.length && i < maxDivs; i++) {
            const reviewDiv = reviewDivs[i];
            try {
                console.log(`Đang xử lý div thứ ${i + 1}/${maxDivs}...`);
                const userDetails = await fetchUserReviewDetails(browser, page, reviewDiv);
                if (userDetails) {
                    userDetailsList.push(userDetails);
                }
                await delay(Math.floor(Math.random() * 2000) + 1000);
            } catch (error) {
                console.error("Lỗi khi xử lý vùng div:", error);
            }
        }

        try {
            console.log("Đang cuộn trang xuống cuối...");
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            await delay(2000);
        } catch (error) {
            console.error("Lỗi khi cuộn trang:", error);
        }

        return userDetailsList;
    };


    const totalPages = 10;
    const allLinks = await fetchAllLinks(browser, url, totalPages, 10);
    const results = await processLinksConcurrently(browser, allLinks, 10);

    console.log("Results:", results);


    // Gửi data đi
    try {
        const batchSize = 10;
        for (let i = 0; i < results.length; i += batchSize) {
            const batch = results.slice(i, i + batchSize);
            await axios.post('http://127.0.0.1:8000/api/crawler-data', batch);
            console.log(`Uploaded batch ${i / batchSize + 1}`);
        }
    } catch (error) {
        console.error('Error uploading data:', error);
    }

    await browser.close();
})();