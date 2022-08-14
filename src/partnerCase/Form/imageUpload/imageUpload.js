import "./imageUpload.css";

import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { storage, db } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export function ImageUpload(props) {
	const { partnerId } = useParams();
	const [images, setImages] = useState([]);
	const [imageLoading, setImageLoading] = useState(false);

	useEffect(() => {
		setImages(props.params);
	}, [props.params]);
	const maxNumber = 10;

	async function postImageRemove(e) {
		console.log(e.target.id);
		let aux = images;
		aux.splice(e.target.id, 1);

		const partnerRef = doc(db, "partner", partnerId);

		updateDoc(partnerRef, {
			img: aux,
		})
			.then(() => {
				setImages(aux);
				console.log("image URL Removed  from Db");
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function postImageUpdate(e) {
		setImageLoading(true);
		let img = e.target.files[0];
		if (img == null) return;

		let name = img.name + v4();

		let imgRef = ref(storage, "images/" + name);
		await uploadBytes(imgRef, img)
			.then((snapshot) => {
				console.log("Image uplaoded to cloud");
			})
			.catch((err) => console.log(err));

		const partnerRef = doc(db, "partner", partnerId);

		await getDownloadURL(ref(storage, "images/" + name)).then((url) => {
			updateDoc(partnerRef, {
				img: [...images, url],
			})
				.then(() => {
					setImages([...images, url]);
					console.log("image URL Uploaded to Db");
					setImageLoading(false);

					e.target.files = [];
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
	return (
		<div className="imageUploadContainer">
			<label> Images </label>
			<div className="imagesContainer">
				{images
					? images.map((image, index) => {
							return (
								<div className="imageIconWrapper">
									<span
										class="material-symbols-outlined"
										id={index}
										onClick={(e) => {
											postImageRemove(e);
										}}>
										remove
									</span>
									<img className="imageContainer" src={image}></img>
								</div>
							);
					  })
					: ""}
			</div>
			<div className="buttonsContainer">
				<input
					type="file"
					placeholder="Add Image"
					onChange={(e) => {
						postImageUpdate(e);
					}}></input>
			</div>
			{imageLoading ? (
				<div style={{ marginLeft: "40%", width: "100%" }}>
					<ThreeDots
						height="30"
						width="30"
						radius="9"
						margin="auto"
						color="#4fa94d"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClassName=""
						visible={true}
					/>
				</div>
			) : (
				""
			)}
		</div>
	);
}
export default ImageUpload;
