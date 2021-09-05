import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Main from "../template/Main";
import { makeStyles } from "@material-ui/core";
import {
  Typography,
  LinearProgress,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import styled from "styled-components";
import PhotoModal from "./PhotoModal";

const headerProps = {
  icon: "picture-o",
  title: "Photos",
  subtitle: "Lista as Fotos de acordo com o Album clicado",
};

const useStyles = makeStyles({
  root: {
    width: 300,
    marginTop: 30,
  },
  media: {
    height: 150,
  },
});

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Photos = () => {
  const classes = useStyles();
  const { albumId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [showPhoto, setShowPhoto] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState([]);
  const [loading, setLoading] = useState(false);

  const modalClose = () => setShowPhoto(false);

  useEffect(() => {
    const baseUrl = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`;
    const fetchData = async () => {
      setLoading(true);
      const resp = await axios(baseUrl);
      setPhotos(resp.data);
      setLoading(false);
    };
    fetchData();
  }, [albumId]);

  function loadPhoto(index) {
    const photo = photos.find((p) => {
      return p.id === index;
    });
    setShowPhoto(true);
    setSelectedPhoto(photo);
  }

  function renderCards() {
    if (loading) {
      return <LinearProgress />;
    }
    return (
      <>
        <Wrapper>
          {photos.map((photo) => (
            <Card className={classes.root} key={photo.id}>
              <CardActionArea onClick={() => loadPhoto(photo.id)}>
                <CardMedia
                  className={classes.media}
                  image={photo.thumbnailUrl}
                  title={photo.title}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {photo.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Wrapper>
        {showPhoto ? (
          <PhotoModal
            photo={selectedPhoto}
            show={showPhoto}
            hide={modalClose}
          />
        ) : null}
      </>
    );
  }

  return <Main {...headerProps}>{renderCards()}</Main>;
};

export default Photos;
