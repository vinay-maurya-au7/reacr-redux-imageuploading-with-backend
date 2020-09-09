import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {useHistory } from 'react-router-dom'
import {userLogin} from '../redux/actions/userAction'

const Login = () => {
    const store = useSelector(store=>store.userRoot)
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (store.isAuthenticated) {
            history.push('/allposts')
        }
    }, [store.isAuthenticated])

    const formSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin({ email, password }, history))
        
    }


    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <form onSubmit={formSubmitHandler} >
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" value={email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" value={password} id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
