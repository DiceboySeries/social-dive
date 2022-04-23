import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type UserType = User & Document;

export class PhotoType {
	data: Buffer;
	contentType: string;
}

@Schema({ timestamps: true, validateBeforeSave: true })
export class User {
	@Prop({ required: [true, "Full name is required"] })
	fullName: string;

	@Prop({
		required: [true, "Email is required"],
		unique: true,
		match:
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	})
	email: string;

	@Prop({
		required: [true, "Password is required"],
		minlength: 6,
	})
	password: string;

	@Prop({
		type: {
			data: Buffer,
			contentType: String,
		},
	})
	photo: PhotoType;

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		default: [],
	})
	friends: UserType[];

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		default: [],
	})
	friendRequestsSent: UserType[];

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		default: [],
	})
	friendRequestsReceived: UserType[];
}

export const UserSchema = SchemaFactory.createForClass(User);
