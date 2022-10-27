
export default function (...argus) {
  return argus.reduce((p, c) => p + c, 0)
}