"use strict";

import {
    wrap
} from "../utils/util";

const banner = {
    template: `
      <div>
       <h1>${wrap("format this!")}</h1>
       <p>{{ message }}</p>
      </div>
    `,
    data() {
        return {
            message: 'This is a banner'
        }
    }
}

new Vue({
    el: '#banner',
    components: {
        banner
    }
});