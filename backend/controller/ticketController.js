const asyncHolder = require("express-async-handler");
const User = require("../models/userModels");
const Ticket = require("../models/ticketModel");

const getTickets = asyncHolder(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw Error("User Not Found");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});
const createTicket = asyncHolder(async (req, res) => {
  console.log("hello");
  const { product, description } = req.body;

  console.log(product);

  if (!product || !description) {
    res.status(400);
    throw Error("Please add the product");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw Error("User Not Found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(200).json(ticket);
});

const getTicket = asyncHolder(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw Error("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw Error("Ticket not Found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  res.status(200).json(ticket);
});

const deleteTicket = asyncHolder(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw Error("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw Error("Ticket not Found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  await Ticket.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});

const updateTicket = asyncHolder(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw Error("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw Error("Ticket not Found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateTicket);
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
