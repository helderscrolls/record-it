import * as moongose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const VideoSchema = new moongose.Schema({
  position_in_chapter: Number,
  description: String,
  video_duration: Number,
  exercice_file: String,
  finished: Boolean,
  name: String,
  position: Number,
  video_file: String,
  comments: String,
  created_at: Date,
})

