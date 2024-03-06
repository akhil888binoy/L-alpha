import User from "../models/User.js";
import Sponsor from "../models/Sponsor.js";
// Create
export const createSponsor = async (req, res) => {
  try {
    const {
      userId,
      sponsorpicturePath,
      sponsorName,
      sponsorEmail,
      sponsorphoneNumber,
      interestedtheme,
      sponsorInfo,
      location,
      budget,
      industry,
      sponsortwitterLink,
      sponsorlinkedinLink,
      sponsorCoordinator,
    } = req.body;
    const user = await User.findById(userId);
    const newSponsor = new Sponsor({
      userId,
      sponsorpicturePath,
      sponsorName,
      sponsorEmail,
      sponsorphoneNumber,
      interestedtheme,
      sponsorInfo,
      location,
      budget,
      industry,
      sponsortwitterLink,
      sponsorlinkedinLink,
      sponsorCoordinator,
      likes: {},
    });
    await newSponsor.save();
    const sponsor = await Sponsor.find();
    res.status(201).json(sponsor);
  } catch (err) {
    console.error(err.stack);
    res.status(409).json({ message: err.message });
  }
};

//READ

export const getFeedSponsors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "budget";
    let interestedtheme = req.query.interestedtheme || "All";
    let location = req.query.location || ""; // Get location from query
    let sponsorName = req.query.sponsorName || "";

    const interestedthemeOptions = await Sponsor.distinct("interestedtheme");
    interestedtheme === "All"
      ? (interestedtheme = [...interestedthemeOptions])
      : (interestedtheme = req.query.interestedtheme.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    let filter = {
      interestedtheme: { $in: interestedtheme },
    };
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (sponsorName) {
      filter.sponsorName = { $regex: sponsorName, $options: "i" };
    }

    const sponsors = await Sponsor.find(filter)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Sponsor.countDocuments(filter);
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      interestedthemes: interestedthemeOptions,
      sponsors,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSponsorDetails = async (req, res) => {
  try {
    const { sponsorId } = req.params;
    const sponsor = await Sponsor.findOne({ _id: sponsorId });
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }
    res.status(200).json(sponsor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserSponsors = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch distinct themes from the database
    const interestedthemeOptions = await Sponsor.distinct("interestedtheme");
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "budget";
    let interestedtheme = req.query.interestedtheme || "All";
    let location = req.query.location || "";
    let sponsorName = req.query.sponsorName || "";

    interestedtheme === "All"
      ? (interestedtheme = [...interestedthemeOptions])
      : (interestedtheme = req.query.interestedtheme.split(","));

    // Split and parse the sort parameter
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    let filter = {
      interestedtheme: { $in: interestedtheme },
      userId: userId,
    };

    // Add location filter if location is provided
    if (location) {
      filter.sponsorLocation = { $regex: location, $options: "i" };
    }
    if (sponsorName) {
      filter.sponsorName = { $regex: sponsorName, $options: "i" };
    }

    const sponsors = await Sponsor.find(filter)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    // Count total matching documents for pagination
    const total = await Sponsor.countDocuments(filter);
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      interestedthemes: interestedthemeOptions,
      sponsors,
    };

    // Send response
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteSponsor = async (req, res) => {
  try {
    const { sponsorId, userId } = req.params;
    const sponsor = await Sponsor.findById(sponsorId);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }
    if (sponsor.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete" });
    }
    await Sponsor.findByIdAndDelete(sponsorId);
    res.status(200).json({ message: "Sponsor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSponsor = async (req, res) => {
  try {
    const { sponsorId } = req.params;
    const updates = req.body;
    const sponsor = await Sponsor.findById(sponsorId);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }
    Object.assign(sponsor, updates);
    await sponsor.save();

    res.status(200).json({ message: "Sponsor details updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likeSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const sponsor = await Sponsor.findById(id);
    const isLiked = sponsor.likes.get(userId);
    if (isLiked) {
      sponsor.likes.delete(userId);
    } else {
      sponsor.likes.set(userId, true);
    }
    const updatedSponsor = await Sponsor.findByIdAndUpdate(
      id,
      { likes: sponsor.likes },
      { new: true }
    );
    res.status(200).json(updatedSponsor);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
