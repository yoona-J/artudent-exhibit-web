import React from 'react'
import './UserCardBlock.css'

function UserCardBlock(props) {
    console.log('props', props)
    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <a href={`/product/${product._id}`}>{product.title}</a>
                </td>
                <td>
                    {product.artist}
                </td>
                <td>
                    <button onClick={() => props.removeItem(product._id)}>remove</button>
                </td>
            </tr>
        ))
    )

  return (
    <div>
        <table>
            <thead>
                <tr style={{ textAlign: 'center' }}>
                    <th>Artwork Title</th>
                    <th>Artwork Artist</th>
                    <th>Remove from Library</th>
                </tr>
            </thead>
            <tbody>
                {renderItems()}
            </tbody>
        </table>
    </div>
  )
}

export default UserCardBlock