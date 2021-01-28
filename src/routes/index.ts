const fs = require("fs");
import { AsyncWrapper } from "../middlewares/AsyncWrapper";
import { addContact, edit, all, search } from "../controllers/contactController";
import { signup, signin } from "../controllers/userController";


export const routes = ({ Router }) => {
    const router = Router();
    const path = "./filename.txt";
  router.get(
    "/",
    AsyncWrapper((req, res) => {
      if (!fs.existsSync(path)) {
        res.json({
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
  router.post("/contact/add", AsyncWrapper(addContact));
  router.patch("/contact/update/:name", AsyncWrapper(edit));
  router.get("/contact/list", AsyncWrapper(all));
  router.get("/contact", AsyncWrapper(search));
  router.post("/signup", AsyncWrapper(signup));
  router.post("/signin", AsyncWrapper(signin));
 return router;
};