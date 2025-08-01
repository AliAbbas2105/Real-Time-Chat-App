const express = require('express');
const router = express.Router();
const controller=require('../controllers/userController')
const {verifyLink} = require('../controllers/linkVerifyController')
const authenticateToken = require('../middlewares/authMiddleware');


router.post('/signup',controller.Signup);
router.get('/verify-link/:token', verifyLink);
router.post('/login', controller.Login);
router.get('/login', (req, res) => {
  res.render('login');
})
router.get('/homepage', authenticateToken, (req, res) => {
  res.render('homepage', {username: req.user.username, userId: req.user._id.toString()});
})

router.post('/logout',authenticateToken, controller.Logout);
router.get('/users/search', authenticateToken, controller.searchUsers);
router.get('/users/chatted', authenticateToken, controller.getChattedUsers);
router.get('/users/notifications', authenticateToken, controller.getNotifications);
router.post('/users/notifications/delete', authenticateToken, controller.deleteNotifications);
router.get('/messages/history/:userId', authenticateToken, controller.getChatHistory);
router.get('/users/unread-counts', authenticateToken, controller.getUnreadCounts);
module.exports = router;