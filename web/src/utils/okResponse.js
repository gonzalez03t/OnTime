export default function okResponse(res) {
  return res?.status === 200 || res?.status === 201;
}
