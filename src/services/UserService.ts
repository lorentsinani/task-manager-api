import User from "../models/UserModel";
const multer = require("multer");
const sharp = require("sharp");

export class UserService {
  createUser = async (req, res): Promise<void> => {
    const user = new User(req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  };

  loginUser = async (req, res): Promise<void> => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send();
    }
  };

  logoutUser = async (req, res): Promise<void> => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.user.tokens[0].token;
      });
      await req.user.save();

      res.send();
    } catch (e) {
      res.status(500).send();
    }
  };

  logoutAllUser = async (req, res): Promise<void> => {
    try {
      req.user.tokens = [];

      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  };

  getUser = async (req, res): Promise<void> => {
    res.send(req.user);
  };

  updateUser = async (req, res): Promise<void> => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
    try {
      const user = await User.findById(req.user._id);

      updates.forEach((update) =>
        user ? ([update] = req.body[update]) : Array
      );

      if (!user) {
        res.status(404).send();
      }
      await req.user.save();
      res.send(req.user);
    } catch (e) {
      res.status(400).send(e);
    }
  };

  deleteLoggedUser = async (req, res): Promise<void> => {
    try {
      await req.user.remove();
      res.send(req.user);
    } catch (e) {
      res.status(500).send();
    }
  };

  upload = multer({
    limits: {
      fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(new Error("Please upload image file"));
      }

      cb(undefined, true);
    },
  });

  uploadProfilePic =
    (this.upload.single("avatar"),
    async (req, res): Promise<void> => {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();

      req.user.avatar = buffer;
      await req.user.save();
      res.send();
    },
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    });

  deleteProfilePic = async (req, res): Promise<void> => {
    try {
      req.user.avatar = undefined;
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  getProfilePicById = async (req, res): Promise<void> => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || !user.avatar) {
        throw new Error();
      }

      res.set("Content-Type", "image/png");
      res.send(user.avatar);
    } catch (e) {
      res.status(404).send();
    }
  };
}
