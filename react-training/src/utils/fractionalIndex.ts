const GAP = 1.0
const EPSILON = 0.001

/**
 * Computes the order value for an item inserted at `toIndex`
 * within `tasks` (which must NOT include the item being moved).
 *
 * Examples:
 *   [1.0, 2.0, 3.0], toIndex=1 → 1.5  (between 1.0 and 2.0)
 *   [1.0, 2.0, 3.0], toIndex=0 → 0.0  (before 1.0)
 *   [1.0, 2.0, 3.0], toIndex=3 → 4.0  (after 3.0)
 */
export function computeOrder(tasks: { order: number }[], toIndex: number): number {
  if (tasks.length === 0) return GAP

  const prev = tasks[toIndex - 1]
  const next = tasks[toIndex]

  if (!prev) return next.order - GAP
  if (!next) return prev.order + GAP

  const midpoint = (prev.order + next.order) / 2

  if (next.order - prev.order < EPSILON) {
    // Gap too small: fall back to rebalanced integer spacing
    return Math.floor(prev.order) + GAP
  }

  return midpoint
}
