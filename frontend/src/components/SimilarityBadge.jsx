export default function SimilarityBadge({ score }) {
  return (
    <span className="inline-flex rounded-full bg-indigoDeep px-3 py-1 text-xs font-bold text-white">
      {Number(score).toFixed(3)}
    </span>
  )
}
