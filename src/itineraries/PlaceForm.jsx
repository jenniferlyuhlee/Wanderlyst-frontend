import React, {useState} from "react";

function PlaceForm({ index, placeData, handlePlaceChange }){
    return(
        <div className="place-form my-1 p-0">
            <h5 className = "mb-1 p-0">
                Place {index + 1}:
            </h5>
            <div className="form-floating mb-2 p-0">
                <input
                    className="form-control"
                    name="name"
                    placeholder="Place Name"
                    value={placeData.name}
                    onChange={(e) => handlePlaceChange(index, e)}
                    required
                />
                <label htmlFor="name">Place Name</label>
            </div>
            <div className="form-floating mb-2 p-0">
                <input
                    className="form-control"
                    name="address"
                    placeholder="Place Address"
                    value={placeData.address}
                    onChange={(e) => handlePlaceChange(index, e)}
                    required
                />
                <label htmlFor="address">Address</label>
            </div>
            <div className="form-group mb-2 p-0">
                <textarea
                    className="form-control"
                    name="description"
                    rows = "3"
                    placeholder="Share what you did or can do here! Plus any time expectations, highlights, tips, important precautions etc. "
                    value={placeData.description}
                    onChange={(e) => handlePlaceChange(index, e)}
                    required
                />
            </div>
            <div className="form-floating mb-2 p-0">
                <input
                    className="form-control"
                    name="image"
                    placeholder="Image"
                    value={placeData.image}
                    onChange={(e) => handlePlaceChange(index, e)}
                />
                <label htmlFor="image">Image URL (optional)</label>
            </div>
        </div>
    );
}

export default PlaceForm;

