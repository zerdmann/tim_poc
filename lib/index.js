"use strict";

import XhrRequest from "./XhrRequest";
import fs from "fs";
import _ from "lodash";
import Promise from "promise";

const baseUrl = "http://www.morningstar.com";
const endPoints = ["/", "/markets.html", "/stocks/xnas/aapl/quote.html"];

const collection = [];

endPoints.forEach((endPoint, index) => {

    let url = baseUrl + endPoint;
    let xhr = new XhrRequest(url);

    Promise.resolve(xhr).then(xhr => {
        collection.push(xhr);

        if (index === endPoints.length - 1) {
            fs.writeFile("xhrRequests.json", JSON.stringify(collection), err => {

                if (err) {
                    throw err;
                }

                console.log("file written successfully");
                process.exit();
            });
        }
    });
});