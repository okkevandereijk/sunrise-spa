// import { createClient } from 'contentful';
const contentful = require ('contentful')

const client = contentful.createClient({
  space: process.env.VUE_APP_CTF_SPACE_ID,
  accessToken: process.env.VUE_APP_CTF_ACCESS_TOKEN,
})

/* eslint-disable */
const asset = (asset_id) => client.getAsset(asset_id)
  .then( res => { console.log(res)})

const assets = (asset_id) => client.getAssets(asset_id)
.then(function (assets) {
  assets.items.map(function(asset){
    const imageURL = 'https:' + asset.fields.file.url;
  });
})
.catch(function (e) {
  console.log(e);
});

const renderImage = ({ src = "", fit = "", w = 100, h = 100 } = {}) =>
  `${src.replace(/downloads./g, "images.")}?fit=${fit}&w=${w}&h=${h}`;

const getCoverImage = node => {
  return node.heroImage
    ? node.heroImage.file
    : node.media.length > 0
    ? node.media[0].file
    : null;
};

export default client
// export { client, asset, assets, renderImage, getCoverImage };