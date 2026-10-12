
const express = require("express");
const router = express.Router();

const connectMongo = require("../config/db");

const { getHistoryCard } = require("../controllers/historyCardController");
// LOGIN
router.post("/access", async (req, res) => {
  try {
    const { password } = req.body;

    if (password !== "suvarn") {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const db = await connectMongo();

    const collections = await db.listCollections().toArray();

    const tables = collections.map((item) => item.name);

    res.status(200).json({
      success: true,
      message: "Database Connected Successfully",
      tables,
    });
  } catch (error) {
    console.log("ACCESS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET TABLE DATA
router.get("/table/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;

    const db = await connectMongo();

    const totalCount = await db.collection(tableName).countDocuments();

    const data = await db.collection(tableName).find({}).toArray();

    res.status(200).json({
      success: true,
      count: totalCount,
      data,
    });
  } catch (error) {
    console.log("TABLE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ALL TABLES
router.get("/tables", async (req, res) => {
  try {
    const db = await connectMongo();

    const collections = await db.listCollections().toArray();

    const tables = collections.map((item) => item.name);

    res.status(200).json({
      success: true,
      tables,
    });
  } catch (error) {
    console.log("TABLE LIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// INWARD REPORT

router.get("/inward-report/:inwardNo", async (req, res) => {
  try {
    const db = await connectMongo();

    const inwardNo = Number(req.params.inwardNo);

    const data = await db
      .collection("TInwardDetails")

      .aggregate([
        {
          $match: {
            LABIDNo: gaugeNo,
          },
        },

        {
          $lookup: {
            from: "mCalibrationAgency",
            localField: "CalibrationAgencyID",
            foreignField: "CalibrationAgencyID",
            as: "AgencyInfo",
          },
        },

        {
          $unwind: {
            path: "$AgencyInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $sort: {
            CalibratedOn: 1,
          },
        },
      ])
      .toArray();

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// INWARD SUMMARY REPORT

router.get("/inward-summary", async (req, res) => {
  try {
    const db = await connectMongo();

    const data = await db
      .collection("TInwardDetails")
      .aggregate([
        {
          $group: {
            _id: "$InwardNo",
            TotalItems: {
              $sum: 1,
            },
          },
        },

        {
          $lookup: {
            from: "TInward",
            let: {
              inwardNo: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$InwardNo", "$$inwardNo"],
                  },
                },
              },

              {
                $limit: 1,
              },
            ],
            as: "Master",
          },
        },

        {
          $unwind: {
            path: "$Master",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            _id: 0,
            InwardNo: "$_id",
            InwardDate: "$Master.InwardDate",
            CustomerID: "$Master.CustomerID",
            TotalItems: 1,
          },
        },

        {
          $sort: {
            InwardNo: 1,
          },
        },
      ])
      .toArray();

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// FULL JOIN REPORT

router.get("/inward-full-report", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 100;

    const skip = (page - 1) * limit;

    const db = await connectMongo();

    const totalRecords = await db.collection("TInwardDetails").countDocuments();

    const data = await db
      .collection("TInwardDetails")
      .aggregate([
        {
          $lookup: {
            from: "TInward",

            let: {
              inwardNo: "$InwardNo",
            },

            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$InwardNo", "$$inwardNo"],
                  },
                },
              },
              {
                $limit: 1,
              },
            ],

            as: "Master",
          },
        },

        {
          $unwind: {
            path: "$Master",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $skip: skip,
        },

        {
          $limit: limit,
        },
      ])
      .toArray();

    res.json({
      success: true,
      totalRecords,
      page,
      limit,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/test-inward", async (req, res) => {
  try {
    const db = await connectMongo();

    const data = await db.collection("TInward").findOne({});

    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/count-inward", async (req, res) => {
  const db = await connectMongo();

  const count = await db.collection("TInward").countDocuments();

  res.json({
    count,
  });
});

router.get("/count-inwarddetails", async (req, res) => {
  const db = await connectMongo();

  const count = await db.collection("TInwardDetails").countDocuments();

  res.json({
    count,
  });
});

router.get("/test-inward-one", async (req, res) => {
  const db = await connectMongo();

  const data = await db
    .collection("TInward")
    .find({
      InwardNo: 1,
    })
    .toArray();

  res.json(data);
});

router.get("/test-details-one", async (req, res) => {
  const db = await connectMongo();

  const data = await db
    .collection("TInwardDetails")
    .find({
      InwardNo: 1,
    })
    .limit(5)
    .toArray();

  res.json(data);
});


router.get("/history-card", getHistoryCard);


router.get("/history-gauges", async (req, res) => {
  const startedAt = Date.now();

  try {
    console.log("========== HISTORY GAUGES ==========");

    const customerId = Number(req.query.customerId);

    if (!Number.isSafeInteger(customerId) || customerId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid Customer ID is required",
        gauges: [],
      });
    }

    console.log("Customer ID:", customerId);

    // STEP 1: Connect to MongoDB
    const db = await connectMongo();

    // STEP 2: Get this customer's inward records
    const inwards = await db
      .collection("TInward")
      .find(
        { CustomerID: customerId },
        {
          projection: {
            _id: 0,
            InwardNo: 1,
            InwardDate: 1,
          },
          maxTimeMS: 10000,
        }
      )
      .toArray();

    console.log("Customer inwards:", inwards.length);

    if (inwards.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        gauges: [],
      });
    }

    // STEP 3: Get unique inward numbers
    const inwardNos = [
      ...new Set(
        inwards
          .map((item) => item.InwardNo)
          .filter(
            (value) =>
              value !== null &&
              value !== undefined &&
              value !== ""
          )
      ),
    ];

    console.log("Unique inward numbers:", inwardNos.length);

    if (inwardNos.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        gauges: [],
      });
    }

    // STEP 4: Load only this customer's gauge records
    const gaugeRecords = await db
      .collection("TInwardDetails")
      .aggregate(
        [
          {
            $match: {
              InwardNo: { $in: inwardNos },
              GaugeIDNo: {
                $exists: true,
                $nin: [null, "", "-", "--"],
              },
            },
          },

          // STEP 5: Get gauge description
          {
            $lookup: {
              from: "mGIType",
              localField: "GITypeID",
              foreignField: "GITypeID",
              as: "GITypeInfo",
            },
          },

          {
            $unwind: {
              path: "$GITypeInfo",
              preserveNullAndEmptyArrays: true,
            },
          },

          // STEP 6: Format gauge code and description
          {
            $project: {
              _id: 0,

              GaugeIDNo: {
                $trim: {
                  input: {
                    $replaceAll: {
                      input: {
                        $ifNull: ["$GaugeIDNo", ""],
                      },
                      find: ",",
                      replacement: "",
                    },
                  },
                },
              },

              Description: {
                $ifNull: [
                  "$GITypeInfo.GIType",
                  {
                    $ifNull: [
                      "$Description",
                      "$GaugeDescription",
                    ],
                  },
                ],
              },

              GITypeID: 1,
            },
          },

          // STEP 7: Remove invalid gauge codes
          {
            $match: {
              GaugeIDNo: {
                $nin: ["", "-", "--"],
              },
            },
          },

          // STEP 8: One record per gauge code
          {
            $group: {
              _id: "$GaugeIDNo",
              GaugeIDNo: {
                $first: "$GaugeIDNo",
              },
              Description: {
                $first: "$Description",
              },
              GITypeID: {
                $first: "$GITypeID",
              },
            },
          },

          {
            $sort: {
              GaugeIDNo: 1,
            },
          },

          {
            $project: {
              _id: 0,
              GaugeIDNo: 1,
              Description: 1,
              GITypeID: 1,
            },
          },
        ],
        {
          maxTimeMS: 20000,
        }
      )
      .toArray();

    console.log("Gauge records:", gaugeRecords.length);
    console.log("Total time:", Date.now() - startedAt, "ms");

    return res.status(200).json({
      success: true,
      count: gaugeRecords.length,
      gauges: gaugeRecords,
    });
  } catch (error) {
    console.error("HISTORY GAUGES ERROR:", error);

    const timedOut =
      error.code === 50 ||
      /time limit|timed out/i.test(error.message || "");

    return res.status(timedOut ? 504 : 500).json({
      success: false,
      message: timedOut
        ? "MongoDB query timed out"
        : "Unable to load customer gauges",
      error: error.message,
      gauges: [],
    });
  }
});


router.get("/master-list", async (req, res) => {
  try {
    console.log("========== MASTER LIST ==========");

    const customerId = Number(req.query.customerId);

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required",
      });
    }

    const db = await connectMongo();

    // Get Customer Inwards
    const inwards = await db
      .collection("TInward")
      .find(
        { CustomerID: customerId },
        {
          projection: {
            _id: 0,
            InwardNo: 1,
            InwardDate: 1,
          },
        },
      )
      .toArray();

    console.log("Customer :", customerId);
    console.log("Customer Inwards :", inwards.length);

    if (inwards.length === 0) {
      return res.json({
        success: true,
        count: 0,
        data: [],
      });
    }

    const inwardConditions = inwards.map((item) => ({
      InwardNo: item.InwardNo,
      InwardDate: item.InwardDate,
    }));

    const data = await db
      .collection("TInwardDetails")
      .aggregate([
        // Customer Records
       

{
  $match: {
    InwardNo: { $in: inwardNos },
    GaugeIDNo: {
      $exists: true,
      $nin: [null, "", "-", "--"],
    },
  },
},



        // Convert String Date to Date
        {
          $addFields: {
            CalibrationDate: {
              $dateFromString: {
                dateString: "$CalibratedOn",
                format: "%Y-%m-%d %H:%M:%S",
                onError: null,
                onNull: null,
              },
            },
          },
        },

        // Only 01/01/2026 onward
        {
          $match: {
            CalibrationDate: {
              $gte: new Date("2026-01-01"),
            },
          },
        },

        // Latest Calibration First
        {
          $sort: {
            CalibrationDate: -1,
          },
        },

        // Keep Latest Record of Each Gauge
        {
          $group: {
            _id: {
              $trim: {
                input: {
                  $replaceAll: {
                    input: "$GaugeIDNo",
                    find: ",",
                    replacement: "",
                  },
                },
              },
            },
            doc: {
              $first: "$$ROOT",
            },
          },
        },

        {
          $replaceRoot: {
            newRoot: "$doc",
          },
        },

        // Description
        {
          $lookup: {
            from: "mGIType",
            localField: "GITypeID",
            foreignField: "GITypeID",
            as: "GIType",
          },
        },

        {
          $unwind: {
            path: "$GIType",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Final Output
        {
          $project: {
            _id: 0,

            InwardNo: 1,
            InwardDate: 1,
            LABIDNo: 1,

            GaugeIDNo: {
              $trim: {
                input: {
                  $replaceAll: {
                    input: "$GaugeIDNo",
                    find: ",",
                    replacement: "",
                  },
                },
              },
            },

            GITypeID: 1,
            Description: "$GIType.GIType",

            Make: 1,

            GIRangeFrom: 1,
            GIRangeTo: 1,
            GIRangeUnit: 1,

            GILC: 1,
            GILCUnit: 1,

            STDSpecification: 1,

            GoSize: 1,
            NoGoSize: 1,
            SizeUnit: 1,

            Series: 1,
            Size: 1,
            Pitch: 1,
            Class: 1,
            LHRH: 1,
            Special: 1,

            CalibratedOn: 1,
            NextDueOn: 1,
            Remark: 1,
          },
        },

        // Sort by Code No
        {
          $sort: {
            GaugeIDNo: 1,
          },
        },
      ])
      .toArray();

    console.log("Master Records :", data.length);

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.error("MASTER LIST ERROR :", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});






router.get("/history-gauges-optimized", async (req, res) => {
  const startedAt = Date.now();

  try {
    console.log("========== OPTIMIZED HISTORY GAUGES ==========");

    const customerId = Number(req.query.customerId);
    const search = String(req.query.search || "").trim();
    const dateFrom = "2026-06-01";

    if (!Number.isSafeInteger(customerId) || customerId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid Customer ID is required",
        gauges: [],
      });
    }

    const db = await connectMongo();

    // STEP 1: Get inward records belonging to this customer
    const inwards = await db
      .collection("TInward")
      .find(
        { CustomerID: customerId },
        {
          projection: {
            _id: 0,
            InwardNo: 1,
            InwardDate: 1,
          },
        }
      )
      .toArray();

    console.log("Customer ID:", customerId);
    console.log("Total customer inwards:", inwards.length);

    // STEP 2: Filter inward records by date
    const validInwards = inwards.filter((item) => {
      if (
        item.InwardNo === null ||
        item.InwardNo === undefined ||
        String(item.InwardNo).trim() === "" ||
        !item.InwardDate
      ) {
        return false;
      }

      let inwardDate;

      if (item.InwardDate instanceof Date) {
        if (Number.isNaN(item.InwardDate.getTime())) {
          return false;
        }

        inwardDate = item.InwardDate.toISOString().slice(0, 10);
      } else {
        const value = String(item.InwardDate).trim();
        const match = value.match(/^(\d{4}-\d{2}-\d{2})/);

        if (!match) {
          return false;
        }

        inwardDate = match[1];
      }

      return inwardDate >= dateFrom;
    });

    // STEP 3: Normalize inward numbers to strings
    const inwardNos = [
      ...new Set(
        validInwards.map((item) => String(item.InwardNo).trim())
      ),
    ];

    console.log("Valid inward count:", validInwards.length);
    console.log("Unique inward numbers:", inwardNos.length);

    if (inwardNos.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        dateFrom,
        gauges: [],
      });
    }

    // STEP 4: Match customer inward numbers with TInwardDetails.
    // Convert InwardNo to string before comparing to handle numeric/string types.
    const pipeline = [
      {
        $match: {
          GaugeIDNo: {
            $exists: true,
            $nin: [null, "", "-", "--"],
          },
        },
      },
      {
        $addFields: {
          InwardNoString: {
            $trim: {
              input: {
                $convert: {
                  input: "$InwardNo",
                  to: "string",
                  onError: "",
                  onNull: "",
                },
              },
            },
          },
        },
      },
      {
        $match: {
          InwardNoString: { $in: inwardNos },
        },
      },

      // STEP 5: Get gauge description
      {
        $lookup: {
          from: "mGIType",
          localField: "GITypeID",
          foreignField: "GITypeID",
          as: "GITypeInfo",
        },
      },
      {
        $unwind: {
          path: "$GITypeInfo",
          preserveNullAndEmptyArrays: true,
        },
      },

      // STEP 6: Normalize gauge code and description
      {
        $project: {
          _id: 0,

          GaugeIDNo: {
            $trim: {
              input: {
                $replaceAll: {
                  input: {
                    $convert: {
                      input: "$GaugeIDNo",
                      to: "string",
                      onError: "",
                      onNull: "",
                    },
                  },
                  find: ",",
                  replacement: "",
                },
              },
            },
          },

          Description: {
            $ifNull: [
              "$GITypeInfo.GIType",
              {
                $ifNull: [
                  "$Description",
                  "$GaugeDescription",
                ],
              },
            ],
          },

          GITypeID: 1,
          InwardNo: "$InwardNoString",
        },
      },

      // STEP 7: Remove invalid gauge codes
      {
        $match: {
          GaugeIDNo: { $nin: ["", "-", "--"] },
        },
      },
    ];

    // STEP 8: Optional search by gauge number or description
    if (search) {
      const escapedSearch = search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      pipeline.push({
        $match: {
          $or: [
            {
              GaugeIDNo: {
                $regex: escapedSearch,
                $options: "i",
              },
            },
            {
              Description: {
                $regex: escapedSearch,
                $options: "i",
              },
            },
          ],
        },
      });
    }

    // STEP 9: One record per gauge code
    pipeline.push(
      {
        $group: {
          _id: "$GaugeIDNo",
          GaugeIDNo: { $first: "$GaugeIDNo" },
          Description: { $first: "$Description" },
          GITypeID: { $first: "$GITypeID" },
          InwardNo: { $first: "$InwardNo" },
        },
      },
      {
        $project: {
          _id: 0,
          GaugeIDNo: 1,
          Description: 1,
          GITypeID: 1,
          InwardNo: 1,
        },
      },
      {
        $sort: { GaugeIDNo: 1 },
      }
    );

    const gauges = await db
      .collection("TInwardDetails")
      .aggregate(pipeline, { maxTimeMS: 55000 })
      .toArray();

    console.log("Final gauge count:", gauges.length);
    console.log("Sample gauges:", gauges.slice(0, 5));
    console.log("Total time:", Date.now() - startedAt, "ms");
    console.log("==============================================");

    return res.status(200).json({
      success: true,
      count: gauges.length,
      dateFrom,
      gauges,
    });
  } catch (error) {
    console.error("OPTIMIZED HISTORY GAUGES ERROR:", error);

    const timedOut =
      error.code === 50 ||
      /time limit|timed out/i.test(error.message || "");

    return res.status(timedOut ? 504 : 500).json({
      success: false,
      message: timedOut
        ? "MongoDB query timed out"
        : "Unable to load customer gauges",
      error: error.message,
      gauges: [],
    });
  }
});


module.exports = router;



