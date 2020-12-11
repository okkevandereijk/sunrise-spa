/* eslint-disable no-console */
/**
 * To use this component set the VUE_APP_USE_ADYEN to 1
 * in your environment variables
 */

import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import { locale } from "../../../../common/shared";
const clientKey=process.env.VUE_APP_ADYEN_CLIENT_KEY;
if(!clientKey){
  throw new Error('Expected VUE_APP_ADYEN_CLIENT_KEY environment value')
}

export default {
  props: {amount:Object},
  mounted() {
    const configuration = {
      paymentMethodsResponse: {
        paymentMethods: [
          {
            brands: ["visa", "mc"],
            details: [
              { key: "encryptedCardNumber", type: "cardToken" },
              {
                key: "encryptedSecurityCode",
                type: "cardToken",
              },
              {
                key: "encryptedExpiryMonth",
                type: "cardToken",
              },
              { key: "encryptedExpiryYear", type: "cardToken" },
              {
                key: "holderName",
                optional: true,
                type: "text",
              },
            ],
            name: "Credit Card",
            type: "scheme",
          },
        ],
      },
      clientKey,
      locale:locale(this),
      showPayButton:true,
      amount:this.amount,
      environment:"test",
      onSubmit:(result)=>{
        console.log('we are in onsubmit',result);
        console.log(JSON.stringify(result.data.paymentMethod))
        return 88;
      },
      onAdditionalDetails:(...args)=>{
        console.log('Additional details: this is mandatory but not sure how to use it',args)
      },
    
    };
    const checkout = new AdyenCheckout(configuration);
    const card = checkout.create('card').mount(this.$refs.adyen);
  }
};
