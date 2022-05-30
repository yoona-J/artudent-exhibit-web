import React from 'react'
import '../../Library/Sections/UserCardBlock.css'

function MyUpload(props) {
  console.log(props)

  const renderItems = () => (
    props.product && props.product.map((Product, idx) => (
      // console.log('Product', Product)
      <tr key={idx}>
          <td>
              <a href={`/product/${Product._id._id}`}>{Product.title}</a>
          </td>
          <td>
              {Product.artist}
          </td>
          {/* <td>
              <button onClick={() => props.removeItem(Product._id)}>remove</button>
          </td> */}
      </tr>
    ))
  )

  return (
    <div style={{ marginBottom: '50px'}}>
      <table>
            <thead>
                <tr style={{ textAlign: 'center' }}>
                    <th>Title</th>
                    <th>Artist</th>
                    {/* <th>Remove</th> */}
                </tr>
            </thead>
            <tbody>
                {renderItems()}
            </tbody>
        </table>
    </div>
  )
}

export default MyUpload