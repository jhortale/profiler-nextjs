import * as React from 'react'
import dynamic from 'next/dynamic'
import { AddToWishlistProps } from './AddToWishlist'
import lodash from 'lodash'

const AddToWishlist = dynamic<AddToWishlistProps>(() => {
  return import('./AddToWishlist').then(mod => mod.AddToWishlist)
}, {
  loading: () => <span>Loading...</span>
})

export type Product = {
  id: number
  name: string
  price: number
  priceFormatted: string;
}

interface ProductProps {
  product: Product
  onAddToWishlist: (id: number) => void
}
function ProductItemComponent({product, onAddToWishlist}: ProductProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = React.useState(false)
  return (
    <div>
      {product.name} - <strong>{product.priceFormatted}</strong>
      <button type="button" onClick={() => setIsAddingToWishlist(true)}>Add to Wishlist</button>

      {isAddingToWishlist && (
        <AddToWishlist 
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = React.memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
})