/**
 * This component represents a page that displays products based on the URL parameters.
 * It uses a catch-all route segment to capture all parts of the URL after `/cart/`.
 * it prevent of redirect user to the 404 page when he add something after /products/ in the url
 * and it will display the products page
 * @param {ProductsPageProps} props - The properties passed to the component.
 * @param {Object} props.params - The parameters from the URL.
 * @param {string} props.params.products - The catch-all route segment capturing all parts of the URL after `/cart/`.
 * 
 * @returns {JSX.Element} The rendered component.
 */
import React from 'react'
interface ProductsPageProps {
    params: {products: string[]}
  }
export default function Products({params}: ProductsPageProps) {
    console.log({params})
  return (
    <div className='flex flex-col items-center gap-4 rounded-lg border-1 p-4 bg-slate-100 hover:bg-slate-600'>
     <div className='text-center'>Products Page</div>
      {/* The catch-all route segment is displayed here. */}
      <div className='flex flex-col items-center gap-4 rounded-lg border-1 p-4 bg-slate-100 hover:bg-slate-600'>
      {params?.products?.map((product: string, index: number) => {
        return(<div key={index}>{product}</div>)
        
      })}
      </div>
    </div>
  )
}
// [...products] is a catch-all route segment that captures all parts of the URL after /cart/products/.and redirect user to the products page
// to /cart/products/ and display the products that user added to the cart
//[[...products]] use to rediect user to the products page when he add something after /cart/ in case there is not page created for this route
// inside cart folder which is the parent of products folder