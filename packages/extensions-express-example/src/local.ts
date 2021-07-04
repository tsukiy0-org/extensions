import { App } from "./App";
import dotenv from "dotenv-flow";

dotenv.config();
const app = App.build();

const port = 8000;

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
