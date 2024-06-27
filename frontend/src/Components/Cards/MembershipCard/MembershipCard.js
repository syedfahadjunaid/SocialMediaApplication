import React from "react";
import "./MembershipCard.css";
import { Close, Done } from "@mui/icons-material";
function MembershipCard({
  duration,
  title,
  fees,
  badge,
  Free_Public_Profile,
  Check_Premium_Profiles,
  Public_chat_room_access,
  Forum_view_only,
  Interact_with_Photos,
  Access_to_Public_Chatrooms,
  Access_to_1_1_Chat,
  Unlimited_Private_Messages,
  Unlimited_Forum_Posts,
  Private_Galleries,
  Friends_Playmates_Only_Gallery,
  PPV_Gallery,
  Unlimited_Private_Chat_Rooms,
  Unlimited_Private_Galleries,
  upgrade,
}) {
  return (
    <div className="membershipcard">
      {badge && (
        <div class="ribbon">
          <span class="ribbon__content">Recommended</span>
        </div>
      )}
      <h5>{title}</h5>
      <span>{fees}</span>
      <p>
        {Free_Public_Profile ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      <p>
        {Check_Premium_Profiles ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      <p>
        {Public_chat_room_access ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      <p>
        {Forum_view_only ? <Done style={{ color: "#24FF00" }} /> : <Close />}
      </p>
      <p>
        {Interact_with_Photos ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      <p>
        {Access_to_Public_Chatrooms ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      <p>
        {Access_to_1_1_Chat ? <Done style={{ color: "#24FF00" }} /> : <Close />}
      </p>
      <p>
        {Unlimited_Private_Messages ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      <p>
        {Unlimited_Forum_Posts ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      <p>
        {Private_Galleries ? <Done style={{ color: "#24FF00" }} /> : <Close />}
      </p>
      <p>
        {Friends_Playmates_Only_Gallery ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      <p>{PPV_Gallery ? <Done style={{ color: "#24FF00" }} /> : <Close />}</p>
      <p>
        {Unlimited_Private_Chat_Rooms ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      <p>
        {Unlimited_Private_Galleries ? (
          <Done style={{ color: "#24FF00" }} />
        ) : (
          <Close />
        )}
      </p>
      {upgrade && <button className="membershipcard_button">UpGrade</button>}
    </div>
  );
}

export default MembershipCard;
