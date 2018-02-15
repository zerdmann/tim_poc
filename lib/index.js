"use strict";

import XhrRequest from "./XhrRequest";
import fs from "fs";
import Promise from "promise";

process.setMaxListeners(Infinity);

const baseUrl = "http://www-dev.morningstar.com";
const endPoints = ["/",
    "/markets.html",
    "/stocks/xnas/aapl/quote.html",
    "/articles/archive/30/articles-by-christine-benz.html",
    "/our-picks.html",
    "/our-picks/investment-type.html",
    "/our-picks/pick-list/christine-benz-funds-for-retirement-savers.html",
    "/videos/788115/weekly-wrap-whats-next-for-chipotle.html",
    "/etfs.html",
    "/stocks/xnas/gold/quote.html",
    "/stocks/xnys/wfc/quote.html", 
    "/save-for-retirement.html",
    "/members/register.html?vurl=http%3a%2f%2fnews.morningstar.com%2farticlenet%2farticle.aspx%3fid%3d580829&referid=A1598",
    "/optimize-your-portfolio.html",
    "/bonds.html",
    "/members/morningstarpremium2.html?referid=A3509#overlay"
];

const collection = [];
const promises = [];

endPoints.forEach((endPoint, index) => {

    let url = baseUrl + endPoint;
    let xhr = new XhrRequest(url);

    let promise = Promise.resolve(xhr).then(xhr => {
        console.log(`${url}`);
        collection.push(xhr);
    });

    promises.push(promise);

    if (index === endPoints.length - 1) {

        Promise.all(promises).then(() => {

            console.log("---------------------------------------------------");
            console.log(`${endPoints.length} pages scanned\n`);

            fs.writeFile("xhrRequests.json", JSON.stringify(collection), err => {

                if (err) {
                    throw err;
                }
                console.log(`\u2713 file written successfully`);
                process.exit();
            });
        });

    }

});