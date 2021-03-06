const { isNotItemGoingOut, isItemOut, isItemGoingOut } = require("./index");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const { io } = require("../app");

const createNotification = async (message) => {
  let newNotification = await Notification.create({
    message: message,
  });

  // *** Using socket.io for sending data ***
  io.emit("notification-action", newNotification);
};

const countUnreadNotificationOfUsers = async () => {
  const users = await User.find().select("_id unreadNotification");
  users.forEach(async (u) => {
    let user = await User.findById(u.id);
    if (!user || user.role === "unapprove" || user.active === false) return;
    user.unreadNotification += 1;
    await user.save({ validateBeforeSave: false });
  });
};

const handleNotification = async (data, action, itemName, userId) => {
  if (isNotItemGoingOut(data)) {
    data.isAlert = false;
  } else if (isItemGoingOut(data) || isItemOut(data.total)) {
    let notificationMessage;
    data.isAlert = true;
    notificationMessage = `${action} ${itemName} กำลังจะหมด`;
    if (isItemOut(data.total)) {
      notificationMessage = `${action} ${itemName} หมด`;
    }
    await createNotification(notificationMessage)
    await countUnreadNotificationOfUsers()
  }
};

exports.handleNotification = handleNotification;
