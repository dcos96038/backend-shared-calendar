const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');

  return res.status(200).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const savedEvent = await event.save();

    return res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Internal error',
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const { uid } = req;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: "Event doens't exist",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No authorization',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    return res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }

  return res.status(200).json({
    ok: true,
    eventId,
  });
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const { uid } = req;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: "Event doens't exist",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No authorization',
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    return res.json({
      ok: true,
      event: deletedEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }

  return res.status(200).json({
    ok: true,
    eventId,
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
