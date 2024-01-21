import Event from "../models/Event.js";
import User from "../models/User.js";

/*CREATE*/
export const createEvent = async (req, res) => {
  try {
    const {
      userId,
      description,
      bannerpicturePath,
      eventName,
      eventLocation,
      date,
      email,
      sponsors,
      eventPhoneNumber,
      theme,
    } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const sponsorPictures = req.files.map((file) => ({
      picturePath: file.path,
    }));

    const sponsorsData = Array.isArray(sponsors)
      ? sponsors.map((sponsor, index) => ({
          name: sponsor.name,
          picturePath: sponsorPictures[index].picturePath,
        }))
      : [];

    const newEvent = new Event({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      eventName,
      date,
      eventLocation,
      email,
      eventPhoneNumber,
      theme,
      description,
      userPicturePath: user.picturePath,
      bannerpicturePath,
      sponsors: sponsorsData,
      likes: {},
    });
    await newEvent.save();

    const event = await Event.find(); //grabs all the Events and display it on frontend
    res.status(201).json(event);
  } catch (err) {
    console.error(err.stack);
    res.status(409).json({ message: err.message });
  }
};

/*READ*/

export const getFeedEvents = async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const event = await Event.find({ userId });
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*UPDATE*/

export const likeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const event = await Event.findById(id);
    const isLiked = event.likes.get(userId);

    if (isLiked) {
      event.likes.delete(userId);
    } else {
      event.likes.set(userId, true);
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { likes: event.likes },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {}
};
