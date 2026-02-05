const express = require('express');
const Group = require('../models/Group');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// All routes here require auth
router.use(auth);

// GET /api/groups - all groups for current user
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(groups);
  } catch (error) {
    console.error('Get groups error:', error.message);
    res.status(500).json({ message: 'Error fetching groups' });
  }
});

// POST /api/groups - create a group
router.post('/', async (req, res) => {
  try {
    const { name, startTime, endTime } = req.body;

    if (!name || !startTime || !endTime) {
      return res.status(400).json({ message: 'Name, startTime and endTime are required' });
    }

    const group = await Group.create({
      user: req.user.id,
      name,
      startTime,
      endTime,
      status: 'active',
      members: 0,
      routes: [],
    });

    res.status(201).json(group);
  } catch (error) {
    console.error('Create group error:', error.message);
    res.status(500).json({ message: 'Error creating group' });
  }
});

// DELETE /api/groups/:id - delete a group
router.delete('/:id', async (req, res) => {
  try {
    const group = await Group.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json({ message: 'Group deleted' });
  } catch (error) {
    console.error('Delete group error:', error.message);
    res.status(500).json({ message: 'Error deleting group' });
  }
});

// PATCH /api/groups/:id/toggle-status - toggle active/inactive
router.patch('/:id/toggle-status', async (req, res) => {
  try {
    const group = await Group.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    group.status = group.status === 'active' ? 'inactive' : 'active';
    await group.save();

    res.json(group);
  } catch (error) {
    console.error('Toggle status error:', error.message);
    res.status(500).json({ message: 'Error updating group status' });
  }
});

// GET /api/groups/:id - get single group with routes
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json(group);
  } catch (error) {
    console.error('Get group error:', error.message);
    res.status(500).json({ message: 'Error fetching group' });
  }
});

// POST /api/groups/:id/routes - add a route to a group
router.post('/:id/routes', async (req, res) => {
  try {
    const {
      id,
      name,
      distance,
      unit,
      origin,
      destination,
      coordinates,
      createdAt,
    } = req.body || {};

    if (!name || !distance || !origin || !destination) {
      return res
        .status(400)
        .json({ message: 'name, distance, origin, and destination are required' });
    }

    const group = await Group.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const route = {
      id: id || Date.now().toString(),
      name,
      distance,
      unit: unit || 'km',
      origin,
      destination,
      coordinates: Array.isArray(coordinates) ? coordinates : [origin, destination],
      createdAt: createdAt || new Date(),
    };

    group.routes.push(route);
    group.members = group.routes.length;

    await group.save();

    res.status(201).json({
      group,
      route,
    });
  } catch (error) {
    console.error('Add route error:', error.message);
    res.status(500).json({ message: 'Error adding route to group' });
  }
});

// DELETE /api/groups/:groupId/routes/:routeId - delete a route from a group
router.delete('/:groupId/routes/:routeId', async (req, res) => {
  try {
    const { groupId, routeId } = req.params;

    const group = await Group.findOne({
      _id: groupId,
      user: req.user.id,
    });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const initialLength = group.routes.length;
    group.routes = group.routes.filter((route) => route.id !== routeId);
    group.members = group.routes.length;

    if (group.routes.length === initialLength) {
      return res.status(404).json({ message: 'Route not found in this group' });
    }

    await group.save();

    res.json({ message: 'Route deleted', group });
  } catch (error) {
    console.error('Delete route error:', error.message);
    res.status(500).json({ message: 'Error deleting route from group' });
  }
});

module.exports = router;

