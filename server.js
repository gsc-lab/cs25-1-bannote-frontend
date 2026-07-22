// server.js
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const JSON_PATH = "./src/components/schedule/groupsDate.json";

app.post("/bookmark", (req, res) => {
  const { group_id } = req.body;
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
  const group = data.groupsData.find(g => g.group_id === group_id);
  if (group) {
    group.bookmark = !group.bookmark;
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
    res.json({ success: true, group });
  } else {
    res.status(404).json({ success: false, message: "Group not found" });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
