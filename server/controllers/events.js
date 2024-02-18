import Event from "../models/Event.js";
import User from "../models/User.js";

/*CREATE*/
export const createEvent = async (req, res) => {
  try {
    const {
      userId,
      description,
      bannerpicturePath,
      logopicturePath,
      eventName,
      eventLocation,
      date,
      email,
      ticketSold,
      eventPhoneNumber,
      theme,
      marketingPlans, // Include marketingPlans in request body
    } = req.body;
    const user = await User.findById(userId);

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
      logopicturePath,
      ticketSold,
      likes: {},
      marketingPlans, // Add marketingPlans to the new event
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
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "date";
    let theme = req.query.theme || "All";
    let location = req.query.location || ""; // Get location from query

    // Fetch distinct themes from the database
    const themeOptions = await Event.distinct("theme");

    // If theme is "All", include all theme options, otherwise split the provided theme string
    theme === "All"
      ? (theme = [...themeOptions])
      : (theme = req.query.theme.split(","));

    // Split and parse the sort parameter
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    // Construct the filter object for MongoDB query
    let filter = {
      eventName: { $regex: search, $options: "i" },
      theme: { $in: theme },
    };

    // Add location filter if location is provided
    if (location) {
      filter.eventLocation = { $regex: location, $options: "i" };
    }

    // Query events with search, theme filter, sorting, pagination
    const events = await Event.find(filter)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    // Count total matching documents for pagination
    const total = await Event.countDocuments(filter);

    // Prepare response object
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      themes: themeOptions,
      events,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOne({ _id: eventId }); // assuming eventId corresponds to MongoDB _id
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
