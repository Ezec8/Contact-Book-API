const express = require('express');
const router = express.Router();
const { getContact, createContact, updateContact, deleteContact, getContacts } = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get('/', getContacts);

router.post('/', createContact);

router.get('/:id', getContact);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);



module.exports = router;