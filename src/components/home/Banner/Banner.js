import carousel from 'vue-owl-carousel';
import axios from 'axios';

/* eslint-disable */
export default {
  components: {
    carousel
  },
  data: () => ({
    bannerTitle: null,
    bannerSubtitle: null
  }),
  created() {
    this.loading = true;
  },
  mounted () {
    // hard link strictly for demo purposes.
    axios.get(`https://cdn.contentful.com/spaces/${process.env.VUE_APP_CTF_SPACE_ID}/environments/master/entries/5A9Lt20WynR8WGduyU6OiM?access_token=${process.env.VUE_APP_CTF_ACCESS_TOKEN}`)
      .then(response => {
        // this.bannerImage = response.data.fields.image.sys.id,
        this.bannerTitle = response.data.fields.title,
        this.bannerSubtitle = response.data.fields.subtitle
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
};
