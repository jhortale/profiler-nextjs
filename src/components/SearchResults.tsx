import * as React from 'react'
import { List, ListRowRenderer } from 'react-virtualized'
import { Product, ProductItem } from "./ProductItem"

interface SearchResultsProps {
  results: Array<Product>
  totalPrice: string
  onAddToWishlist: (id: number) => void
}
export function SearchResults({results, totalPrice, onAddToWishlist}: SearchResultsProps) {
  
  const rowRenderer: ListRowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]} onAddToWishlist={onAddToWishlist} />
      </div>
    )
  }

  return (
    <div>
      <h2>Total price {totalPrice}</h2>

      <List 
        height={300}
        rowHeight={25}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  )
}