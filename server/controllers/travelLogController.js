import { db } from "../server.js";

const getAllTravelLogs = async (req, res) => {
  const user_id = req.userId;
  try {
    // travel_logs
    const [logs] = await db.query(
      "select * from travel_logs where user_id = ?",
      [user_id]
    );
    // add tags inside travel_logs
    for (const log of logs) {
      const [tags] = await db.query(
        "select name from tags where travel_log_id = ?",
        [log.id]
      );
      log.tags = tags.map((tag) => tag.name);
    }
    // date formate => YYYY-MM-DD
    logs.forEach((log) => {
      log.start_date = log.start_date?.toISOString().slice(0, 10);
      log.end_date = log.end_date?.toISOString().slice(0, 10);
      log.post_date = log.post_date?.toISOString().slice(0, 10);
    });

    res.json(logs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting all travel logs" });
  }
};

const getTravelLogById = async (req, res) => {
  const { id } = req.params;
  const user_id = req.userId;
  try {
    const [results] = await db.query(
      "select * from travel_logs where id = ? and user_id = ?",
      [id, user_id]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: "Travel log not found" });
    }
    const log = results[0];
    const [tags] = await db.query(
      "select name from tags where travel_log_id = ?",
      [log.id]
    );
    log.tags = tags.map((tag) => tag.name);

    // date format => YYYY-MM-DD
    log.start_date = log.start_date?.toISOString().slice(0, 10);
    log.end_date = log.end_date?.toISOString().slice(0, 10);
    log.post_date = log.post_date?.toISOString().slice(0, 10);
    res.json(log);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting travel log" });
  }
};

const createTravelLog = async (req, res) => {
  const user_id = req.userId;
  const { title, description, start_date, end_date, post_date, tags } =
    req.body;

  try {
    const [result] = await db.query(
      "insert into travel_logs (user_id, title, description, start_date, end_date, post_date) values (?, ?, ?, ?, ?, ?)",
      [user_id, title, description, start_date, end_date, post_date]
    );

    const travel_log_id = result.insertId;

    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await db.query("insert into tags (travel_log_id, name) values (?, ?)", [
          travel_log_id,
          tag,
        ]);
      }
    }

    return res.json({
      message: "travel_log added successfully",
      id: travel_log_id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating travel_log" });
  }
};

const updateTravelLog = async (req, res) => {
  const user_id = req.userId;
  const { id } = req.params;
  const { title, description, start_date, end_date, post_date, tags } =
    req.body;

  try {
    // update travel_log
    await db.query(
      "update travel_logs set title = ?, description = ?, start_date = ?, end_date = ?, post_date = ? where id = ? and user_id = ?",
      [title, description, start_date, end_date, post_date, id, user_id]
    );
    // delete old tags, then create new tags
    await db.query("delete from tags where travel_log_id = ?", [id]);

    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await db.query("insert into tags (travel_log_id, name) values (?, ?)", [
          id,
          tag,
        ]);
      }
    }

    return res.json({ message: "Travel log updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating travel_log" });
  }
};

const deleteTravelLog = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM travel_logs WHERE id = ?", [id]);
    res.json({ message: "Travel_log deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllTravelLogs,
  getTravelLogById,
  createTravelLog,
  updateTravelLog,
  deleteTravelLog,
};
