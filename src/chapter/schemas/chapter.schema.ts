import * as moongose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { VideoSchema } from 'src/video/schemas/video.schema';

export const ChapterSchema = new moongose.Schema({
  description: String,
  name: String,
  position_in_list: Number,
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
});


const Video = mongoose.model('Video', VideoSchema);