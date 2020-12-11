let Payment
if(process.env.VUE_APP_USE_ADYEN){
  Payment = require('./Adyen/Adyen.vue')
}
export default Payment.default