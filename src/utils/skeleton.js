import Vue from "vue";
import skeletonorders from "./components/skeleton/skeleton.vue";

export default new Vue({
  components: {
    skeletonorders
  },
  template: `
        <div>
            <skeletonHome id="skeleton-orders" style="display:none"/>
        </div>
    `
});

