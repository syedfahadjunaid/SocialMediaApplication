import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function ForumTopicList() {
  const history = useNavigate();
  const { forums } = useSelector((state) => state.forumState);

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const { forumTopics } = useSelector((state) => state.forumTopicState);
  const mappedForumData = forumTopics?.map((forumTopic, index) => {
    return {
      indexId: index,
      id: forumTopic?._id,
      forumId: forumTopic?.forumId,
      userId: forumTopic?.userId,
      forumTopicId: forumTopic?.topicId,
      forumCategoty: forumTopic?.forumCategory,
      forumTopic: forumTopic?.topic,
      createdAt: forumTopic?.createdAt,
      updatedAt: forumTopic?.updatedAt,
      link: `/forumTopicComments/${forumTopic?.topicId}`,
    };
  });

  const data = mappedForumData;

  const filteredArray = data?.filter((forumTopic) => {
    if (search !== "") {
      const userSearchTopic = search.toLowerCase();
      const forumSearchTopic = forumTopic?.forumTopic?.toLowerCase();

      return forumSearchTopic?.startsWith(userSearchTopic);
    }

    return false;
  });

  //   console.log(filteredArray);

  const sortedData = data?.sort((a, b) => {
    let fa = a?.forumTopic?.toLowerCase();
    let fb = b?.forumTopic?.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  const renderedData = sortedData?.map((item) => (
    <li onClick={() => history(`${item.link}`)}>{item?.forumTopic}</li>
  ));

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
                  to={`/forumTopicComments/${data?.topicId}`}>
                  {data?.forumTopic}
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
          <p>Forum Topic List</p>
        </span>
        <div className='fourmpage_info_right_div_list'>
          <ul className='overflow-y-scroll h-[400px]'>{renderedData}</ul>
        </div>
      </div>
    </div>
  );
}
