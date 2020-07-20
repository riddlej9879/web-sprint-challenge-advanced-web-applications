import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ props, colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log(res);
        setEditing(false);
        setColorToEdit(initialColor);
        props.history.push("/bubbles");
        updateColors([...colors]);
      })
      //Failed Attempts
      // updateColors([...colors])

      // updateColors([colors])

      // updateColors([...colors, res.data])

      // .get("/api/colors")
      // .then((res) => updateColors([...colors, res.data]))
      .catch((err) => console.log("Error is: ", err));
    // props.history.push("/bubbles");
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        console.log(res);
        props.history.push("/bubbles");
        // updateColors([...colors]);
      })
      .catch((err) => console.log("Error is: ", err));
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("api/colors/", addColor)
      .then((res) => {
        updateColors([...colors, colorToAdd]);
      })
      .catch((err) => console.log("Error is: ", err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/*  */}
      <div className="add-color-wrap">
        <h3>Add Color</h3>
        <form className="add-color-form" onSubmit={addColor}>
          <div className="add-color-selector">
            <input
              type="text"
              name="color"
              placeholder="Enter Color Name"
              value={colorToAdd.color}
              onChange={(e) =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
            />
            <input
              type="text"
              name="hex"
              placeholder="Enter Hex Code"
              value={colorToAdd.code.hex}
              onChange={(e) =>
                setColorToAdd({ ...colorToAdd, code: { hex: e.target.value } })
              }
            />
            <button>Add Color</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
