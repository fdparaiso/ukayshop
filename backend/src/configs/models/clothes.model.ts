import {Schema, model} from 'mongoose';

export interface Clothes{
    id :number;
    name :string;
    price :number;
    size:string;
    tags :string[];
    imageUrl: string;
}

export const ClothesSchema = new Schema<Clothes>(
    {
        name: {type: String, required:true},
        price: {type: Number, required:true},
        size: {type: String, required:true},
        tags: {type: [String]},
        imageUrl: {type: String, required:true},
        
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
);

export const ClothesModel = model<Clothes>('clothes', ClothesSchema);