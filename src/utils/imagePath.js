export default function imagePath(IMAGE_PATH) {
  return `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}${IMAGE_PATH}`;
}
