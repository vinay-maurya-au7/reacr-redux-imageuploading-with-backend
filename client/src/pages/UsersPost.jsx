import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUsersPost } from '../redux/actions/userAction'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

const UsersPost = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const store = useSelector(store => store.userRoot)

    useEffect(() => {
        dispatch(getUsersPost())
    }, [])

    return (
        <>
            {store.isAuthenticated ? <>
                <Navbar />
                {/* {store.usersPost.map(post =>
                    <Card imgUrl={post.imgUrl} title={post.title} description={post.description} />
                )} */}
            </> : history.push('/')}
        </>


    )
}

export default UsersPost
