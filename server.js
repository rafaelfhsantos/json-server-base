const jsonServer = require("json-server");
const checkRepeatedName = require("./middlewares/checkRepeatedName");
const checkUndefinedParam = require("./middlewares/checkUndefinedParam");
const auth = require("json-server-auth");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

const rules = auth.rewriter({
  users: 600,
  tools: 664,
  professionals: 664,
});

app.use(jsonServer.bodyParser);

app.use(cors());
app.use("", checkRepeatedName);
app.use("/tools/", checkUndefinedParam);
app.use("/professionals/", checkUndefinedParam);
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);

/* A senha do Kenzinho é 123456 */
