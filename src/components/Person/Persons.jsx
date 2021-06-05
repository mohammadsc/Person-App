import React from "react";

import LoginPage from "./../../images/img_avatar.png";

const Persons = ({
  persons,
  personDelete,
  personChange,
  personEdit,
  handleUserPicChange,
}) => {
  const handleChange = (id, name, family, gender, position) => {
    let obj = {
      id: id,
      name: name,
      family: family,
      position: position,
      gender: gender,
    };

    personChange(obj);
  };

  const addDefaultUserImageSrc = (ev) => {
    ev.target.src = "./../../../public/images/img_avatar.png";
  };

  const handleUploadImage = (e, person) => {
    e.preventDefault();

    let file = e.target.files[0];

    let p;
    let reader = new FileReader();

    reader.onloadend = () => {
      var list = [...persons];

      p = list.find((a) => a.id == person.id);

      p.image = file;
      handleUserPicChange(p);

      var dataURL = reader.result;
      var output = document.getElementById("output" + person.id);
      output.src = dataURL;
    };

    reader.readAsDataURL(file);
  };

  const handleShowUserImage = (p) => {
    var url;
    if (p.image == undefined || p.image == null) {
      url =
        "data:image/jpeg;base64,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";
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(p.image);
      console.log(reader.result);
      var res;
      reader.onload = () => {
        // res = reader.readAsDataURL(p.image);
        url = reader.result;
      };
      // res = reader.readAsDataURL(p.image);
      console.log(reader.result, p.image.name);
    }

    return url;
  };

  return (
    <div className="form-inline mx-auto col-10 justify-content-center">
      {persons.map((p) =>
        p.isEdit == undefined || p.isEdit == false ? (
          <div className="card text-white alert alert-warning text-dark mb-3 mt-3 w-30 mr-4 col-3">
            <div>
              <p>
                {" "}
                <img
                  // src={"/Images/" + p.image}
                  src={
                    p.image !== null && p.Image !== ""
                      ? "http://localhost:52185/Images/" + p.image
                      : "data:image/jpeg;base64,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"
                  }
                  width="80"
                  height="80"
                  id={"output" + p.id}
                  // onError={addDefaultUserImageSrc}
                />
              </p>
              <label>
                <p>
                  <input
                    type="file"
                    name="image"
                    multiple={false}
                    className="custom-file-input"
                    onChange={(e) => {
                      handleUploadImage(e, p);
                    }}
                    hidden
                  />
                </p>
                <p className="btn btn-sm btn-light"> بارگذاری عکس</p>
              </label>
            </div>
            <hr />
            <div className=" text-center">
              <p className="d-block">{`${p.name + " " + p.family}`}</p>

              <p className="d-block">جنسیت:{" " + p.gender}</p>
              <p className="d-block">سمت:{" " + p.position}</p>
              <hr />
              <div className="input-group justify-content-center col-12">
                <button
                  className="btn btn-sm btn-warning fa fa-edit text-dark "
                  onClick={() => personEdit(p)}
                />

                <div className="input-group-prepend">
                  <button
                    className="btn btn-sm btn-danger fa fa-trash"
                    onClick={() => personDelete(p)}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card    mb-3 mt-3 w-30 mr-4 col-3">
            <div className="card-header mt-3 text-white bg-secondary">
              <h5>{"ویرایش " + " " + p.name + " " + p.family}</h5>
            </div>
            <div className="card-body alert alert-primary text-center">
              <p className="d-block">
                <input
                  type="text"
                  defaultValue={p.name}
                  className="form-control"
                  id={"name" + p.id}
                />
              </p>
              <p className="d-block">
                <input
                  type="text"
                  defaultValue={p.family}
                  className="form-control"
                  id={"family" + p.id}
                />
              </p>
              <p className="d-block">
                <input
                  type="text"
                  defaultValue={p.gender}
                  className="form-control"
                  id={"gender" + p.id}
                />
              </p>
              <p className="d-block">
                <input
                  type="text"
                  defaultValue={p.position}
                  className="form-control"
                  id={"position" + p.id}
                />
              </p>

              <div className="input-group justify-content-center col-12">
                <button
                  className="btn btn-sm btn-success  "
                  onClick={() =>
                    handleChange(
                      p.id,
                      document.getElementById("name" + p.id).value,
                      document.getElementById("family" + p.id).value,
                      document.getElementById("gender" + p.id).value,
                      document.getElementById("position" + p.id).value
                    )
                  }
                >
                  دخیره
                </button>

                <div className="input-group-prepend">
                  <button
                    className="btn btn-sm btn-secondary "
                    onClick={() => personEdit(p)}
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Persons;
