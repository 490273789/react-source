const randomKey = Math.random().toString(36).slice(2);
const internalPropsKey = '__reactProps$' + randomKey;
const internalInstanceKey = '__reactFiber$' + randomKey;

/**
 * 取缓存在dom上的fiber
 * @param targetNode
 * @returns {*}
 */
export function getClosestInstanceFromNode(targetNode) {
  const targetInst = targetNode[internalInstanceKey];
  return targetInst;
}

/**
 * 提前缓存fiber的实例到dom上
 * @param hostInst
 * @param node
 */
export function precacheFiberNode(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}

/**
 * 取缓存在dom上的props
 * @param node
 * @returns {*|null}
 */
export function getFiberCurrentPropsFromNode(node) {
  return node[internalPropsKey] || null;
}

/**
 * 将props缓存在dom上
 * @param node
 * @param props
 */
export function updateFiberProps(node, props) {
  node[internalPropsKey] = props;
}
