const path = require("path");
const fs = require("fs").promises;
const storeImage = path.join(process.cwd(), "public/avatars");
const Jimp = require("jimp");
const { user: service } = require("../../services");

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "file not found",
    });
  }
  const { path: tempName } = req.file;
  const { _id } = req.user;
  try {
    const fileName = path.join(storeImage, `${_id.toString()}.jpg`);

    Jimp.read(`${tempName}`, (err, image) => {
      if (err) throw err;
      image.resize(250, 250).write(`${fileName}`);
    });

    const updUser = {
      avatarURL: fileName,
    };

    await service.updateById(_id, { avatarURL: updUser.avatarURL });
    await fs.rename(tempName, fileName);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: updUser,
      },
    });
  } catch (error) {
    fs.unlink(tempName);
  }
};

module.exports = updateAvatar;
