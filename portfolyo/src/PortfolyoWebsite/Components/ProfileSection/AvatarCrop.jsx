import React, { Component } from "react";
import ImageCrop from "./ImageCrop";
import { connect } from "react-redux";

class AvatarCrop extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			userProfilePic: "",
			editor: null,
			scaleValue: 1,
		};
	}

	handleDrop = (dropped) => {
		this.setState({ userProfilePic: dropped[0] });
	};

	setEditorRef = (editor) => this.setState({ editor });

	onCrop = () => {
		const { editor } = this.state;
		if (editor !== null) {
			const url = editor.getImageScaledToCanvas().toDataURL();
			this.props.dispatch({ type: "profileSectionBackgroundImage", payload: url });
			this.props.dispatch({ type: "setBackground", payload: 5 });
			this.setState({ userProfilePic: url });
		}
	};

	onScaleChange = (scaleChangeEvent) => {
		const scaleValue = parseFloat(scaleChangeEvent.target.value);
		this.setState({ scaleValue });
	};

	DataURLtoFile = (dataurl, filename) => {
		let arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	};

	profilePicChange = (fileChangeEvent) => {
		const file = fileChangeEvent.target.files[0];
		const { type } = file;
		if (
			!(
				type.endsWith("jpeg") ||
				type.endsWith("png") ||
				type.endsWith("jpg") ||
				type.endsWith("gif")
			)
		) {
		} else {
			this.setState({
				openCropper: true,
				selectedImage: fileChangeEvent.target.files[0],
				fileUploadErrors: [],
			});
		}
	};
	render() {
		return (
			<div style={{
				width: "100%",
				textAlign: "center",
				overflowX: "scroll"
			}}>
				<input
					type="file"
					name="profilePicBtn"
					accept="image/png, image/jpeg"
					onChange={this.profilePicChange}
					style={{
						display: "block",
						margin: "auto"
					}}
				/>
				<ImageCrop
					imageSrc={this.state.selectedImage}
					setEditorRef={this.setEditorRef}
					onCrop={this.onCrop}
					scaleValue={this.state.scaleValue}
					onScaleChange={this.onScaleChange}
					handleDrop={this.handleDrop}
				/>

				{/* <img src={this.state.userProfilePic} alt="Profile" /> */}
			</div>
		);
	}
}

export default connect()(AvatarCrop);
