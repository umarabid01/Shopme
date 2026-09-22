import React from 'react'

function ProfileCard(props) {
  return (
    <div class="card mb-4 mx-5 " style={{ height:"30rem ",border: "2px solid yellow" }}>
        

      <div class="row ">
        <div class="col-3">
          <img src={props.imgsrc} class="img-fluid rounded-start border" alt="img not found" style={{ height:"15rem",objectFit: "cover" }}></img>

        </div>
        <div class="col-9">
          <div class="card-body">
            <h4 class="card-title">{props.Name}</h4>
            <p class="card-text">Email: {props.Email}</p>
            <p class="card-text">Contact: {props.Contact}</p>
            <p class="card-text">Address:{props.Address}</p>
          </div>
        </div>
        </div>
        </div>
  )
}

export default ProfileCard