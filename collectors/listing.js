const Listing = require("../model/listing");

module.exports.index = async (req, res) => {
    let searchQuery = req.query.search || "";
    let filter = searchQuery ? {title : {$regex : searchQuery , $options : "i"}} : {};
    const alllist = await Listing.find(filter);
    res.render("listings/index.ejs",{alllist,searchQuery});
};

module.exports.filterIndex = async (req, res) => {
    let category = req.query.category;
    const alllist = await Listing.find({category : category});
    if(alllist.length === 0){
        req.flash("error","Requested category place is not available...");
        res.redirect("/testing");
    } 
    res.render("listings/index.ejs",{alllist});
};

module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createNewList = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    
    let newlist = new Listing(req.body.listing);   
    newlist.image = {url,filename};
    newlist.owner = req.user._id;
    req.flash("success","New listing created!");
    await newlist.save();
    res.redirect("/testing");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const list = await Listing.findById(id);
    if(!list){
        req.flash("error","Requested listing is not exist...");
        res.redirect("/testing");
    } 
    let originalimg = list.image.url;
    let blurimg = originalimg.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{list,blurimg});
};

module.exports.editList = async (req, res) => {
    let {id} = req.params;
    let list = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;   
        list.image = {url,filename};
        await list.save();
    }
    req.flash("success","List updated!");
    res.redirect(`/testing/${id}`);
};

module.exports.destroyList = async (req, res) => {
    let {id} = req.params;
    const list = await Listing.findByIdAndDelete(id);
    req.flash("success","List deleted!");
    res.redirect("/testing");
};

module.exports.showList = async (req, res) => {
    let {id} = req.params;
    const list = await Listing.findById(id)
    .populate({path:"reviews" , populate:{path:"author"}})
    .populate("owner");
    if(!list){
        req.flash("error","Requested listing is not exist...");
        res.redirect("/testing");
    }
    res.render("listings/show.ejs",{list});
};