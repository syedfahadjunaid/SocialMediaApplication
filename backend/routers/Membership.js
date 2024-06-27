require("../db/conn");
const express = require("express");
const router = express.Router();
const Memberships = require("../models/MembershipSchema");
const path = require('path');

function generateUniqueId() {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const uniqueId = `${year}${month}${day}${hours}${minutes}${seconds}`;

    return uniqueId;
}
router.post("/subscription-create", async (req, res) => {
    const { membership,price ,Membershiptype } = req.body;
    console.log(req.body);
    if (membership && price) {
        try {
            const subscription = new Memberships({
                MembershipId: 'subscrib' + generateUniqueId(),
                Membership: membership,
                Membershiptype:Membershiptype,
                Price:price,
            });
            await subscription.save();
            res.status(201).json({ message: "subscription Created  successfully", data: subscription });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error", });
        }
    } else {
        res.status(400).json({ error: "subscription is not found ", });
    }
})

router.get("/get-all-subscription", async (req, res) => {

    const subscription = await Memberships.find();
    if (!subscription) {
        res.status(200).json({ message: "Memberships is not find" });
    }
    res.status(200).json({ message: "All subscription get successfully", data: subscription });
});
router.get("/get-one-forum/:id", async (req, res) => {
    const MembershipId = req.params.id;
    console.log("getOne", MembershipId);
    console.log("get", req.params.id);
    try {
        const Singlesubscription = await Memberships.findOne({ MembershipId: MembershipId });

        if (!Singlesubscription) {
            return res.status(404).json({ error: "subscription not found" });
        }

        res.json({ Singleforum });
    } catch (error) {
        console.error("Error fetching subscription:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/subscription-delete/:subscriptionId", async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    try {
        const deletedsubscription = await Forums.findOneAndDelete({ MembershipId: subscriptionId });
        if (!deletedsubscription) {
            return res.status(404).json({ error: "subscription not found" });
        }
        res.status(200).json({ message: "subscription deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/subscription-Update/:subscriptionId", async (req, res) => {
    const subscriptionId = req.params.subscriptionId;
    const { membership,price ,Membershiptype  } = req.body;
    console.log(Forumstitles, 'update')

    try {
        const result = await Memberships.updateOne(
            { MembershipId: subscriptionId },
            {
                $set: {
                    Membership: membership,
                    Price:price,
                    Membershiptype:Membershiptype
                }
            }
        );

        if (result.n === 0) {
            return res.status(404).json({ error: "subscription not found" });
        }

        res.status(200).json({ message: "subscription updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
