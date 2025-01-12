const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");

const Review=require("../models/review.js")
const Listing=require("../models/listing.js")
const {validateReview,isLoggedIn, isReviewAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js");
const { destroyListing } = require("../controllers/listings.js");


 //reviews
    //post route
    router.post("/",isLoggedIn,
        validateReview,wrapasync(reviewController.createReview));

    //delete route
    //$pull:remove an existing array

    router.delete("/:reviewId",
        isLoggedIn,
        isReviewAuthor,
    wrapasync(reviewController.destroyReview)
);

module.exports=router

   




