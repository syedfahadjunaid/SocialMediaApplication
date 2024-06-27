import React, { useEffect, useState } from "react";
import "./NewPostPage.css";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

import { useGetForumByIdQuery } from "../../../services/forum";
import { useCreateForumTopicMutation } from "../../../services/forumTopic";

import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

import { createForumTopicChange } from "../../../Slice/forumTopicSlice";
import { forumCommentCreateChange } from "../../../Slice/forumCommentSlice";

import ForumList from "../../Layout/ForumList/ForumList";
function NewPostPage() {
  const history = useNavigate();

  const dispatch = useDispatch();

  const [createForumTopic, responseCreateForumTopic] =
    useCreateForumTopicMutation();
  // console.log(responseCreateForumTopic);

  const { login, userCookie } = useSelector((state) => state.userLogin);
  const { forumtopicId } = useParams();

  console.log(login);

  const responseGetForumById = useGetForumByIdQuery(forumtopicId);

  // console.log(responseGetForumById);
  const [forumTitle, setForumTitle] = useState("");
  const [forumCategory, setForumCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const submitForumHandle = async (e) => {
    e.preventDefault();
    const data = {
      topics: forumTitle,
      category: forumCategory,
      ForumID: responseGetForumById?.data?.Singleforum?.ForumsId,
      UserID: login[0]?._id,
    };

    createForumTopic(data);
    setIsLoading(true);
    // const data = await axios
    //   .post(
    //     `${process.env.React_App_Base_url + "Api/" + "create-forums"}`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-type": "multipart/form-date",
    //         "Content-type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => response, setIsLoading(true))
    //   .catch((error) => console.log(error))
    //   .finally(() => setIsLoading(false));
    // if (data?.status === 201) {
    //   setOpen(true);
    // }

    // console.log(data);
  };

  useEffect(() => {
    if (responseCreateForumTopic.isSuccess) {
      setIsLoading(false);
      setOpen(true);
      dispatch(createForumTopicChange(Math.random()));
      dispatch(forumCommentCreateChange(Math.random()));
      setTimeout(() => {
        history(`/forum/${responseGetForumById?.data?.Singleforum?.ForumsId}`);
      }, [4000]);
    }
  }, [responseCreateForumTopic.isSuccess]);
  return (
    <>
      <div className='fourmpage'>
        <div className='fourmpage_heading'>
          <h3 className='text-[30px]'>Latest Updates</h3>
          <span>
            <Link to='/'>Home</Link> /{" "}
            <Link to='/forum' style={{ marginLeft: "5px" }}>
              Forum
            </Link>{" "}
            /{" "}
            <Link
              to={`/forum/${responseGetForumById?.data?.Singleforum?.ForumsId}`}
              style={{ marginLeft: "5px" }}>
              {responseGetForumById?.data?.Singleforum?.ForumsName}
            </Link>{" "}
            / <p>New Forum Post</p>
          </span>
        </div>
        <div className='fourmpage_info'>
          <div className='fourmpage_info_left'>
            <div className='fourmpage_info_left_heading'>
              <ArrowBack
                onClick={() => history(-1)}
                style={{ cursor: "pointer" }}
              />
              <span>
                New Forum Post{" "}
                <p className='pl-[10px]'>{`in ${responseGetForumById?.data?.Singleforum?.ForumsName}`}</p>
              </span>
            </div>
            <div className='fourmpage_info_left_guideline'>
              <p>
                Before posting, please comply with our community guidelines:
              </p>
              <div>
                <p>
                  1. Be respectful and courteous to others. Do not post anything
                  that is hateful, abusive, harassing, threatening, or
                  discriminatory.
                </p>
                <p>
                  2. Follow the guidelines and policies of the website and the
                  community. Do not post anything that violates the terms of
                  service, privacy policy, or community standards.
                </p>
                <p>
                  {" "}
                  3. Do not spam or self-promote. Do not post irrelevant,
                  repetitive, or low-quality content that does not contribute to
                  the discussion or the community.
                </p>
                <p>
                  {" "}
                  4. Do not share sensitive information. Do not post anything
                  that reveals others’ identity, location, contact details,
                  financial information, or other confidential data.
                </p>
                <p>
                  5. Do not engage in illegal or harmful activities. Do not post
                  anything that encourages or facilitates violence, crime,
                  fraud, piracy, or other malicious behavior.
                </p>
              </div>
            </div>
            <div className='fourmpage_info_left_message'>
              <form onSubmit={submitForumHandle}>
                <div className='fourmpage_info_left_message_top'>
                  <div>
                    <p>Category:</p>
                    <select
                      onChange={(e) => setForumCategory(e.target.value)}
                      required>
                      <option>Select One Category</option>
                      <option>General Discussion</option>
                      <option>Spanking</option>
                      <option>Swinging</option>
                      <option>Hotwife/Cuckold</option>
                      <option>Wife Sharing</option>
                      <option>BDSM/Bondage</option>
                      <option>Real Life Stories</option>
                      <option>Fiction & Fantasies</option>
                      <option> Personals</option>
                    </select>
                  </div>
                  <span>
                    <p>Topic:</p>
                    <textarea
                      onChange={(e) => setForumTitle(e.target.value)}
                      placeholder='Topic Name (Max Length 50 Characters)'
                      // rows={5}
                      maxLength={50}
                      style={{ paddingLeft: "10px", paddingTop: "10px" }}
                      required
                    />
                  </span>
                </div>
                <div className='fourmpage_info_left_message_bottom'>
                  <button>Preview</button>
                  <button>POST</button>
                </div>
              </form>
            </div>
          </div>
          {/* <div className='fourmpage_info_right'>
            <span>
              <input type='text' placeholder='Search' />
              <button>Search Topic</button>
            </span>
            <div className='fourmpage_info_right_div'>
              <span>
                <p>Forum List</p>
              </span>
              <div className='fourmpage_info_right_div_list'>
                <ul>
                  {data?.map((item) => (
                    <li>{item?.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div> */}
          <ForumList />
        </div>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: "100%" }}>
            Forum Topic Added Successfully
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default NewPostPage;
