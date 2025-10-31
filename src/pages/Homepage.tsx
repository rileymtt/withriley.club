import { Box, Container, Grid, Typography } from "@mui/material";
import BlurryLoadingImage from "components/BlurryLoadingImage";
import quotes from "data/quotes";
import LayoutMode from "providers/LayoutMode";
import "styles/index.css";

const images1 = [
  "/images/image1.jpeg",
  "/images/image3.jpeg",
  "/images/image2.jpeg",
];

const images2 = [
  "/images/image12.jpeg",
  "/images/image4.jpeg",
  "/images/image6.jpeg",
  "/images/image5.jpeg",
  "/images/image8.jpeg",
  "/images/image11.jpeg",
];

const images3 = [
  "/images/image13.jpeg",
  "/images/image14.jpeg",
  "/images/image15.jpeg",
  "/images/image16.jpeg",
  "/images/image17.jpeg",
  "/images/image18.jpeg",
];

function Homepage() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <LayoutMode>
      <Container maxWidth="md" sx={{ mb: 20 }}>
        <Grid container>
          <Grid item md={8} xs={12}>
            <Typography variant="h4">
              Hi, I’m a software engineer and a content creator posting
              regularly about my daily life and projects.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box component={"div"} minHeight={600}>
        <Grid container spacing={0.5} mb={2}>
          {images3.map((item) => (
            <Grid item xs={6} md={2} key={item}>
              <BlurryLoadingImage
                preview={item}
                image={item}
                alt={item}
                imageStyleClass="img"
                divStyleClass="img-wrapper"
                height={200}
              />
            </Grid>
          ))}
          {images1.map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <BlurryLoadingImage
                preview={item}
                image={item}
                alt={item}
                imageStyleClass="img"
                divStyleClass="img-wrapper"
                height={330}
              />
            </Grid>
          ))}
          {images2.map((item) => (
            <Grid item xs={6} md={2} key={item}>
              <BlurryLoadingImage
                preview={item}
                image={item}
                alt={item}
                imageStyleClass="img"
                divStyleClass="img-wrapper"
                height={200}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Container maxWidth="sm" sx={{ my: 20 }}>
        <Typography variant="h6" sx={{ mb: 5 }} textAlign={"center"}>
          "{quote.quote}"
        </Typography>
        <Typography variant="body2" sx={{ mb: 5 }} textAlign={"center"}>
          _ {quote.author} _
        </Typography>
      </Container>
    </LayoutMode>
  );
}

export default Homepage;
