/* eslint-disable no-console */
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";

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
  clientKey:"test_47VU4CE62ZAH5GPENGB37LOWVYXLEWUU",
  locale:"en-US",
  environment:"test",
  onSubmit:(...args)=>{
    console.log('we are in onsubmit',args);
    return 88;
    debugger
  },
  onAdditionalDetails:(...args)=>{
    console.log('Additional details: this is mandatory but not sure how to use it',args)
  },

};
export default {
  mounted() {
    const checkout = new AdyenCheckout(configuration);
    const card = checkout.create('card').mount(this.$refs.adyen);
  }
};
