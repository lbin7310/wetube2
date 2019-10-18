import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

// Home
export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createAt: -1 })
      .exec();
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

// Search
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    })
      .sort({ createAt: -1 })
      .exec();
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// Upload
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location: fileUrl }
  } = req;
  const newVideo = await Video.create({
    fileUrl,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  req.flash("success", "Video Uploaded!");
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail
export const videoDetail = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    console.log(id);
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Edit Video
export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    if (video.creator.id !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
    params: { id }
  } = req;
  try {
    await Video.findByIdAndUpdate(id, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// deleteVideo
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  const video = await Video.findById(id).populate("creator");
  try {
    if (video.creator.id !== req.user.id) {
      throw Error();
    } else {
      await Video.find({ _id: id })
        .remove()
        .exec();
    }
  } catch (error) {
    console.log(error);
  }
  req.flash("info", "Video Deleted!");
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    body: { comment },
    params: { id },
    user
  } = req;
  try {
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    req.user.comments.push(newComment.id);
    req.user.save();
    const video = await Video.findById(id);
    video.comments.push(newComment.id);
    video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
