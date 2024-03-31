import { Router } from "express";
import { sample_clothes, sample_tags } from "../data";
import asyncHandler from 'express-async-handler'
import { ClothesModel } from "../configs/models/clothes.model";

const router = Router ();


router.get("/seed", asyncHandler(
  async (req, res) => {
     const clothesCount = await ClothesModel.countDocuments();
     if(clothesCount> 0){
       res.send("Seed is already done!");
       return;
     }
 
     await ClothesModel.create(sample_clothes);
     res.send("Seed Is Done!");
 }
 ))
     router.get("/",asyncHandler(
       async (req, res) => {
         const clothes = await ClothesModel.find();
           res.send(clothes);
  }
))

router.get("/search/:searchTerm", asyncHandler(
  async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const clothes = await ClothesModel.find({name: {$regex:searchRegex}})
    res.send(clothes);
  }
))
     router.get("/tags", asyncHandler(
     async (req, res) => {
    const tags = await ClothesModel.aggregate([
      {
        $unwind:'$tags'
      },
      {
        $group:{
          _id: '$tags',
          count: {$sum: 1}
        }
      },
      {
        $project:{
          _id: 0,
          name:'$_id',
          count: '$count'
        }
      }
    ]).sort({count: -1});

    const all = {
      name : 'All',
      count: await  ClothesModel.countDocuments()
    }

    tags.unshift(all);
    res.send(tags);
  }
))
  
router.get("/tag/:tagName",asyncHandler(
  async (req, res) => {
    const clothes = await ClothesModel.find({tags: req.params.tagName})
    res.send(clothes);
  }
))
router.get("/:clothesId", asyncHandler(
  async (req, res) => {
    const clothes = await ClothesModel.findById(req.params.clothesId);
    res.send(clothes);
  }
))


 
  export default router;