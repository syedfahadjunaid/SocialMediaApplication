import React from "react";
import "./GallaryPage.css";
import img from "../../Asset/Rectangle 134.png";
import img1 from "../../Asset/Rectangle 134-1.png";
import img2 from "../../Asset/Rectangle 134-2.png";
import img3 from "../../Asset/Rectangle 135.png";
import img4 from "../../Asset/Rectangle 135-2.png";
import img5 from "../../Asset/Rectangle 135-2.png";
import img6 from "../../Asset/Rectangle 136.png";
import img7 from "../../Asset/Rectangle 136-1.png";
import img8 from "../../Asset/Rectangle 136-2.png";
import img9 from "../../Asset/Rectangle 137.png";
import img10 from "../../Asset/Rectangle 137-1.png";
import img11 from "../../Asset/Rectangle 137-2.png";
import img12 from "../../Asset/et_upload.png";
import axios from "axios";
import {
  Cancel,
  Close,
  KeyboardArrowLeft,
  Opacity,
  Upload,
} from "@mui/icons-material";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
function GalleryUpload() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.transparent",
    border: "2px solid transparent",
    boxShadow: 0,
    p: 4,
    outline: "0",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  };
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [galleryType, setGalleryType] = useState();
  const images = [
    { image: img },
    { image: img1 },
    { image: img2 },
    { image: img3 },
    { image: img4 },
    { image: img5 },
    { image: img6 },
    { image: img7 },
    { image: img8 },
    { image: img9 },
    { image: img10 },
    { image: img11 },
  ];
  const [selectedImage, setSelectedImage] = useState([]);
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const getSelectedImage = (e) => {
    setSelectedImage([...selectedImage, e.target.files[0]]);
  };
  const removeImageHandle = (name) => {
    setSelectedImage(selectedImage?.filter((item) => item.name !== name));
  };
  const { login } = useSelector((state) => state.userLogin);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const addToGalleryHandle = async () => {
    const formData = new FormData();
    formData.append("GalleryName", "my profile");
    formData.append("GalleryShortDiscription", "");
    formData.append("GalleryLink", "");
    formData.append("GalleryDiscrition", "");
    formData.append("GalleryCategory", "public");
    formData.append("Galleytype", "");
    formData.append("GalleryAddedbby", login?.userId);
    selectedImage.forEach((img) => formData.append("Galleryfile", img));

    const data = await axios
      .post(
        `${process.env.React_App_Base_url + "Api/" + "add-Gallery"}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-date" },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data?.status === 201) {
      setOpen1(true);
      setSelectedImage([]);
    }

    console.log(data);
  };

  return (
    <div className="galleryPage">
      <div className="galleryPage_profile_button">
        <button onClick={() => history(-1)}>
          <KeyboardArrowLeft /> Profile
        </button>
      </div>
      <div className="galleryPage_title">
        <p>Janet’s Gallery ( Spanking )</p>
      </div>
      <div className="galleryPage_upload">
        <div className="galleryPage_upload_left">
          <img src={img12} alt="upload" />
          <p className="galleryPage_upload_left_p_first">
            Drag Files to Upload
          </p>
          <div className="galleryPage_upload_left_div">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <p className="galleryPage_upload_left_p_last" onClick={handleClick}>
            Select Files
          </p>
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            ref={hiddenFileInput}
            onChange={getSelectedImage}
          />
          <p className="galleryPage_upload_left_p_last_last">
            Please keep your image files in common formats like JPEG, PNG, and
            GIF. Videos are limited to a 20MB file size. Thank you for complying
            with these guidelines.
          </p>
        </div>
        <div className="galleryPage_upload_right">
          <div className="galleryPage_upload_right_top">
            {selectedImage?.map((item) => (
              <span className="img_span">
                <img src={URL.createObjectURL(item)} alt="selected " />
                <p>
                  <Close
                    style={{ fontSize: "1rem", color: "#b7002b" }}
                    onClick={() => removeImageHandle(item?.name)}
                  />
                </p>
              </span>
            ))}
          </div>
          <div className="galleryPage_upload_right_bottom">
            <select>
              <option>Select One</option>
              <option>Spanking</option>
              <option>Girls On Girls</option>
              <option>Spanking</option>
            </select>
            <form
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="flex">
                <button className="galleryPage_upload_right_bottom_cancel">
                  <p>Cancel</p> <Cancel />
                </button>
               {selectedImage?.length>0 && <button
                  type="submit"
                  className={
                    selectedImage?.length > 0
                      ? "galleryPage_upload_right_bottom_upload"
                      : "disable galleryPage_upload_right_bottom_upload"
                  }
                  onClick={addToGalleryHandle}
                >
                  <p>Upload</p> <Upload />
                </button>}
              </div>
              <div className="gallery_type">
                <p>Gallery Type</p>
                <select
                  onChange={(e) => setGalleryType(e.target.value)}
                  required
                >
                  <option>Select One</option>
                  <option value="Public Gallery">Public Gallery</option>
                  <option value="Private Gallery">Private Gallery</option>
                  <option value="Playmates Only"> Playmates Only</option>
                  <option value="Pay Per View Gallery">
                    {" "}
                    Pay Per View Gallery
                  </option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="galleryPage_images">
        {images?.map((item) => (
          <img
            src={item?.image}
            alt="gallery"
            className="galleryPage_images_images"
          />
        ))}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please Select Image
        </Alert>
      </Snackbar>
      <Snackbar
        open={open1}
        autoHideDuration={4000}
        onClose={handleClose1}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose1} severity="success" sx={{ width: "100%" }}>
          Gallery Updated Successfully
        </Alert>
      </Snackbar>
      {isLoading && (
        <Box sx={style}>
          <CircularProgress sx={{ color: "#B7002B" }} />
        </Box>
      )}
    </div>
  );
}

export default GalleryUpload;
