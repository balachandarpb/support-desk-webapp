const mongoose = require("mongoose");
const ticketScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please Enter the product"],
      enum: ["imac", "iphone", "ipad", "MacBook", "iwatch"],
    },
    description: {
      type: String,
      required: [true, "Please Enter the description"],
    },
    status: {
      type: String,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketScheme);
