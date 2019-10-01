import routes from "../routes";
import Video from "../models/Video";

export const home = async(req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", {pageTitle: "Home", videos });  
  } catch (error) {
    console.log(error);
    res.render("home", {pageTitle: "Home", videos: [] });  
  }
  
}

export const search = async(req, res) => {
  const { query: { term: searchingBy } } = req;
  const videos = await Video.find({});
  res.render("search", {pageTitle: "Search" , searchingBy, videos});
}

export const getUpload = (req, res) => {
  res.render("upload",  {pageTitle: "Upload"});
}
export const postUpload = async(req, res) => {
  const { 
    body: { title, description },
    file: {path: fileUrl}
  } = req;
    // To Do: Upload and save video
  const newVideo = await Video.create({
    fileUrl,
    title,
    description
  })
  res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = async(req, res) => {
  try {
    const { 
      params: {
        id
      }
    } = req;
    const video = await Video.findById(id);
    console.log(video, "Only ONE Id")
    res.render("videoDetail",  {pageTitle: "Video Detail", video});
  } catch (error) {
    res.redirect(routes.home);
  }
}

export const getEditVideo = async (req, res) => {
  const { 
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
}
export const postEditVideo = async (req, res) => {
  const { 
    body: {
      title, description
    },
    params: { 
      id 
    }
  } = req;
  try {
    await Video.findByIdAndUpdate(id, {title, description});
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
  // res.render("editVideo",  {pageTitle: "Edit Video"});
}

export const deleteVideo = (req, res) => {
  res.render("deleteVideo",  {pageTitle: "Delete Video"});
};
