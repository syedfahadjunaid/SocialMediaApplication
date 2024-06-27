import React, { useEffect, useState } from "react";
import "./MemberShipPlanPage.css";
import MembershipCard from "../../Cards/MembershipCard/MembershipCard";
import { PlansData } from "../../SuscriptionPlansData";
import axios from "axios";
function MemberShipPlanPage() {
  const [membershipPlans, setMembershipPlans] = useState();
  const subscriptionPlans = [
    {
      title: "1 Months",
    },
    {
      title: "3 Months",
    },
    {
      title: "12 Months",
    },
  ];
  const [selectedSuscriptionMonth, setSelectedSuscriptionMonth] = useState(
    subscriptionPlans[0]?.title
  );
  useEffect(() => {
    console.log(selectedSuscriptionMonth);
  }, [selectedSuscriptionMonth]);
  const filterPlans = () => {
    const filter = PlansData?.filter(
      (item) => item.duration === selectedSuscriptionMonth
    );
    setMembershipPlans(filter);
  };
  useEffect(() => {
    filterPlans();
  }, [selectedSuscriptionMonth, PlansData]);
  const [isLoading, setIsLoading] = useState(false);
  const [allMemberShipData, setAllMemberShipData] = useState();
  const getMemberShipDatsHandle = async () => {
    const { data } = await axios
      .get(
        `${process.env.React_App_Base_url + "Api/" + "get-all-subscription"}`,
        {
          headers: {
            "Content-type": "multipart/form-date",
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    setAllMemberShipData(data && data?.data);
    console.log(data);
  };
  // const findMembershiptype = () => {
  //   const findOneMonthMemberShip = allMemberShipData?.filter(
  //     (item) => item?.Membershiptype===1);
  //     const findThreeMonthMemberShip = allMemberShipData?.filter(
  //     (item) => item?.Membershiptype===3);
  //     const findTwelleyMonthMemberShip = allMemberShipData?.filter(
  //     (item) => item?.Membershiptype===12);
  //   console.log(findOneMonthMemberShip,'findMembershiptype',findThreeMonthMemberShip,findTwelleyMonthMemberShip)
  // };
  useEffect(() => {
    getMemberShipDatsHandle();
  }, []);
  //  useEffect(() => {
  //   findMembershiptype();
  // }, [allMemberShipData]);
  const filterMembership=()=>{
    
  }
  return (
    <div className="membership flex items-center flex-col my-20">
      <h3 className="text-3xl mb-4 text-white">You are on Basic Plan</h3>
      <p className="text-white text-2xl">
        <span className="span_button">Subscribe</span> now to get the most of
        your community
      </p>
      <div className="membership_Container">
        <div className="membership_Container_left">
          <h5>Features</h5>
          <p>Free Public Profile</p>
          <p>Check Premium Profiles</p>
          <p>Public chat room access</p>
          <p>Forum view only</p>
          <p>Interact with Photos</p>
          <p>Access to Public Chatrooms</p>
          <p>Access to 1-1 Chat</p>
          <p>Unlimited Private Messages</p>
          <p>Unlimited Forum Posts</p>
          <p>Private Galleries</p>
          <p>Friends/ Playmates Only /Gallery</p>
          <p>PPV Gallery</p>
          <p>Unlimited Private Chat Rooms</p>
          <p>Unlimited Private Galleries</p>
        </div>
        <div className="membership_Container_right">
          <div className="membership_Container_right_button_div">
            {subscriptionPlans?.map((item, index) => (
              <span
                key={index}
                className={
                  item?.title === selectedSuscriptionMonth
                    ? "membership_month_button_active"
                    : "membership_month_button"
                }
                onClick={() => setSelectedSuscriptionMonth(item?.title)}
              >
                {item?.title}
              </span>
            ))}
          </div>
          <div className="membership_Container_right_membershipcard">
            {membershipPlans?.map((item) => (
              <MembershipCard
                duration={item?.duration}
                title={item?.title}
                fees={item?.fees}
                badge={item?.badge}
                Free_Public_Profile={item?.Free_Public_Profile}
                Check_Premium_Profiles={item?.Check_Premium_Profiles}
                Public_chat_room_access={item?.Public_chat_room_access}
                Forum_view_only={item?.Forum_view_only}
                Interact_with_Photos={item?.Interact_with_Photos}
                Access_to_Public_Chatrooms={item?.Access_to_Public_Chatrooms}
                Access_to_1_1_Chat={item?.Access_to_1_1_Chat}
                Unlimited_Private_Messages={item?.Unlimited_Private_Messages}
                Unlimited_Forum_Posts={item?.Unlimited_Forum_Posts}
                Private_Galleries={item?.Private_Galleries}
                Friends_Playmates_Only_Gallery={
                  item?.Friends_Playmates_Only_Gallery
                }
                PPV_Gallery={item?.PPV_Gallery}
                Unlimited_Private_Chat_Rooms={
                  item?.Unlimited_Private_Chat_Rooms
                }
                Unlimited_Private_Galleries={item?.Unlimited_Private_Galleries}
                upgrade={item?.upgrade}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberShipPlanPage;
