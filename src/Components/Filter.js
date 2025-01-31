
function Filter({setFilterStatus, filterStatus}) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="all"
          checked={filterStatus === "all"}
          onChange={() => setFilterStatus("all")}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          value="completed"
          checked={filterStatus === "completed"}
          onChange={() => setFilterStatus("completed")}
        />
        Completed
      </label>
      <label>
        <input
          type="radio"
          value="pending"
          checked={filterStatus === "pending"}
          onChange={() => setFilterStatus("pending")}
        />
        Pending
      </label>
    </div>
  )
}

export default Filter