import carousel from 'vue-owl-carousel';
import axios from 'axios';
import { createClient } from '../../../utils/contentful'

const client = createClient()


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
    this.getDataFromApi()
  },
  methods: {
    getDataFromApi() {
        // this.loading = true
        axios.get(`https://cdn.contentful.com/spaces/${process.env.VUE_APP_CTF_SPACE_ID}/environments/master/entries/5A9Lt20WynR8WGduyU6OiM?access_token=${process.env.VUE_APP_CTF_ACCESS_TOKEN}`)
        .then(response => {
            this.loading = false
            this.bannerTitle = response.data.fields.title,
            this.bannerSubtitle = response.data.fields.subtitle
        })
        .catch(error => {
            this.loading = false
            console.log('error : ',error)
        })
    }
  }
};