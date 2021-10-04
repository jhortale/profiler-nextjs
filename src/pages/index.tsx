import { SearchResults } from '@/components/SearchResults'
import * as React from 'react'

type Results = {
  products: any[]
  totalPrice: string
}

export default function Home() {
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState<Results>({
    products: [],
    totalPrice: ''
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if(!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map(product => ({
      ...product,
      priceFormatted: formatter.format(product.price)
    }))

    const totalPrice = formatter.format(data.reduce((total, product) => (total + product.price), 0))


    setResults({products, totalPrice})

  }

  const addToWishlist = React.useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <SearchResults results={results.products} totalPrice={results.totalPrice} onAddToWishlist={addToWishlist} />
    </div>
  )
}
