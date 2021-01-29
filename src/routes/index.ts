const fs = require("fs");
import { AsyncWrapper } from "../middlewares/AsyncWrapper";
import { addContact, edit, all, search } from "../controllers/contactController";
import { signup, signin } from "../controllers/userController";
import { auth } from "../utils/auth";



export const routes = ({ Router }) => {
    const router = Router();
    const path = "./data.json";
  router.get(
    "/",
    AsyncWrapper((req, res) => {
      if (!fs.existsSync(path)) {
        return res.json({
          message: "please enter password to create new contact data file",
          file: false,
        });
      }
      res.json({
        message: "Please enter password for your contact data file",
        file: true,
      });
    })
  );
  router.post("/contact/add", auth, AsyncWrapper(addContact));
  router.patch("/contact/update/:name", auth, AsyncWrapper(edit));
  router.get("/contact/list",auth, AsyncWrapper(all));
  router.get("/contact", auth, AsyncWrapper(search));
  router.post("/signup", AsyncWrapper(signup));
  router.post("/signin", AsyncWrapper(signin));
 return router;
};