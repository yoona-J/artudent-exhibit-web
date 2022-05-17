import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import Axios from 'axios'

function Favorite(props) {

    // console.log(props)

    const productId = props.productId
    const userFrom = props.userFrom
    const productTitle = props.productInfo.title
    const productPost = props.productInfo.images
    const productArtist = props.productInfo.artist

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        productId: productId,
        productTitle: productTitle,
        productPost: productPost,
        productArtist: productArtist
    }

    console.log('user', props.userFrom)

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                setFavoriteNumber(response.data.favoriteNumber)
                if (response.data.success) {
                    console.log('res', response.data)
                } else {
                    alert('숫자 정보를 가져오는데 실패했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success){
                    console.log('res2', response.data)
                    setFavorited(response.data.favorited)
                }else{
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })
      
    }, [])

    const onClickFavorite = () => {

        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        console.log('res3', response.data)
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    }else {
                        alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                    }
                })

        }else{
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        console.log('res4', response.data)
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    }else {
                        alert('Favorite 리스트에서 추가하는 걸 실패했습니다.')
                    }
                })
        }
    }
    

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Button size='large' shape='round' type='danger' style={{marginTop: '10px'}} onClick={onClickFavorite}>
            {Favorited ? "♥" : "♡"} {FavoriteNumber}
        </Button>
    </div>
  )
}

export default Favorite