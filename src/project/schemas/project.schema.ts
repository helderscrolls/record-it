import * as moongose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { UserSchema } from 'src/user/schemas/user.schema';
import { ChapterSchema } from 'src/chapter/schemas/chapter.schema';


export const ProjectSchema = new moongose.Schema({
	description: String,
	name: String,
	exercice_directory: String,
	folder: String,
	option: String,
	index: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
	created_at: Date,
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const User = mongoose.model('User', UserSchema);

const Chapter = mongoose.model('Chapter', ChapterSchema);