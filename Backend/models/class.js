const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  Kỳ: {
    type: String,
    required: true,
  },
  Khoa_Viện: {
    type: String,
    required: true,
  },
  Mã_lớp: {
    type: String,
    required: false,
  },
  Mã_lớp_kèm: {
    type: String,
    required: false,
  },
  Mã_HP: {
    type: String,
    required: true,
  },
  Tên_HP: {
    type: String,
    required: true,
  },
  Tên_HP_Tiếng_Anh: {
    type: String,
    required: false,
  },
  Khối_lượng: {
    type: String,
    required: true,
  },
  Ghi_chú: {
    type: String,
    required: false,
  },
  Buổi_số: {
    type: String,
    required: false,
  },
  Thứ: {
    type: String,
    required: true,
  },
  Thời_gian: {
    type: String,
    required: true,
  },
  BĐ: {
    type: String,
    required: true,
  },
  KT: {
    type: String,
    required: false,
  },
  Kíp: {
    type: String,
    required: false,
  },
  Tuần: {
    type: String,
    required: true,
  },
  Phòng: {
    type: String,
    required: true,
  },
  Cần_TN: {
    type: String,
    required: false,
  },
  SLĐK: {
    type: String,
    required: false,
  },
  SL_Max: {
    type: String,
    required: false,
  },
  Trạng_thái: {
    type: String,
    required: false,
  },
  Loại_lớp: {
    type: String,
    required: false,
  },
  Đợt_mở: {
    type: String,
    required: false,
  },
  Mã_QL: {
    type: String,
    required: false,
  },
}, {collection: "Class"});

module.exports = mongoose.model("Class",classSchema);