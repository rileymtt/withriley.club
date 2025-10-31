export const generateImage = async ({
  width = 200,
  height = 200,
}: {
  width?: number;
  height?: number;
}) => {
  const result = await fetch(`https://picsum.photos/${width}/${height}`);
  const { url } = result;
  return url;
};

export const generateMultipleImages = async (
  count: number,
  width?: number,
  height?: number
) => {
  const images = await Promise.all(
    Array.from({ length: count }, (_, index) =>
      generateImage({ width, height })
    )
  );
  return images;
};
