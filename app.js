const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
});

const config = require('./config');

const { getWeaponList, addWeaponList, removeWeaponList } = require('./weapons');

app.get('/listing/weapons', async (req, res, next) => res.json(await getWeaponList()));
app.post('/listing/weapons', async (req, res, next) => {
	const { secret, weapId } = req.body;
	try {
		if (secret !== config.secret) throw Error('unauthorized');
		await addWeaponList(weapId);
		return res.json({ success: true });
	}
	catch (e) {
		return res.json({ success: false, error: e.message });
	}
});
app.delete('/listing/weapons', async (req, res, next) => {
	const { secret, weapId } = req.body;
	try {
		if (secret !== config.secret) throw Error('unauthorized');
		await removeWeaponList(weapId);
		return res.json({ success: true });
	}
	catch (e) {
		return res.json({ success: false, error: e.message });
	}
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
