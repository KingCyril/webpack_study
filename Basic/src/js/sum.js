export default function (...argus) {
  return argus.reduce((pre, cur) => pre + cur, 0)
}