"use strict";

import puppeteer from "puppeteer";

class AddRenderingPerformance {

    constructor (url) {
        this.getAddRenderingMetrics(url);
    }

    getAddRenderingMetrics (url) {

        return puppeteer.launch().then(async browser => {

            const page = await browser.newPage();
            await page.goto(url, { waitUntil: "load" });

            const advertisements = await page.$$eval("div[data-mod='ad']", divs => {
                return divs.map((div) => {

                    return {
                        id: div.getAttribute("id"),
                        destination: div.getAttribute("data-dest"),
                        rendertime: Number(div.getAttribute("data-rendertime")),
                        generatetime: Number(div.getAttribute("data-generatetime"))
                    };
                });
            });

            console.log(advertisements);

            await browser.close();

        });
    }
}

export default AddRenderingPerformance;