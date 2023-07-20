const express = require("express");
const router = express.Router();
const doctors = require("../schema/doctors");
const slots = require("../schema/slots");

router.get("/collection/:collectionName", async (req, res) => {
  const collectionName = req.params.collectionName;
  const { searchText, searchField, sortOrder, skip } = req.query;
  console.log(searchText, searchField);

  try {
    let collection;
    switch (collectionName) {
      case "patient":
        collection = doctors;
        break;
      case "slots":
        collection = slots;
        break;
      default:
        return res.status(400).json({ error: "Invalid collection name" });
    }

    let query = {};
    if (searchField && searchText) {
      query[searchField] = { $regex: new RegExp(`^${searchText}`, "i") };
    }

    let sort = {};
    if (sortOrder) {
      const allowedSortOrders = ["asc", "desc"];
      if (allowedSortOrders.includes(sortOrder)) {
        sort[searchField] = sortOrder === "desc" ? -1 : 1;
      } else {
        return res.status(400).json({ error: 'Invalid sort order. Use "asc" or "desc".' });
      }
    }

    const limit = 10; // Number of documents per page
    let skipCount = 0;
    if (skip) {
      skipCount = parseInt(skip) * limit;
    }

    const result = await collection
      .find(query)
      .sort(sort)
      .skip(skipCount)
      .limit(limit);

    res.json(result);
  } catch (error) {
    console.error("Error querying collection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
