import { db } from "../server.js";

const getAllJourneyPlans = async (req, res) => {
  const user_id = req.userId;
  try {
    const [plans] = await db.query(
      "SELECT * FROM journey_plans WHERE user_id = ?",
      [user_id]
    );

    for (const plan of plans) {
      const [locations] = await db.query(
        "SELECT name FROM locations WHERE journey_plan_id = ?",
        [plan.id]
      );
      plan.locations = locations.map((l) => l.name);

      const [activities] = await db.query(
        "SELECT name FROM activities WHERE journey_plan_id = ?",
        [plan.id]
      );
      plan.activities = activities.map((a) => a.name);
    }

    // date formate => YYYY-MM-DD
    plans.forEach((plan) => {
      plan.start_date = plan.start_date?.toISOString().slice(0, 10);
      plan.end_date = plan.end_date?.toISOString().slice(0, 10);
    });

    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting all journey plans" });
  }
};

const getJourneyPlanById = async (req, res) => {
  const { id } = req.params;
  const user_id = req.userId;
  try {
    const [results] = await db.query(
      "SELECT * FROM journey_plans WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: "Journey plan not found" });
    }

    const plan = results[0];

    const [locations] = await db.query(
      "SELECT name FROM locations WHERE journey_plan_id = ?",
      [plan.id]
    );
    plan.locations = locations.map((l) => l.name);

    const [activities] = await db.query(
      "SELECT name FROM activities WHERE journey_plan_id = ?",
      [plan.id]
    );
    plan.activities = activities.map((a) => a.name);

    // date formate => YYYY-MM-DD
    plan.start_date = plan.start_date?.toISOString().slice(0, 10);
    plan.end_date = plan.end_date?.toISOString().slice(0, 10);

    res.json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting journey plan" });
  }
};

const createJourneyPlan = async (req, res) => {
  const user_id = req.userId;
  const { name, description, start_date, end_date, locations, activities } =
    req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO journey_plans (user_id, name, description, start_date, end_date) VALUES (?, ?, ?, ?, ?)",
      [user_id, name, description, start_date, end_date]
    );

    const journey_plan_id = result.insertId;

    if (locations && locations.length > 0) {
      for (const loc of locations) {
        await db.query(
          "INSERT INTO locations (journey_plan_id, name) VALUES (?, ?)",
          [journey_plan_id, loc]
        );
      }
    }

    if (activities && activities.length > 0) {
      for (const act of activities) {
        await db.query(
          "INSERT INTO activities (journey_plan_id, name) VALUES (?, ?)",
          [journey_plan_id, act]
        );
      }
    }

    res.json({
      message: "Journey plan created successfully",
      id: journey_plan_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating journey plan" });
  }
};

const updateJourneyPlan = async (req, res) => {
  const user_id = req.userId;
  const { id } = req.params;
  const { name, description, start_date, end_date, locations, activities } =
    req.body;

  try {
    await db.query(
      "UPDATE journey_plans SET name = ?, description = ?, start_date = ?, end_date = ? WHERE id = ? AND user_id = ?",
      [name, description, start_date, end_date, id, user_id]
    );

    await db.query("DELETE FROM locations WHERE journey_plan_id = ?", [id]);
    await db.query("DELETE FROM activities WHERE journey_plan_id = ?", [id]);

    if (locations && locations.length > 0) {
      for (const loc of locations) {
        await db.query(
          "INSERT INTO locations (journey_plan_id, name) VALUES (?, ?)",
          [id, loc]
        );
      }
    }

    if (activities && activities.length > 0) {
      for (const act of activities) {
        await db.query(
          "INSERT INTO activities (journey_plan_id, name) VALUES (?, ?)",
          [id, act]
        );
      }
    }

    res.json({ message: "Journey plan updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating journey plan" });
  }
};

const deleteJourneyPlan = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM journey_plans WHERE id = ?", [id]);
    res.json({ message: "Journey plan deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting journey plan" });
  }
};

export {
  getAllJourneyPlans,
  getJourneyPlanById,
  createJourneyPlan,
  updateJourneyPlan,
  deleteJourneyPlan,
};
