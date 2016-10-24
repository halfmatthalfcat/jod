import {ITag} from "../../../common/models/models";
const Sortable = require("react-sortablejs");

const SortableGroup = (props: {
  groupName: String,
  items: Array <ITag>,
  onAdd: (event: Event) => void
}) => {
  const chips = props.items.map((tag) => {
    return (
      <div
        className="chip"
        style={{ backgroundColor: tag.tagColor }}
        key={ `tag${tag.tagId}` }
        id={ JSON.stringify(tag) }
      >
        <span
          style={{ color: tag.tagTextColor }}
        >
          { tag.tagName }
        </span>
      </div>
    )
  });
  return (
    <div className="card" style={{ height: "200px" }}>
      <div className="card-content">
        <Sortable
          options={{
            group: props.groupName,
            draggable: ".chip",
            animation: 150,
            onAdd: props.onAdd
          }}
        >
          {chips}
        </Sortable>
      </div>
    </div>
  )
};

export { SortableGroup };