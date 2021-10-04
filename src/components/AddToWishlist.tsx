export type AddToWishlistProps = {
  onAddToWishlist: () => void
  onRequestClose: () => void
}

export function AddToWishlist ({onAddToWishlist, onRequestClose}: AddToWishlistProps) {
  return (
    <span>
      Would you like to add to the wishlist?
      <button onClick={onAddToWishlist}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </span>
  )
}