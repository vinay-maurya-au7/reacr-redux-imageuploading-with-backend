import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userUploadPost } from '../redux/actions/userAction'
import Navbar from '../components/Navbar'

const UploadPost = () => {
    const store = useSelector(store=>store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [imgUrl, setImgUrl] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const imageHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImgUrl(img)
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("imgUrl", imgUrl)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("email", store.userRoot.user.email)
        dispatch(userUploadPost(formData, history))

   }
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <form onSubmit={formSubmitHandler}>
                            <div className="form-group">
                                <label htmlFor="inputId">Profile Picture</label>
                                <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imageHandler}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="titleId">Title</label>
                                <input onChange={(e) => setTitle(e.target.value)} value={title} required type="text" className="form-control" id="titleId" />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Description</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} class="form-control" required id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <button type="submit" className="btn btn-info">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
        
       
    )
}

export default UploadPost
