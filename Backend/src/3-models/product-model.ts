import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { CategoryModel } from "./category-model";

// 1. InterFace:

export interface IProductModel extends Document {
    productName: string;
    categoryId: ObjectId;
    manufacturingDate: string;
    expirationDate: string;
    price: number;
}

// 2.Schema:
export const ProductSchema = new Schema<IProductModel>({
    productName: {
        type: String,
        required: [true, "Missing product name"]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId       
    },
    manufacturingDate: {
        type: String,
        required: [true, "Missing manufacturingDate"]
    },
    expirationDate: {
        type: String,
        required: [true, "Missing expirationDate"]
    },
  
    price: {
        type: Number,
        required: [true, "Missing price"]
    }

}, {
    versionKey: false,  //dont add ___y to an added documnt 
    toJSON: {virtuals: true},   //Return foreign key in JSON
    id: false   //Don`t add id on top of _id
});

ProductSchema.virtual("category",{
    ref: CategoryModel, //Foreign Model
    localField: "categoryId",   //Foreign key
    foreignField: "_id",    //primary
    justOne: true   //shop has one category
});

// 3.Model
export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "products");