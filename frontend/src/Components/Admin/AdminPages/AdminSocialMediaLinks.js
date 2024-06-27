import "./AdminPages.css";

import { BsEyeFill } from "react-icons/bs";
import Table from "../AdminLayout/Table";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useState } from "react";

export default function AdminSocialMediaLinks() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "90%",
    bgcolor: "#2A2B36",
    border: "0px",
    boxShadow: 24,
    p: 4,
    color: "white",
    outline: "none",
    borderRadius: "4px",
  };

  const data = [
    {
      id: "1",
      title: "Facebook",
      link: "www.facebook.com",
    },
    {
      id: "2",
      title: "Whatsapp",
      link: "www.whatsapp.com",
    },
  ];

  const config = [
    {
      label: "S.No",
      render: (list) => list.id,
    },
    {
      label: "Title",
      render: (list) => list.title,
    },
    {
      label: "Link",
      render: (list) => list.link,
    },

    {
      label: "Edit",
      render: (list) => (
        <div className='flex flex-row justify-center'>
          <BsEyeFill
            onClick={() => handleOpenEditModal(list)}
            className='cursor-pointer'
          />
        </div>
      ),
      sortValue: (list) => list.action,
    },
  ];

  const EditModal = (
    <div className='h-[95%] overflow-y-scroll py-[1rem]'>Hello</div>
  );

  const keyFn = (list) => {
    return list.username;
  };

  return (
    <>
      <div className='p-[1rem] flex flex-col gap-[1rem]'>
        <h1 className='text-[30px]'>Social Media Links Data</h1>
        <Table data={data} config={config} keyFn={keyFn} />
      </div>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Edit Social Media Links
          </Typography>
          {EditModal}
        </Box>
      </Modal>
    </>
  );
}
