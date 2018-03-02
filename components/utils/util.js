"use strict";

class Utility {
    wrap(memo) {
        return memo;
    }

    twist(memo) {
        return _.find(memo, o => o.age < 40);
    }
}

export default new Utility();