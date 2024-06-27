import React from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { Link } from "react-router-dom";

export default function ForumList() {
  const history = useNavigate();
  const { forums } = useSelector((state) => state.forumState);

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const mappedForumData = forums?.map((forum, index) => {
    return {
      indexId: index,
      id: forum?._id,
      forumId: forum?.ForumsId,
      title: forum?.ForumsName,
      description: forum?.Discription,
      link: `/forum/${forum?.ForumsId}`,
    };
  });

  const data = mappedForumData;

  const filteredArray = data?.filter((forum) => {
    if (search !== "") {
      const userForumSearch = search.toLowerCase();
      const forumSearch = forum?.title?.toLowerCase();

      return forumSearch?.startsWith(userForumSearch);
    }

    return false;
  });

  // const sortedData = data?.sort((a, b) => {
  //   let fa = a?.title?.toLowerCase();
  //   let fb = b?.title?.toLowerCase();

  //   if (fa < fb) {
  //     return -1;
  //   }
  //   if (fa > fb) {
  //     return 1;
  //   }
  //   return 0;
  // });

  return (
    <div className='fourmpage_info_right'>
      <div className='relative fourmpage_info_right'>
        <span className='flex flex-row items-center justify-center bg-white bg-opacity-40 border'>
          <input
            className='bg-transparent'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type='text'
            placeholder='Search'
          />
          <p
            className='text-black cursor-pointer'
            onClick={() => {
              setSearch("");
              setShowSearch(false);
            }}>
            X
          </p>
          <button
            onClick={() => setShowSearch(true)}
            className='cursor-default'>
            Search
          </button>
        </span>
        {showSearch && (
          <div className='flex flex-col absolute top-[3rem] w-full bg-white rounded-md'>
            {filteredArray?.map((data, index) => {
              return (
                <Link
                  className='px-[8px] py-[4px] hover:underline border-b'
                  key={index}
                  to={`/forum/${data?.ForumsId}`}>
                  {data?.title}
                </Link>
              );
            })}
            {filteredArray?.length === 0 && (
              <p className='px-[8px] py-[4px]'>No Results</p>
            )}
          </div>
        )}
      </div>
      <div className='fourmpage_info_right_div'>
        <span>
          <p>Forum List</p>
        </span>
        <div className='fourmpage_info_right_div_list'>
          <ul className='overflow-y-scroll h-[400px]'>
            {data
              ?.map((item) => (
                <li onClick={() => history(`${item.link}`)}>{item?.title}</li>
              ))
              ?.reverse()}
          </ul>
        </div>
      </div>
    </div>
  );
}
