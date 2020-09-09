import React from 'react'

const Card = (props) => {
    return (
        <div class="card mx-2 my-3" style={{ width: "18rem", display: "inline-block" }}>
            <img src={props.imgUrl} style={{ width: "100%", height: "360px" }} class="card-img-top" alt="userPost" />
            <div class="card-body">
                <h5 class="card-title">{props.author}</h5>
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.description}.</p>
            </div>
        </div>
    )
}

export default Card
