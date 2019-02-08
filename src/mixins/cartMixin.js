import gql from 'graphql-tag';
import DisplayableMoneyFragment from '@/components/DisplayableMoney.gql';

// Issue with under-fetching on mutations https://github.com/apollographql/apollo-client/issues/3267
// required any queried field to be fetched in order to update all components using carts, e.g. mini-cart

export default {
  methods: {
    updateMyCart(actions) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation updateMyCart(
          $actions: [MyCartUpdateAction!]!,
          $id: String!,
          $version: Long!,
          $locale: Locale!) {
            updateMyCart(id: $id, version: $version, actions: $actions) {
              id
              version
              totalPrice {
                ...DisplayableMoney
              }
              shippingInfo {
                price {
                  ...DisplayableMoney
                }
              }
              taxedPrice {
                totalGross {
                  ...DisplayableMoney
                }
                totalNet {
                  ...DisplayableMoney
                }
              }
              lineItems {
                id
                quantity
                name(locale: $locale)
                productSlug(locale: $locale)
                variant {
                  sku
                  images {
                    url
                  }
                }
                price {
                  value {
                    ...DisplayableMoney
                  }
                  discounted {
                    value {
                      ...DisplayableMoney
                    }
                  }
                }
                totalPrice {
                  ...DisplayableMoney
                }
              }
            }
          }
          ${DisplayableMoneyFragment}`,
        variables: {
          actions,
          id: this.me.activeCart.id,
          version: this.me.activeCart.version,
          locale: this.$i18n.locale,
        },
      });
    },
  },
};
