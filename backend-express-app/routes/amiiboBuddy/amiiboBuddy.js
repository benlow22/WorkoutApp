var router = require("express").Router();

router.post("/upload", async (req, res) => {
	console.log("POSTY", req.body);

	// if there is data, send it back = 200 status
	res.send();
	// if (error) {
	// 	console.log("error UPSERTING USER SETS", error);
	// } else {
	// 	res.send(data).status(204);
	// 	console.log("updated workout exercises", data);
	// }
	return true;
});
module.exports = router;
