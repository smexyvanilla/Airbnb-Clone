const express=require("express");
const router=express.Router();
const wrapasync=require("../utils/wrapasync.js");
const Listing=require("../models/listing.js")
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js")
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage })



const listingController=require("../controllers/listings.js")


//same path with different type of requests :router.route

router.route("/")
.get(wrapasync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapasync(listingController.createListing))

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);



router.route("/:id")
.get(wrapasync(listingController.showListing))
.put( isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
validateListing,
wrapasync(listingController.updateListing))
.delete(isLoggedIn,
    isOwner,wrapasync(listingController.destroyListing));

//index route
//router.get("/",wrapasync(listingController.index));

     
   
    

     //show route
     //router.get("/:id",wrapasync(listingController.showListing));


    //create route
    //router.post("/",isLoggedIn,validateListing,wrapasync(listingController.createListing));



    //edit route
    router.get("/:id/edit",isLoggedIn,isOwner
        ,wrapasync(listingController.renderEditForm));


    //update route
    //router.put("/:id", isLoggedIn,isOwner, validateListing, wrapasync(listingController.updateListing));


    //delete route
    // router.delete("/:id",isLoggedIn,isOwner,wrapasync(listingController.destroyListing));


    module.exports=router;