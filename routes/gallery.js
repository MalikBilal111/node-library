var express = require("express");
const uploadFile = require("../middlewares/upload");
var router = express.Router();
const apiResponse = require("../helpers/api-response");

router.post("/upload-image", async function (req, res) {
  await uploadFile(req, res, async function (err) {
    if (!err) {
      try {
        if (req.file == undefined) {
          return apiResponse.validationErrorWithData(
            res,
            "Upload a file please!",
            {}
          );
        }
        return apiResponse.successResponseWithData(
          res,
          "File Uploaded Successfully",
          imageFile
        );
      } catch (err) {
        console.error("Error saving file:", err);
        return apiResponse.ErrorResponse(res, err);
      }
    }
  });
});


module.exports = router;
