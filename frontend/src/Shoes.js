import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImageDialog from "./ImageDialog";
import Find from "./Find";

const url = "http://localhost:3000";
const noImageFound =
  "https://www.societaallestero.com/wp-content/themes/consultix/images/no-image-found-360x250.png";

const Shoes = () => {
  const [shoes, setShoes] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [urlImage, setUrlImage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedData = await fetch(url + "/Shoes");
    const realData = await fetchedData.json();
    setShoes(realData);
  };

  const deleteShoes = (id) => {
    fetch(url + "/Shoes/delete/" + id, {
      method: "DELETE",
    }).then(() => {
      fetchData();
    });
  };

  const updateShoes = (id) => {
    navigate(`/Shoes/edit/${id}`);
  };

  const openImageDialog = (url) => {
    setOpen(true);
    setUrlImage(url);
  };

  const closingDialog = () => {
    setOpen(false);
    setUrlImage(false);
  };

  return (
    <div className="shoes">
      <div className="title">
        <div className="offer">
          <Typography variant="h4" gutterBottom component="div">
            Shoes
          </Typography>
        </div>
        <div className="find">
          <Find passSetShoes={setShoes} />
        </div>
      </div>
      <div className="shoesFlex">
        {shoes &&
          shoes.map((shoes) => (
            <div className="shoesFrame">
              <div className="shoesOffer" key={shoes.id}>
                <div
                  className="image"
                  onClick={() =>
                    openImageDialog(
                      shoes.imageUrl === "" ? noImageFound : shoes.imageUrl
                    )
                  }
                >
                  <p
                    style={{
                      backgroundImage: `url(${
                        shoes.imageUrl === "" ? noImageFound : shoes.imageUrl
                      })`,
                    }}
                  ></p>
                </div>
                <div className="name">
                  <Typography variant="subtitle1" gutterBottom component="div">
                    <p>{shoes.name}</p>
                  </Typography>
                </div>
                <div className="price">
                  <Typography variant="body2" gutterBottom component="div">
                    <p>{shoes.price}KM</p>
                  </Typography>
                </div>
                <hr />
                <div className="deleteAndUpdate">
                  <p className="delete" onClick={() => deleteShoes(shoes._id)}>
                    <DeleteIcon fontSize="large" />
                  </p>
                  <p className="update" onClick={() => updateShoes(shoes._id)}>
                    {" "}
                    <EditIcon fontSize="large" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        {open === true && (
          <ImageDialog
            url={urlImage}
            isOpen={open}
            closingDialog={closingDialog}
          />
        )}
      </div>
    </div>
  );
};

export default Shoes;
